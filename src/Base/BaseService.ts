import {
  ModelType,
  FilterOutFunctionKeys,
} from "@typegoose/typegoose/lib/types";
import mongoose from "mongoose";

export interface PaginationMeta {
  totalResults: number;
  totalPages: number;
  currentPage: number;
  pageSize: number;
  from: number;
  to: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export interface PaginatedResponse<T> {
  success: boolean;
  code: number;
  message: string;
  data: {
    results: T[];
    pagination: PaginationMeta;
  };
}

export class BaseService<T> {
  protected model: ModelType<T>;

  constructor(model: ModelType<T>) {
    this.model = model;
  }
  async create(data: Partial<T>) {
    try {
      const createdDocument = await this.model.create(data);
      return createdDocument;
    } catch (error: any) {
      console.log(error);
      throw error;
    }
  }

  async updateById(_id: string, updateData: Partial<T>) {
    console.log("Yee leee id", _id);
    try {
      const data = await this.model.findById(_id);
      if (!data) {
        console.log("Data not found");
        throw new Error("Data not found");
      }
      const updatedDocument = await this.model.findByIdAndUpdate(
        _id,
        updateData,
        { new: true, runValidators: true },
      );
      return updatedDocument;
    } catch (error: any) {
      console.log(error);
      throw error;
    }
  }



  async list(
    filter: any = {},
    page: number = 1,
    limit: number = 10,
    sort: any = {},
  ): Promise<PaginatedResponse<T>> {
    const skip = (page - 1) * limit;

    const totalResults = await this.model.countDocuments(filter);

    const results: any = await this.model
      .find(filter)
      .sort({ _id: -1 })
      .skip(skip)
      .limit(limit);

    const totalPages = Math.ceil(totalResults / limit);

    return {
      success: true,
      code: 200,
      message: "List fetched successfully",
      data: {
        results,
        pagination: {
          totalResults,
          totalPages,
          currentPage: page,
          pageSize: limit,
          from: totalResults === 0 ? 0 : skip + 1,
          to: skip + results.length,
          hasNextPage: page < totalPages,
          hasPrevPage: page > 1,
        },
      },
    };
  }

  async deletedById(id: any) {
    try {
      await this.model.findByIdAndDelete(id);
    } catch (error: any) {
      console.log(error);
      throw error;
    }
  }
  async findById(params: any) {
    try {
      if (params._id && !mongoose.isValidObjectId(params._id)) {
        return null;
      }

      const data = await this.model.findById({ _id: params._id });

      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  async details(params: any) {
    try {
      // Check for known ObjectId fields in params
      if (params._id && !mongoose.isValidObjectId(params._id)) return null;
      if (params.userId && !mongoose.isValidObjectId(params.userId))
        return null;

      const data = await this.model.findOne({ ...params });
      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}

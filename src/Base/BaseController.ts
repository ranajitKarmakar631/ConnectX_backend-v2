import { Request, Response } from "express";
import { ApiResponse } from "./response";
import { BaseService } from "./BaseService";

export class BaseController<T> {
  protected service: BaseService<T>;
  constructor(service: BaseService<T>) {
    this.service = service;
  }

  handleCreate = async (req: Request, res: Response): Promise<void> => {
    try {
      const data = await this.service.create(req.body);

      ApiResponse.success(res, "Created successfully", data, 201);
    } catch (error: any) {
      ApiResponse.error(res, "Error in handleCreate", 500, error.message);
    }
  };

  handleUpdate = async (req: Request, res: Response) => {
    try {
      const _id = req?.body?.id;
      if (!_id) {
        ApiResponse.error(res, "Missing _id parameter", 400);
        return;
      }
      const data = await this.service.updateById(_id, req.body);
      if (!data) {
        ApiResponse.error(res, "Record not found", 404);
        return;
      }
      ApiResponse.success(res, "Updated successfully", data);
    } catch (error: any) {
      ApiResponse.error(res, "Error in handleUpdate", 500, error.message);
    }
  };

  handleList = async (req: any, res: any) => {
    try {
      const page = req.body.page || 1;
      const limit = req.body.limit || 15;
      const response = await this.service.list(req?.body?.filter, page, limit);

      res.status(200).json(response);
    } catch (error: any) {
      ApiResponse.error(res, "Error in handleList", 500, error.message);
    }
  };

  handleDelete = async (req: Request, res: Response) => {
    try {
      const _id = req?.body?._id;
      if (!_id) {
        ApiResponse.error(res, "Missing _id parameter", 400);
        return;
      }
      await this.service.deletedById(_id);
      ApiResponse.success(res, "Deleted Successfully", null, 200);
    } catch (error: any) {
      ApiResponse.error(res, "Error in handleDelete", 500, error.message);
    }
  };

  handleFind = async (req: Request, res: Response) => {
    try {
      const params = req?.body?.filter;
      const data = await this.service.details(params);
      if (!data) {
        return ApiResponse.error(res, "Not found", 404);
      }
      ApiResponse.success(res, "Found", data);
    } catch (error: any) {
      ApiResponse.error(res, "Error in handleFind", 500, error.message);
    }
  };
}

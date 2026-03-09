import mongoose, { isValidObjectId } from "mongoose";
import { BaseService } from "../../Base/BaseService";
import { Chat, chatModel } from "./chats.model";

export class ChatService extends BaseService<Chat> {
  constructor() {
    super(chatModel);
  }

  getConnectionList = async (
    userId: string,
    page: number = 1,
    limit: number = 10,
  ) => {
    const skip = (page - 1) * limit;

    if (!userId || !isValidObjectId(userId)) {
      return {
        success: false,
        code: 400,
        message: "Invalid or missing User ID",
        data: {
          results: [],
          pagination: {
            totalResults: 0,
            totalPages: 0,
            currentPage: page,
            pageSize: limit,
            from: 0,
            to: 0,
            hasNextPage: false,
            hasPrevPage: false,
          },
        },
      };
    }

    const objectUserId = new mongoose.Types.ObjectId(userId);

    const pipeline = [
      {
        $match: {
          chatType: "direct",
          "participants.user": objectUserId,
        },
      },

      {
        $addFields: {
          opponent: {
            $arrayElemAt: [
              {
                $filter: {
                  input: "$participants",
                  as: "p",
                  cond: { $ne: ["$$p.user", objectUserId] },
                },
              },
              0,
            ],
          },
        },
      },
      {
        $lookup: {
          from: "user_profiles",
          let: { opponentUserId: "$opponent.user" },
          pipeline: [
            {
              $match: {
                $expr: { $eq: ["$userId", "$$opponentUserId"] },
              },
            },
            { $sort: { createdAt: -1 } }, 
            { $limit: 1 },
          ],
          as: "opponentProfile",
        },
      },

      { $unwind: "$opponentProfile" },

      { $sort: { lastMessageAt: -1 } },

      {
        $facet: {
          results: [{ $skip: skip }, { $limit: limit }],
          totalCount: [{ $count: "count" }],
        },
      },
    ];

    const aggregated = await this.model.aggregate(pipeline);

    const results = aggregated[0]?.results || [];
    const totalResults = aggregated[0]?.totalCount[0]?.count || 0;
    const totalPages = Math.ceil(totalResults / limit);

    return {
      success: true,
      code: 200,
      message: "Chats fetched successfully",
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
  };
}

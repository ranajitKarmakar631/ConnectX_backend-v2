import { Request, Response } from "express";
import { getCache } from "./redisHandler";
import { UserProfileService } from "../userProfile/userProfile.service";
import { ApiResponse } from "../../Base/response";
import { UserProfileModel } from "../userProfile/userProfile.model";
import { UserProfileController } from "../userProfile/userProfile.controller";
import mongoose from "mongoose";
import { Chat, chatModel } from "../chats/chats.model";

export class RedisController {
    handleGetUserOnline = async (req: Request, res: Response): Promise<any> => {
        try {
            const { _id } = req?.body;
            // console.log(req?.body);
            // console.log('userdata ', _id);
            const userData = await UserProfileModel.findOne({
                _id
            });
            // console.log(userData)
            if (userData) {
                const isOnline = await getCache<boolean>(`online:${userData.userId}`);
                if (isOnline) {
                    return ApiResponse.success(res, "get data successfully", {
                        isOnline: true,
                    });
                }
                else {
                    return ApiResponse.success(res, "user is not online", { isOnline: false });
                }
            }
            return ApiResponse.success(res, "last seen is off", { isOnline: false });
        } catch (error: any) {
            return ApiResponse.error(res, "data not found", error?.message);
        }
    };


    handleGetLastMessage = async (req: Request, res: Response): Promise<any> => {
        try {
            const { _id } = req?.body;
            const lastMessage = await getCache<string>(`lastMessage:${_id}`);
            return ApiResponse.success(res, "last seen is off", { message: lastMessage || '' });
        } catch (error: any) {
            return ApiResponse.error(res, "data not found", error?.message);
        }
    };
}

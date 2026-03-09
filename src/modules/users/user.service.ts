import { BaseService } from "../../Base/BaseService";
import { TokenService } from "../token/token.service";
import { User, UserModel } from "./users.model";
const bcrypt = require("bcryptjs");
import * as dotevn from "dotenv";
dotevn.config();

export class UserService extends BaseService<User> {
  constructor() {
    super(UserModel);
  }

  // Add user-specific business logic methods here
  async create(params: any) {
    try {
      const salt = bcrypt.genSaltSync(Number(process.env.SALT_ROUND) || 10);
      const hash = bcrypt.hashSync(params.password, salt);
      const createdUser = await super.create({ ...params, password: hash });
      return createdUser;
    } catch (error: any) {
      console.log(error);
      throw error;
    }
  }
  /**
   * Find user by email
   */
  async findByEmail(email: string) {
    try {
      const user = await this.model.findOne({ email });
      return user;
    } catch (error: any) {
      console.log("Error finding user by email:", error);
      throw error;
    }
  }

  /**
   * Update user's refresh token
   */
  async updateRefreshToken(userId: string, refreshToken: string) {
    try {
      const updatedUser = await this.model.findByIdAndUpdate(
        userId,
        { refershToken: refreshToken },
        { new: true },
      );
      return updatedUser;
    } catch (error: any) {
      console.log("Error updating refresh token:", error);
      throw error;
    }
  }

  /**
   * Check if email already exists
   */
  async emailExists(email: string): Promise<boolean> {
    try {
      const user = await this.model.findOne({ email });
      return !!user;
    } catch (error: any) {
      console.log("Error checking email existence:", error);
      throw error;
    }
  }
}

import { Request, Response } from "express";
import jwt from "jsonwebtoken";
const bcrypt = require("bcryptjs");
import { BaseController } from "../../Base/BaseController";
import { UserService } from "./user.service";
import { User } from "./users.model";
import { TokenService } from "../token/token.service";
import { AuthTokenModel, TokenType } from "../token/token.model";

export class UserController extends BaseController<User> {
  constructor() {
    super(new UserService());
  }

  handleCreate = async (req: Request, res: Response) => {
    try {
      // Normalize name if it comes as a string
      if (typeof req.body.name === "string") {
        const [first, ...rest] = req.body.name.split(" ");
        req.body.name = {
          first: first || "New",
          last: rest.join(" ") || "User",
        };
      }

      const tokenService = new TokenService();
      const existingUser = await this.service.details({
        email: req.body.email,
      });

      if (existingUser && existingUser._id) {
        return res.status(400).json({
          success: false,
          message: "User already exists",
        });
      }

      const data = await this.service.create(req.body);

      if (!data || !data._id) {
        return res.status(400).json({
          success: false,
          message: "User creation failed",
        });
      }
      const payload = {
        id: data._id,
        email: data.email,
        role: data.role,
      };

      const accessToken = jwt.sign(
        payload,
        process.env.JWT_ACCESS_SECRET as string,
        { expiresIn: "15m" },
      );
      const refreshToken = jwt.sign(
        payload,
        process.env.JWT_REFRESH_SECRET as string,
        { expiresIn: "7d" },
      );

      const hashedRefresh = await bcrypt.hash(refreshToken, 10);
      const hashedAccess = await bcrypt.hash(accessToken, 10);

      await tokenService.create({
        userId: data._id,
        tokenHash: hashedAccess,
        type: TokenType.ACCESS,
        expiresAt: new Date(Date.now() + 15 * 60 * 1000),
      });

      await tokenService.create({
        userId: data._id,
        tokenHash: hashedRefresh,
        type: TokenType.REFRESH,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      });

      const user = data.toObject() as any;
      res.cookie("accessToken", accessToken, {
        httpOnly: true,
        maxAge: 15 * 60 * 1000,
        secure: false,
        sameSite: "strict",
      });

      return res.status(201).json({
        success: true,
        message: "User created successfully",
        data: user,
      });
    } catch (error: any) {
      console.error(error);

      return res.status(500).json({
        success: false,
        message: error.message || "Something went wrong",
      });
    }
  };

  handleLogin = async (req: Request, res: Response) => {
    try {
      const tokenService = new TokenService();
      const { email, password } = req.body;
      console.log(req.body)
      const user = await this.service.details({ email });
      console.log("11111");
      if (!user) {
        return res.status(400).json({
          success: false,
          message: "Invalid credentials",
        });
      }
      console.log("222222");

      // 2️⃣ Compare password
      const isMatch = await bcrypt.compare(password, user.password);
      console.log("33333");

      if (!isMatch) {
        return res.status(400).json({
          success: false,
          message: "Invalid credentials",
        });
      }

      console.log("4444");

      // 3️⃣ Create payload
      const payload = {
        id: user._id,
        email: user.email,
        role: user.role,
      };

      // 🔐 Access Token
      const accessToken = jwt.sign(
        payload,
        process.env.JWT_ACCESS_SECRET as string,
        { expiresIn: "15m" },
      );

      // 🔄 Refresh Token
      const refreshToken = jwt.sign(
        payload,
        process.env.JWT_REFRESH_SECRET as string,
        { expiresIn: "7d" },
      );

      // 🔐 Hash tokens before storing
      const hashedRefresh = await bcrypt.hash(refreshToken, 10);
      const hashedAccess = await bcrypt.hash(accessToken, 10);

      // 💾 Save tokens in DB
      await tokenService.create({
        userId: user._id,
        tokenHash: hashedAccess,
        type: TokenType.ACCESS,
        expiresAt: new Date(Date.now() + 15 * 60 * 1000),
      });

      await tokenService.create({
        userId: user._id,
        tokenHash: hashedRefresh,
        type: TokenType.REFRESH,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      });

      res.cookie("accessToken", accessToken, {
        httpOnly: true,
        maxAge: 15 * 60 * 1000,
        secure: false,
        sameSite: "strict",
      });

      const userObj = user.toObject() as any;
      delete userObj.password;
      console.log('login successfully')

      return res.status(200).json({
        success: true,
        message: "Login successful",
        data: userObj,
      });
    } catch (error: any) {
      console.error(error);
      return res.status(500).json({
        success: false,
        message: error.message || "Something went wrong",
      });
    }
  };
  handleLogout = async (req: Request, res: Response) => {
    try {
      const accessToken = req.cookies.accessToken;
      if (!accessToken) {
        return res.status(200).json({
          success: true,
          message: "Already logged out",
        });
      }
      // 🔥 Delete ALL tokens of user (both access & refresh)
      const result = await AuthTokenModel.deleteMany({
        userId: req?.user?.id,
      });

      if (result) {
        res.clearCookie("accessToken");
        res.clearCookie("refreshToken");
      }

      // Clear cookies

      return res.status(200).json({
        success: true,
        message: "Logged out from all sessions",
      });
    } catch (error) {
      return res.status(200).json({
        success: true,
        message: "Logged out",
      });
    }
  };
}

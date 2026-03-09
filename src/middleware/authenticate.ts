import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const token = req.cookies.accessToken;
    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET as string);

    (req as any).user = decoded;

    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

export const userAuthenticate = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const user = req?.user;
    if (user.role === "USER") next();
    else return res.status(201).json({ message: "you are not an user" });
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

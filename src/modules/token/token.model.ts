import {
  getModelForClass,
  modelOptions,
  prop,
} from "@typegoose/typegoose";
import { mongoose } from "@typegoose/typegoose";
import { User } from "../users/users.model";
import type { Ref } from "@typegoose/typegoose";

export enum TokenType {
  ACCESS = "access",
  REFRESH = "refresh",
}

@modelOptions({
  schemaOptions: {
    timestamps: true,
    collection: "auth_tokens",
  },
})
export class AuthToken {

  @prop({
    ref: () =>User,
    type: mongoose.Types.ObjectId,
    required: true,
    index: true,
  })
  userId!: Ref<User>;

  @prop({ required: true, type:String })
  tokenHash!: string;

  @prop({
    enum: TokenType,
    required: true,
    index: true,
    type: String
  })
  type!: TokenType;

  @prop({ required: true, type:Date })
  expiresAt!: Date;


}

export const AuthTokenModel = getModelForClass(AuthToken);

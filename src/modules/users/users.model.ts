import {
  getModelForClass,
  modelOptions,
  prop,
  type Ref,
} from "@typegoose/typegoose";
import { USERROLE, NameModel } from "../../Base/BaseModel";

@modelOptions({ schemaOptions: { timestamps: true, collection: "users" } })
export class User {
  // @prop({ required: true, _id: false, type: () => NameModel }) name!: NameModel;
  @prop({ required: true, type: () => String, unique: true, trim: true })
  email!: string;
  @prop({ required: true, type: () => String, trim: true }) password!: string;
  @prop({ type: () => String }) refershToken?: string;
  @prop({
    type: () => String,
    enum: USERROLE,
    required: true,
    default: USERROLE.USER,
  })
  role!: string;
}
export const UserModel = getModelForClass(User);

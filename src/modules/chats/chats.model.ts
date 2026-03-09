import {
  getModelForClass,
  modelOptions,
  mongoose,
  prop,
  Ref,
} from "@typegoose/typegoose";
import { User } from "../users/users.model";

export enum ChatType {
  DIRECT = "direct",
  GROUP = "group",
}

@modelOptions({
  schemaOptions: {
    timestamps: true,
    collection: "chats",
  },
})
class Participant {
  @prop({
    ref: () => User,
    type: () => mongoose.Schema.Types.ObjectId,
    required: true,
  })
  user!: Ref<User>;

  @prop({ default: Date.now, type: () => Date })
  joinedAt!: Date;

  @prop({ type: () => Date })
  leftAt?: Date;
}

class LastMessagePreview {
  @prop({ required: true, type: () => String })
  messageId!: string;

  @prop({ maxlength: 200, type: () => String })
  text?: string;

  @prop({
    ref: () => User,
    type: () => mongoose.Schema.Types.ObjectId,
    required: true,
  })
  sender!: Ref<User>;

  @prop({ default: Date.now, type: () => Date })
  sentAt!: Date;
}

@modelOptions({
  schemaOptions: {
    timestamps: true,
    collection: "chats",
  },
})
export class Chat {
  @prop({
    enum: ChatType,
    required: true,
    index: true,
    type: () => String,
  })
  chatType!: ChatType;

  // For direct chats: sorted userId combination
  @prop({
    unique: true,
    sparse: true,
    index: true,
    type: () => String,
  })
  directKey?: string;

  @prop({
    type: () => [Participant],
    _id: false,
    required: true,
  })
  participants!: Participant[];

  // Group Info
  @prop({ type: () => String })
  groupName?: string;

  @prop({ type: () => String })
  groupAvatar?: string;

  @prop({
    ref: () => User,
    type: () => mongoose.Schema.Types.ObjectId,
  })
  createdBy?: Ref<User>;

  @prop({ _id: false, type: () => LastMessagePreview })
  lastMessage?: LastMessagePreview;

  @prop({ default: Date.now, index: true, type: () => Date })
  lastMessageAt!: Date;

  @prop({ default: false, type: () => Boolean })
  isArchived!: boolean;
}

export const chatModel = getModelForClass(Chat);

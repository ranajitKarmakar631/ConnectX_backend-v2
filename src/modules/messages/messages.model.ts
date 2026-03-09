import {
  getModelForClass,
  modelOptions,
  mongoose,
  prop,
} from "@typegoose/typegoose";
import { type Ref } from "@typegoose/typegoose";
import { User } from "../users/users.model";
import { Chat } from "../chats/chats.model";

// 🔹 Read Receipt Subdocument
export class ReadReceipt {
  @prop({
    ref: () => User,
    type: () => mongoose.Schema.Types.ObjectId,
    required: true,
  })
  user!: Ref<User>;

  @prop({
    type: () => Date,
    default: Date.now,
  })
  readAt!: Date;
}

@modelOptions({
  schemaOptions: {
    timestamps: true,
    collection: "messages",
  },
})
export class Messages {
  // 🔥 Belongs to which chat
  @prop({
    ref: () => Chat,
    type: () => mongoose.Schema.Types.ObjectId,
    required: true,
    index: true,
  })
  chatId!: Ref<Chat>;

  // 🔥 Sender
  @prop({
    ref: () => User,
    type: () => mongoose.Schema.Types.ObjectId,
    required: true,
    index: true,
  })
  senderId!: Ref<User>;

  // 🔹 Text content
  @prop({
    type: () => String,
    maxlength: 10000,
  })
  message?: string;

  // 🔹 Read receipts
  @prop({
    type: () => [ReadReceipt],
    _id: false,
    default: [],
  })
  readBy!: ReadReceipt[];

  // 🔹 Soft delete
  @prop({
    type: () => Boolean,
    default: false,
    index: true,
  })
  isDeleted!: boolean;

  @prop({
    type: () => Boolean,
    default: false,
  })
  isEdited!: boolean;

  @prop({
    type: () => Date,
  })
  deletedAt?: Date;
}

export const MessageModel = getModelForClass(Messages);

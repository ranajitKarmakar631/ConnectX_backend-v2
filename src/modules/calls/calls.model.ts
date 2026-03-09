import {
    getModelForClass,
    modelOptions,
    prop,
    Ref,
    mongoose,
} from "@typegoose/typegoose";
import { User } from "../users/users.model";
import { Chat } from "../chats/chats.model";

export enum CallType {
    AUDIO = "audio",
    VIDEO = "video",
}

export enum CallStatus {
    RINGING = "ringing",
    ACCEPTED = "accepted",
    REJECTED = "rejected",
    MISSED = "missed",
    ENDED = "ended",
    CANCELED = "canceled",
}

class CallParticipant {
    @prop({
        ref: () => User,
        type: () => mongoose.Schema.Types.ObjectId,
        required: true,
    })
    user!: Ref<User>;

    @prop({ default: false, type: () => Boolean })
    joined!: boolean;

    @prop({ type: () => Date })
    joinedAt?: Date;

    @prop({ type: () => Date })
    leftAt?: Date;
}

@modelOptions({
    schemaOptions: {
        timestamps: true,
        collection: "calls",
    },
})
export class Call {

    @prop({
        enum: CallType,
        required: true,
        type: () => String,
    })
    callType!: CallType;

    @prop({
        enum: CallStatus,
        default: CallStatus.RINGING,
        type: () => String,
    })
    status!: CallStatus;

    @prop({
        ref: () => User,
        type: () => mongoose.Schema.Types.ObjectId,
        required: true,
    })
    senderId!: Ref<User>;


    @prop({
        ref: () => User,
        type: () => mongoose.Schema.Types.ObjectId,
        required: true,
    })
    receiverId!: Ref<User>;

    @prop({ type: () => Date })
    startedAt?: Date;

    @prop({ type: () => Date })
    endedAt?: Date;

}

export const callModel = getModelForClass(Call);

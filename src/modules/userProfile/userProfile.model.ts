import {
  getModelForClass,
  modelOptions,
  mongoose,
  prop,
} from "@typegoose/typegoose";

/* ================================
   🔹 Address Subdocument
================================ */

export class Address {
  @prop({ required: true, type: () => String })
  street!: string;

  @prop({ type: () => String })
  city?: string;

  @prop({ type: () => String })
  state?: string;

  @prop({ type: () => String })
  country?: string;

  @prop({ type: () => String })
  zipCode?: string;
}

/* ================================
   🔹 Name Subdocument
================================ */

export class NameModel {
  @prop({ required: true, type: () => String })
  firstName!: string;

  @prop({ type: () => String })
  middleName?: string;

  @prop({ required: true, type: () => String })
  lastName!: string;
}

/* ================================
   🔹 Privacy Settings
================================ */

export class PrivacySettings {
  @prop({
    enum: ["everyone", "contacts", "nobody"],
    default: "everyone",
    type: () => String,
  })
  lastSeen!: string;

  @prop({
    enum: ["everyone", "contacts", "nobody"],
    default: "everyone",
    type: () => String,
  })
  profilePhoto!: string;

  @prop({
    enum: ["everyone", "contacts", "nobody"],
    default: "everyone",
    type: () => String,
  })
  about!: string;

  @prop({ default: true, type: () => Boolean })
  readReceipts!: boolean;
}

/* ================================
   🔹 Main UserProfile Model
================================ */

@modelOptions({
  schemaOptions: {
    timestamps: true,
    collection: "user_profiles",
  },
})
export class UserProfile {
  // 🔹 Reference to User
  @prop({
    required: true,
    type: () => mongoose.Schema.Types.ObjectId,
    ref: "User",
  })
  userId!: mongoose.Schema.Types.ObjectId;

  // 🔹 Profile Info
  @prop({ required: true, trim: true, type: () => String })
  displayName!: string;

  @prop({ required: true, type: () => String })
  about!: string;

  // 🔹 Presence (Important for chat apps)
  @prop({ default: false, index: true, type: () => Boolean })
  isOnline!: boolean;

  @prop({ default: Date.now, index: true, type: () => Date })
  lastSeen!: Date;

  // 🔹 Address (Nested Subdocument)
  @prop({ _id: false, type: () => Address })
  address?: Address;

  // 🔹 Privacy Settings
  @prop({ _id: false, type: () => PrivacySettings, default: {} })
  privacy!: PrivacySettings;

  // 🔹 Account Status
  @prop({ default: true, index: true, type: () => Boolean })
  isActive!: boolean;
}

/* ================================
   🔹 Export Model
================================ */

export const UserProfileModel = getModelForClass(UserProfile);

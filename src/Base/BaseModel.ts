import { prop } from "@typegoose/typegoose";

export enum USERROLE {
  USER = "USER",
  ADMIN = "ADMIN",
}

export class NameModel {
  @prop({ required: true, type: () => String })
  first!: string;

  @prop({ required: true, type: () => String })
  last!: string;
}

export class ContactInfo {
  @prop()
  phone?: string;
}

export class Address {
  @prop()
  street?: string;

  @prop()
  city?: string;

  @prop()
  state?: string;

  @prop()
  zip?: string;

  @prop()
  country?: string;
}

export class IGeoLocation {
  @prop({ required: true })
  lat!: number;

  @prop({ required: true })
  lng!: number;
}

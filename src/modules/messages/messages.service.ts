import { BaseService } from "../../Base/BaseService";
import { Messages, MessageModel } from "./messages.model";

export class MessageService extends BaseService<Messages>{
    constructor(){
        super(MessageModel);
    }
}

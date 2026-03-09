import { BaseController } from "../../Base/BaseController";
import { Messages } from "./messages.model";
import { MessageService } from "./messages.service";


export class MessageController extends BaseController<Messages>{
    constructor(){
        super(new MessageService());
    }
}

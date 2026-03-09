import { BaseController } from "../../Base/BaseController";
import { BaseService } from "../../Base/BaseService";
import { Call } from "./calls.model";
import { CallService } from "./calls.service";


export class CallController extends BaseController<Call> {
    protected service: CallService;
    constructor() {
        super(new CallService());
        this.service = new CallService();
    }
}
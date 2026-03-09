import { BaseService } from "../../Base/BaseService";
import { Call, callModel } from "./calls.model";


export class CallService extends BaseService<Call>
{
    constructor(){
        super(callModel)
    }
}
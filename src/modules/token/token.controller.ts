import { BaseController } from "../../Base/BaseController";
import { AuthToken } from "./token.model";
import { TokenService } from "./token.service";


export class TokenController extends BaseController<AuthToken>{
    constructor(){
        super(new TokenService());
    }
}

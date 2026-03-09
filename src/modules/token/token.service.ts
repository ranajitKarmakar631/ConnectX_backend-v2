import { BaseService } from "../../Base/BaseService";
import { AuthToken, AuthTokenModel } from "./token.model";

export class TokenService extends BaseService<AuthToken>{
    constructor(){
        super(AuthTokenModel);
    }
}

import { BaseController } from "../../Base/BaseController";
import { UserProfile } from "./userProfile.model";
import { UserProfileService } from "./userProfile.service";


export class UserProfileController extends BaseController<UserProfile>{
    constructor(){
        super(new UserProfileService());
    }
}

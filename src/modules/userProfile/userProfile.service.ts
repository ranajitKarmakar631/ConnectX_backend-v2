import { BaseService } from "../../Base/BaseService";
import { UserProfile, UserProfileModel } from "./userProfile.model";

export class UserProfileService extends BaseService<UserProfile>{
    constructor(){
        super(UserProfileModel);
    }
}

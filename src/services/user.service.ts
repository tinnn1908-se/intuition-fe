import UserAPI from "../apis/http.user";
import { IUser } from "../models/user.model";

export default class UserService {
    static async updateUser(user: IUser) {
        var response = await UserAPI.updateUser(user);
        if (typeof response !== 'undefined')
            return response;
        return null;
    }
}
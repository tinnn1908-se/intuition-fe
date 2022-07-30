import HTTP from "./http.common";
import request, { AxiosResponse } from "axios";
import { IUser } from "../models/user.model";
export default class UserAPI {
    static async updateUser(user: IUser) {
        try {
            var response = await HTTP.put("/api/user/updateUser", user);
            return response.data.user;
        } catch (error) {
            if (request.isAxiosError(error) && error.response) {
                return error.response;
            }
        }
    }
}
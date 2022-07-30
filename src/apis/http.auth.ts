import request,{ AxiosResponse } from "axios";
import { ISignin, IUserLogin } from "../models/signin.model";
import { ISignUp } from "../models/signup.model";
import { ITokens } from "../models/tokens.model";
import HTTP from "./http.common";
export default class AuthAPI {

    static async register(signUpInformation : ISignUp){
        try {
            var response = await HTTP.post("/api/auth/register",signUpInformation);
            return response.data.errors;
        } catch (error) {
            if(request.isAxiosError(error) && error.response){
                return error.response;   
            }
        }
    }

    static async authenticate(signInInformation : ISignin){
        try {
            var response = await HTTP.post("/api/auth/authentication",signInInformation);
            return response.data;
        } catch (error) {
            if(request.isAxiosError(error) && error.response){
                return error.response;
            }
        }
    }

    static async getUserByToken(tokens : ITokens){ 
        try{
            var response = await HTTP.post('/api/auth/authorization',{
                accessToken : tokens.accessToken,
                // accessToken : tokens.accessToken,
                refreshToken : tokens.refreshToken
            });
            console.log("api : " + tokens.accessToken)
            return response.data.user;
        }catch(error){
            if(request.isAxiosError(error) && error.response){
                return error.response;
            }
        }
    }

    

}
import { request } from "http";
import { json } from "stream/consumers";
import AuthAPI from "../apis/http.auth";
import { ISignin } from "../models/signin.model";
import { ISignUp } from "../models/signup.model";
import { ITokens } from "../models/tokens.model";
import { IUser } from "../models/user.model"
export default class AuthService {

    static async register(signUpInformation: ISignUp) {
        var response = await AuthAPI.register(signUpInformation);
        console.log(response)
        if (typeof response !== 'undefined') {
            return response;
        }
        return [];
    }

    static async authenticate(signInInformation: ISignin) {
        var response = await AuthAPI.authenticate(signInInformation);
        console.log("username : " + signInInformation.username)
        console.log("password : " + signInInformation.password)
        var accessToken = response.accessToken;
        var refreshToken = response.refreshToken;

        var tokens: ITokens | null = null;
        if (accessToken && refreshToken) {
            tokens = {
                accessToken,
                refreshToken
            }
            console.log("tokens : " + Object.values(tokens))
        }
        return tokens;
    }

    static async authorize(tokens: ITokens) {
        var user: IUser = await AuthAPI.getUserByToken(tokens);
        if (user) return user;
        return null;
    }



    // static getAccessToken(): string {
    //     var user = localStorage.getItem('user');
    //     var accessToken = 'Bearer ';
    //     if (user) {
    //         accessToken = accessToken + ' ' + JSON.parse(user).accessToken;
    //     }
    //     return accessToken;
    // }



    static getCurrentUser(): IUser | null {
        var response = localStorage.getItem('user');
        var user = null;
        try {
            if (response) {
                user = JSON.parse(response);
            }
        } catch (error) {
            return null;
        }
        return user;

    }

    static async login(signin: ISignin) {
        await AuthService.authenticate(signin);
        var accessToken = localStorage.getItem('accessToken');
        // console.log("login : " + accessToken);
        if (accessToken) {
            var tokens: ITokens = {
                accessToken: accessToken,
                refreshToken: ''
            };
            var user: IUser | null = await AuthService.authorize(tokens);
            if (user) {
                return user;
            }
            return null;
        } else {
            //log error
            return null;
        }
    }

    static isLoggedIn() {
        var accessToken = localStorage.getItem('accessToken');
        var user = localStorage.getItem('user');
        if (accessToken && user)
            return true;
        return false;
    }
    static getFullname(): string {
        var response = localStorage.getItem('user');
        var user: IUser | null = null;
        if (response) {
            try {
                user = JSON.parse(response);
                if (user)
                    return user.fullname;
                return 'error';
            } catch (error) {
                console.log(error)
                return 'error';
            }
        }
        return 'error';
    }

}
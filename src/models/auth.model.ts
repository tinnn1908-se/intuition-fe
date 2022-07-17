import { ITokens } from "./tokens.model";
import { IUser } from "./user.model";

export interface IAuth {
    isLoggedIn : boolean;
    user : IUser|null;
    tokens : ITokens|null;   
}

export const initialAuth : IAuth = {
    isLoggedIn : false,
    tokens : null,
    user : null
}
export interface ISignin {
    username : string, 
    password : string
}

export interface IUserLogin {
    status : number,
    accessToken : string,
    refreshToken : string
}
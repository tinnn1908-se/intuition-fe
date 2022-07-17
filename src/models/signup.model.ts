export interface ISignUp {
    username : string,
    password : string,
    fullname : string,
    email : string,
    phoneNumber : string,
    birthday : string,
    address : string
}
export const initialSignUp : ISignUp= {
    username : '',
    password : '',
    fullname : '',
    email : '',
    phoneNumber : '',
    birthday : '',
    address : ''
}
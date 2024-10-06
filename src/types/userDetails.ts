export interface IUserDetails{
    username:string,
    email:string,
    mobile:number,
    password:string,
    profileImage?:string | null,
  
}
export interface IToken{
  token:string
}





export interface ILoginResponse  {
    data: IUserDetails & IToken,
    message: string;
    error:string
  }

  export interface IDetails {
    name: string;
    phone: string;
    email: string;
    countryCode: string;
    _id: string;
  }

  export interface ILoginValues{
    email:string,
    password:string,
    token?:string|null
  
}
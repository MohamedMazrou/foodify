export interface IsignUp {

  fullName:string,
  phoneNumber:number,
  password:number| string,
  password_confirmation:number | string ,

}
export interface IsignIn {

  phone:number,
  password:number| string,



}

export interface InewPass {

  otp:number,
  phone: number,
  password: any,
  password_confirmation:any,



}
export interface IForgetPassword {

  phone:number,


}
export interface IOtp {

  phone: string,
  otp: string

}
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


export interface Irecommended {
  id: number;
  name: string;
  description: string;
  price: string;
  kcal: number;
  protein: string;
  reviews: number;
  rating: number;
  image: string;
  category: string;
}



export interface ICartResponse {
  data: ICartItem[];
  summary: ICartSummary;
}


export interface ICartItem {
  id: number;
  name: string;
  price: string;     
  kcal: number;
  image: string;
  quantity: number;
  subtotal: number;
}

export interface ICartSummary {
  total_items: number;
  total_price: number;
}

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
  switchOnFav?:boolean
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


export interface IResponseFavFood {
  data: IFavFoodItem[];
  meta: IMeta;
}


export interface IFavFoodItem {
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
    switchOnFav?:boolean
}

export interface IMeta {
  total: number;
}


export interface IFoodCategoryResponse {
  data: IFoodCategory[];
}


export interface IFoodCategory {
  id: number;
  name: string;
  image: string;
  dishes_count: number;
}
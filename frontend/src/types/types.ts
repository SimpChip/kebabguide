
export type Base = {
  _id: string;
  createdAt: string;
  updatedAt: string;
}
export type Resturant = {
  name: string;
  address: string;
  imgUrl: string;
  resturantRating: number;
  resturantUpvotes: string[];
  resturantDownvotes: string[];
}

export type ResturantDto = Base & Resturant;

export type Item = {

  name: String;
  meat: String;
  resturantId: string;
  price: number;
  imgUrl: String;
  itemRating: number;
  itemUpvotes: string[];
  itemDownvotes: string[];
}

export type ItemDto = Base & Item;

export type Review  = {
  [key: string]: any;
  userId: User | string;
  resturantId: string;
  itemId: string;
  comment: String;
  reviewRating: number;
  reviewUpvotes: string[];
  reviewDownvotes: string[];
  
}

export type ReviewDto = Base & Review;


export type User = {
  firstName: string;
  lastName: string | null | undefined;
  email: string;
  password: string;
  phone: {
    ISD: string;
    number: string;
  }
}


export type UserDto = Base & User;


export interface Review {
  user_id: string;
  product_id: string;
  rating: number;
  comment?: string;
}

export interface Product {
  id: string;
  category: string;
  subCategory: string;
  item_name: string;
  price: number;
  seller_id: string;
  quantity: number;
  costPerItem: number;
  photoURL: string[];
  reviews: Review[];
}

export interface CreateRating {
  item_id: string;
  rating: number;
  content: string;
  order_item_id: string;
}

export interface CancelOrder {
  order_id: string;
}

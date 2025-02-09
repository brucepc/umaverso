export interface StoreGetProductsParams {
  q?: string;
  id?: string | string[];
  sales_channel_id?: string[];
  collection_id?: string[];
  tags?: string[];
  category_id?: string[];
  price_list_id?: string[];
  status?: string[];
  include_category_children?: boolean;
  title?: string;
  description?: string;
  handle?: string;
  is_giftcard?: boolean;
  type?: string;
  created_at?: {
    lt?: string;
    gt?: string;
    lte?: string;
    gte?: string;
  };
  updated_at?: {
    lt?: string;
    gt?: string;
    lte?: string;
    gte?: string;
  };
  offset?: number;
  limit?: number;
} 
export interface Setting {
  id: string;
  created_at: string;
  user_id: string;
  price_empire_source?: string;
  undercut_by_price?: number;
  undercut_by_percentage?: number;
  undercut_by?: string;
  is_paused?: boolean;
  price_empire_key?: string;
  waxpeer_key?: string;
}

export interface PriceRange {
  id: string;
  user_id: string;
  source_price_min: number;
  source_price_max: number;
  listing_price_min: number;
  listing_price_max: number;
  listing_price_if_no_one_to_undercut: number;
  when_no_one_to_undercut_list_at: string;
  always_undercut_by_percentage_if_listing_price_is_greater_than: number;
}

export interface Item {
  id: string;
  user_id: string;
  waxpeer_id: string;
  name: string;
  type: string;
  condition: string;
  price: number;
  created_at: string;
  is_active: boolean;
  price_updated_at: string;
  condition_updated_at: string;
  meta_data: object;
}

export interface ItemSetting {
  id: string;
  user_id: string;
  created_at: string;
  undercut_by_price?: number;
  undercut_by_percentage?: number;
  undercut_by?: string;
  listing_price_min: number;
  listing_price_max: number;
  listing_price_if_no_one_to_undercut: number;
  when_no_one_to_undercut_list_at: string;
  always_undercut_by_percentage_if_listing_price_is_greater_than: number;
  item_id: Item["id"];
}

export interface Listing {
  id: string;
  user_id: string;
  item_id: Item["id"];
  price: number;
  created_at: string;
  updated_at?: string;
  meta_data?: object;
}

export interface Log {
  id: string;
  item_id: Item["id"];
  user_id: string;
  created_at: string;
  type: string;
  message: string;
  meta_data?: object;
}

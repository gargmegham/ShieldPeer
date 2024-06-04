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
  source_price_min: number;
  source_price_max: number;
  listing_price_min: number;
  listing_price_max: number;
  listing_price_if_no_one_to_undercut: number;
  when_no_one_to_undercut_list_at: string;
  always_undercut_by_percentage_if_listing_price_is_greater_than: number;
}

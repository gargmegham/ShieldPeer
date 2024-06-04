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

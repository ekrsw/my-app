export interface KpiData {
  created_at: string;
  response_rate: number;
  responses: number;
  total_calls: number;
  direct_handling_rate: number;
  direct_handling: number;
  phone_inquiries: number;
  cumulative_callback_rate_under_20_min: number;
  cumulative_callback_under_20_min: number;
  cumulative_callback_under_60_min: number;
  callback_count_over_60_min: number;
  waiting_for_callback_over_20min: number;
  cumulative_callback_rate_under_30_min: number;
  cumulative_callback_under_30_min: number;
  waiting_for_callback_over_30min: number;
  cumulative_callback_rate_under_40_min: number;
  cumulative_callback_under_40_min: number;
  waiting_for_callback_over_40min: number;
  abandoned_calls: number;
  voicemails: number;
  wfc_20min_list: string;
  wfc_30min_list: string;
  wfc_40min_list: string;
  wfc_60min_list: string;
}

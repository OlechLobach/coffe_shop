import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://fqxiklijjyupbymoixfw.supabase.co";
const supabaseKey = "sb_publishable_HNrLCV0bdioR1vLZEb8Z2w_lPFlhwd0";
export const supabase = createClient(supabaseUrl, supabaseKey);
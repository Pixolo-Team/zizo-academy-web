// OTHERS //
import { createBrowserClient } from "@supabase/ssr";

// Set Up Supabase
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabasePublishableKey =
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!;

export const supabase = createBrowserClient(
  supabaseUrl,
  supabasePublishableKey,
);

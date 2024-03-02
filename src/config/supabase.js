
import { createClient } from "@supabase/supabase-js";

const supabaseUrl ='https://kpjnqfbilodmstrhodru.supabase.co'
const supabaseKey ='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtwam5xZmJpbG9kbXN0cmhvZHJ1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDMxNTc5MTEsImV4cCI6MjAxODczMzkxMX0.eXYXwd9YofeJCzReEiybkM11-yBbJJZU_umd0iotp6k'


export const supabase = createClient(supabaseUrl, supabaseKey);

console.log(supabase)

        
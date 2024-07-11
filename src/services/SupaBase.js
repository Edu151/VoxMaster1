// src/supabase.js
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://hsrvfcaciiagdojujxch.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhzcnZmY2FjaWlhZ2RvanVqeGNoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjA3MDczOTgsImV4cCI6MjAzNjI4MzM5OH0.KMIjj-e4D8ULmPL6CkiWaFxhS3DJnwj3sdQDqTid73o'
export const supabase = createClient(supabaseUrl, supabaseKey)

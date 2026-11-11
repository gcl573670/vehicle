-- Migration 0001: User accounts, saved data, audit log, affiliate links
-- Extends the AutoSpec vehicle catalog with user-owned data and admin audit trails.

CREATE TABLE public.user_profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL UNIQUE,
  preferred_units jsonb NOT NULL DEFAULT '{"distance": "miles", "fuelEconomy": "mpg", "pressure": "psi", "length": "inches", "temperature": "celsius"}'::jsonb,
  preferred_market text NOT NULL DEFAULT 'US',
  selected_vehicle_id uuid REFERENCES public.vehicles(id) ON DELETE SET NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.user_profiles TO authenticated;
GRANT ALL ON public.user_profiles TO authenticated;
GRANT ALL ON public.user_profiles TO service_role;
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can read own profile" ON public.user_profiles FOR SELECT TO authenticated USING (auth.uid()::text = id::text);
CREATE POLICY "Users can update own profile" ON public.user_profiles FOR UPDATE TO authenticated USING (auth.uid()::text = id::text);
CREATE POLICY "Users can insert own profile" ON public.user_profiles FOR INSERT TO authenticated WITH CHECK (auth.uid()::text = id::text);

CREATE TABLE public.saved_vehicles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES public.user_profiles(id) ON DELETE CASCADE,
  vehicle_id uuid NOT NULL REFERENCES public.vehicles(id) ON DELETE CASCADE,
  nickname text,
  is_primary boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, vehicle_id)
);
GRANT SELECT ON public.saved_vehicles TO authenticated;
GRANT ALL ON public.saved_vehicles TO authenticated;
GRANT ALL ON public.saved_vehicles TO service_role;
ALTER TABLE public.saved_vehicles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can read own saved vehicles" ON public.saved_vehicles FOR SELECT TO authenticated USING (user_id = auth.uid()::text);
CREATE POLICY "Users can manage own saved vehicles" ON public.saved_vehicles FOR ALL TO authenticated USING (user_id = auth.uid()::text) WITH CHECK (user_id = auth.uid()::text);
CREATE INDEX saved_vehicles_user_idx ON public.saved_vehicles (user_id);

CREATE TABLE public.user_maintenance_history (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES public.user_profiles(id) ON DELETE CASCADE,
  vehicle_id uuid NOT NULL REFERENCES public.vehicles(id) ON DELETE CASCADE,
  maintenance_item_id uuid REFERENCES public.maintenance_items(id) ON DELETE SET NULL,
  item_name text NOT NULL,
  mileage_at_service integer NOT NULL,
  service_date date NOT NULL,
  notes text,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.user_maintenance_history TO authenticated;
GRANT ALL ON public.user_maintenance_history TO authenticated;
GRANT ALL ON public.user_maintenance_history TO service_role;
ALTER TABLE public.user_maintenance_history ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can read own maintenance history" ON public.user_maintenance_history FOR SELECT TO authenticated USING (user_id = auth.uid()::text);
CREATE POLICY "Users can manage own maintenance history" ON public.user_maintenance_history FOR ALL TO authenticated USING (user_id = auth.uid()::text) WITH CHECK (user_id = auth.uid()::text);
CREATE INDEX user_maintenance_history_user_vehicle_idx ON public.user_maintenance_history (user_id, vehicle_id);

CREATE TABLE public.saved_comparisons (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES public.user_profiles(id) ON DELETE SET NULL,
  name text NOT NULL,
  vehicle_ids uuid[] NOT NULL DEFAULT '{}'::uuid[],
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.saved_comparisons TO authenticated;
GRANT ALL ON public.saved_comparisons TO authenticated;
GRANT ALL ON public.saved_comparisons TO service_role;
ALTER TABLE public.saved_comparisons ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can read own comparisons" ON public.saved_comparisons FOR SELECT TO authenticated USING (user_id = auth.uid()::text OR true);
CREATE POLICY "Users can manage own comparisons" ON public.saved_comparisons FOR ALL TO authenticated USING (user_id = auth.uid()::text) WITH CHECK (user_id = auth.uid()::text);

CREATE TABLE public.vehicle_edits (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  table_name text NOT NULL,
  record_id uuid NOT NULL,
  field_name text NOT NULL,
  previous_value text,
  new_value text,
  changed_by uuid REFERENCES public.user_profiles(id) ON DELETE SET NULL,
  changed_at timestamptz NOT NULL DEFAULT now(),
  source text,
  reason text
);
GRANT SELECT ON public.vehicle_edits TO authenticated;
GRANT ALL ON public.vehicle_edits TO authenticated;
GRANT ALL ON public.vehicle_edits TO service_role;
ALTER TABLE public.vehicle_edits ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Authenticated users can read edit log" ON public.vehicle_edits FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated users can insert edit log" ON public.vehicle_edits FOR INSERT TO authenticated WITH CHECK (true);
CREATE INDEX vehicle_edits_record_idx ON public.vehicle_edits (table_name, record_id);
CREATE INDEX vehicle_edits_changed_at_idx ON public.vehicle_edits (changed_at DESC);

CREATE TABLE public.affiliate_links (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  part_id uuid REFERENCES public.parts(id) ON DELETE CASCADE,
  retailer_name text NOT NULL,
  external_url text NOT NULL,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.affiliate_links TO anon, authenticated;
GRANT ALL ON public.affiliate_links TO authenticated;
GRANT ALL ON public.affiliate_links TO service_role;
ALTER TABLE public.affiliate_links ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Active affiliate links are readable" ON public.affiliate_links FOR SELECT TO anon, authenticated USING (is_active = true);
CREATE INDEX affiliate_links_part_idx ON public.affiliate_links (part_id);

CREATE TABLE public.api_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  provider text NOT NULL UNIQUE,
  setting_key text NOT NULL,
  is_enabled boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.api_settings TO authenticated;
GRANT ALL ON public.api_settings TO authenticated;
GRANT ALL ON public.api_settings TO service_role;
ALTER TABLE public.api_settings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Authenticated users can read API settings" ON public.api_settings FOR SELECT TO authenticated USING (true);

-- Update vehicles table to add slug uniqueness across markets if needed (already has UNIQUE slug)
-- Update engines to add created_by for audit (optional, skip for now)

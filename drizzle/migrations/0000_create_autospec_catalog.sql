CREATE TABLE public.data_sources (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  source_name text NOT NULL UNIQUE,
  source_url text NOT NULL,
  source_type text NOT NULL,
  license text,
  attribution_required boolean NOT NULL DEFAULT false,
  terms_url text,
  last_checked_at timestamptz,
  enabled boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.data_sources TO anon, authenticated;
GRANT ALL ON public.data_sources TO service_role;
ALTER TABLE public.data_sources ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Enabled source registry is readable" ON public.data_sources FOR SELECT TO anon, authenticated USING (enabled = true);

CREATE TABLE public.engines (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  manufacturer text,
  engine_code text,
  displacement numeric,
  cylinders integer,
  aspiration text,
  fuel_type text,
  horsepower numeric,
  torque numeric,
  horsepower_unit text,
  torque_unit text,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE NULLS NOT DISTINCT (manufacturer, engine_code, displacement, cylinders, aspiration, fuel_type)
);
GRANT SELECT ON public.engines TO anon, authenticated;
GRANT ALL ON public.engines TO service_role;
ALTER TABLE public.engines ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Engine catalog is readable" ON public.engines FOR SELECT TO anon, authenticated USING (true);

CREATE TABLE public.vehicles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  year integer NOT NULL,
  make text NOT NULL,
  model text NOT NULL,
  trim text,
  generation text,
  body_style text,
  market text NOT NULL DEFAULT 'US',
  vehicle_type text,
  fuel_type text,
  transmission text,
  drivetrain text,
  engine_id uuid REFERENCES public.engines(id) ON DELETE SET NULL,
  external_source_ids jsonb NOT NULL DEFAULT '{}'::jsonb,
  slug text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (year, make, model, trim, market, engine_id),
  UNIQUE (slug)
);
GRANT SELECT ON public.vehicles TO anon, authenticated;
GRANT ALL ON public.vehicles TO service_role;
ALTER TABLE public.vehicles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Vehicle catalog is readable" ON public.vehicles FOR SELECT TO anon, authenticated USING (true);
CREATE INDEX vehicles_year_make_model_idx ON public.vehicles (year, make, model);
CREATE INDEX vehicles_make_model_year_idx ON public.vehicles (make, model, year DESC);
CREATE INDEX vehicles_external_source_ids_idx ON public.vehicles USING gin (external_source_ids);

CREATE TABLE public.vehicle_specifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  vehicle_id uuid NOT NULL REFERENCES public.vehicles(id) ON DELETE CASCADE,
  specification_category text NOT NULL,
  specification_name text NOT NULL,
  value text,
  unit text,
  market text NOT NULL,
  source_id uuid REFERENCES public.data_sources(id) ON DELETE SET NULL,
  confidence_status text NOT NULL DEFAULT 'not_available' CHECK (confidence_status IN ('manufacturer_verified', 'official_government_source', 'verified_third_party_source', 'community_unverified', 'not_available')),
  verified_at timestamptz,
  notes text,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (vehicle_id, specification_category, specification_name, market, source_id)
);
GRANT SELECT ON public.vehicle_specifications TO anon, authenticated;
GRANT ALL ON public.vehicle_specifications TO service_role;
ALTER TABLE public.vehicle_specifications ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Vehicle specifications are readable" ON public.vehicle_specifications FOR SELECT TO anon, authenticated USING (true);
CREATE INDEX vehicle_specifications_vehicle_category_idx ON public.vehicle_specifications (vehicle_id, specification_category);

CREATE TABLE public.parts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  part_category text NOT NULL,
  manufacturer text,
  part_number text,
  product_name text NOT NULL,
  description text,
  specifications jsonb NOT NULL DEFAULT '{}'::jsonb,
  external_url text,
  image_url text,
  affiliate_relationship text,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.parts TO anon, authenticated;
GRANT ALL ON public.parts TO service_role;
ALTER TABLE public.parts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Parts catalog is readable" ON public.parts FOR SELECT TO anon, authenticated USING (true);
CREATE INDEX parts_category_idx ON public.parts (part_category);

CREATE TABLE public.vehicle_part_compatibility (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  vehicle_id uuid NOT NULL REFERENCES public.vehicles(id) ON DELETE CASCADE,
  part_id uuid NOT NULL REFERENCES public.parts(id) ON DELETE CASCADE,
  compatibility_type text NOT NULL,
  fitment_notes text,
  source_id uuid REFERENCES public.data_sources(id) ON DELETE SET NULL,
  confidence_status text NOT NULL DEFAULT 'not_available' CHECK (confidence_status IN ('manufacturer_verified', 'official_government_source', 'verified_third_party_source', 'community_unverified', 'not_available')),
  verified_at timestamptz,
  UNIQUE (vehicle_id, part_id, compatibility_type, source_id)
);
GRANT SELECT ON public.vehicle_part_compatibility TO anon, authenticated;
GRANT ALL ON public.vehicle_part_compatibility TO service_role;
ALTER TABLE public.vehicle_part_compatibility ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Sourced part compatibility is readable" ON public.vehicle_part_compatibility FOR SELECT TO anon, authenticated USING (true);
CREATE INDEX vehicle_part_compatibility_vehicle_idx ON public.vehicle_part_compatibility (vehicle_id);

CREATE TABLE public.maintenance_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  vehicle_id uuid NOT NULL REFERENCES public.vehicles(id) ON DELETE CASCADE,
  item_name text NOT NULL,
  interval_distance integer,
  interval_time_months integer,
  conditions text,
  instructions text,
  source_id uuid REFERENCES public.data_sources(id) ON DELETE SET NULL,
  confidence_status text NOT NULL DEFAULT 'not_available' CHECK (confidence_status IN ('manufacturer_verified', 'official_government_source', 'verified_third_party_source', 'community_unverified', 'not_available')),
  verified_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.maintenance_items TO anon, authenticated;
GRANT ALL ON public.maintenance_items TO service_role;
ALTER TABLE public.maintenance_items ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Sourced maintenance references are readable" ON public.maintenance_items FOR SELECT TO anon, authenticated USING (true);
CREATE INDEX maintenance_items_vehicle_idx ON public.maintenance_items (vehicle_id);

CREATE TABLE public.fluids (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  vehicle_id uuid NOT NULL REFERENCES public.vehicles(id) ON DELETE CASCADE,
  fluid_type text NOT NULL,
  specification text,
  capacity numeric,
  capacity_unit text,
  recommended_product_type text,
  source_id uuid REFERENCES public.data_sources(id) ON DELETE SET NULL,
  confidence_status text NOT NULL DEFAULT 'not_available' CHECK (confidence_status IN ('manufacturer_verified', 'official_government_source', 'verified_third_party_source', 'community_unverified', 'not_available')),
  verified_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.fluids TO anon, authenticated;
GRANT ALL ON public.fluids TO service_role;
ALTER TABLE public.fluids ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Sourced fluid references are readable" ON public.fluids FOR SELECT TO anon, authenticated USING (true);
CREATE INDEX fluids_vehicle_idx ON public.fluids (vehicle_id);

CREATE TABLE public.tire_specifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  vehicle_id uuid NOT NULL REFERENCES public.vehicles(id) ON DELETE CASCADE,
  tire_position text NOT NULL,
  tire_size text,
  pressure_value numeric,
  pressure_unit text,
  load_condition text,
  source_id uuid REFERENCES public.data_sources(id) ON DELETE SET NULL,
  confidence_status text NOT NULL DEFAULT 'not_available' CHECK (confidence_status IN ('manufacturer_verified', 'official_government_source', 'verified_third_party_source', 'community_unverified', 'not_available')),
  verified_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.tire_specifications TO anon, authenticated;
GRANT ALL ON public.tire_specifications TO service_role;
ALTER TABLE public.tire_specifications ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Sourced tire references are readable" ON public.tire_specifications FOR SELECT TO anon, authenticated USING (true);
CREATE INDEX tire_specifications_vehicle_idx ON public.tire_specifications (vehicle_id);

CREATE TABLE public.recalls (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  vehicle_id uuid REFERENCES public.vehicles(id) ON DELETE CASCADE,
  model_year integer NOT NULL,
  make text NOT NULL,
  model text NOT NULL,
  campaign_number text NOT NULL,
  component text,
  summary text,
  consequence text,
  remedy text,
  report_date date,
  source_url text NOT NULL,
  source_id uuid REFERENCES public.data_sources(id) ON DELETE SET NULL,
  retrieved_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (model_year, make, model, campaign_number)
);
GRANT SELECT ON public.recalls TO anon, authenticated;
GRANT ALL ON public.recalls TO service_role;
ALTER TABLE public.recalls ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Official recall records are readable" ON public.recalls FOR SELECT TO anon, authenticated USING (true);
CREATE INDEX recalls_vehicle_key_idx ON public.recalls (model_year, make, model);

CREATE TABLE public.data_import_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  source_id uuid REFERENCES public.data_sources(id) ON DELETE SET NULL,
  import_started_at timestamptz NOT NULL DEFAULT now(),
  import_completed_at timestamptz,
  records_imported integer NOT NULL DEFAULT 0,
  records_updated integer NOT NULL DEFAULT 0,
  records_failed integer NOT NULL DEFAULT 0,
  status text NOT NULL DEFAULT 'started',
  error_details text
);
GRANT SELECT, INSERT, UPDATE ON public.data_import_logs TO authenticated;
GRANT ALL ON public.data_import_logs TO service_role;
ALTER TABLE public.data_import_logs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Authenticated editors can view import logs" ON public.data_import_logs FOR SELECT TO authenticated USING (true);

CREATE TABLE public.articles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text NOT NULL UNIQUE,
  content text NOT NULL DEFAULT '',
  category text NOT NULL,
  related_vehicle_id uuid REFERENCES public.vehicles(id) ON DELETE SET NULL,
  author text,
  published_at timestamptz,
  updated_at timestamptz NOT NULL DEFAULT now(),
  status text NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'review', 'published'))
);
GRANT SELECT ON public.articles TO anon, authenticated;
GRANT ALL ON public.articles TO service_role;
ALTER TABLE public.articles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Published guides are readable" ON public.articles FOR SELECT TO anon, authenticated USING (status = 'published');
CREATE INDEX articles_published_category_idx ON public.articles (category, published_at DESC) WHERE status = 'published';

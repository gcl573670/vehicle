export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.18"
  }
  public: {
    Tables: {
      articles: {
        Row: {
          author: string | null
          category: string
          content: string
          id: string
          published_at: string | null
          related_vehicle_id: string | null
          slug: string
          status: string
          title: string
          updated_at: string
        }
        Insert: {
          author?: string | null
          category: string
          content?: string
          id?: string
          published_at?: string | null
          related_vehicle_id?: string | null
          slug: string
          status?: string
          title: string
          updated_at?: string
        }
        Update: {
          author?: string | null
          category?: string
          content?: string
          id?: string
          published_at?: string | null
          related_vehicle_id?: string | null
          slug?: string
          status?: string
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "articles_related_vehicle_id_fkey"
            columns: ["related_vehicle_id"]
            isOneToOne: false
            referencedRelation: "vehicles"
            referencedColumns: ["id"]
          },
        ]
      }
      data_import_logs: {
        Row: {
          error_details: string | null
          id: string
          import_completed_at: string | null
          import_started_at: string
          records_failed: number
          records_imported: number
          records_updated: number
          source_id: string | null
          status: string
        }
        Insert: {
          error_details?: string | null
          id?: string
          import_completed_at?: string | null
          import_started_at?: string
          records_failed?: number
          records_imported?: number
          records_updated?: number
          source_id?: string | null
          status?: string
        }
        Update: {
          error_details?: string | null
          id?: string
          import_completed_at?: string | null
          import_started_at?: string
          records_failed?: number
          records_imported?: number
          records_updated?: number
          source_id?: string | null
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "data_import_logs_source_id_fkey"
            columns: ["source_id"]
            isOneToOne: false
            referencedRelation: "data_sources"
            referencedColumns: ["id"]
          },
        ]
      }
      data_sources: {
        Row: {
          attribution_required: boolean
          created_at: string
          enabled: boolean
          id: string
          last_checked_at: string | null
          license: string | null
          source_name: string
          source_type: string
          source_url: string
          terms_url: string | null
        }
        Insert: {
          attribution_required?: boolean
          created_at?: string
          enabled?: boolean
          id?: string
          last_checked_at?: string | null
          license?: string | null
          source_name: string
          source_type: string
          source_url: string
          terms_url?: string | null
        }
        Update: {
          attribution_required?: boolean
          created_at?: string
          enabled?: boolean
          id?: string
          last_checked_at?: string | null
          license?: string | null
          source_name?: string
          source_type?: string
          source_url?: string
          terms_url?: string | null
        }
        Relationships: []
      }
      engines: {
        Row: {
          aspiration: string | null
          created_at: string
          cylinders: number | null
          displacement: number | null
          engine_code: string | null
          fuel_type: string | null
          horsepower: number | null
          horsepower_unit: string | null
          id: string
          manufacturer: string | null
          torque: number | null
          torque_unit: string | null
        }
        Insert: {
          aspiration?: string | null
          created_at?: string
          cylinders?: number | null
          displacement?: number | null
          engine_code?: string | null
          fuel_type?: string | null
          horsepower?: number | null
          horsepower_unit?: string | null
          id?: string
          manufacturer?: string | null
          torque?: number | null
          torque_unit?: string | null
        }
        Update: {
          aspiration?: string | null
          created_at?: string
          cylinders?: number | null
          displacement?: number | null
          engine_code?: string | null
          fuel_type?: string | null
          horsepower?: number | null
          horsepower_unit?: string | null
          id?: string
          manufacturer?: string | null
          torque?: number | null
          torque_unit?: string | null
        }
        Relationships: []
      }
      fluids: {
        Row: {
          capacity: number | null
          capacity_unit: string | null
          confidence_status: string
          created_at: string
          fluid_type: string
          id: string
          recommended_product_type: string | null
          source_id: string | null
          specification: string | null
          vehicle_id: string
          verified_at: string | null
        }
        Insert: {
          capacity?: number | null
          capacity_unit?: string | null
          confidence_status?: string
          created_at?: string
          fluid_type: string
          id?: string
          recommended_product_type?: string | null
          source_id?: string | null
          specification?: string | null
          vehicle_id: string
          verified_at?: string | null
        }
        Update: {
          capacity?: number | null
          capacity_unit?: string | null
          confidence_status?: string
          created_at?: string
          fluid_type?: string
          id?: string
          recommended_product_type?: string | null
          source_id?: string | null
          specification?: string | null
          vehicle_id?: string
          verified_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fluids_source_id_fkey"
            columns: ["source_id"]
            isOneToOne: false
            referencedRelation: "data_sources"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fluids_vehicle_id_fkey"
            columns: ["vehicle_id"]
            isOneToOne: false
            referencedRelation: "vehicles"
            referencedColumns: ["id"]
          },
        ]
      }
      maintenance_items: {
        Row: {
          conditions: string | null
          confidence_status: string
          created_at: string
          id: string
          instructions: string | null
          interval_distance: number | null
          interval_time_months: number | null
          item_name: string
          source_id: string | null
          vehicle_id: string
          verified_at: string | null
        }
        Insert: {
          conditions?: string | null
          confidence_status?: string
          created_at?: string
          id?: string
          instructions?: string | null
          interval_distance?: number | null
          interval_time_months?: number | null
          item_name: string
          source_id?: string | null
          vehicle_id: string
          verified_at?: string | null
        }
        Update: {
          conditions?: string | null
          confidence_status?: string
          created_at?: string
          id?: string
          instructions?: string | null
          interval_distance?: number | null
          interval_time_months?: number | null
          item_name?: string
          source_id?: string | null
          vehicle_id?: string
          verified_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "maintenance_items_source_id_fkey"
            columns: ["source_id"]
            isOneToOne: false
            referencedRelation: "data_sources"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "maintenance_items_vehicle_id_fkey"
            columns: ["vehicle_id"]
            isOneToOne: false
            referencedRelation: "vehicles"
            referencedColumns: ["id"]
          },
        ]
      }
      parts: {
        Row: {
          affiliate_relationship: string | null
          created_at: string
          description: string | null
          external_url: string | null
          id: string
          image_url: string | null
          manufacturer: string | null
          part_category: string
          part_number: string | null
          product_name: string
          specifications: Json
        }
        Insert: {
          affiliate_relationship?: string | null
          created_at?: string
          description?: string | null
          external_url?: string | null
          id?: string
          image_url?: string | null
          manufacturer?: string | null
          part_category: string
          part_number?: string | null
          product_name: string
          specifications?: Json
        }
        Update: {
          affiliate_relationship?: string | null
          created_at?: string
          description?: string | null
          external_url?: string | null
          id?: string
          image_url?: string | null
          manufacturer?: string | null
          part_category?: string
          part_number?: string | null
          product_name?: string
          specifications?: Json
        }
        Relationships: []
      }
      recalls: {
        Row: {
          campaign_number: string
          component: string | null
          consequence: string | null
          id: string
          make: string
          model: string
          model_year: number
          remedy: string | null
          report_date: string | null
          retrieved_at: string
          source_id: string | null
          source_url: string
          summary: string | null
          vehicle_id: string | null
        }
        Insert: {
          campaign_number: string
          component?: string | null
          consequence?: string | null
          id?: string
          make: string
          model: string
          model_year: number
          remedy?: string | null
          report_date?: string | null
          retrieved_at?: string
          source_id?: string | null
          source_url: string
          summary?: string | null
          vehicle_id?: string | null
        }
        Update: {
          campaign_number?: string
          component?: string | null
          consequence?: string | null
          id?: string
          make?: string
          model?: string
          model_year?: number
          remedy?: string | null
          report_date?: string | null
          retrieved_at?: string
          source_id?: string | null
          source_url?: string
          summary?: string | null
          vehicle_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "recalls_source_id_fkey"
            columns: ["source_id"]
            isOneToOne: false
            referencedRelation: "data_sources"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "recalls_vehicle_id_fkey"
            columns: ["vehicle_id"]
            isOneToOne: false
            referencedRelation: "vehicles"
            referencedColumns: ["id"]
          },
        ]
      }
      tire_specifications: {
        Row: {
          confidence_status: string
          created_at: string
          id: string
          load_condition: string | null
          pressure_unit: string | null
          pressure_value: number | null
          source_id: string | null
          tire_position: string
          tire_size: string | null
          vehicle_id: string
          verified_at: string | null
        }
        Insert: {
          confidence_status?: string
          created_at?: string
          id?: string
          load_condition?: string | null
          pressure_unit?: string | null
          pressure_value?: number | null
          source_id?: string | null
          tire_position: string
          tire_size?: string | null
          vehicle_id: string
          verified_at?: string | null
        }
        Update: {
          confidence_status?: string
          created_at?: string
          id?: string
          load_condition?: string | null
          pressure_unit?: string | null
          pressure_value?: number | null
          source_id?: string | null
          tire_position?: string
          tire_size?: string | null
          vehicle_id?: string
          verified_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "tire_specifications_source_id_fkey"
            columns: ["source_id"]
            isOneToOne: false
            referencedRelation: "data_sources"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tire_specifications_vehicle_id_fkey"
            columns: ["vehicle_id"]
            isOneToOne: false
            referencedRelation: "vehicles"
            referencedColumns: ["id"]
          },
        ]
      }
      vehicle_part_compatibility: {
        Row: {
          compatibility_type: string
          confidence_status: string
          fitment_notes: string | null
          id: string
          part_id: string
          source_id: string | null
          vehicle_id: string
          verified_at: string | null
        }
        Insert: {
          compatibility_type: string
          confidence_status?: string
          fitment_notes?: string | null
          id?: string
          part_id: string
          source_id?: string | null
          vehicle_id: string
          verified_at?: string | null
        }
        Update: {
          compatibility_type?: string
          confidence_status?: string
          fitment_notes?: string | null
          id?: string
          part_id?: string
          source_id?: string | null
          vehicle_id?: string
          verified_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "vehicle_part_compatibility_part_id_fkey"
            columns: ["part_id"]
            isOneToOne: false
            referencedRelation: "parts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "vehicle_part_compatibility_source_id_fkey"
            columns: ["source_id"]
            isOneToOne: false
            referencedRelation: "data_sources"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "vehicle_part_compatibility_vehicle_id_fkey"
            columns: ["vehicle_id"]
            isOneToOne: false
            referencedRelation: "vehicles"
            referencedColumns: ["id"]
          },
        ]
      }
      vehicle_specifications: {
        Row: {
          confidence_status: string
          created_at: string
          id: string
          market: string
          notes: string | null
          source_id: string | null
          specification_category: string
          specification_name: string
          unit: string | null
          value: string | null
          vehicle_id: string
          verified_at: string | null
        }
        Insert: {
          confidence_status?: string
          created_at?: string
          id?: string
          market: string
          notes?: string | null
          source_id?: string | null
          specification_category: string
          specification_name: string
          unit?: string | null
          value?: string | null
          vehicle_id: string
          verified_at?: string | null
        }
        Update: {
          confidence_status?: string
          created_at?: string
          id?: string
          market?: string
          notes?: string | null
          source_id?: string | null
          specification_category?: string
          specification_name?: string
          unit?: string | null
          value?: string | null
          vehicle_id?: string
          verified_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "vehicle_specifications_source_id_fkey"
            columns: ["source_id"]
            isOneToOne: false
            referencedRelation: "data_sources"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "vehicle_specifications_vehicle_id_fkey"
            columns: ["vehicle_id"]
            isOneToOne: false
            referencedRelation: "vehicles"
            referencedColumns: ["id"]
          },
        ]
      }
      vehicles: {
        Row: {
          body_style: string | null
          created_at: string
          drivetrain: string | null
          engine_id: string | null
          external_source_ids: Json
          fuel_type: string | null
          generation: string | null
          id: string
          make: string
          market: string
          model: string
          slug: string
          transmission: string | null
          trim: string | null
          updated_at: string
          vehicle_type: string | null
          year: number
        }
        Insert: {
          body_style?: string | null
          created_at?: string
          drivetrain?: string | null
          engine_id?: string | null
          external_source_ids?: Json
          fuel_type?: string | null
          generation?: string | null
          id?: string
          make: string
          market?: string
          model: string
          slug: string
          transmission?: string | null
          trim?: string | null
          updated_at?: string
          vehicle_type?: string | null
          year: number
        }
        Update: {
          body_style?: string | null
          created_at?: string
          drivetrain?: string | null
          engine_id?: string | null
          external_source_ids?: Json
          fuel_type?: string | null
          generation?: string | null
          id?: string
          make?: string
          market?: string
          model?: string
          slug?: string
          transmission?: string | null
          trim?: string | null
          updated_at?: string
          vehicle_type?: string | null
          year?: number
        }
        Relationships: [
          {
            foreignKeyName: "vehicles_engine_id_fkey"
            columns: ["engine_id"]
            isOneToOne: false
            referencedRelation: "engines"
            referencedColumns: ["id"]
          },
        ]
      }
      user_profiles: {
        Row: {
          created_at: string
          email: string
          id: string
          preferred_market: string
          preferred_units: Json
          selected_vehicle_id: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          preferred_market?: string
          preferred_units?: Json
          selected_vehicle_id?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          preferred_market?: string
          preferred_units?: Json
          selected_vehicle_id?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_profiles_selected_vehicle_id_fkey"
            columns: ["selected_vehicle_id"]
            isOneToOne: false
            referencedRelation: "vehicles"
            referencedColumns: ["id"]
          },
        ]
      }
      saved_vehicles: {
        Row: {
          created_at: string
          id: string
          is_primary: boolean
          nickname: string | null
          user_id: string
          vehicle_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          is_primary?: boolean
          nickname?: string | null
          user_id: string
          vehicle_id: string
        }
        Update: {
          created_at?: string
          id?: string
          is_primary?: boolean
          nickname?: string | null
          user_id?: string
          vehicle_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "saved_vehicles_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "saved_vehicles_vehicle_id_fkey"
            columns: ["vehicle_id"]
            isOneToOne: false
            referencedRelation: "vehicles"
            referencedColumns: ["id"]
          },
        ]
      }
      user_maintenance_history: {
        Row: {
          created_at: string
          id: string
          item_name: string
          maintenance_item_id: string | null
          mileage_at_service: number
          notes: string | null
          service_date: string
          user_id: string
          vehicle_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          item_name: string
          maintenance_item_id?: string | null
          mileage_at_service: number
          notes?: string | null
          service_date: string
          user_id: string
          vehicle_id: string
        }
        Update: {
          created_at?: string
          id?: string
          item_name?: string
          maintenance_item_id?: string | null
          mileage_at_service?: number
          notes?: string | null
          service_date?: string
          user_id?: string
          vehicle_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_maintenance_history_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_maintenance_history_vehicle_id_fkey"
            columns: ["vehicle_id"]
            isOneToOne: false
            referencedRelation: "vehicles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_maintenance_history_maintenance_item_id_fkey"
            columns: ["maintenance_item_id"]
            isOneToOne: false
            referencedRelation: "maintenance_items"
            referencedColumns: ["id"]
          },
        ]
      }
      saved_comparisons: {
        Row: {
          created_at: string
          id: string
          name: string
          updated_at: string
          user_id: string | null
          vehicle_ids: string[]
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
          updated_at?: string
          user_id?: string | null
          vehicle_ids?: string[]
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
          updated_at?: string
          user_id?: string | null
          vehicle_ids?: string[]
        }
        Relationships: [
          {
            foreignKeyName: "saved_comparisons_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      vehicle_edits: {
        Row: {
          changed_at: string
          changed_by: string | null
          field_name: string
          id: string
          new_value: string | null
          previous_value: string | null
          reason: string | null
          record_id: string
          source: string | null
          table_name: string
        }
        Insert: {
          changed_at?: string
          changed_by?: string | null
          field_name: string
          id?: string
          new_value?: string | null
          previous_value?: string | null
          reason?: string | null
          record_id: string
          source?: string | null
          table_name: string
        }
        Update: {
          changed_at?: string
          changed_by?: string | null
          field_name?: string
          id?: string
          new_value?: string | null
          previous_value?: string | null
          reason?: string | null
          record_id?: string
          source?: string | null
          table_name?: string
        }
        Relationships: [
          {
            foreignKeyName: "vehicle_edits_changed_by_fkey"
            columns: ["changed_by"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      affiliate_links: {
        Row: {
          created_at: string
          external_url: string
          id: string
          is_active: boolean
          part_id: string | null
          retailer_name: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          external_url: string
          id?: string
          is_active?: boolean
          part_id?: string | null
          retailer_name: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          external_url?: string
          id?: string
          is_active?: boolean
          part_id?: string | null
          retailer_name?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "affiliate_links_part_id_fkey"
            columns: ["part_id"]
            isOneToOne: false
            referencedRelation: "parts"
            referencedColumns: ["id"]
          },
        ]
      }
      api_settings: {
        Row: {
          created_at: string
          id: string
          is_enabled: boolean
          provider: string
          setting_key: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          is_enabled?: boolean
          provider: string
          setting_key: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          is_enabled?: boolean
          provider?: string
          setting_key?: string
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const

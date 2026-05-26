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
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      days: {
        Row: {
          actual_spent: number
          created_at: string
          date: string
          id: number
          planned_budget: number
          status: string
          updated_at: string
          week_id: number
        }
        Insert: {
          actual_spent?: number
          created_at?: string
          date: string
          id?: number
          planned_budget: number
          status?: string
          updated_at?: string
          week_id: number
        }
        Update: {
          actual_spent?: number
          created_at?: string
          date?: string
          id?: number
          planned_budget?: number
          status?: string
          updated_at?: string
          week_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "days_week_id_fkey"
            columns: ["week_id"]
            isOneToOne: false
            referencedRelation: "weeks"
            referencedColumns: ["id"]
          },
        ]
      }
      transactions: {
        Row: {
          amount: number
          category: string | null
          created_at: string
          description: string | null
          id: number
          income_destination: string | null
          transaction_date: string
          type: string
          updated_at: string
          week_id: number
        }
        Insert: {
          amount: number
          category?: string | null
          created_at?: string
          description?: string | null
          id?: number
          income_destination?: string | null
          transaction_date: string
          type: string
          updated_at?: string
          week_id: number
        }
        Update: {
          amount?: number
          category?: string | null
          created_at?: string
          description?: string | null
          id?: number
          income_destination?: string | null
          transaction_date?: string
          type?: string
          updated_at?: string
          week_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "transactions_week_id_fkey"
            columns: ["week_id"]
            isOneToOne: false
            referencedRelation: "weeks"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          created_at: string
          full_name: string | null
          id: string
          reserve_balance: number
          updated_at: string
          week_starts_on: number
        }
        Insert: {
          created_at?: string
          full_name?: string | null
          id: string
          reserve_balance?: number
          updated_at?: string
          week_starts_on?: number
        }
        Update: {
          created_at?: string
          full_name?: string | null
          id?: string
          reserve_balance?: number
          updated_at?: string
          week_starts_on?: number
        }
        Relationships: []
      }
      weeks: {
        Row: {
          created_at: string | null
          end_date: string
          extra_budget: number
          id: number
          initial_income: number
          reserve_goal: number
          start_date: string
          status: string
          total_spent: number
          updated_at: string | null
          user_id: string
          weekly_budget: number
        }
        Insert: {
          created_at?: string | null
          end_date: string
          extra_budget?: number
          id?: number
          initial_income: number
          reserve_goal: number
          start_date: string
          status?: string
          total_spent?: number
          updated_at?: string | null
          user_id: string
          weekly_budget: number
        }
        Update: {
          created_at?: string | null
          end_date?: string
          extra_budget?: number
          id?: number
          initial_income?: number
          reserve_goal?: number
          start_date?: string
          status?: string
          total_spent?: number
          updated_at?: string | null
          user_id?: string
          weekly_budget?: number
        }
        Relationships: [
          {
            foreignKeyName: "weeks_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      add_budget: {
        Args: { p_amount: number; p_week_id: number }
        Returns: undefined
      }
      add_expense: {
        Args: { p_amount: number; p_day_id: number }
        Returns: undefined
      }
      add_reserve: { Args: { p_amount: number }; Returns: undefined }
      close_day: { Args: { p_day_id: number }; Returns: undefined }
      close_week: { Args: { p_week_id: number }; Returns: undefined }
      create_transaction: {
        Args: {
          p_amount: number
          p_category: string
          p_description: string
          p_income_destination: string
          p_type: string
        }
        Returns: {
          amount: number
          category: string | null
          created_at: string
          description: string | null
          id: number
          income_destination: string | null
          transaction_date: string
          type: string
          updated_at: string
          week_id: number
        }
        SetofOptions: {
          from: "*"
          to: "transactions"
          isOneToOne: true
          isSetofReturn: false
        }
      }
      create_week: {
        Args: {
          p_initial_income: number
          p_reserve_goal: number
          p_start_date: string
        }
        Returns: {
          created_at: string | null
          end_date: string
          extra_budget: number
          id: number
          initial_income: number
          reserve_goal: number
          start_date: string
          status: string
          total_spent: number
          updated_at: string | null
          user_id: string
          weekly_budget: number
        }
        SetofOptions: {
          from: "*"
          to: "weeks"
          isOneToOne: true
          isSetofReturn: false
        }
      }
      rebalance_week: { Args: { p_week_id: number }; Returns: undefined }
      recalculate_week: { Args: { p_week_id: number }; Returns: undefined }
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
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
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
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
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
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
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
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
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
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
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

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      assinatura: {
        Row: {
          data_expiracao: string | null
          data_fim: string | null
          data_inicio: string
          id_assinatura: number
          id_empresa: string
          id_plano: number
          status_assinatura: Database["public"]["Enums"]["status_assinatura"]
        }
        Insert: {
          data_expiracao?: string | null
          data_fim?: string | null
          data_inicio?: string
          id_assinatura?: number
          id_empresa: string
          id_plano: number
          status_assinatura: Database["public"]["Enums"]["status_assinatura"]
        }
        Update: {
          data_expiracao?: string | null
          data_fim?: string | null
          data_inicio?: string
          id_assinatura?: number
          id_empresa?: string
          id_plano?: number
          status_assinatura?: Database["public"]["Enums"]["status_assinatura"]
        }
        Relationships: [
          {
            foreignKeyName: "assinatura_id_empresa_fkey"
            columns: ["id_empresa"]
            isOneToOne: false
            referencedRelation: "empresa"
            referencedColumns: ["id_cnpj"]
          },
          {
            foreignKeyName: "assinatura_id_empresa_fkey"
            columns: ["id_empresa"]
            isOneToOne: false
            referencedRelation: "empresa_representante_assinatura_plano"
            referencedColumns: ["id_cnpj"]
          },
          {
            foreignKeyName: "assinatura_id_plano_fkey"
            columns: ["id_plano"]
            isOneToOne: false
            referencedRelation: "plano"
            referencedColumns: ["id_plano"]
          }
        ]
      }
      cargo: {
        Row: {
          id_cargo: number
          id_empresa: string
          nome: string
        }
        Insert: {
          id_cargo?: number
          id_empresa: string
          nome: string
        }
        Update: {
          id_cargo?: number
          id_empresa?: string
          nome?: string
        }
        Relationships: [
          {
            foreignKeyName: "cargo_id_empresa_fkey"
            columns: ["id_empresa"]
            isOneToOne: false
            referencedRelation: "empresa"
            referencedColumns: ["id_cnpj"]
          },
          {
            foreignKeyName: "cargo_id_empresa_fkey"
            columns: ["id_empresa"]
            isOneToOne: false
            referencedRelation: "empresa_representante_assinatura_plano"
            referencedColumns: ["id_cnpj"]
          }
        ]
      }
      conteudo: {
        Row: {
          data_atualizacao: string | null
          data_inclusao: string
          descricao: string
          id_conteudo: number
          id_empresa: string
          id_enfermidade: number
          id_usuario: string | null
          observacao: string | null
          subtitulo: string | null
          titulo: string
        }
        Insert: {
          data_atualizacao?: string | null
          data_inclusao?: string
          descricao: string
          id_conteudo?: number
          id_empresa: string
          id_enfermidade: number
          id_usuario?: string | null
          observacao?: string | null
          subtitulo?: string | null
          titulo: string
        }
        Update: {
          data_atualizacao?: string | null
          data_inclusao?: string
          descricao?: string
          id_conteudo?: number
          id_empresa?: string
          id_enfermidade?: number
          id_usuario?: string | null
          observacao?: string | null
          subtitulo?: string | null
          titulo?: string
        }
        Relationships: [
          {
            foreignKeyName: "conteudo_id_empresa_fkey"
            columns: ["id_empresa"]
            isOneToOne: false
            referencedRelation: "empresa"
            referencedColumns: ["id_cnpj"]
          },
          {
            foreignKeyName: "conteudo_id_empresa_fkey"
            columns: ["id_empresa"]
            isOneToOne: false
            referencedRelation: "empresa_representante_assinatura_plano"
            referencedColumns: ["id_cnpj"]
          },
          {
            foreignKeyName: "conteudo_id_enfermidade_fkey"
            columns: ["id_enfermidade"]
            isOneToOne: false
            referencedRelation: "enfermidade"
            referencedColumns: ["id_enfermidade"]
          },
          {
            foreignKeyName: "conteudo_id_usuario_fkey"
            columns: ["id_usuario"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id_usuario"]
          },
          {
            foreignKeyName: "conteudo_id_usuario_fkey"
            columns: ["id_usuario"]
            isOneToOne: false
            referencedRelation: "usuario_empresa_assinaturra"
            referencedColumns: ["id_usuario"]
          }
        ]
      }
      empresa: {
        Row: {
          cep: string
          created_at: string
          data_abertura: string
          ddd: number
          email: string
          id_cnpj: string
          municipio: string
          nome_fantasia: string
          razao_social: string
          telefone: string
          uf: string
        }
        Insert: {
          cep: string
          created_at?: string
          data_abertura: string
          ddd: number
          email: string
          id_cnpj: string
          municipio: string
          nome_fantasia: string
          razao_social: string
          telefone: string
          uf: string
        }
        Update: {
          cep?: string
          created_at?: string
          data_abertura?: string
          ddd?: number
          email?: string
          id_cnpj?: string
          municipio?: string
          nome_fantasia?: string
          razao_social?: string
          telefone?: string
          uf?: string
        }
        Relationships: []
      }
      enfermidade: {
        Row: {
          data_atualizacao: string | null
          data_inclusao: string
          descricao: string
          id_empresa: string
          id_enfermidade: number
          id_usuario: string | null
          nome: string
        }
        Insert: {
          data_atualizacao?: string | null
          data_inclusao?: string
          descricao: string
          id_empresa: string
          id_enfermidade?: number
          id_usuario?: string | null
          nome: string
        }
        Update: {
          data_atualizacao?: string | null
          data_inclusao?: string
          descricao?: string
          id_empresa?: string
          id_enfermidade?: number
          id_usuario?: string | null
          nome?: string
        }
        Relationships: [
          {
            foreignKeyName: "enfermidade_id_empresa_fkey"
            columns: ["id_empresa"]
            isOneToOne: false
            referencedRelation: "empresa"
            referencedColumns: ["id_cnpj"]
          },
          {
            foreignKeyName: "enfermidade_id_empresa_fkey"
            columns: ["id_empresa"]
            isOneToOne: false
            referencedRelation: "empresa_representante_assinatura_plano"
            referencedColumns: ["id_cnpj"]
          },
          {
            foreignKeyName: "enfermidade_id_usuario_fkey"
            columns: ["id_usuario"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id_usuario"]
          },
          {
            foreignKeyName: "enfermidade_id_usuario_fkey"
            columns: ["id_usuario"]
            isOneToOne: false
            referencedRelation: "usuario_empresa_assinaturra"
            referencedColumns: ["id_usuario"]
          }
        ]
      }
      exercicio: {
        Row: {
          data_atualizacao: string | null
          data_inclusao: string
          descricao: string
          id_empresa: string
          id_enfermidade: number
          id_exercicio: number
          id_usuario: string
          imagem_base64: string
          instrucoes: string
          observacoes: string
          precaucoes: string
          titulo: string
        }
        Insert: {
          data_atualizacao?: string | null
          data_inclusao?: string
          descricao: string
          id_empresa: string
          id_enfermidade: number
          id_exercicio?: number
          id_usuario: string
          imagem_base64: string
          instrucoes: string
          observacoes: string
          precaucoes: string
          titulo: string
        }
        Update: {
          data_atualizacao?: string | null
          data_inclusao?: string
          descricao?: string
          id_empresa?: string
          id_enfermidade?: number
          id_exercicio?: number
          id_usuario?: string
          imagem_base64?: string
          instrucoes?: string
          observacoes?: string
          precaucoes?: string
          titulo?: string
        }
        Relationships: [
          {
            foreignKeyName: "exercicio_id_empresa_fkey"
            columns: ["id_empresa"]
            isOneToOne: false
            referencedRelation: "empresa"
            referencedColumns: ["id_cnpj"]
          },
          {
            foreignKeyName: "exercicio_id_empresa_fkey"
            columns: ["id_empresa"]
            isOneToOne: false
            referencedRelation: "empresa_representante_assinatura_plano"
            referencedColumns: ["id_cnpj"]
          },
          {
            foreignKeyName: "exercicio_id_enfermidade_fkey"
            columns: ["id_enfermidade"]
            isOneToOne: false
            referencedRelation: "enfermidade"
            referencedColumns: ["id_enfermidade"]
          }
        ]
      }
      notificacao: {
        Row: {
          enviado: boolean
          horario: string
          id_exercicio: number
          id_notificacao: number
          id_rotina: number
          mensagem: string
          titulo: string
        }
        Insert: {
          enviado: boolean
          horario: string
          id_exercicio: number
          id_notificacao?: number
          id_rotina: number
          mensagem: string
          titulo: string
        }
        Update: {
          enviado?: boolean
          horario?: string
          id_exercicio?: number
          id_notificacao?: number
          id_rotina?: number
          mensagem?: string
          titulo?: string
        }
        Relationships: [
          {
            foreignKeyName: "notificacao_id_exercicio_fkey"
            columns: ["id_exercicio"]
            isOneToOne: false
            referencedRelation: "exercicio"
            referencedColumns: ["id_exercicio"]
          },
          {
            foreignKeyName: "notificacao_id_rotina_fkey"
            columns: ["id_rotina"]
            isOneToOne: false
            referencedRelation: "rotina"
            referencedColumns: ["id_rotina"]
          }
        ]
      }
      pagamento: {
        Row: {
          data_abertura: string | null
          data_aprovacao: string | null
          data_pago: string | null
          data_vencimento: string | null
          id_assinatura: number
          id_pagamento: number
          status_pagamento: Database["public"]["Enums"]["status_pagamento"]
          valor_pagamento: number
        }
        Insert: {
          data_abertura?: string | null
          data_aprovacao?: string | null
          data_pago?: string | null
          data_vencimento?: string | null
          id_assinatura: number
          id_pagamento?: number
          status_pagamento: Database["public"]["Enums"]["status_pagamento"]
          valor_pagamento: number
        }
        Update: {
          data_abertura?: string | null
          data_aprovacao?: string | null
          data_pago?: string | null
          data_vencimento?: string | null
          id_assinatura?: number
          id_pagamento?: number
          status_pagamento?: Database["public"]["Enums"]["status_pagamento"]
          valor_pagamento?: number
        }
        Relationships: [
          {
            foreignKeyName: "pagamento_id_assinatura_fkey"
            columns: ["id_assinatura"]
            isOneToOne: false
            referencedRelation: "assinatura"
            referencedColumns: ["id_assinatura"]
          }
        ]
      }
      plano: {
        Row: {
          ativo: boolean
          data_criacao: string
          data_fim: string | null
          descricao: string
          id_plano: number
          periodicidade: string
          qtd_max_usuarios: number
          titulo: string
          valor_plano: number
        }
        Insert: {
          ativo: boolean
          data_criacao?: string
          data_fim?: string | null
          descricao: string
          id_plano?: number
          periodicidade: string
          qtd_max_usuarios: number
          titulo: string
          valor_plano: number
        }
        Update: {
          ativo?: boolean
          data_criacao?: string
          data_fim?: string | null
          descricao?: string
          id_plano?: number
          periodicidade?: string
          qtd_max_usuarios?: number
          titulo?: string
          valor_plano?: number
        }
        Relationships: []
      }
      profiles: {
        Row: {
          born_date: string | null
          cpf: string
          email: string
          first_name: string
          id_cargo: number | null
          id_empresa: string | null
          id_tipo_usuario: Database["public"]["Enums"]["tipo_usuario"]
          id_usuario: string
          last_name: string
          updated_at: string | null
        }
        Insert: {
          born_date?: string | null
          cpf: string
          email?: string | null
          first_name: string
          id_cargo?: number | null
          id_empresa?: string | null
          id_tipo_usuario?: Database["public"]["Enums"]["tipo_usuario"]
          id_usuario?: string
          last_name: string
          updated_at?: string | null
        }
        Update: {
          born_date?: string | null
          cpf?: string
          email?: string | null
          first_name?: string
          id_cargo?: number | null
          id_empresa?: string | null
          id_tipo_usuario?: Database["public"]["Enums"]["tipo_usuario"]
          id_usuario?: string
          last_name?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_id_cargo_fkey"
            columns: ["id_cargo"]
            isOneToOne: false
            referencedRelation: "cargo"
            referencedColumns: ["id_cargo"]
          },
          {
            foreignKeyName: "profiles_id_empresa_fkey"
            columns: ["id_empresa"]
            isOneToOne: false
            referencedRelation: "empresa"
            referencedColumns: ["id_cnpj"]
          },
          {
            foreignKeyName: "profiles_id_empresa_fkey"
            columns: ["id_empresa"]
            isOneToOne: false
            referencedRelation: "empresa_representante_assinatura_plano"
            referencedColumns: ["id_cnpj"]
          },
          {
            foreignKeyName: "profiles_id_usuario_fkey"
            columns: ["id_usuario"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      rotina: {
        Row: {
          ativa: boolean
          descricao: string | null
          dias_semana: Database["public"]["Enums"]["dia_semana"][]
          hora_fim: string
          hora_inicio: string
          id_rotina: number
          id_usuario: string
          intervalo: string
          titulo: string
        }
        Insert: {
          ativa: boolean
          descricao?: string | null
          dias_semana: Database["public"]["Enums"]["dia_semana"][]
          hora_fim: string
          hora_inicio: string
          id_rotina?: number
          id_usuario: string
          intervalo: string
          titulo: string
        }
        Update: {
          ativa?: boolean
          descricao?: string | null
          dias_semana?: Database["public"]["Enums"]["dia_semana"][]
          hora_fim?: string
          hora_inicio?: string
          id_rotina?: number
          id_usuario?: string
          intervalo?: string
          titulo?: string
        }
        Relationships: []
      }
      rotina_exercicio: {
        Row: {
          id_exercicio: number
          id_rotina: number
          id_rotina_exercicio: number
        }
        Insert: {
          id_exercicio: number
          id_rotina: number
          id_rotina_exercicio?: number
        }
        Update: {
          id_exercicio?: number
          id_rotina?: number
          id_rotina_exercicio?: number
        }
        Relationships: [
          {
            foreignKeyName: "rotina_exercicio_id_exercicio_fkey"
            columns: ["id_exercicio"]
            isOneToOne: false
            referencedRelation: "exercicio"
            referencedColumns: ["id_exercicio"]
          },
          {
            foreignKeyName: "rotina_exercicio_id_rotina_fkey"
            columns: ["id_rotina"]
            isOneToOne: false
            referencedRelation: "rotina"
            referencedColumns: ["id_rotina"]
          }
        ]
      }
      usuario_empresa: {
        Row: {
          autorizado: boolean
          email: string
          id_cargo: number
          id_empresa: string
          id_usuario: number
          primeiro_nome: string
          tipo: Database["public"]["Enums"]["tipo_usuario"]
          ultimo_nome: string
        }
        Insert: {
          autorizado: boolean
          email: string
          id_cargo: number
          id_empresa: string
          id_usuario?: number
          primeiro_nome: string
          tipo: Database["public"]["Enums"]["tipo_usuario"]
          ultimo_nome: string
        }
        Update: {
          autorizado?: boolean
          email?: string
          id_cargo?: number
          id_empresa?: string
          id_usuario?: number
          primeiro_nome?: string
          tipo?: Database["public"]["Enums"]["tipo_usuario"]
          ultimo_nome?: string
        }
        Relationships: [
          {
            foreignKeyName: "usuario_empresa_id_cargo_fkey"
            columns: ["id_cargo"]
            isOneToOne: false
            referencedRelation: "cargo"
            referencedColumns: ["id_cargo"]
          },
          {
            foreignKeyName: "usuario_empresa_id_empresa_fkey"
            columns: ["id_empresa"]
            isOneToOne: false
            referencedRelation: "empresa"
            referencedColumns: ["id_cnpj"]
          },
          {
            foreignKeyName: "usuario_empresa_id_empresa_fkey"
            columns: ["id_empresa"]
            isOneToOne: false
            referencedRelation: "empresa_representante_assinatura_plano"
            referencedColumns: ["id_cnpj"]
          }
        ]
      }
    }
    Views: {
      empresa_representante_assinatura_plano: {
        Row: {
          assinatura: Json | null
          cep: string | null
          created_at: string | null
          data_abertura: string | null
          ddd: number | null
          email: string | null
          id_cnpj: string | null
          municipio: string | null
          nome_fantasia: string | null
          profiles: Json | null
          razao_social: string | null
          telefone: string | null
          uf: string | null
        }
        Relationships: []
      }
      notificacoes_ativas: {
        Row: {
          enviado: boolean | null
          exercicio: Json | null
          horario: string | null
          id_exercicio: number | null
          id_notificacao: number | null
          id_rotina: number | null
          id_usuario: string | null
          mensagem: string | null
          titulo: string | null
        }
        Relationships: [
          {
            foreignKeyName: "notificacao_id_exercicio_fkey"
            columns: ["id_exercicio"]
            isOneToOne: false
            referencedRelation: "exercicio"
            referencedColumns: ["id_exercicio"]
          },
          {
            foreignKeyName: "notificacao_id_rotina_fkey"
            columns: ["id_rotina"]
            isOneToOne: false
            referencedRelation: "rotina"
            referencedColumns: ["id_rotina"]
          }
        ]
      }
      pagamento_assinatura_empresa: {
        Row: {
          assinatura: Json | null
          data_abertura: string | null
          data_aprovacao: string | null
          data_pago: string | null
          data_vencimento: string | null
          id_assinatura: number | null
          id_pagamento: number | null
          status_pagamento:
          | Database["public"]["Enums"]["status_pagamento"]
          | null
          valor_pagamento: number | null
        }
        Relationships: [
          {
            foreignKeyName: "pagamento_id_assinatura_fkey"
            columns: ["id_assinatura"]
            isOneToOne: false
            referencedRelation: "assinatura"
            referencedColumns: ["id_assinatura"]
          }
        ]
      }
      usuario_empresa_assinaturra: {
        Row: {
          assinatura: Json | null
          born_date: string | null
          cpf: string | null
          email: string | null
          empresa: Json | null
          first_name: string | null
          id_cargo: number | null
          id_empresa: string | null
          id_tipo_usuario: Database["public"]["Enums"]["tipo_usuario"] | null
          id_usuario: string | null
          last_name: string | null
          nome: string | null
          updated_at: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_id_cargo_fkey"
            columns: ["id_cargo"]
            isOneToOne: false
            referencedRelation: "cargo"
            referencedColumns: ["id_cargo"]
          },
          {
            foreignKeyName: "profiles_id_empresa_fkey"
            columns: ["id_empresa"]
            isOneToOne: false
            referencedRelation: "empresa"
            referencedColumns: ["id_cnpj"]
          },
          {
            foreignKeyName: "profiles_id_empresa_fkey"
            columns: ["id_empresa"]
            isOneToOne: false
            referencedRelation: "empresa_representante_assinatura_plano"
            referencedColumns: ["id_cnpj"]
          },
          {
            foreignKeyName: "profiles_id_usuario_fkey"
            columns: ["id_usuario"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      usuarios_ativos: {
        Row: {
          email: string | null
          id_cargo: number | null
          id_empresa: string | null
          primeiro_nome: string | null
          tipo: Database["public"]["Enums"]["tipo_usuario"] | null
          ultimo_nome: string | null
        }
        Insert: {
          email?: string | null
          id_cargo?: number | null
          id_empresa?: string | null
          primeiro_nome?: string | null
          tipo?: Database["public"]["Enums"]["tipo_usuario"] | null
          ultimo_nome?: string | null
        }
        Update: {
          email?: string | null
          id_cargo?: number | null
          id_empresa?: string | null
          primeiro_nome?: string | null
          tipo?: Database["public"]["Enums"]["tipo_usuario"] | null
          ultimo_nome?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "usuario_empresa_id_cargo_fkey"
            columns: ["id_cargo"]
            isOneToOne: false
            referencedRelation: "cargo"
            referencedColumns: ["id_cargo"]
          },
          {
            foreignKeyName: "usuario_empresa_id_empresa_fkey"
            columns: ["id_empresa"]
            isOneToOne: false
            referencedRelation: "empresa"
            referencedColumns: ["id_cnpj"]
          },
          {
            foreignKeyName: "usuario_empresa_id_empresa_fkey"
            columns: ["id_empresa"]
            isOneToOne: false
            referencedRelation: "empresa_representante_assinatura_plano"
            referencedColumns: ["id_cnpj"]
          }
        ]
      }
    }
    Functions: {
      is_admin: {
        Args: {
          user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      dia_semana:
      | "Segunda-feira"
      | "Terça-feira"
      | "Quarta-feira"
      | "Quinta-feira"
      | "Sexta-feira"
      | "Sábado"
      | "Domingo"
      status_assinatura: "ativo" | "pendente_pagamento" | "cancelada"
      status_pagamento:
      | "pago"
      | "processando"
      | "nao pago"
      | "aberto"
      | "cancelado"
      tipo_usuario:
      | "representante"
      | "funcionario"
      | "profissional_saude"
      | "administrador"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

export type Tables<
  PublicTableNameOrOptions extends
  | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
  | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
  ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
    Database[PublicTableNameOrOptions["schema"]]["Views"])
  : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
    Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
  ? R
  : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
    Database["public"]["Views"])
  ? (Database["public"]["Tables"] &
    Database["public"]["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R
    }
  ? R
  : never
  : never

export type TablesInsert<
  PublicTableNameOrOptions extends
  | keyof Database["public"]["Tables"]
  | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
  ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
  : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
    Insert: infer I
  }
  ? I
  : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
    Insert: infer I
  }
  ? I
  : never
  : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
  | keyof Database["public"]["Tables"]
  | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
  ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
  : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
    Update: infer U
  }
  ? U
  : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
    Update: infer U
  }
  ? U
  : never
  : never

export type Enums<
  PublicEnumNameOrOptions extends
  | keyof Database["public"]["Enums"]
  | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
  ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
  : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
  ? Database["public"]["Enums"][PublicEnumNameOrOptions]
  : never

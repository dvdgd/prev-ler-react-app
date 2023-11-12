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
          data_fim: string | null
          data_inicio: string
          id_assinatura: number
          id_empresa: string
          id_plano: number
          data_expiracao?: string;
          status_assinatura: Database["public"]["Enums"]["status_assinatura"]
        }
        Insert: {
          data_fim?: string | null
          data_inicio?: string
          id_assinatura?: number
          id_empresa: string
          id_plano: number
          data_expiracao?: string;
          status_assinatura: Database["public"]["Enums"]["status_assinatura"]
        }
        Update: {
          data_fim?: string | null
          data_inicio?: string
          id_assinatura?: number
          id_empresa?: string
          id_plano?: number
          data_expiracao?: string;
          status_assinatura?: Database["public"]["Enums"]["status_assinatura"]
        }
        Relationships: [
          {
            foreignKeyName: "assinatura_id_empresa_fkey"
            columns: ["id_empresa"]
            referencedRelation: "empresa"
            referencedColumns: ["id_cnpj"]
          },
          {
            foreignKeyName: "assinatura_id_plano_fkey"
            columns: ["id_plano"]
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
            referencedRelation: "empresa"
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
          id_usuario: string
          observacao: string | null
          subtitulo: string | null
          titulo: string
        }
        Insert: {
          data_atualizacao?: string | null
          data_inclusao?: string
          descricao: string
          id_conteudo?: number
          id_usuario: string
          observacao?: string | null
          subtitulo?: string | null
          titulo: string
        }
        Update: {
          data_atualizacao?: string | null
          data_inclusao?: string
          descricao?: string
          id_conteudo?: number
          id_usuario?: string
          observacao?: string | null
          subtitulo?: string | null
          titulo?: string
        }
        Relationships: []
      }
      conteudo_enfermidade: {
        Row: {
          id_conteudo: number
          id_enfermidade: number
        }
        Insert: {
          id_conteudo: number
          id_enfermidade: number
        }
        Update: {
          id_conteudo?: number
          id_enfermidade?: number
        }
        Relationships: [
          {
            foreignKeyName: "conteudo_enfermidade_id_conteudo_fkey"
            columns: ["id_conteudo"]
            referencedRelation: "conteudo"
            referencedColumns: ["id_conteudo"]
          },
          {
            foreignKeyName: "conteudo_enfermidade_id_enfermidade_fkey"
            columns: ["id_enfermidade"]
            referencedRelation: "enfermidade"
            referencedColumns: ["id_enfermidade"]
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
          ddd?: number | null
          email: string
          id_cnpj: string
          municipio: string
          nome_fantasia: string
          razao_social: string
          telefone?: string | null
          uf: string
        }
        Update: {
          cep?: string
          created_at?: string
          data_abertura?: string
          ddd?: number | null
          email?: string
          id_cnpj?: string
          municipio?: string
          nome_fantasia?: string
          razao_social?: string
          telefone?: string | null
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
          nome: string
        }
        Insert: {
          data_atualizacao?: string | null
          data_inclusao?: string
          descricao: string
          id_empresa: string
          id_enfermidade?: number
          nome: string
        }
        Update: {
          data_atualizacao?: string | null
          data_inclusao?: string
          descricao?: string
          id_empresa?: string
          id_enfermidade?: number
          nome?: string
        }
        Relationships: [
          {
            foreignKeyName: "enfermidade_id_empresa_fkey"
            columns: ["id_empresa"]
            referencedRelation: "empresa"
            referencedColumns: ["id_cnpj"]
          }
        ]
      }
      exercicio: {
        Row: {
          data_atualizacao: string | null
          data_inclusao: string
          descricao: string
          id_exercicio: number
          id_usuario: string
          "instrucoes ": string
          observacoes: string
          precaucoes: string
          titulo: string
        }
        Insert: {
          data_atualizacao?: string | null
          data_inclusao?: string
          descricao: string
          id_exercicio?: number
          id_usuario: string
          "instrucoes ": string
          observacoes: string
          precaucoes: string
          titulo: string
        }
        Update: {
          data_atualizacao?: string | null
          data_inclusao?: string
          descricao?: string
          id_exercicio?: number
          id_usuario?: string
          "instrucoes "?: string
          observacoes?: string
          precaucoes?: string
          titulo?: string
        }
        Relationships: []
      }
      exercicio_enfermidade: {
        Row: {
          id_enfermidade: number
          id_exercicio: number
        }
        Insert: {
          id_enfermidade: number
          id_exercicio: number
        }
        Update: {
          id_enfermidade?: number
          id_exercicio?: number
        }
        Relationships: [
          {
            foreignKeyName: "exercicio_enfermidade _id_enfermidade_fkey"
            columns: ["id_enfermidade"]
            referencedRelation: "enfermidade"
            referencedColumns: ["id_enfermidade"]
          },
          {
            foreignKeyName: "exercicio_enfermidade _id_exercicio_fkey"
            columns: ["id_exercicio"]
            referencedRelation: "exercicio"
            referencedColumns: ["id_exercicio"]
          }
        ]
      }
      pagamento: {
        Row: {
          data_pago?: string
          data_aprovacao?: string
          data_abertura: string
          id_assinatura: number
          id_pagamento: number
          status_pagamento: Database["public"]["Enums"]["status_pagamento"]
          valor_pagamento: number
        }
        Insert: {
          data_pago?: string
          data_aprovacao?: string
          data_abertura: string
          id_assinatura: number
          id_pagamento?: number
          status_pagamento: Database["public"]["Enums"]["status_pagamento"]
          valor_pagamento: number
        }
        Update: {
          data_pago?: string
          data_aprovacao?: string
          data_abertura?: string
          id_assinatura?: number
          id_pagamento?: number
          status_pagamento?: Database["public"]["Enums"]["status_pagamento"]
          valor_pagamento?: number
        }
        Relationships: [
          {
            foreignKeyName: "pagamento_id_assinatura_fkey"
            columns: ["id_assinatura"]
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
          first_name: string
          last_name: string
          id_tipo_usuario: Database["public"]["Enums"]["tipo_usuario"] | "representante"
          id_cargo: number | null
          id_empresa: string | null
          id_usuario: string
          updated_at: string | null
        }
        Insert: {
          born_date?: string | null
          first_name?: string | null
          id_cargo?: number | null
          id_empresa?: string | null
          id_tipo_usuario?: Database["public"]["Enums"]["tipo_usuario"] | "representante"
          id_usuario?: string
          last_name?: string | null
          updated_at?: string | null
        }
        Update: {
          born_date?: string | null
          email?: string | null
          first_name?: string | null
          id_cargo?: number | null
          id_empresa?: string | null
          id_tipo_usuario?: Database["public"]["Enums"]["tipo_usuario"] | null
          id_usuario?: string
          last_name?: string | null
          updated_at?: string | null
          username?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_id_cargo_fkey"
            columns: ["id_cargo"]
            referencedRelation: "cargo"
            referencedColumns: ["id_cargo"]
          },
          {
            foreignKeyName: "profiles_id_empresa_fkey"
            columns: ["id_empresa"]
            referencedRelation: "empresa"
            referencedColumns: ["id_cnpj"]
          },
          {
            foreignKeyName: "profiles_id_usuario_fkey"
            columns: ["id_usuario"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      rotina: {
        Row: {
          ativa: boolean
          descricao: string | null
          hora_fim: string
          hora_inicio: string
          id: number
          id_usuario: string
          intervalo: string
          titulo: string
        }
        Insert: {
          ativa: boolean
          descricao?: string | null
          hora_fim: string
          hora_inicio: string
          id?: number
          id_usuario: string
          intervalo: string
          titulo: string
        }
        Update: {
          ativa?: boolean
          descricao?: string | null
          hora_fim?: string
          hora_inicio?: string
          id?: number
          id_usuario?: string
          intervalo?: string
          titulo?: string
        }
        Relationships: []
      }
      rotina_dia_semana: {
        Row: {
          id_dia_semana: Database["public"]["Enums"]["dia_semana"]
          id_rotina: number
          id_rotina_dia_semana: number
        }
        Insert: {
          id_dia_semana: Database["public"]["Enums"]["dia_semana"]
          id_rotina: number
          id_rotina_dia_semana?: number
        }
        Update: {
          id_dia_semana?: Database["public"]["Enums"]["dia_semana"]
          id_rotina?: number
          id_rotina_dia_semana?: number
        }
        Relationships: [
          {
            foreignKeyName: "rotina_dia_semana_id_rotina_fkey"
            columns: ["id_rotina"]
            referencedRelation: "rotina"
            referencedColumns: ["id"]
          }
        ]
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
            referencedRelation: "exercicio"
            referencedColumns: ["id_exercicio"]
          },
          {
            foreignKeyName: "rotina_exercicio_id_rotina_fkey"
            columns: ["id_rotina"]
            referencedRelation: "rotina"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
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
      status_assinatura: "ativo" | "nao paga" | "cancelada"
      status_pagamento: "pago" | "processando" | "nao pago" | "aberto"
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

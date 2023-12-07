import { supabaseClient } from "@config/supabase";
import { UserProfileFromSupabase } from "@shared/mappers/UserProfileSupabaseMappers";
import { useQuery } from "@tanstack/react-query";

export function useUsersCompany() {
  const query = useQuery({
    queryKey: ['dashboard', 'users', 'business_type'],
    queryFn: async () => {
      const { data } = await supabaseClient
        .from('usuarios_representantes')
        .select('*');
      console.log(data);
      return data?.map((d) => UserProfileFromSupabase(d));
    }
  });

  return query;
} 

import { Injectable } from '@nestjs/common';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class BorrowersService {
  private supabase: SupabaseClient;

  constructor(private configService: ConfigService) {
    this.supabase = createClient(
      this.configService.get<string>('SUPABASE_URL') || '',
      this.configService.get<string>('SUPABASE_ANON_KEY') || '',
    );
  }

  async createBorrower(name: string, email: string, phone: string) {
    const { data, error } = await this.supabase
      .from('borrowers')
      .insert([{ name, email, phone }])
      .select();
    if (error) throw error;
    return data;
  }

  async getBorrowers() {
    const { data, error } = await this.supabase.from('borrowers').select('*');
    if (error) throw error;
    return data;
  }
}

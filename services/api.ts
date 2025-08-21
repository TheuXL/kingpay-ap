import * as SecureStore from 'expo-secure-store';

// Configurações do Supabase
const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY!;

// Log das configurações
console.log('🔧 === CONFIGURAÇÕES DA API ===');
console.log('🌐 Supabase URL:', supabaseUrl);
console.log('🔑 Supabase Anon Key:', supabaseAnonKey ? supabaseAnonKey.substring(0, 20) + '...' : 'NÃO DEFINIDA');

// Verificar se as variáveis estão definidas
if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ === ERRO DE CONFIGURAÇÃO ===');
  console.error('Variáveis de ambiente não definidas:');
  console.error('EXPO_PUBLIC_SUPABASE_URL:', supabaseUrl);
  console.error('EXPO_PUBLIC_SUPABASE_ANON_KEY:', supabaseAnonKey ? 'DEFINIDA' : 'NÃO DEFINIDA');
}

// Tipos para a API
export interface LoginResponse {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  token_type: string;
  user: {
    id: string;
    email: string;
    user_metadata?: any;
  };
}

export interface DashboardData {
  countTotal: number;
  countPaid: number;
  sumPaid: number;
  sumValorLiquido: number;
  valorLiquidoAdmin: number;
  countPending: number;
  sumPending: number;
  countRefused: number;
  sumRefused: number;
  countRefunded: number;
  sumRefunded: number;
  countChargedback: number;
  sumChargedback: number;
  taxaChargeback: number;
  taxaEstorno: number;
  ticketMedio: number;
  taxaAprovacao: number;
  conversionPix: number;
  conversionBoleto: number;
  conversionCard: number;
  countExpired: number;
  sumExpired: number;
  countPixTotal: number;
  countPixPaid: number;
  sumPix: number;
  sumPixPaid: number;
  countBoletoTotal: number;
  countBoletoPaid: number;
  sumBoleto: number;
  sumBoletoPaid: number;
  countCardTotal: number;
  countCardPaid: number;
  sumCard: number;
  sumCardPaid: number;
  currency: string;
  companies: {
    total: number;
    newlyCreated: number;
    withSales: number;
    withoutSales: number;
    existingWithoutSales: number;
    stoppedSelling: number;
  };
  projections: {
    financial: {
      totalAmount: number;
      avgTicket: number;
      totalOrders: number;
    };
    paymentMethods: {
      pix: { count: number; amount: number };
      boleto: { count: number; amount: number };
      card: { count: number; amount: number };
    };
    events: {
      refunded: number;
      chargeback: number;
      approved: number;
    };
    growth: {
      salesGrowth: number;
      approvalRate: number;
      companies: number;
    };
    conversion: {
      pix: number;
      boleto: number;
      card: number;
    };
    companies: {
      totalNew: number;
      withSales: number;
      withoutSales: number;
      willStopSelling: number;
    };
  };
  nextPeriodStart: string;
  nextPeriodEnd: string;
}

export interface WalletData {
  saldoPix: number;
  saldoCartao: number;
  valorReceber: number;
  reservaFinanceira: number;
  movimentacoes: WalletTransaction[];
}

export interface WalletTransaction {
  id: string;
  name: string;
  email: string;
  amount: number;
  date: string;
  type: 'pix' | 'card_approved' | 'card_failed';
  description?: string;
}

// Novas interfaces para movimentações da carteira
export interface ExtratoItem {
  id: string;
  created_at: string;
  tipo: string;
  value: number;
  entrada: boolean;
  wallet: string;
  user_id: string;
  creator: string | null;
  idtransaction: string | null;
  idsaldoremovido: string | null;
  idantecipacao: string | null;
}

export interface AntecipacaoItem {
  id: string;
  created_at: string;
  status: 'pending' | 'approved' | 'paid' | 'cancelled';
  aReceberList: string[];
  recusaMotivo: string | null;
  valorPedido: number;
  valorFinal: number;
  approved_date: string | null;
  user_id: string;
  user_fullname: string;
  user_phone: string;
  user_email: string;
  company_id: string;
  company_name: string;
  company_status: string;
  company_taxid: string;
}

export interface TransferenciaItem {
  id: string;
  createdat: string;
  updatedat: string;
  fee: number;
  requestedamount: number;
  pixkeyid: string;
  status: string;
  amounttotransfer: number;
  companyid: string;
  description: string;
  creator: string;
  idBaas: string | null;
  reason_for_denial: string | null;
  isPix: boolean;
  pago_em: string | null;
  user_id: string;
  user_fullname: string;
  user_phone: string;
  user_email: string;
  company_id: string;
  company_name: string;
  company_status: string;
  company_taxid: string;
  pix_key_id: string;
  pix_key: string;
  pix_key_type: string;
  pix_key_description: string;
}

export interface ManagementData {
  // Dados de formas de pagamento (valores em centavos)
  pixSales: number;
  cardSales: number;
  boletoSales: number;
  totalSales: number;
  
  // Dados de vendas
  totalTransactions: number;
  averageTicket: number;
  
  // Dados de aprovação (percentuais)
  pixApprovalRate: number;
  cardApprovalRate: number;
  boletoApprovalRate: number;
  
  // Dados de reembolsos (valores em centavos)
  refunds: number;
  chargebacks: number;
  
  // Dados de links
  activeLinks: number;
  linkSales: number;
  
  // Dados adicionais do dashboard
  countPixTotal: number;
  countPixPaid: number;
  countCardTotal: number;
  countCardPaid: number;
  countBoletoTotal: number;
  countBoletoPaid: number;
  conversionPix: number;
  conversionCard: number;
  conversionBoleto: number;
  taxaAprovacao: number;
  countRefunded: number;
  sumRefunded: number;
  countChargedback: number;
  sumChargedback: number;
  taxaChargeback: number;
  taxaEstorno: number;
}

export interface TransactionMetricsData {
  // Vendas Aprovadas
  approvedPixSales: number;
  approvedCardSales: number;
  approvedBoletoSales: number;
  totalApprovedSales: number;
  totalApprovedAmount: number;
  
  // Vendas Abandonadas
  abandonedPixSales: number;
  abandonedCardSales: number;
  abandonedBoletoSales: number;
  totalAbandonedSales: number;
  totalAbandonedAmount: number;
  
  // Comissões
  pixCommission: number;
  cardCommission: number;
  boletoCommission: number;
  totalCommission: number;
  
  // Estornos
  pixRefunds: number;
  cardRefunds: number;
  boletoRefunds: number;
  totalRefunds: number;
}

export interface PaymentLink {
  id: string;
  nome: string;
  formas_de_pagamento: string[];
  valor: number;
  ativo: boolean;
  cor: string | null;
  descricao_cobranca: string | null;
  max_parcelamento: number;
  creator: string;
  company: string;
  created_at: string;
  updated_at: string | null;
  solicitar_endereco: boolean;
  image_logo: string | null;
}

export interface CreatePaymentLinkData {
  nome: string;
  formas_de_pagamento: string[];
  valor: number;
  ativo?: boolean;
  cor?: string;
  descricao_cobranca?: string;
  max_parcelamento?: number;
  solicitar_endereco?: boolean;
  image_logo?: string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PixKey {
  id: string;
  type: string;
  key: string;
  description?: string;
  v: boolean;
  createdat: string;
  updatedat: string;
  companyId?: string;
  companyName?: string;
  companyTaxId?: string;
  creator?: string;
}

export interface CreatePixKeyData {
  type: string;
  key: string;
  description?: string;
}

export interface UpdatePixKeyData {
  type?: string;
  key?: string;
  description?: string;
  v?: boolean;
}

// Tipos para Configurações
export interface UserData {
  id: string;
  fullname: string;
  email: string;
  phone: string;
  document: string;
  birthdate?: string;
  company: string;
  foto?: string | null;
}

// Função utilitária para extrair o primeiro nome
export const getFirstName = (fullname: string): string => {
  if (!fullname) return '';
  return fullname.split(' ')[0];
};

export interface CompanyData {
  id: string;
  name: string;
  fantasy_name?: string;
  taxid: string;
  website?: string;
  address: {
    street: string;
    number: string;
    neighborhood: string;
    city: string;
    state: string;
    zipcode: string;
    country: string;
  };
}

export interface CompanyRates {
  pix_fee_percentage: number;
  pix_fee_fixed: number;
  card_fee_percentage: number;
  card_fee_fixed: number;
  boleto_fee_percentage: number;
  boleto_fee_fixed: number;
  withdrawal_fee_percentage: number;
  withdrawal_fee_fixed: number;
  fee_type_pix?: string;
  fee_type_card?: string;
  fee_type_boleto?: string;
  fee_type_withdrawal?: string;
}

export interface TaxSimulationRequest {
  company_id: string;
  valor: number;
  payment_method: 'PIX' | 'CARD' | 'BOLETO';
  parcelas: number;
}

export interface TaxSimulationResponse {
  taxaIntermediacao: string;
  totalTaxas: string;
  valorLiquido: string;
}

// Tipos para Subcontas
export interface Subconta {
  id: string;
  nome: string;
  banco: string;
  agencia: string;
  conta: string;
  tipo_conta: string;
  status: string;
  empresa: string;
  ativo: boolean;
  created_at: string;
}

// Tipos para Notificações
export interface AlertNotification {
  id: string;
  title: string;
  description: string;
  date: string;
  isRead: boolean;
  type?: string;
}

// Tipos para Saques
export interface Withdrawal {
  id: string;
  pixkeyid: string;
  requestedamount: number;
  description: string;
  isPix: boolean;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface CreateWithdrawalData {
  pixkeyid: string;
  requestedamount: number;
  description: string;
  isPix: boolean;
}

// Classe principal da API
class KingPayAPI {
  private accessToken: string | null = null;

  // Método para fazer login
  async login(email: string, password: string): Promise<ApiResponse<LoginResponse>> {
    try {
      console.log('🔐 === INICIANDO LOGIN ===');
      console.log('📧 Email:', email);
      
      // LIMPAR TODOS OS TOKENS ANTES DO LOGIN
      await this.clearTokenCache();
      console.log('🧹 Tokens anteriores removidos');
      
      const requestBody = {
        email,
        password,
      };
      
      console.log('📤 === REQUISIÇÃO ===');
      console.log('Método: POST');
      console.log('URL:', `${supabaseUrl}/auth/v1/token?grant_type=password`);
      console.log('Headers:', {
        'Content-Type': 'application/json',
        'apikey': supabaseAnonKey.substring(0, 20) + '...'
      });
      console.log('Body:', JSON.stringify(requestBody, null, 2));
      
      const response = await fetch(`${supabaseUrl}/auth/v1/token?grant_type=password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': supabaseAnonKey,
        },
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();
      
      console.log('📥 === RESPOSTA ===');
      console.log('Status:', response.status);
      console.log('Headers:', Object.fromEntries(response.headers.entries()));
      console.log('Data:', JSON.stringify(data, null, 2));

      if (response.ok) {
        console.log('✅ === LOGIN BEM-SUCEDIDO ===');
        console.log('👤 User ID:', data.user.id);
        console.log('📧 User Email:', data.user.email);
        console.log('🔑 Access Token:', data.access_token.substring(0, 20) + '...');
        
        // SALVAR APENAS O NOVO TOKEN
        await SecureStore.setItemAsync('access_token', data.access_token);
        await SecureStore.setItemAsync('refresh_token', data.refresh_token);
        await SecureStore.setItemAsync('user_id', data.user.id);
        
        // Atualizar token em memória
        this.accessToken = data.access_token;
        
        console.log('💾 Novo token salvo no SecureStore');
        console.log('🔄 Token em memória atualizado');
        
        return {
          success: true,
          data,
        };
      } else {
        console.log('❌ === ERRO NO LOGIN ===');
        console.log('Erro:', data.error_description || data.error || 'Erro desconhecido');
        
        // Em caso de erro, garantir que não há tokens
        await this.clearTokenCache();
        
        return {
          success: false,
          error: data.error_description || data.error || 'Erro no login',
        };
      }
    } catch (error) {
      console.log('💥 === ERRO DE CONEXÃO ===');
      console.error('Erro:', error);
      
      // Em caso de erro, garantir que não há tokens
      await this.clearTokenCache();
      
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Erro de conexão',
      };
    }
  }

  // Método para buscar dados do dashboard
  async getDashboardData(startDate: string, endDate: string, companyId?: string): Promise<ApiResponse<DashboardData>> {
    try {
      console.log('📊 === BUSCANDO DADOS DO DASHBOARD ===');
      console.log('📅 Período:', `${startDate} até ${endDate}`);
      
      const token = await this.getStoredToken();
      if (!token) {
        console.log('❌ Token não encontrado');
        return { success: false, error: 'Token não encontrado' };
      }

      // Se não foi fornecido companyId, buscar automaticamente
      let finalCompanyId = companyId;
      if (!finalCompanyId) {
        // Obter user ID do token
        const userId = await SecureStore.getItemAsync('user_id');
        if (!userId) {
          console.log('❌ User ID não encontrado');
          return { success: false, error: 'User ID não encontrado' };
        }

        // Buscar dados do usuário para obter o company ID
        const userData = await this.getUserData(userId);
        if (!userData.success || !userData.data) {
          console.log('❌ Não foi possível obter dados do usuário');
          return { success: false, error: 'Não foi possível obter dados do usuário' };
        }

        // A resposta da API tem estrutura { success: true, user: { company: "..." } }
        const responseData = userData.data as any;
        finalCompanyId = responseData.user?.company || responseData.company;
        if (!finalCompanyId) {
          console.log('❌ Company ID não encontrado');
          return { success: false, error: 'Company ID não encontrado' };
        }
      }

      console.log('🏢 Company ID:', finalCompanyId);

      const params = new URLSearchParams({
        start_date: startDate,
        end_date: endDate,
        company_id: finalCompanyId,
      });

      const url = `${supabaseUrl}/functions/v1/dados-dashboard?${params}`;
      
      console.log('📤 === REQUISIÇÃO DASHBOARD ===');
      console.log('Método: POST');
      console.log('URL:', url);
      console.log('Headers:', {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token.substring(0, 20)}...`
      });
      
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({}),
      });

      const data = await response.json();
      
      console.log('📥 === RESPOSTA DASHBOARD ===');
      console.log('Status:', response.status);
      console.log('Data:', JSON.stringify(data, null, 2));

      if (response.ok) {
        console.log('✅ === DADOS DO DASHBOARD OBTIDOS ===');
        console.log('💰 Total de vendas:', data.sumPaid);
        console.log('📈 Taxa de aprovação:', data.taxaAprovacao);
        console.log('🎫 Ticket médio:', data.ticketMedio);
        
        return {
          success: true,
          data,
        };
      } else {
        console.log('❌ === ERRO AO BUSCAR DADOS ===');
        console.log('Erro:', data.error || 'Erro desconhecido');
        
        return {
          success: false,
          error: data.error || 'Erro ao buscar dados do dashboard',
        };
      }
    } catch (error) {
      console.log('💥 === ERRO DE CONEXÃO DASHBOARD ===');
      console.error('Erro:', error);
      
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Erro de conexão',
      };
    }
  }

  // Método para buscar dados da carteira
  async getWalletData(): Promise<ApiResponse<WalletData>> {
    try {
      console.log('💳 === BUSCANDO DADOS DA CARTEIRA ===');
      
      const token = await this.getStoredToken();
      if (!token) {
        console.log('❌ Token não encontrado');
        return { success: false, error: 'Token não encontrado' };
      }

      // Obter user ID do token
      const userId = await SecureStore.getItemAsync('user_id');
      if (!userId) {
        console.log('❌ User ID não encontrado');
        return { success: false, error: 'User ID não encontrado' };
      }

      // Usar endpoint específico da carteira (sem período)
      const url = `${supabaseUrl}/functions/v1/wallet?userId=${userId}`;
      
      console.log('📤 === REQUISIÇÃO CARTEIRA ===');
      console.log('Método: GET');
      console.log('URL:', url);
      console.log('Headers:', {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token.substring(0, 20)}...`
      });
      
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      const data = await response.json();
      
      console.log('📥 === RESPOSTA CARTEIRA ===');
      console.log('Status:', response.status);
      console.log('Data:', JSON.stringify(data, null, 2));

      if (response.ok && data) {
        // Mapear dados da carteira (sem período)
        const walletData: WalletData = {
          saldoPix: data.balance || 0,
          saldoCartao: data.balance_card || 0,
          valorReceber: data.a_receber || 0,
          reservaFinanceira: data.reserva || 0,
          movimentacoes: [], // Array vazio - sem dados mockados
        };

        console.log('✅ === DADOS DA CARTEIRA OBTIDOS ===');
        console.log('💰 Saldo PIX:', walletData.saldoPix);
        console.log('💳 Saldo Cartão:', walletData.saldoCartao);
        console.log('📈 Valor a Receber:', walletData.valorReceber);
        console.log('🏦 Reserva Financeira:', walletData.reservaFinanceira);
        console.log('📋 Movimentações:', walletData.movimentacoes.length);
        
        return {
          success: true,
          data: walletData,
        };
      } else {
        console.log('❌ === ERRO AO BUSCAR DADOS DA CARTEIRA ===');
        console.log('Erro:', data.error || 'Erro desconhecido');
        
        return {
          success: false,
          error: data.error || 'Erro ao buscar dados da carteira',
        };
      }
    } catch (error) {
      console.log('💥 === ERRO DE CONEXÃO CARTEIRA ===');
      console.error('Erro:', error);
      
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Erro de conexão',
      };
    }
  }

  // Método para buscar subcontas
  async getSubcontas(): Promise<ApiResponse<Subconta[]>> {
    try {
      console.log('🏢 === BUSCANDO SUBCONTAS ===');
      
      const token = await this.getStoredToken();
      if (!token) {
        console.log('❌ Token não encontrado');
        return { success: false, error: 'Token não encontrado' };
      }

      const url = `${supabaseUrl}/functions/v1/subconta`;
      
      console.log('📤 === REQUISIÇÃO SUBCONTAS ===');
      console.log('Método: GET');
      console.log('URL:', url);
      console.log('Headers:', {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token.substring(0, 20)}...`
      });
      
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      const data = await response.json();
      
      console.log('📥 === RESPOSTA SUBCONTAS ===');
      console.log('Status:', response.status);
      console.log('Data:', JSON.stringify(data, null, 2));

      if (response.ok && data) {
        // Mapear dados das subcontas
        const subcontas: Subconta[] = Array.isArray(data) ? data.map((item: any) => ({
          id: item.id || item.sub_account_id || '',
          nome: item.name || item.subconta_nome || item.nome || '',
          banco: item.banco || '',
          agencia: item.agencia || '',
          conta: item.conta || '',
          tipo_conta: item.tipo_conta || 'Corrente',
          status: item.status || 'active',
          empresa: item.empresa || '',
          ativo: item.ativo !== false,
          created_at: item.created_at || new Date().toISOString(),
        })) : [];

        console.log('✅ === SUBCONTAS OBTIDAS ===');
        console.log('🏢 Total de subcontas:', subcontas.length);
        
        return {
          success: true,
          data: subcontas,
        };
      } else {
        console.log('❌ === ERRO AO BUSCAR SUBCONTAS ===');
        console.log('Erro:', data.error || 'Erro desconhecido');
        
        return {
          success: false,
          error: data.error || 'Erro ao buscar subcontas',
        };
      }
    } catch (error) {
      console.log('💥 === ERRO DE CONEXÃO SUBCONTAS ===');
      console.error('Erro:', error);
      
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Erro de conexão',
      };
    }
  }

  // Método para buscar notificações
  async getNotifications(limit: number = 10, offset: number = 0): Promise<ApiResponse<AlertNotification[]>> {
    try {
      console.log('🔔 === BUSCANDO NOTIFICAÇÕES ===');
      
      const token = await this.getStoredToken();
      if (!token) {
        console.log('❌ Token não encontrado');
        return { success: false, error: 'Token não encontrado' };
      }

      const url = `${supabaseUrl}/functions/v1/alerts?limit=${limit}&offset=${offset}`;
      
      console.log('📤 === REQUISIÇÃO NOTIFICAÇÕES ===');
      console.log('Método: GET');
      console.log('URL:', url);
      console.log('Headers:', {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token.substring(0, 20)}...`
      });
      
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      const data = await response.json();
      
      console.log('📥 === RESPOSTA NOTIFICAÇÕES ===');
      console.log('Status:', response.status);
      console.log('Data:', JSON.stringify(data, null, 2));

      if (response.ok && data) {
        // Extrair array de alertas da resposta
        const alertsArray = data.alerts || data;
        
        // Mapear dados das notificações
        const notifications: AlertNotification[] = Array.isArray(alertsArray) ? alertsArray.map((item: any) => ({
          id: item.id || '',
          title: item.title || item.titulo || 'Notificação',
          description: item.body || item.description || item.descricao || item.message || '',
          date: item.created_at || item.date || new Date().toISOString(),
          isRead: item.visualizado || item.is_read || item.viewed || false,
          type: item.type || 'info',
        })) : [];

        console.log('✅ === NOTIFICAÇÕES OBTIDAS ===');
        console.log('📋 Estrutura da resposta:', Object.keys(data));
        console.log('🔔 Array de alertas:', alertsArray ? alertsArray.length : 'não encontrado');
        console.log('🔔 Total de notificações mapeadas:', notifications.length);
        console.log('📝 Exemplo de notificação:', notifications[0]);
        
        return {
          success: true,
          data: notifications,
        };
      } else {
        console.log('❌ === ERRO AO BUSCAR NOTIFICAÇÕES ===');
        console.log('Erro:', data.error || 'Erro desconhecido');
        
        return {
          success: false,
          error: data.error || 'Erro ao buscar notificações',
        };
      }
    } catch (error) {
      console.log('💥 === ERRO DE CONEXÃO NOTIFICAÇÕES ===');
      console.error('Erro:', error);
      
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Erro de conexão',
      };
    }
  }



  // Método para marcar notificação como lida
  async markNotificationAsRead(notificationId: string): Promise<ApiResponse<boolean>> {
    try {
      console.log('✅ === MARCANDO NOTIFICAÇÃO COMO LIDA ===');
      console.log('🔔 Notification ID:', notificationId);
      
      const token = await this.getStoredToken();
      if (!token) {
        console.log('❌ Token não encontrado');
        return { success: false, error: 'Token não encontrado' };
      }

      const url = `${supabaseUrl}/functions/v1/alerts/mark-viewed`;
      
      console.log('📤 === REQUISIÇÃO MARCAR COMO LIDA ===');
      console.log('Método: POST');
      console.log('URL:', url);
      console.log('Headers:', {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token.substring(0, 20)}...`
      });
      console.log('Body:', { notificationId });
      
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ notificationId }),
      });

      const data = await response.json();
      
      console.log('📥 === RESPOSTA MARCAR COMO LIDA ===');
      console.log('Status:', response.status);
      console.log('Data:', JSON.stringify(data, null, 2));

      if (response.ok) {
        console.log('✅ === NOTIFICAÇÃO MARCADA COMO LIDA ===');
        
        return {
          success: true,
          data: true,
        };
      } else {
        console.log('❌ === ERRO AO MARCAR NOTIFICAÇÃO ===');
        console.log('Erro:', data.error || 'Erro desconhecido');
        
        return {
          success: false,
          error: data.error || 'Erro ao marcar notificação como lida',
        };
      }
    } catch (error) {
      console.log('💥 === ERRO DE CONEXÃO MARCAR NOTIFICAÇÃO ===');
      console.error('Erro:', error);
      
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Erro de conexão',
      };
    }
  }

  // Método para buscar extrato
  async getExtrato(limit: number = 10, offset: number = 0): Promise<ApiResponse<ExtratoItem[]>> {
    try {
      console.log('📋 === BUSCANDO EXTRATO ===');
      
      const token = await this.getStoredToken();
      if (!token) {
        console.log('❌ Token não encontrado');
        return { success: false, error: 'Token não encontrado' };
      }

      const userId = await SecureStore.getItemAsync('user_id');
      if (!userId) {
        console.log('❌ User ID não encontrado');
        return { success: false, error: 'User ID não encontrado' };
      }

      const url = `${supabaseUrl}/functions/v1/extrato/${userId}?limit=${limit}&offset=${offset}`;
      
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (response.ok && data.extrato) {
        console.log('✅ === EXTRATO OBTIDO ===');
        console.log('📋 Total de itens:', data.extrato.length);
        return {
          success: true,
          data: data.extrato,
        };
      } else {
        console.log('❌ === ERRO AO BUSCAR EXTRATO ===');
        console.log('Status:', response.status);
        console.log('Erro:', data);
        return {
          success: false,
          error: data.error || 'Erro ao buscar extrato',
        };
      }
    } catch (error) {
      console.log('💥 === ERRO DE CONEXÃO EXTRATO ===');
      console.error('Erro:', error);
      
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Erro de conexão',
      };
    }
  }

  // Método para buscar antecipações
  async getAntecipacoes(limit: number = 10, offset: number = 0, status?: string): Promise<ApiResponse<AntecipacaoItem[]>> {
    try {
      console.log('💰 === BUSCANDO ANTECIPAÇÕES ===');
      
      const token = await this.getStoredToken();
      if (!token) {
        console.log('❌ Token não encontrado');
        return { success: false, error: 'Token não encontrado' };
      }

      let url = `${supabaseUrl}/functions/v1/antecipacoes/anticipations?limit=${limit}&offset=${offset}`;
      if (status) {
        url += `&status=${status}`;
      }
      
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (response.ok) {
        console.log('✅ === ANTECIPAÇÕES OBTIDAS ===');
        let anticipations;
        
        if (data.data && data.data.data) {
          anticipations = data.data.data;
        } else if (data.data) {
          anticipations = data.data;
        } else {
          anticipations = [];
        }
        
        console.log('💰 Total de antecipações:', anticipations.length);
        return {
          success: true,
          data: anticipations,
        };
      } else {
        console.log('❌ === ERRO AO BUSCAR ANTECIPAÇÕES ===');
        console.log('Status:', response.status);
        console.log('Erro:', data);
        return {
          success: false,
          error: data.error || 'Erro ao buscar antecipações',
        };
      }
    } catch (error) {
      console.log('💥 === ERRO DE CONEXÃO ANTECIPAÇÕES ===');
      console.error('Erro:', error);
      
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Erro de conexão',
      };
    }
  }

  // Método para buscar transferências (saques)
  async getTransferencias(limit: number = 10, offset: number = 0, status?: string): Promise<ApiResponse<TransferenciaItem[]>> {
    try {
      console.log('🔄 === BUSCANDO TRANSFERÊNCIAS ===');
      
      const token = await this.getStoredToken();
      if (!token) {
        console.log('❌ Token não encontrado');
        return { success: false, error: 'Token não encontrado' };
      }

      let url = `${supabaseUrl}/functions/v1/saques?limit=${limit}&offset=${offset}`;
      if (status) {
        url += `&status=${status}`;
      }
      
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (response.ok) {
        console.log('✅ === TRANSFERÊNCIAS OBTIDAS ===');
        let withdrawals;
        
        if (data.data && data.data.withdrawals) {
          withdrawals = data.data.withdrawals;
        } else if (data.data) {
          withdrawals = data.data;
        } else if (data.withdrawals) {
          withdrawals = data.withdrawals;
        } else {
          withdrawals = [];
        }
        
        console.log('🔄 Total de transferências:', withdrawals.length);
        return {
          success: true,
          data: withdrawals,
        };
      } else {
        console.log('❌ === ERRO AO BUSCAR TRANSFERÊNCIAS ===');
        console.log('Status:', response.status);
        console.log('Erro:', data);
        return {
          success: false,
          error: data.error || 'Erro ao buscar transferências',
        };
      }
    } catch (error) {
      console.log('💥 === ERRO DE CONEXÃO TRANSFERÊNCIAS ===');
      console.error('Erro:', error);
      
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Erro de conexão',
      };
    }
  }

  // Método para buscar dados de gestão
  async getManagementData(startDate?: string, endDate?: string): Promise<ApiResponse<ManagementData>> {
    try {
      console.log('📊 === BUSCANDO DADOS DE GESTÃO ===');
      
      const token = await this.getStoredToken();
      if (!token) {
        console.log('❌ Token não encontrado');
        return { success: false, error: 'Token não encontrado' };
      }

      // Usar datas fornecidas ou calcular período padrão (30 dias)
      let startDateStr: string;
      let endDateStr: string;

      if (startDate && endDate) {
        startDateStr = startDate;
        endDateStr = endDate;
        console.log('📅 Usando período fornecido:', startDateStr, 'até', endDateStr);
      } else {
        const endDate = new Date();
        const startDate = new Date();
        startDate.setDate(startDate.getDate() - 30);

        startDateStr = startDate.toISOString().split('T')[0];
        endDateStr = endDate.toISOString().split('T')[0];
        console.log('📅 Usando período padrão (30 dias):', startDateStr, 'até', endDateStr);
      }

      // Usar o endpoint correto do dashboard
      const url = `${supabaseUrl}/functions/v1/dados-dashboard?start_date=${startDateStr}&end_date=${endDateStr}`;
      console.log('🌐 URL do dashboard:', url);
      
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      const data = await response.json();
      console.log('📊 Resposta do dashboard:', data);
      
      if (response.ok && data) {
        // Buscar links de pagamento
        const linksResponse = await this.getPaymentLinks();
        
        const managementData: ManagementData = {
          // Dados de formas de pagamento (valores em centavos)
          pixSales: data.sumPix || 0,
          cardSales: data.sumCard || 0,
          boletoSales: data.sumBoleto || 0,
          totalSales: (data.sumPix || 0) + (data.sumCard || 0) + (data.sumBoleto || 0),
          
          // Dados de vendas
          totalTransactions: data.countTotal || 0,
          averageTicket: data.ticketMedio || 0,
          
          // Dados de aprovação (percentuais)
          pixApprovalRate: data.conversionPix || 0,
          cardApprovalRate: data.conversionCard || 0,
          boletoApprovalRate: data.conversionBoleto || 0,
          
          // Dados de reembolsos (valores em centavos)
          refunds: data.sumRefunded || 0,
          chargebacks: data.sumChargedback || 0,
          
          // Dados de links
          activeLinks: linksResponse.success ? linksResponse.data?.filter(link => link.ativo).length || 0 : 0,
          linkSales: data.countTotal || 0,
          
          // Dados adicionais do dashboard
          countPixTotal: data.countPixTotal || 0,
          countPixPaid: data.countPixPaid || 0,
          countCardTotal: data.countCardTotal || 0,
          countCardPaid: data.countCardPaid || 0,
          countBoletoTotal: data.countBoletoTotal || 0,
          countBoletoPaid: data.countBoletoPaid || 0,
          conversionPix: data.conversionPix || 0,
          conversionCard: data.conversionCard || 0,
          conversionBoleto: data.conversionBoleto || 0,
          taxaAprovacao: data.taxaAprovacao || 0,
          countRefunded: data.countRefunded || 0,
          sumRefunded: data.sumRefunded || 0,
          countChargedback: data.countChargedback || 0,
          sumChargedback: data.sumChargedback || 0,
          taxaChargeback: data.taxaChargeback || 0,
          taxaEstorno: data.taxaEstorno || 0,
        };

        console.log('✅ === DADOS DE GESTÃO OBTIDOS ===');
        console.log('💰 Vendas PIX:', managementData.pixSales);
        console.log('💳 Vendas Cartão:', managementData.cardSales);
        console.log('📄 Vendas Boleto:', managementData.boletoSales);
        console.log('📊 Total de Vendas:', managementData.totalSales);
        console.log('🔗 Links Ativos:', managementData.activeLinks);
        console.log('📈 Número de Vendas:', managementData.linkSales);
        
        return {
          success: true,
          data: managementData,
        };
      } else {
        return {
          success: false,
          error: 'Erro ao buscar dados de gestão',
        };
      }
    } catch (error) {
      console.log('💥 === ERRO DE CONEXÃO GESTÃO ===');
      console.error('Erro:', error);
      
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Erro de conexão',
      };
    }
  }

  // Método para buscar links de pagamento
  async getPaymentLinks(startDate?: string, endDate?: string): Promise<ApiResponse<PaymentLink[]>> {
    try {
      console.log('🔗 === BUSCANDO LINKS DE PAGAMENTO ===');
      
      const token = await this.getStoredToken();
      if (!token) {
        console.log('❌ Token não encontrado');
        return { success: false, error: 'Token não encontrado' };
      }

      // Obter user ID do token
      const userId = await SecureStore.getItemAsync('user_id');
      if (!userId) {
        console.log('❌ User ID não encontrado');
        return { success: false, error: 'User ID não encontrado' };
      }

      // Buscar dados do usuário para obter o company ID
      const userData = await this.getUserData(userId);
      if (!userData.success || !userData.data) {
        console.log('❌ Não foi possível obter dados do usuário');
        return { success: false, error: 'Não foi possível obter dados do usuário' };
      }

      // A resposta da API tem estrutura { success: true, user: { company: "..." } }
      const responseData = userData.data as any;
      const companyId = responseData.user?.company || responseData.company;
      if (!companyId) {
        console.log('❌ Company ID não encontrado');
        return { success: false, error: 'Company ID não encontrado' };
      }

      console.log('🏢 Company ID:', companyId);

      // Construir URL com filtros
      let url = `${supabaseUrl}/functions/v1/link-pagamentos?company=${companyId}`;
      
      // Adicionar filtros de data se fornecidos
      if (startDate && endDate) {
        url += `&start_date=${startDate}&end_date=${endDate}`;
        console.log('📅 Filtros de data aplicados:', startDate, 'até', endDate);
      } else {
        console.log('📅 Sem filtros de data - usando período padrão');
      }
      
      console.log('📤 === REQUISIÇÃO LINKS ===');
      console.log('Método: GET');
      console.log('URL:', url);
      console.log('Headers:', {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token.substring(0, 20)}...`
      });
      
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      const data = await response.json();
      
      console.log('📥 === RESPOSTA LINKS ===');
      console.log('Status:', response.status);
      console.log('Data:', JSON.stringify(data, null, 2));

      if (response.ok) {
        console.log('✅ === LINKS OBTIDOS ===');
        console.log('🔗 Total de links:', data.data?.length || 0);
        console.log('✅ Links ativos:', data.data?.filter((link: PaymentLink) => link.ativo).length || 0);
        
        // Log detalhado dos links obtidos
        if (data.data && data.data.length > 0) {
          console.log('📋 Links obtidos:');
          data.data.forEach((link: PaymentLink, index: number) => {
            console.log(`  ${index + 1}. ${link.nome} (R$ ${link.valor}) - Criado por: ${link.creator} - Company: ${link.company}`);
          });
        }
        
        return {
          success: true,
          data: data.data || [],
        };
      } else {
        console.log('❌ === ERRO AO BUSCAR LINKS ===');
        console.log('Erro:', data.error || 'Erro desconhecido');
        
        return {
          success: false,
          error: data.error || 'Erro ao buscar links de pagamento',
        };
      }
    } catch (error) {
      console.log('💥 === ERRO DE CONEXÃO LINKS ===');
      console.error('Erro:', error);
      
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Erro de conexão',
      };
    }
  }

  // Método para criar um novo link de pagamento
  async createPaymentLink(data: CreatePaymentLinkData): Promise<ApiResponse<PaymentLink>> {
    try {
      console.log('🔗 === CRIANDO NOVO LINK DE PAGAMENTO ===');
      console.log('Dados:', JSON.stringify(data, null, 2));

      // Verificar se o usuário está autenticado antes de prosseguir
      const isAuth = await this.isAuthenticated();
      if (!isAuth) {
        console.log('❌ Usuário não autenticado');
        return { success: false, error: 'Usuário não autenticado. Faça login novamente.' };
      }

      const token = await this.getStoredToken();
      if (!token) {
        console.log('❌ Token não encontrado');
        return { success: false, error: 'Token não encontrado' };
      }

      const url = `${supabaseUrl}/functions/v1/link-pagamentos`;
      
      console.log('📤 === REQUISIÇÃO CRIAR LINK ===');
      console.log('Método: POST');
      console.log('URL:', url);
      console.log('Headers:', {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token.substring(0, 20)}...`
      });
      console.log('Body:', JSON.stringify(data, null, 2));
      
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      
      console.log('📥 === RESPOSTA CRIAR LINK ===');
      console.log('Status:', response.status);
      console.log('Data:', JSON.stringify(result, null, 2));

      if (response.ok) {
        console.log('✅ === LINK DE PAGAMENTO CRIADO ===');
        return {
          success: true,
          data: result,
        };
      } else {
        console.log('❌ === ERRO AO CRIAR LINK ===');
        console.log('Status:', response.status);
        console.log('Erro:', result.error || result.message || 'Erro desconhecido');
        
        // Tratamento específico para token inválido
        if (response.status === 401) {
          console.log('🔑 Token inválido, limpando cache...');
          await this.clearTokenCache();
          return {
            success: false,
            error: 'Sessão expirada. Faça login novamente.',
          };
        }
        
        return {
          success: false,
          error: result.error || result.message || 'Erro ao criar link de pagamento',
        };
      }
    } catch (error) {
      console.log('💥 === ERRO DE CONEXÃO CRIAR LINK ===');
      console.error('Erro:', error);
      
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Erro de conexão',
      };
    }
  }

  // Método para atualizar um link de pagamento (cancelar/editar)
  async updatePaymentLink(linkId: string, data: Partial<CreatePaymentLinkData>): Promise<ApiResponse<PaymentLink>> {
    try {
      console.log('🔄 === ATUALIZANDO LINK DE PAGAMENTO ===');
      console.log('Link ID:', linkId);
      console.log('Dados:', JSON.stringify(data, null, 2));

      const token = await this.getStoredToken();
      if (!token) {
        console.log('❌ Token não encontrado');
        return { success: false, error: 'Token não encontrado' };
      }

      const url = `${supabaseUrl}/functions/v1/link-pagamentos/${linkId}`;
      
      console.log('📤 === REQUISIÇÃO ATUALIZAR LINK ===');
      console.log('Método: PATCH');
      console.log('URL:', url);
      console.log('Headers:', {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token.substring(0, 20)}...`
      });
      console.log('Body:', JSON.stringify(data, null, 2));
      
      const response = await fetch(url, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      
      console.log('📥 === RESPOSTA ATUALIZAR LINK ===');
      console.log('Status:', response.status);
      console.log('Data:', JSON.stringify(result, null, 2));

      if (response.ok) {
        console.log('✅ === LINK ATUALIZADO COM SUCESSO ===');
        return {
          success: true,
          data: result,
        };
      } else {
        console.log('❌ === ERRO AO ATUALIZAR LINK ===');
        console.log('Erro:', result.error || 'Erro desconhecido');
        return {
          success: false,
          error: result.error || 'Erro ao atualizar link de pagamento',
        };
      }
    } catch (error) {
      console.log('💥 === ERRO DE CONEXÃO ATUALIZAR ===');
      console.error('Erro:', error);
      
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Erro de conexão',
      };
    }
  }

  // Método para buscar dados de métricas de transações
  async getTransactionMetricsData(startDate?: string, endDate?: string): Promise<ApiResponse<TransactionMetricsData>> {
    try {
      console.log('📊 === BUSCANDO MÉTRICAS DE TRANSAÇÕES ===');
      
      const token = await this.getStoredToken();
      if (!token) {
        console.log('❌ Token não encontrado');
        return { success: false, error: 'Token não encontrado' };
      }

      // Usar datas fornecidas ou calcular período padrão (30 dias)
      let startDateStr: string;
      let endDateStr: string;

      if (startDate && endDate) {
        startDateStr = startDate;
        endDateStr = endDate;
        console.log('📅 Usando período fornecido:', startDateStr, 'até', endDateStr);
      } else {
        const endDate = new Date();
        const startDate = new Date();
        startDate.setDate(startDate.getDate() - 30);

        startDateStr = startDate.toISOString().split('T')[0];
        endDateStr = endDate.toISOString().split('T')[0];
        console.log('📅 Usando período padrão (30 dias):', startDateStr, 'até', endDateStr);
      }

      const dashboardResponse = await this.getDashboardData(startDateStr, endDateStr);
      
      if (dashboardResponse.success && dashboardResponse.data) {
        const data = dashboardResponse.data;
        
        // Calcular métricas baseadas nos dados do dashboard
        const transactionMetrics: TransactionMetricsData = {
          // Vendas Aprovadas - VALORES EM DINHEIRO
          approvedPixSales: data.sumPixPaid || 0,
          approvedCardSales: data.sumCardPaid || 0,
          approvedBoletoSales: data.sumBoletoPaid || 0,
          totalApprovedSales: (data.countPixPaid || 0) + (data.countCardPaid || 0) + (data.countBoletoPaid || 0),
          totalApprovedAmount: (data.sumPixPaid || 0) + (data.sumCardPaid || 0) + (data.sumBoletoPaid || 0),
          
          // Vendas Abandonadas - VALORES EM DINHEIRO (calculado como total - aprovadas)
          abandonedPixSales: (data.sumPix || 0) - (data.sumPixPaid || 0),
          abandonedCardSales: (data.sumCard || 0) - (data.sumCardPaid || 0),
          abandonedBoletoSales: (data.sumBoleto || 0) - (data.sumBoletoPaid || 0),
          totalAbandonedSales: (data.countTotal || 0) - (data.countPaid || 0),
          totalAbandonedAmount: (data.sumPix || 0) + (data.sumCard || 0) + (data.sumBoleto || 0) - (data.sumPaid || 0),
          
          // Comissões (estimativa baseada em 2% das vendas aprovadas)
          pixCommission: Math.round((data.sumPixPaid || 0) * 0.02),
          cardCommission: Math.round((data.sumCardPaid || 0) * 0.02),
          boletoCommission: Math.round((data.sumBoletoPaid || 0) * 0.02),
          totalCommission: Math.round(((data.sumPixPaid || 0) + (data.sumCardPaid || 0) + (data.sumBoletoPaid || 0)) * 0.02),
          
          // Estornos - VALORES EM DINHEIRO
          pixRefunds: data.sumRefunded || 0, // Usando o total de estornos
          cardRefunds: data.sumRefunded || 0, // Usando o total de estornos
          boletoRefunds: data.sumRefunded || 0, // Usando o total de estornos
          totalRefunds: data.sumRefunded || 0,
        };

        console.log('✅ === MÉTRICAS DE TRANSAÇÕES OBTIDAS ===');
        console.log('✅ Vendas Aprovadas (quantidade):', transactionMetrics.totalApprovedSales);
        console.log('💰 Valor Aprovado (centavos):', transactionMetrics.totalApprovedAmount);
        console.log('💰 Valor Aprovado (R$):', (transactionMetrics.totalApprovedAmount / 100).toFixed(2));
        console.log('  - PIX Aprovado (centavos):', transactionMetrics.approvedPixSales);
        console.log('  - PIX Aprovado (R$):', (transactionMetrics.approvedPixSales / 100).toFixed(2));
        console.log('  - Cartão Aprovado (centavos):', transactionMetrics.approvedCardSales);
        console.log('  - Cartão Aprovado (R$):', (transactionMetrics.approvedCardSales / 100).toFixed(2));
        console.log('  - Boleto Aprovado (centavos):', transactionMetrics.approvedBoletoSales);
        console.log('  - Boleto Aprovado (R$):', (transactionMetrics.approvedBoletoSales / 100).toFixed(2));
        console.log('❌ Vendas Abandonadas (quantidade):', transactionMetrics.totalAbandonedSales);
        console.log('💰 Valor Abandonado (centavos):', transactionMetrics.totalAbandonedAmount);
        console.log('💰 Valor Abandonado (R$):', (transactionMetrics.totalAbandonedAmount / 100).toFixed(2));
        console.log('  - PIX Abandonado (centavos):', transactionMetrics.abandonedPixSales);
        console.log('  - PIX Abandonado (R$):', (transactionMetrics.abandonedPixSales / 100).toFixed(2));
        console.log('  - Cartão Abandonado (centavos):', transactionMetrics.abandonedCardSales);
        console.log('  - Cartão Abandonado (R$):', (transactionMetrics.abandonedCardSales / 100).toFixed(2));
        console.log('  - Boleto Abandonado (centavos):', transactionMetrics.abandonedBoletoSales);
        console.log('  - Boleto Abandonado (R$):', (transactionMetrics.abandonedBoletoSales / 100).toFixed(2));
        console.log('💸 Comissão Total (centavos):', transactionMetrics.totalCommission);
        console.log('💸 Comissão Total (R$):', (transactionMetrics.totalCommission / 100).toFixed(2));
        console.log('  - Comissão PIX (centavos):', transactionMetrics.pixCommission);
        console.log('  - Comissão PIX (R$):', (transactionMetrics.pixCommission / 100).toFixed(2));
        console.log('  - Comissão Cartão (centavos):', transactionMetrics.cardCommission);
        console.log('  - Comissão Cartão (R$):', (transactionMetrics.cardCommission / 100).toFixed(2));
        console.log('  - Comissão Boleto (centavos):', transactionMetrics.boletoCommission);
        console.log('  - Comissão Boleto (R$):', (transactionMetrics.boletoCommission / 100).toFixed(2));
        console.log('🔄 Estornos Total (centavos):', transactionMetrics.totalRefunds);
        console.log('🔄 Estornos Total (R$):', (transactionMetrics.totalRefunds / 100).toFixed(2));
        
        return {
          success: true,
          data: transactionMetrics,
        };
      } else {
        return {
          success: false,
          error: dashboardResponse.error || 'Erro ao buscar métricas de transações',
        };
      }
    } catch (error) {
      console.log('💥 === ERRO DE CONEXÃO MÉTRICAS ===');
      console.error('Erro:', error);
      
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Erro de conexão',
      };
    }
  }

  // Método para buscar detalhes de um link de pagamento específico
  async getPaymentLinkDetails(linkId: string): Promise<ApiResponse<PaymentLink>> {
    try {
      console.log('🔍 === BUSCANDO DETALHES DO LINK ===');
      console.log('Link ID:', linkId);

      const token = await this.getStoredToken();
      if (!token) {
        console.log('❌ Token não encontrado');
        return { success: false, error: 'Token não encontrado' };
      }

      const url = `${supabaseUrl}/functions/v1/link-pagamento-view/${linkId}`;
      
      console.log('📤 === REQUISIÇÃO DETALHES LINK ===');
      console.log('Método: GET');
      console.log('URL:', url);
      console.log('Headers:', {
        'Authorization': `Bearer ${token.substring(0, 20)}...`
      });
      
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      const result = await response.json();
      
      console.log('📥 === RESPOSTA DETALHES LINK ===');
      console.log('Status:', response.status);
      console.log('Data:', JSON.stringify(result, null, 2));

      if (response.ok) {
        console.log('✅ === DETALHES DO LINK OBTIDOS ===');
        return {
          success: true,
          data: result,
        };
      } else {
        console.log('❌ === ERRO AO BUSCAR DETALHES ===');
        console.log('Erro:', result.error || 'Erro desconhecido');
        return {
          success: false,
          error: result.error || 'Erro ao buscar detalhes do link',
        };
      }
    } catch (error) {
      console.log('💥 === ERRO DE CONEXÃO DETALHES ===');
      console.error('Erro:', error);
      
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Erro de conexão',
      };
    }
  }

  // Método para fazer logout
  async logout(): Promise<void> {
    try {
      console.log('🚪 === INICIANDO LOGOUT ===');
      
      // Usar método de limpeza de cache
      await this.clearTokenCache();
      
      console.log('✅ Logout concluído com sucesso');
    } catch (error) {
      console.error('❌ Erro ao fazer logout:', error);
    }
  }

  // Método para obter token armazenado
  async getStoredToken(): Promise<string | null> {
    try {
      // Sempre buscar diretamente do SecureStore para garantir token atual
      const token = await SecureStore.getItemAsync('access_token');
      
      if (token) {
        // Atualizar token em memória apenas se encontrado
        this.accessToken = token;
        console.log('🔑 Token obtido do SecureStore');
        return token;
      } else {
        // Garantir que não há token em memória se não encontrado
        this.accessToken = null;
        console.log('❌ Token não encontrado no SecureStore');
        return null;
      }
    } catch (error) {
      console.error('❌ Erro ao obter token:', error);
      this.accessToken = null;
      return null;
    }
  }

  // Método para verificar se o usuário está autenticado
  async isAuthenticated(): Promise<boolean> {
    try {
      console.log('🔍 === VERIFICANDO AUTENTICAÇÃO ===');
      
      // Primeiro validar e limpar tokens órfãos
      await this.validateAndCleanTokens();
      
      // Buscar token diretamente do SecureStore
      const token = await SecureStore.getItemAsync('access_token');
      
      if (!token) {
        console.log('❌ Token não encontrado no SecureStore');
        // Garantir que não há token em memória
        this.accessToken = null;
        return false;
      }
      
      // Verificar se o token não está expirado (verificação básica)
      try {
        const tokenData = JSON.parse(atob(token.split('.')[1]));
        const currentTime = Math.floor(Date.now() / 1000);
        
        if (tokenData.exp && tokenData.exp < currentTime) {
          console.log('❌ Token expirado, removendo...');
          await this.clearTokenCache();
          return false;
        }
        
        console.log('✅ Token válido encontrado');
        this.accessToken = token;
        return true;
      } catch (parseError) {
        console.log('❌ Token inválido, removendo...');
        await this.clearTokenCache();
        return false;
      }
    } catch (error) {
      console.log('❌ Erro ao verificar autenticação:', error);
      // Em caso de erro, limpar tokens
      await this.clearTokenCache();
      return false;
    }
  }

  // Método para limpar cache de tokens
  async clearTokenCache(): Promise<void> {
    try {
      console.log('🧹 === LIMPANDO CACHE DE TOKENS ===');
      
      // Limpar token em memória PRIMEIRO
      this.accessToken = null;
      console.log('🗑️ Token em memória removido');
      
      // Remover TODOS os tokens do SecureStore
      await SecureStore.deleteItemAsync('access_token');
      await SecureStore.deleteItemAsync('refresh_token');
      await SecureStore.deleteItemAsync('user_id');
      
      console.log('🗑️ Tokens removidos do SecureStore');
      console.log('✅ Cache de tokens completamente limpo');
    } catch (error) {
      console.error('❌ Erro ao limpar cache de tokens:', error);
      // Mesmo com erro, garantir que token em memória está limpo
      this.accessToken = null;
    }
  }

  // Método para verificar e limpar tokens órfãos
  async validateAndCleanTokens(): Promise<void> {
    try {
      console.log('🔍 === VALIDANDO TOKENS ===');
      
      const accessToken = await SecureStore.getItemAsync('access_token');
      const refreshToken = await SecureStore.getItemAsync('refresh_token');
      const userId = await SecureStore.getItemAsync('user_id');
      
      // Se há token mas não há user_id, limpar tudo
      if (accessToken && !userId) {
        console.log('⚠️ Token órfão encontrado (sem user_id), removendo...');
        await this.clearTokenCache();
        return;
      }
      
      // Se há user_id mas não há token, limpar tudo
      if (userId && !accessToken) {
        console.log('⚠️ User ID órfão encontrado (sem token), removendo...');
        await this.clearTokenCache();
        return;
      }
      
      // Se há token, verificar se está válido
      if (accessToken) {
        try {
          const tokenData = JSON.parse(atob(accessToken.split('.')[1]));
          const currentTime = Math.floor(Date.now() / 1000);
          
          if (tokenData.exp && tokenData.exp < currentTime) {
            console.log('⚠️ Token expirado encontrado, removendo...');
            await this.clearTokenCache();
            return;
          }
          
          console.log('✅ Tokens válidos encontrados');
        } catch (parseError) {
          console.log('⚠️ Token inválido encontrado, removendo...');
          await this.clearTokenCache();
          return;
        }
      }
      
      console.log('✅ Validação de tokens concluída');
    } catch (error) {
      console.error('❌ Erro ao validar tokens:', error);
      // Em caso de erro, limpar tudo
      await this.clearTokenCache();
    }
  }



  // Métodos para Chaves PIX
  async getPixKeys(): Promise<ApiResponse<PixKey[]>> {
    try {
      const token = await this.getStoredToken();
      if (!token) {
        return { success: false, error: 'Token não encontrado' };
      }

      console.log('🔑 === BUSCANDO CHAVES PIX ===');
      console.log('📤 === REQUISIÇÃO CHAVES PIX ===');
      console.log('Método: GET');
      console.log('URL:', `${supabaseUrl}/functions/v1/pix-key`);
      console.log('Headers:', { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' });

      const response = await fetch(`${supabaseUrl}/functions/v1/pix-key`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      console.log('📥 === RESPOSTA CHAVES PIX ===');
      console.log('Status:', response.status);

      const data = await response.json();
      console.log('Data:', data);

      if (response.ok) {
        return { success: true, data: data.data || [] };
      } else {
        return { success: false, error: data.error || 'Erro ao buscar chaves PIX' };
      }
    } catch (error) {
      console.log('💥 === ERRO INESPERADO CHAVES PIX ===');
      console.log('Erro:', error);
      return { success: false, error: 'Erro inesperado ao buscar chaves PIX' };
    }
  }

  async createPixKey(pixKeyData: CreatePixKeyData): Promise<ApiResponse<PixKey>> {
    try {
      const token = await this.getStoredToken();
      if (!token) {
        return { success: false, error: 'Token não encontrado' };
      }

      console.log('🔑 === CRIANDO CHAVE PIX ===');
      console.log('📤 === REQUISIÇÃO CRIAR CHAVE PIX ===');
      console.log('Método: POST');
      console.log('URL:', `${supabaseUrl}/functions/v1/pix-key`);
      console.log('Headers:', { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' });
      console.log('Body:', pixKeyData);

      const response = await fetch(`${supabaseUrl}/functions/v1/pix-key`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(pixKeyData),
      });

      console.log('📥 === RESPOSTA CRIAR CHAVE PIX ===');
      console.log('Status:', response.status);

      const data = await response.json();
      console.log('Data:', data);

      if (response.ok) {
        return { success: true, data: data.data || data };
      } else {
        return { success: false, error: data.error || 'Erro ao criar chave PIX' };
      }
    } catch (error) {
      console.log('💥 === ERRO INESPERADO CRIAR CHAVE PIX ===');
      console.log('Erro:', error);
      return { success: false, error: 'Erro inesperado ao criar chave PIX' };
    }
  }

  async updatePixKey(id: string, pixKeyData: UpdatePixKeyData): Promise<ApiResponse<PixKey>> {
    try {
      const token = await this.getStoredToken();
      if (!token) {
        return { success: false, error: 'Token não encontrado' };
      }

      console.log('🔑 === ATUALIZANDO CHAVE PIX ===');
      console.log('📤 === REQUISIÇÃO ATUALIZAR CHAVE PIX ===');
      console.log('Método: PUT');
      console.log('URL:', `${supabaseUrl}/functions/v1/pix-key/${id}`);
      console.log('Headers:', { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' });
      console.log('Body:', pixKeyData);

      const response = await fetch(`${supabaseUrl}/functions/v1/pix-key/${id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(pixKeyData),
      });

      console.log('📥 === RESPOSTA ATUALIZAR CHAVE PIX ===');
      console.log('Status:', response.status);

      const data = await response.json();
      console.log('Data:', data);

      if (response.ok) {
        return { success: true, data: data.data || data };
      } else {
        return { success: false, error: data.error || 'Erro ao atualizar chave PIX' };
      }
    } catch (error) {
      console.log('💥 === ERRO INESPERADO ATUALIZAR CHAVE PIX ===');
      console.log('Erro:', error);
      return { success: false, error: 'Erro inesperado ao atualizar chave PIX' };
    }
  }

  async deletePixKey(id: string): Promise<ApiResponse<boolean>> {
    try {
      const token = await this.getStoredToken();
      if (!token) {
        return { success: false, error: 'Token não encontrado' };
      }

      console.log('🔑 === EXCLUINDO CHAVE PIX ===');
      
      // Primeiro, tentar DELETE direto
      console.log('📤 === TENTATIVA 1: DELETE DIRETO ===');
      console.log('Método: DELETE');
      console.log('URL:', `${supabaseUrl}/functions/v1/pix-key/${id}`);
      
      const deleteResponse = await fetch(`${supabaseUrl}/functions/v1/pix-key/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      console.log('📥 === RESPOSTA DELETE ===');
      console.log('Status:', deleteResponse.status);

      if (deleteResponse.ok) {
        const deleteData = await deleteResponse.json();
        console.log('Data:', deleteData);
        return { success: true, data: true };
      }

      // Se DELETE falhar, tentar exclusão lógica via PUT
      if (deleteResponse.status === 404) {
        console.log('❌ === DELETE NÃO DISPONÍVEL, TENTANDO EXCLUSÃO LÓGICA ===');
        console.log('📤 === TENTATIVA 2: PUT PARA DESATIVAR ===');
        console.log('Método: PUT');
        console.log('URL:', `${supabaseUrl}/functions/v1/pix-key/${id}`);
        
        const putResponse = await fetch(`${supabaseUrl}/functions/v1/pix-key/${id}`, {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            active: false,
            deleted: true
          }),
        });

        console.log('📥 === RESPOSTA PUT ===');
        console.log('Status:', putResponse.status);

        const putData = await putResponse.json();
        console.log('Data:', putData);

        if (putResponse.ok) {
          return { success: true, data: true };
        } else {
          return { success: false, error: putData.error || 'Erro ao desativar chave PIX' };
        }
      }

      const deleteData = await deleteResponse.json();
      console.log('Data:', deleteData);
      return { success: false, error: deleteData.error || 'Erro ao excluir chave PIX' };
      
    } catch (error) {
      console.log('💥 === ERRO INESPERADO EXCLUIR CHAVE PIX ===');
      console.log('Erro:', error);
      return { success: false, error: 'Erro inesperado ao excluir chave PIX' };
    }
  }



  // Métodos para Saques
  async createWithdrawal(withdrawalData: CreateWithdrawalData): Promise<ApiResponse<Withdrawal>> {
    try {
      const token = await this.getStoredToken();
      if (!token) {
        return { success: false, error: 'Token não encontrado' };
      }

      console.log('💰 === CRIANDO SAQUE ===');
      console.log('📤 === REQUISIÇÃO CRIAR SAQUE ===');
      console.log('Método: POST');
      console.log('URL:', `${supabaseUrl}/functions/v1/withdrawals`);
      console.log('Headers:', { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' });
      console.log('Body:', withdrawalData);

      const response = await fetch(`${supabaseUrl}/functions/v1/withdrawals`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(withdrawalData),
      });

      console.log('📥 === RESPOSTA CRIAR SAQUE ===');
      console.log('Status:', response.status);

      const data = await response.json();
      console.log('Data:', data);

      if (response.ok) {
        return { success: true, data: data.data || data };
      } else {
        return { success: false, error: data.error || 'Erro ao criar saque' };
      }
    } catch (error) {
      console.log('💥 === ERRO INESPERADO CRIAR SAQUE ===');
      console.log('Erro:', error);
      return { success: false, error: 'Erro inesperado ao criar saque' };
    }
  }

  // Métodos para Configurações
  async getUserData(userId: string): Promise<ApiResponse<UserData>> {
    try {
      const token = await this.getStoredToken();
      if (!token) {
        return { success: false, error: 'Token não encontrado' };
      }

      console.log('👤 === BUSCANDO DADOS DO USUÁRIO ===');
      console.log('📤 === REQUISIÇÃO DADOS DO USUÁRIO ===');
      console.log('Método: GET');
      console.log('URL:', `${supabaseUrl}/functions/v1/users/${userId}`);
      console.log('Headers:', { Authorization: `Bearer ${token}` });

      const response = await fetch(`${supabaseUrl}/functions/v1/users/${userId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      console.log('📥 === RESPOSTA DADOS DO USUÁRIO ===');
      console.log('Status:', response.status);

      const data = await response.json();
      console.log('Data:', data);

      if (response.ok) {
        return { success: true, data: data.data || data };
      } else {
        return { success: false, error: data.error || 'Erro ao buscar dados do usuário' };
      }
    } catch (error) {
      console.log('💥 === ERRO INESPERADO BUSCAR DADOS DO USUÁRIO ===');
      console.log('Erro:', error);
      return { success: false, error: 'Erro inesperado ao buscar dados do usuário' };
    }
  }

  async updateUserData(userId: string, userData: Partial<UserData>): Promise<ApiResponse<UserData>> {
    try {
      const token = await this.getStoredToken();
      if (!token) {
        return { success: false, error: 'Token não encontrado' };
      }

      console.log('✏️ === ATUALIZANDO DADOS DO USUÁRIO ===');
      console.log('📤 === REQUISIÇÃO ATUALIZAR USUÁRIO ===');
      console.log('Método: PATCH');
      console.log('URL:', `${supabaseUrl}/functions/v1/users/${userId}/edit`);
      console.log('Headers:', { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' });
      console.log('Body:', userData);

      const response = await fetch(`${supabaseUrl}/functions/v1/users/${userId}/edit`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      console.log('📥 === RESPOSTA ATUALIZAR USUÁRIO ===');
      console.log('Status:', response.status);

      const data = await response.json();
      console.log('Data:', data);

      if (response.ok) {
        return { success: true, data: data.data || data };
      } else {
        return { success: false, error: data.error || 'Erro ao atualizar dados do usuário' };
      }
    } catch (error) {
      console.log('💥 === ERRO INESPERADO ATUALIZAR USUÁRIO ===');
      console.log('Erro:', error);
      return { success: false, error: 'Erro inesperado ao atualizar dados do usuário' };
    }
  }

  async getCompanyData(): Promise<ApiResponse<CompanyData>> {
    try {
      const token = await this.getStoredToken();
      if (!token) {
        return { success: false, error: 'Token não encontrado' };
      }

      console.log('🏢 === BUSCANDO DADOS DA EMPRESA ===');
      console.log('📤 === REQUISIÇÃO DADOS DA EMPRESA ===');
      console.log('Método: GET');
      console.log('URL:', `${supabaseUrl}/functions/v1/config-companie-view`);
      console.log('Headers:', { Authorization: `Bearer ${token}` });

      const response = await fetch(`${supabaseUrl}/functions/v1/config-companie-view`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      console.log('📥 === RESPOSTA DADOS DA EMPRESA ===');
      console.log('Status:', response.status);

      const data = await response.json();
      console.log('Data:', data);

      if (response.ok) {
        return { success: true, data: data.data || data };
      } else {
        return { success: false, error: data.error || 'Erro ao buscar dados da empresa' };
      }
    } catch (error) {
      console.log('💥 === ERRO INESPERADO BUSCAR DADOS DA EMPRESA ===');
      console.log('Erro:', error);
      return { success: false, error: 'Erro inesperado ao buscar dados da empresa' };
    }
  }

  async getCompanyRates(companyId: string): Promise<ApiResponse<CompanyRates>> {
    try {
      const token = await this.getStoredToken();
      if (!token) {
        return { success: false, error: 'Token não encontrado' };
      }

      console.log('💰 === BUSCANDO TAXAS DA EMPRESA ===');
      console.log('📤 === REQUISIÇÃO TAXAS DA EMPRESA ===');
      console.log('Método: GET');
      console.log('URL:', `${supabaseUrl}/functions/v1/companies/${companyId}/taxas`);
      console.log('Headers:', { Authorization: `Bearer ${token}` });

      const response = await fetch(`${supabaseUrl}/functions/v1/companies/${companyId}/taxas`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      console.log('📥 === RESPOSTA TAXAS DA EMPRESA ===');
      console.log('Status:', response.status);

      const data = await response.json();
      console.log('Data:', data);

      if (response.ok) {
        // A resposta da API pode vir aninhada em um campo 'taxas'
        const taxasData = data.taxas || data.data || data;
        return { success: true, data: taxasData };
      } else {
        return { success: false, error: data.error || 'Erro ao buscar taxas da empresa' };
      }
    } catch (error) {
      console.log('💥 === ERRO INESPERADO BUSCAR TAXAS DA EMPRESA ===');
      console.log('Erro:', error);
      return { success: false, error: 'Erro inesperado ao buscar taxas da empresa' };
    }
  }

  async simulateTaxes(simulationData: TaxSimulationRequest): Promise<ApiResponse<TaxSimulationResponse>> {
    try {
      const token = await this.getStoredToken();
      if (!token) {
        return { success: false, error: 'Token não encontrado' };
      }

      console.log('🧮 === SIMULANDO TAXAS ===');
      console.log('📤 === REQUISIÇÃO SIMULAR TAXAS ===');
      console.log('Método: POST');
      console.log('URL:', `${supabaseUrl}/functions/v1/taxas`);
      console.log('Headers:', { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' });
      console.log('Body:', simulationData);

      const response = await fetch(`${supabaseUrl}/functions/v1/taxas`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(simulationData),
      });

      console.log('📥 === RESPOSTA SIMULAR TAXAS ===');
      console.log('Status:', response.status);

      const data = await response.json();
      console.log('Data:', data);

      if (response.ok) {
        return { success: true, data: data.data || data };
      } else {
        return { success: false, error: data.error || 'Erro ao simular taxas' };
      }
    } catch (error) {
      console.log('💥 === ERRO INESPERADO SIMULAR TAXAS ===');
      console.log('Erro:', error);
      return { success: false, error: 'Erro inesperado ao simular taxas' };
    }
  }

  // Método para buscar dados de uma chave PIX cadastrada
  async getPixKeyData(pixKey: string): Promise<ApiResponse<any>> {
    try {
      console.log('🔍 === BUSCANDO DADOS DA CHAVE PIX ===');
      console.log('🔑 Chave PIX:', pixKey);
      
      const token = await this.getStoredToken();
      if (!token) {
        console.log('❌ Token não encontrado');
        return { success: false, error: 'Token não encontrado' };
      }

      // Buscar todas as chaves PIX cadastradas
      const url = `${supabaseUrl}/functions/v1/pix-key`;
      
      console.log('📤 === BUSCANDO CHAVES PIX CADASTRADAS ===');
      console.log('Método: GET');
      console.log('URL:', url);
      console.log('Headers:', {
        'Authorization': `Bearer ${token.substring(0, 20)}...`
      });
      
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      
      console.log('📥 === RESPOSTA CHAVES PIX ===');
      console.log('Status:', response.status);
      console.log('Data:', JSON.stringify(data, null, 2));

      if (response.ok && data && data.data) {
        // Procurar pela chave PIX específica
        const pixKeyData = data.data.find((key: any) => key.key === pixKey);
        
        if (pixKeyData) {
          console.log('✅ === CHAVE PIX ENCONTRADA ===');
          console.log('ID:', pixKeyData.id);
          console.log('Tipo:', pixKeyData.type);
          console.log('Descrição:', pixKeyData.description);
          
          // Retornar dados do beneficiário baseado na chave encontrada
          const beneficiaryData = {
            name: pixKeyData.companyName || 'Beneficiário',
            document: pixKeyData.companyTaxId || pixKeyData.key,
            bank: pixKeyData.description || 'Banco',
            accountType: 'Conta Corrente',
            isValid: pixKeyData.v || false,
            pixKey: pixKeyData.key,
            pixKeyType: pixKeyData.type,
            pixKeyId: pixKeyData.id
          };

          console.log('📥 === DADOS DO BENEFICIÁRIO ===');
          console.log('Data:', JSON.stringify(beneficiaryData, null, 2));

          console.log('✅ === DADOS OBTIDOS ===');
          console.log('👤 Nome:', beneficiaryData.name);
          console.log('📄 Documento:', beneficiaryData.document);
          console.log('🏦 Banco:', beneficiaryData.bank);
          
          return {
            success: true,
            data: beneficiaryData,
          };
        } else {
          console.log('❌ === CHAVE PIX NÃO ENCONTRADA ===');
          return {
            success: false,
            error: 'Chave PIX não encontrada. Verifique se a chave está cadastrada.',
          };
        }
      } else {
        console.log('❌ === ERRO AO BUSCAR CHAVES PIX ===');
        console.log('Erro:', data.error || 'Erro desconhecido');
        
        return {
          success: false,
          error: data.error || 'Erro ao buscar chaves PIX',
        };
      }
    } catch (error) {
      console.log('💥 === ERRO DE CONEXÃO BUSCA PIX ===');
      console.error('Erro:', error);
      
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Erro de conexão',
      };
    }
  }

  // Método auxiliar para determinar o tipo da chave PIX
  private getPixKeyType(pixKey: string): string {
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(pixKey);
    const isValidCPF = /^\d{11}$/.test(pixKey);
    const isValidCNPJ = /^\d{14}$/.test(pixKey);
    const isValidPhone = /^\d{10,11}$/.test(pixKey);
    const isValidRandomKey = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(pixKey);

    if (isValidEmail) return 'EMAIL';
    if (isValidCPF) return 'CPF';
    if (isValidCNPJ) return 'CNPJ';
    if (isValidPhone) return 'PHONE';
    if (isValidRandomKey) return 'RANDOM';
    return 'UNKNOWN';
  }
}

// Instância única da API
export const api = new KingPayAPI();

export default api;

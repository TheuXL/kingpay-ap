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

export interface ManagementData {
  // Dados de formas de pagamento
  pixSales: number;
  cardSales: number;
  boletoSales: number;
  totalSales: number;
  
  // Dados de vendas
  totalTransactions: number;
  averageTicket: number;
  
  // Dados de aprovação
  pixApprovalRate: number;
  cardApprovalRate: number;
  boletoApprovalRate: number;
  
  // Dados de reembolsos
  refunds: number;
  chargebacks: number;
  
  // Dados de links
  activeLinks: number;
  linkSales: number;
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
  key_type: string;
  key_value: string;
  description?: string;
  status: 'active' | 'inactive';
  created_at: string;
  updated_at: string;
}

export interface CreatePixKeyData {
  key_type: string;
  key_value: string;
  description?: string;
}

export interface UpdatePixKeyData {
  key_type?: string;
  key_value?: string;
  description?: string;
  status?: 'active' | 'inactive';
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
      console.log('🏢 Company ID:', companyId || 'N/A');
      
      const token = await this.getStoredToken();
      if (!token) {
        console.log('❌ Token não encontrado');
        return { success: false, error: 'Token não encontrado' };
      }

      const params = new URLSearchParams({
        start_date: startDate,
        end_date: endDate,
        ...(companyId && { company_id: companyId })
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

      // Usar dados do dashboard para a carteira
      const endDate = new Date();
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - 30);

      const startDateStr = startDate.toISOString().split('T')[0];
      const endDateStr = endDate.toISOString().split('T')[0];

      const dashboardResponse = await this.getDashboardData(startDateStr, endDateStr);
      
      if (dashboardResponse.success && dashboardResponse.data) {
        // Mapear dados do dashboard para a carteira (sem dados mockados)
        const walletData: WalletData = {
          saldoPix: dashboardResponse.data.sumPixPaid || 0,
          saldoCartao: dashboardResponse.data.sumCardPaid || 0,
          valorReceber: dashboardResponse.data.sumPending || 0,
          reservaFinanceira: dashboardResponse.data.sumValorLiquido || 0,
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
        return {
          success: false,
          error: dashboardResponse.error || 'Erro ao buscar dados da carteira',
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

  // Método para buscar dados de gestão
  async getManagementData(): Promise<ApiResponse<ManagementData>> {
    try {
      console.log('📊 === BUSCANDO DADOS DE GESTÃO ===');
      
      const token = await this.getStoredToken();
      if (!token) {
        console.log('❌ Token não encontrado');
        return { success: false, error: 'Token não encontrado' };
      }

      // Buscar dados do dashboard
      const endDate = new Date();
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - 30);

      const startDateStr = startDate.toISOString().split('T')[0];
      const endDateStr = endDate.toISOString().split('T')[0];

      const dashboardResponse = await this.getDashboardData(startDateStr, endDateStr);
      
      if (dashboardResponse.success && dashboardResponse.data) {
        // Buscar links de pagamento
        const linksResponse = await this.getPaymentLinks();
        
        const managementData: ManagementData = {
          // Dados de formas de pagamento
          pixSales: dashboardResponse.data.sumPix || 0,
          cardSales: dashboardResponse.data.sumCard || 0,
          boletoSales: dashboardResponse.data.sumBoleto || 0,
          totalSales: (dashboardResponse.data.sumPix || 0) + (dashboardResponse.data.sumCard || 0) + (dashboardResponse.data.sumBoleto || 0),
          
          // Dados de vendas
          totalTransactions: dashboardResponse.data.countTotal || 0,
          averageTicket: dashboardResponse.data.ticketMedio || 0,
          
          // Dados de aprovação
          pixApprovalRate: dashboardResponse.data.conversionPix || 0,
          cardApprovalRate: dashboardResponse.data.conversionCard || 0,
          boletoApprovalRate: dashboardResponse.data.conversionBoleto || 0,
          
          // Dados de reembolsos
          refunds: dashboardResponse.data.sumRefunded || 0,
          chargebacks: dashboardResponse.data.sumChargedback || 0,
          
          // Dados de links
          activeLinks: linksResponse.success ? linksResponse.data?.filter(link => link.ativo).length || 0 : 0,
          linkSales: dashboardResponse.data.countTotal || 0, // Número total de transações (vendas)
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
          error: dashboardResponse.error || 'Erro ao buscar dados de gestão',
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
  async getPaymentLinks(): Promise<ApiResponse<PaymentLink[]>> {
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

      // Construir URL com filtro por company
      const url = `${supabaseUrl}/functions/v1/link-pagamentos?company=${companyId}`;
      
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
        console.log('Erro:', result.error || 'Erro desconhecido');
        return {
          success: false,
          error: result.error || 'Erro ao criar link de pagamento',
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
  async getTransactionMetricsData(): Promise<ApiResponse<TransactionMetricsData>> {
    try {
      console.log('📊 === BUSCANDO MÉTRICAS DE TRANSAÇÕES ===');
      
      const token = await this.getStoredToken();
      if (!token) {
        console.log('❌ Token não encontrado');
        return { success: false, error: 'Token não encontrado' };
      }

      // Buscar dados do dashboard
      const endDate = new Date();
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - 30);

      const startDateStr = startDate.toISOString().split('T')[0];
      const endDateStr = endDate.toISOString().split('T')[0];

      const dashboardResponse = await this.getDashboardData(startDateStr, endDateStr);
      
      if (dashboardResponse.success && dashboardResponse.data) {
        const data = dashboardResponse.data;
        
        // Calcular métricas baseadas nos dados do dashboard
        const transactionMetrics: TransactionMetricsData = {
          // Vendas Aprovadas
          approvedPixSales: data.countPixPaid || 0,
          approvedCardSales: data.countCardPaid || 0,
          approvedBoletoSales: data.countBoletoPaid || 0,
          totalApprovedSales: (data.countPixPaid || 0) + (data.countCardPaid || 0) + (data.countBoletoPaid || 0),
          totalApprovedAmount: (data.sumPixPaid || 0) + (data.sumCardPaid || 0) + (data.sumBoletoPaid || 0),
          
          // Vendas Abandonadas (calculado como total - aprovadas)
          abandonedPixSales: (data.countPixTotal || 0) - (data.countPixPaid || 0),
          abandonedCardSales: (data.countCardTotal || 0) - (data.countCardPaid || 0),
          abandonedBoletoSales: (data.countBoletoTotal || 0) - (data.countBoletoPaid || 0),
          totalAbandonedSales: (data.countTotal || 0) - (data.countPaid || 0),
          totalAbandonedAmount: (data.sumPix || 0) + (data.sumCard || 0) + (data.sumBoleto || 0) - (data.sumPaid || 0),
          
          // Comissões (estimativa baseada em 2% das vendas aprovadas)
          pixCommission: Math.round((data.sumPixPaid || 0) * 0.02),
          cardCommission: Math.round((data.sumCardPaid || 0) * 0.02),
          boletoCommission: Math.round((data.sumBoletoPaid || 0) * 0.02),
          totalCommission: Math.round(((data.sumPixPaid || 0) + (data.sumCardPaid || 0) + (data.sumBoletoPaid || 0)) * 0.02),
          
          // Estornos
          pixRefunds: data.sumRefunded || 0, // Usando o total de estornos
          cardRefunds: data.sumRefunded || 0, // Usando o total de estornos
          boletoRefunds: data.sumRefunded || 0, // Usando o total de estornos
          totalRefunds: data.sumRefunded || 0,
        };

        console.log('✅ === MÉTRICAS DE TRANSAÇÕES OBTIDAS ===');
        console.log('✅ Vendas Aprovadas:', transactionMetrics.totalApprovedSales);
        console.log('💰 Valor Aprovado:', transactionMetrics.totalApprovedAmount);
        console.log('❌ Vendas Abandonadas:', transactionMetrics.totalAbandonedSales);
        console.log('💰 Valor Abandonado:', transactionMetrics.totalAbandonedAmount);
        console.log('💸 Comissão Total:', transactionMetrics.totalCommission);
        console.log('🔄 Estornos Total:', transactionMetrics.totalRefunds);
        
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
      console.log('📤 === REQUISIÇÃO EXCLUIR CHAVE PIX ===');
      console.log('Método: DELETE');
      console.log('URL:', `${supabaseUrl}/functions/v1/pix-key/${id}`);
      console.log('Headers:', { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' });

      const response = await fetch(`${supabaseUrl}/functions/v1/pix-key/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      console.log('📥 === RESPOSTA EXCLUIR CHAVE PIX ===');
      console.log('Status:', response.status);

      const data = await response.json();
      console.log('Data:', data);

      if (response.ok) {
        return { success: true, data: true };
      } else {
        return { success: false, error: data.error || 'Erro ao excluir chave PIX' };
      }
    } catch (error) {
      console.log('💥 === ERRO INESPERADO EXCLUIR CHAVE PIX ===');
      console.log('Erro:', error);
      return { success: false, error: 'Erro inesperado ao excluir chave PIX' };
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
}

// Instância única da API
export const api = new KingPayAPI();

export default api;

import { FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import { Stack, useRouter } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, ActivityIndicator, RefreshControl, ScrollView, Alert, Modal } from 'react-native';
import * as Clipboard from 'expo-clipboard';
import CelularIcon from '../../images/Area Pix/celular.svg';
import ChaveAleatoriaIcon from '../../images/Area Pix/chave aleatoria.svg';
import CnpjIcon from '../../images/Area Pix/cnpj.svg';
import CpfIcon from '../../images/Area Pix/cpf.svg';
import EmailIcon from '../../images/Area Pix/email.svg';
import CopiarChaveIcon from '../../images/Area Pix/Copiar chave.svg';
import ExcluirChaveIcon from '../../images/Area Pix/excluir chave.svg';
import CloseIcon from '../../images/Area Pix/close.svg';
import CancelarIcon from '../../images/Area Pix/Cancelar.svg';
import ConfirmarIcon from '../../images/Area Pix/Confirmar.svg';
import { usePixKeys } from '../../hooks/usePixKeys';
import { PixKey } from '../../services/api';
import { Colors } from '../../constants/Colors';

const keyIcons = {
  'RANDOM': <ChaveAleatoriaIcon width={60} height={60}/>,
  'PHONE': <CelularIcon width={60} height={60} />,
  'EMAIL': <EmailIcon width={60} height={60} />,
  'CPF': <CpfIcon width={60} height={60} />,
  'CNPJ': <CnpjIcon width={60} height={60} />,
};

const keyTypeLabels = {
  'RANDOM': 'Chave aleatória',
  'PHONE': 'Celular',
  'EMAIL': 'Email',
  'CPF': 'CPF',
  'CNPJ': 'CNPJ',
};

export default function PixArea() {
  const router = useRouter();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedKey, setSelectedKey] = useState<PixKey | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [confirmModalVisible, setConfirmModalVisible] = useState(false);
  const [keyToDelete, setKeyToDelete] = useState<PixKey | null>(null);
  const { pixKeys, isLoading, error, refreshData, deletePixKey } = usePixKeys();

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await refreshData();
    setIsRefreshing(false);
  };

  const getKeyIcon = (type: string) => {
    return keyIcons[type as keyof typeof keyIcons] || <ChaveAleatoriaIcon width={60} height={60}/>;
  };

  const getKeyTypeLabel = (type: string) => {
    return keyTypeLabels[type as keyof typeof keyTypeLabels] || type;
  };

  const handleKeyPress = (key: PixKey) => {
    setSelectedKey(key);
    setModalVisible(true);
  };

  const handleCopyKey = async () => {
    if (!selectedKey) return;

    try {
      await Clipboard.setStringAsync(selectedKey.key);
      Alert.alert('Sucesso', 'Chave PIX copiada para a área de transferência!');
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível copiar a chave PIX.');
    }
  };

  const handleDeleteKey = () => {
    if (selectedKey) {
      setKeyToDelete(selectedKey);
      setModalVisible(false);
      setConfirmModalVisible(true);
    }
  };

  const handleConfirmDelete = async () => {
    if (!keyToDelete) return;

    setIsDeleting(true);
    try {
      // Função de exclusão desabilitada - apenas simular
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simular delay
      
      setConfirmModalVisible(false);
      setKeyToDelete(null);
      Alert.alert(
        'Funcionalidade Indisponível', 
        'A exclusão de chaves PIX não está disponível no momento. Entre em contato com o suporte para mais informações.'
      );
    } catch (error) {
      Alert.alert('Erro', 'Ocorreu um erro inesperado.');
    } finally {
      setIsDeleting(false);
    }
  };

  const handleCancelDelete = () => {
    setConfirmModalVisible(false);
    setKeyToDelete(null);
  };

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('pt-BR') + ' ' + date.toLocaleTimeString('pt-BR', { 
        hour: '2-digit', 
        minute: '2-digit' 
      });
    } catch (error) {
      return 'Data inválida';
    }
  };

  if (isLoading && !isRefreshing) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#2F05E0" />
        <Text style={styles.loadingText}>Carregando chaves PIX...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Erro ao carregar dados</Text>
        <Text style={styles.errorSubtext}>{error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={refreshData}>
          <Text style={styles.retryButtonText}>Tentar novamente</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: 'Área Pix',
          headerShown: true,
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: '#F8F9FA',
          },
          headerTintColor: '#000',
        }}
      />

      <ScrollView
        style={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={handleRefresh} />
        }
      >
        <View style={styles.content}>
          <Text style={styles.title}>Minhas Chaves</Text>
          <Text style={styles.subtitle}>Gerencie suas chaves PIX cadastradas</Text>

          <TouchableOpacity style={styles.registerButton} onPress={() => router.push('/(app)/register-pix-key')}>
            <Text style={styles.registerButtonText}>Registrar nova chave</Text>
            <FontAwesome5 name="plus" size={16} color="white" />
          </TouchableOpacity>

          <View style={styles.infoBox}>
            <MaterialCommunityIcons name="information-outline" size={24} color="#333" style={styles.infoIcon} />
            <Text style={styles.infoText}>
              Cadastre suas chaves PIX para receber transferências instantâneas. Cada tipo de chave pode ser cadastrado apenas uma vez. O limite máximo é de 5 chaves por conta.
            </Text>
          </View>

          <Text style={styles.registeredKeysCount}>
            {pixKeys.length} de 5 chaves registradas
          </Text>

          {pixKeys.length === 0 ? (
            <View style={styles.emptyState}>
              <MaterialCommunityIcons name="key-outline" size={48} color="#6c757d" />
              <Text style={styles.emptyStateText}>Nenhuma chave PIX registrada</Text>
              <Text style={styles.emptyStateSubtext}>
                Clique em "Registrar nova chave" para começar
              </Text>
            </View>
          ) : (
            pixKeys.map((item, index) => (
              <TouchableOpacity key={item.id || index} style={styles.keyItem} onPress={() => handleKeyPress(item)}>
                <View style={styles.keyIconContainer}>
                  {getKeyIcon(item.type)}
                </View>
                <View style={styles.keyDetails}>
                  <Text style={styles.keyType}>{getKeyTypeLabel(item.type)}</Text>
                  <Text style={styles.keyValue}>{item.key}</Text>
                  {item.description && (
                    <Text style={styles.keyDescription}>{item.description}</Text>
                  )}
                  <View style={styles.keyStatus}>
                    <View style={[styles.statusDot, { backgroundColor: item.v ? '#28a745' : '#ffc107' }]} />
                    <Text style={[styles.statusText, { color: item.v ? '#28a745' : '#ffc107' }]}>
                      {item.v ? 'Válida' : 'Pendente'}
                    </Text>
                  </View>
                </View>
                <TouchableOpacity style={styles.moreOptions}>
                  <MaterialCommunityIcons name="dots-vertical" size={24} color="#6c757d" />
                </TouchableOpacity>
              </TouchableOpacity>
            ))
          )}
        </View>
      </ScrollView>

      {/* Modal de Ações */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {/* Handle para arrastar */}
            <View style={styles.modalHandle} />
            
            {/* Botão de fechar */}
            <TouchableOpacity 
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <CloseIcon width={14} height={14} />
            </TouchableOpacity>

            {/* Informações da chave */}
            {selectedKey && (
              <>
                <Text style={styles.modalTitle}>{getKeyTypeLabel(selectedKey.type)}</Text>
                <Text style={styles.modalKeyValue}>{selectedKey.key}</Text>

                {/* Botões de ação */}
                <View style={styles.actionButtons}>
                  <TouchableOpacity style={styles.copyButton} onPress={handleCopyKey}>
                    <CopiarChaveIcon width="100%" height="100%" />
                  </TouchableOpacity>

                  <TouchableOpacity 
                    style={[styles.deleteButton, isDeleting && styles.deleteButtonDisabled]} 
                    onPress={handleDeleteKey}
                    disabled={isDeleting}
                  >
                    <ExcluirChaveIcon width="100%" height="100%" />
                  </TouchableOpacity>
                </View>

                {/* Metadados */}
                <View style={styles.metadata}>
                  <View style={styles.metadataItem}>
                    <Text style={styles.metadataLabel}>Data de criação</Text>
                    <Text style={styles.metadataValue}>{formatDate(selectedKey.createdat)}</Text>
                  </View>
                  <View style={styles.metadataItem}>
                    <Text style={styles.metadataLabel}>Última atualização</Text>
                    <Text style={styles.metadataValue}>{formatDate(selectedKey.updatedat)}</Text>
                  </View>
                </View>
              </>
            )}
          </View>
        </View>
      </Modal>

      {/* Modal de Confirmação de Exclusão */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={confirmModalVisible}
        onRequestClose={handleCancelDelete}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHandle} />
            <TouchableOpacity
              style={styles.closeButton}
              onPress={handleCancelDelete}
            >
              <CloseIcon width={14} height={14} />
            </TouchableOpacity>
            
            <Text style={styles.confirmTitle}>
              Funcionalidade Indisponível
            </Text>
            <Text style={styles.confirmSubtitle}>
              A exclusão de chaves PIX não está disponível no momento. Entre em contato com o suporte para mais informações.
            </Text>
            
            <View style={styles.confirmButtons}>
              <TouchableOpacity 
                style={styles.cancelButton} 
                onPress={handleCancelDelete}
                disabled={isDeleting}
              >
                <CancelarIcon width="100%" height="100%" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  scrollView: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#6c757d',
    marginBottom: 24,
  },
  registerButton: {
    backgroundColor: '#2F05E0',
    paddingVertical: 18,
    borderRadius: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  registerButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 10,
  },
  infoBox: {
    backgroundColor: '#F0F0F0',
    padding: 15,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  infoIcon: {
    marginRight: 10,
  },
  infoText: {
    flex: 1,
    fontSize: 14,
    color: '#333',
  },
  registeredKeysCount: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  keyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    padding: 20,
    borderRadius: 10,
    marginBottom: 10,
  },
  keyIconContainer: {
    marginRight: 15,
  },
  keyDetails: {
    flex: 1,
  },
  keyType: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  keyValue: {
    fontSize: 14,
    color: '#6c757d',
    marginTop: 3,
    flexShrink: 1,
  },
  keyDescription: {
    fontSize: 12,
    color: '#6c757d',
    marginTop: 3,
  },
  keyStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  statusDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 5,
  },
  statusText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  moreOptions: {
    padding: 5,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#6c757d',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#F8F9FA',
  },
  errorText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#dc3545',
    marginBottom: 5,
  },
  errorSubtext: {
    fontSize: 14,
    color: '#6c757d',
    textAlign: 'center',
    marginBottom: 20,
  },
  retryButton: {
    backgroundColor: '#2F05E0',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 30,
  },
  retryButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 50,
    backgroundColor: '#F8F9FA',
  },
  emptyStateText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 15,
  },
  emptyStateSubtext: {
    fontSize: 14,
    color: '#6c757d',
    marginTop: 5,
    textAlign: 'center',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: '#FFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    paddingTop: 10,
    minHeight: 300,
  },
  modalHandle: {
    width: 50,
    height: 5,
    backgroundColor: Colors.blue['04'],
    borderRadius: 5,
    marginBottom: 20,
    alignSelf: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: 15,
    left: 15,
    padding: 5,
    zIndex: 1,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
  },
  modalKeyValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2F05E0',
    marginBottom: 30,
    textAlign: 'center',
  },
  actionButtons: {
    flexDirection: 'column',
    gap: 15,
    marginBottom: 30,
    alignItems: 'center',
  },
  copyButton: {
    width: 350,
    height: 74,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteButton: {
    width: 350,
    height: 74,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteButtonDisabled: {
    opacity: 0.7,
  },
  metadata: {
    width: '100%',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    paddingTop: 20,
  },
  metadataItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  metadataLabel: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
  },
  metadataValue: {
    fontSize: 14,
    color: '#374151',
    fontWeight: '600',
  },
  confirmTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
  },
  confirmSubtitle: {
    fontSize: 14,
    color: '#6c757d',
    marginBottom: 20,
    textAlign: 'center',
  },
  confirmButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
    gap: 20,
  },
  cancelButton: {
    width: 167,
    height: 54,
    justifyContent: 'center',
    alignItems: 'center',
  },
  confirmButton: {
    width: 173,
    height: 54,
    justifyContent: 'center',
    alignItems: 'center',
  },
  confirmButtonDisabled: {
    opacity: 0.7,
  },

});
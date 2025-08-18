import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Image, ScrollView, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import WarningModal from '../../components/ui/WarningModal';

import { Colors } from '@/constants/Colors';
import BaraDePesquisa from '@/images/link de pagamento/bara de pesquisa.svg';
import CopiarLink from '@/images/link de pagamento/copiar link.svg';
import FilterButton from '@/images/link de pagamento/Filter button.svg';
import IconLinks from '@/images/link de pagamento/Icon links.svg';
import LinkAtivo from '@/images/link de pagamento/link ativo.svg';
import InativoIcon from '@/images/link de pagamento/inativo.svg';
import BackIcon from '@/images/icon_back.svg';

export default function PaymentLinkScreen() {
  const router = useRouter();
  const [modalVisible, setModalVisible] = useState(false);

  const links = [
    { name: 'Capa Notebook', price: 'R$ 245,45', active: true },
    { name: 'Capa Notebook', price: 'R$ 245,50', active: false },
    { name: 'Capa Notebook', price: 'R$ 245,45', active: true },
    { name: 'Capa Notebook', price: 'R$ 245,45', active: true },
  ];

  return (
    <View style={styles.container}>
      <ScrollView>
        <ThemedView style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <BackIcon />
          </TouchableOpacity>
          <ThemedText style={styles.headerTitle}>Link de Pagamento</ThemedText>
          <View style={{ width: 24 }} />
        </ThemedView>

        <View style={styles.content}>
          <View style={styles.mainImageContainer}>
            <Image source={require('@/images/link de pagamento/topo.png')} style={styles.mainImage} />
          </View>
          <ThemedText style={styles.title}>Links criados</ThemedText>
          <ThemedText style={styles.subtitle}>
            Gerencie seus links de pagamento e acompanhe suas vendas
          </ThemedText>

          {/* Botão removido para corrigir erro de navegação */}
          {/* <TouchableOpacity
            style={styles.createLinkButton}
            onPress={() => router.push('/create-payment-link')}
          >
            <ThemedText style={styles.createLinkButtonText}>Criar novo link</ThemedText>
            <Ionicons name="add" size={24} color={Colors.white['01']} />
          </TouchableOpacity> */}

          <View style={styles.searchContainer}>
            <View style={styles.searchInputContainer}>
              <BaraDePesquisa width="100%" />
              <TextInput
                style={styles.searchInput}
                placeholder="Buscar links de pagamento"
                placeholderTextColor={Colors.gray['02']}
              />
            </View>
            <TouchableOpacity style={styles.filterButton}>
              <FilterButton />
            </TouchableOpacity>
          </View>

          {links.map((link, index) => (
            <TouchableOpacity key={index} style={styles.linkItem} onPress={() => {
              if (link.active) {
                router.push('/(app)/payment-link-details');
              } else {
                setModalVisible(true);
              }
            }}>
              <View style={styles.linkIconContainer}>
                <IconLinks />
              </View>
              <View style={styles.linkDetails}>
                <ThemedText style={styles.linkName}>{link.name}</ThemedText>
                <ThemedText style={styles.linkPrice}>{link.price}</ThemedText>
                <View style={styles.linkActions}>
                  {link.active ? (
                    <LinkAtivo />
                  ) : (
                    <InativoIcon />
                  )}
                  <TouchableOpacity
                    style={[styles.copyButton, !link.active && styles.disabledCopyButton]}
                    disabled={!link.active}
                  >
                    <CopiarLink />
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
      <WarningModal visible={modalVisible} onClose={() => setModalVisible(false)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white['01'],
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 20,
    // borderBottomWidth: 1,
    // borderBottomColor: '#E0E0E0',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.black['02'],
  },
  content: {
    padding: 16,
  },
  mainImageContainer: {
    width: '100%',
    aspectRatio: 358 / 135,
    borderRadius: 12,
    marginBottom: 24,
    overflow: 'hidden',
  },
  mainImage: {
    width: '100%',
    height: '100%',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
    color: Colors.black['02'],
  },
  subtitle: {
    fontSize: 16,
    color: Colors.gray['02'],
    marginBottom: 24,
  },
  createLinkButton: {
    backgroundColor: Colors.blue['02'],
    borderRadius: 25,
    paddingVertical: 14,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  createLinkButtonText: {
    color: Colors.white['01'],
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 8,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  searchInputContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  searchInput: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    fontSize: 16,
    color: Colors.black['01'],
    textAlign: 'center',
    backgroundColor: 'transparent',
  },
  filterButton: {
    marginLeft: 16,
  },
  linkItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white['01'],
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  linkIconContainer: {
    backgroundColor: Colors.white['03'],
    padding: 12,
    borderRadius: 25,
    marginRight: 16,
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  linkDetails: {
    flex: 1,
  },
  linkName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.gray['01'],
  },
  linkPrice: {
    fontSize: 16,
    color: Colors.black['02'],
    marginBottom: 8,
  },
  linkActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 15,
  },
  inactiveBadge: {
    backgroundColor: Colors.red['02'],
  },
  statusText: {
    fontSize: 12,
  },
  inactiveText: {
    color: Colors.red['01'],
  },
  copyButton: {
    marginLeft: 'auto',
  },
  disabledCopyButton: {
    opacity: 0.5,
  },
});

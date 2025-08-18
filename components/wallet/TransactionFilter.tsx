import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import ExtratoIcon from '../../images/carteira/extrato.svg';
import AntecipacoesIcon from '../../images/carteira/antecipações.svg';
import TransferenciasIcon from '../../images/carteira/transferencias.svg';
import { Colors } from '../../constants/Colors';

type TransactionFilterProps = {
  activeFilter: string;
  setActiveFilter: (filter: string) => void;
};

const filters = [
  { name: 'Extrato', icon: <ExtratoIcon width={20} height={20} /> },
  { name: 'Antecipações', icon: <AntecipacoesIcon width={20} height={20} /> },
  { name: 'Transferências', icon: <TransferenciasIcon width={20} height={20} /> },
];

export default function TransactionFilter({ activeFilter, setActiveFilter }: TransactionFilterProps) {
  return (
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {filters.map((filter) => (
          <TouchableOpacity
            key={filter.name}
            style={[styles.filterButton, activeFilter === filter.name && styles.activeFilterButton]}
            onPress={() => setActiveFilter(filter.name)}
          >
            {React.cloneElement(filter.icon, { color: Colors.black['02'] })}
            <Text style={[styles.filterText, activeFilter === filter.name && styles.activeFilterText]}>
              {filter.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  filterButton: {
    padding: 12,
    borderRadius: 20,
    marginRight: 10,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white['01'],
  },
  activeFilterButton: {
    backgroundColor: Colors.gray['03'],
  },
  filterText: {
    fontSize: 14,
    color: Colors.black['02'],
    marginLeft: 8,
  },
  activeFilterText: {
    color: Colors.black['02'],
    fontWeight: 'bold',
  },
});

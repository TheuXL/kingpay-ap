import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, TouchableOpacity } from 'react-native';

interface CheckboxProps {
  value: boolean;
  onValueChange: (value: boolean) => void;
  disabled?: boolean;
}

export default function Checkbox({ value, onValueChange, disabled = false }: CheckboxProps) {
  return (
    <TouchableOpacity
      style={[
        styles.container, 
        value && styles.checkedContainer,
        disabled && styles.disabledContainer
      ]}
      onPress={() => !disabled && onValueChange(!value)}
      disabled={disabled}
    >
      {value && <Ionicons name="checkmark" size={20} color="white" />}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: '#A0AEC0',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkedContainer: {
    backgroundColor: '#2A2AFF',
    borderColor: '#2A2AFF',
  },
  disabledContainer: {
    opacity: 0.5,
  },
});

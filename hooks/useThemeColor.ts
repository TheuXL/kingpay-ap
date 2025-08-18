/**
 * Learn more about light and dark modes:
 * https://docs.expo.dev/guides/color-schemes/
 */

import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: keyof typeof Colors.light & keyof typeof Colors.dark
) {
  // A lógica de tema foi removida temporariamente para acomodar a nova paleta de cores.
  // TODO: Reimplementar a lógica de temas se necessário com a nova paleta.
  const theme = useColorScheme() ?? 'light';
  const colorFromProps = props[theme];

  if (colorFromProps) {
    return colorFromProps;
  } else {
    // Retorna cores padrão para evitar que o aplicativo quebre.
    switch (colorName) {
      case 'text':
        return Colors.black['02'];
      case 'background':
        return Colors.white['01'];
      default:
        return Colors.gray['01'];
    }
  }
}

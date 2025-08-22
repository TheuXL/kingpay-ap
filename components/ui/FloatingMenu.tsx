import { usePathname, useRouter } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View, LayoutAnimation, UIManager, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import IconHome from '../../images/home/icon menu home.svg';
import IconGestao from '../../images/home/icon menu gestão.svg';
import IconConfig from '../../images/home/icon menu configurasões.svg';
import { Colors } from '@/constants/Colors';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const menuIcons = {
  '/home': { active: <IconHome width={24} height={24} color="white" />, inactive: <IconHome width={30} height={30} color="gray" /> },
  '/management': { active: <IconGestao width={24} height={24} color="white" />, inactive: <IconGestao width={30} height={30} color="gray" /> },
  '/settings': { active: <IconConfig width={24} height={24} color="white" />, inactive: <IconConfig width={30} height={30} color="gray" /> },
}

export default function FloatingMenu() {
  const router = useRouter();
  const pathname = usePathname();

  // Definir as telas principais onde o menu deve aparecer
  const mainScreens = ['/home', '/management', '/settings'];
  
  // Verificar se a tela atual é uma tela principal
  const isMainScreen = mainScreens.includes(pathname);
  
  // Se não for uma tela principal, não renderizar o menu
  if (!isMainScreen) {
    return null;
  }

  const menuItems = [
    { path: '/home', text: 'Home' },
    { path: '/management', text: 'Gestão' },
    { path: '/settings', text: 'Configurações' },
  ];

  LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);

  return (
    <View style={styles.outerContainer}>
      <SafeAreaView edges={['bottom']}>
        <View style={styles.innerContainer}>
          {menuItems.map((item) => {
            const isActive = pathname === item.path;
            const icon = menuIcons[item.path as keyof typeof menuIcons];
            return (
              <TouchableOpacity
                key={item.path}
                style={[styles.button, { flex: isActive ? 3.2 : 0.8 }]}
                onPress={() => router.push(item.path as any)}
              >
                {isActive ? (
                  <View style={styles.activeButton}>
                    {icon.active}
                    <Text 
                      style={styles.activeButtonText}
                      numberOfLines={1}
                      ellipsizeMode="tail"
                    >
                      {item.text}
                    </Text>
                  </View>
                ) : (
                  <View style={styles.iconWrapper}>
                    {icon.inactive}
                  </View>
                )}
              </TouchableOpacity>
            );
          })}
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    backgroundColor: Colors.white['01'],
    // borderTopWidth: 1,
    // borderTopColor: '#E0E0E0',
  },
  innerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingVertical: 10,
    paddingHorizontal: 10,
    height: 80,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    flex: 1,
  },
  iconWrapper: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0D1B2A',
    borderRadius: 100,
    paddingVertical: 12,
    paddingHorizontal: 75,
    minWidth: 160,
    height: 60,
    flex: 1,
  },
  activeButtonText: {
    color: 'white',
    marginLeft: 8,
    fontWeight: 'bold',
    fontSize: 18,
    flexShrink: 0,
    textAlign: 'center',
  },
});

import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import { LogBox } from "react-native";


export default function App() {


  LogBox.ignoreLogs(["Setting a timer", ".*(AsyncStorage).*", "EventEmitter.removeListener('change', ...): Method has been deprecated. Please instead use `remove()` on the subscription returned by `EventEmitter.addListener`.", "AsyncStorage has been extracted from react-native core and will be removed in a future release. It can now be installed and imported from '@react-native-async-storage/async-storage' instead of 'react-native'. See https://github.com/react-native-async-storage/async-storage", "Overwriting fontFamily style attribute preprocessor"]);

  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  }
    
  return (
      <SafeAreaProvider>
        <Navigation colorScheme={colorScheme} />
        <StatusBar />
      </SafeAreaProvider>
    );
}
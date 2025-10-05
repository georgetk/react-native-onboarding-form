import { ActivityIndicator, View } from 'react-native';
import styles from './styles';

const Loader = () => (
  <View style={styles.loaderContainer} testID="loader">
    <ActivityIndicator size="large" />
  </View>
);

export default Loader;

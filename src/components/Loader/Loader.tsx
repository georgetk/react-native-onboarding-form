import { ActivityIndicator, View } from 'react-native';
import styles from './styles';

const Loader = () => (
  <View style={styles.loaderContainer}>
    <ActivityIndicator size="large" color="#0000ff" />
  </View>
);

export default Loader;

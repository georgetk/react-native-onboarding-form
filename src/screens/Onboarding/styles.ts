import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: 50,
    marginHorizontal: 20,
  },
  headerContainer: {
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  button: {
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
    marginBottom: 30,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  formContainer: {
    width: '100%',
    marginBottom: 20,
    flex: 1,
  },
  themeModeButton: {
    position: 'absolute',
    right: 0,
  },
});

export default styles;

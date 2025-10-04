import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: 50,
    marginHorizontal: 20,
  },
  formContainer: {
    marginTop: 30,
    flex: 1,
    width: '100%',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  labelText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 15,
    padding: 15,
    width: '100%',
  },
  button: {
    backgroundColor: '#000000',
    padding: 15,
    borderRadius: 15,
    alignItems: 'center',
    marginBottom: 30,
    width: '100%',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  errorContainer: {
    height: 25,
  },
  errorText: {
    color: 'red',
    marginTop: 4,
  },
});

export default styles;

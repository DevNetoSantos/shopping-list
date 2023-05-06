import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'lightgray',
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%',
    alignSelf: 'center',
    borderRadius: 10,
    marginVertical: 10
  },
  textItems: {
    flex: 1,
    marginLeft: 10,
    fontSize: 20,
    fontWeight: '500'
  }
});

export default styles;
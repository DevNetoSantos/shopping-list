import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
    backgroundColor: '#fff'
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    alignItems: 'center',
    width: '90%',
    alignSelf: 'center',
    borderRadius: 10,
    marginBottom: 10
  },
  titleText: {
    fontSize: 30,
    marginRight: 10
  },
  numberItems: {
    fontSize: 30,
    marginRight: 10
  },
  textInput: {
    backgroundColor: 'lightgray',
    padding: 10,
    width: '90%',
    alignSelf: 'center',
    borderRadius: 20,
    fontSize: 17,
    marginTop: 'auto',
    marginBottom: 10
  },
  imageProfile: {
    width: 50,
    height: 50,
    marginRight: 10,
    borderRadius: 50
  }
})

export default styles;
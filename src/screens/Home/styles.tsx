import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  container: {
    flex:1,
    marginTop: 50,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    alignItems: 'center',
    width: '90%',
    alignSelf: 'center',
    borderRadius: 10
  },
  titleText: {
    flex: 1,
    fontSize: 30
  },
  numberitems: {
    fontSize: 30,
    marginRight: 10
  }
})

export default styles;
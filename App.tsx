import React, { FC } from 'react'
import { StyleSheet, View, Text } from 'react-native'

const App: FC = () => {
  return (
    <View style={styles.screen}>
      <Text>TEXT</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
})

export default App

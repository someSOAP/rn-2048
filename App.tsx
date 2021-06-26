import React, { FC } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { Grid } from '@components/Grid'

const App: FC = () => {
  return (
    <View style={styles.screen}>
      <Grid values={[]} />
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: 'rgb(250, 248, 239)',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default App

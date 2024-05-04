import React from 'react'
import { View, Text, Button } from 'react-native'

const HomeScreen = ({ navigation }) => {
  return (
    <View>
      <Text>Welcome to DAO Mall for Pi!</Text>
      <Button title='Explore DAO' onPress={() => navigation.navigate('DAO')} />
      <Button
        title='Visit NFT Marketplace'
        onPress={() => navigation.navigate('NFT Marketplace')}
      />
      <Button
        title='Participate in DeFi'
        onPress={() => navigation.navigate('DeFi')}
      />
      <Button
        title='Ensure Privacy'
        onPress={() => navigation.navigate('Privacy')}
      />
      <Button
        title='Earn Rewards'
        onPress={() => navigation.navigate('Gamification')}
      />
    </View>
  )
}

export default HomeScreen

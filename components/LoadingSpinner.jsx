import {ActivityIndicator, StyleSheet, View} from 'react-native';
import React from 'react'

const LoadingSpinner = () => {
  return (
    <View style={[styles.container, styles.horizontal]}>
    <ActivityIndicator size="large" color="red" />
  </View>
  )
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      backgroundColor:'black'
    },
    horizontal: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      padding: 10,
    },
  });
  


export default LoadingSpinner
import React from 'react';
import { StyleSheet, Text } from 'react-native';

function ErrorMessage({error, visable}) {
    
    if (!visable || !error) return null;
    
    
    return <Text style={styles.error}>{error}</Text>
}
 const styles = StyleSheet.create({
      error: {
          color: 'red'
      }
 })
export default ErrorMessage;
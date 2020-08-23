import React from 'react';
import { StyleSheet, Button, View, SafeAreaView, Text, Alert } from 'react-native';

class HomeScreen extends React.Component {
  render () {
    return (
      <Button
        title="Go to Jane's profile"
        onPress={() =>
          this.props.navigation.navigate('Profile', { name: 'Jane' })
        }
      />
    );
  }
};

export default HomeScreen;

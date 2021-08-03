import { StatusBar } from 'expo-status-bar';
import React,{Component} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {Provider as PaperProvider} from 'react-native-paper';
import {Login} from './Views/login';
import { Dashboard } from './Views/dashboard';



export default class App extends Component{
    state = {
      view: 'login',
      username: null,
      password: null,
      msg: 'default',
    }

  updateView = (value) =>{
    this.setState({view: value});
  }

  render(){
    const switchComponent = () =>{
      switch (this.state.view) {
        case 'login':
            return <Login updateView={this.updateView} />;
        case 'dashboard':
          return <Dashboard updateView={this.updateView} />
        default:
          return <Login/>;
      }
    }
    return (
      <PaperProvider>
          {switchComponent()}
        {/* <Dashboard msg={this.state.msg} /> */}
      </PaperProvider>
      // <View style={styles.container}>
      //   <Text>Open up App.js to start working on your app!</Text>
      //   <StatusBar style="auto" />
      // </View>
    );
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
      },
    });
  }

}

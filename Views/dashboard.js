import React, { Component } from "react"
import { View, StyleSheet } from "react-native";
import {Text} from 'react-native-elements';
// import {Text} from 'react-native-paper';


export class Dashboard extends Component{
    constructor(){
        super();
        this.state = {
            msg: '',
        }
    }

    async fetchData(){
        //console.log(`got the response ${response} `);
        await fetch("https://jasondz.pythonanywhere.com/api/dashboard")
        .then(response => response.json())
        .then(json => JSON.stringify(json))
        .then(str => JSON.parse(str))
        .then(parsed => this.setState({"msg": parsed["msg"]}))
        .catch((error)=>{
            alert(`${error.message}`)
        })
    }
    
    render(){
        return(
            <View style={this.style.container}>
                <Text h5>
                    Response: {this.state.msg}
                </Text>
            </View>
        );
    }
    
    componentDidMount = () => {
        this.fetchData();
    }
    style = StyleSheet.create({
        container:{
            flex: 1,
            alignItems: 'center',
            textAlign: 'center',
            justifyContent: 'center',
            backgroundColor: '#e1e1e1'
        }
    });
}
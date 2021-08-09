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
        let response = await fetch("https://jasondz.pythonanywhere.com/api/dashboard");
        //console.log(`got the response ${response} `);
        let json = await response.json();
        const str = await JSON.stringify(json);
        console.log(`str -> ${str}`);
        const parsed = JSON.parse(str);
        this.setState({"msg": parsed["msg"]});
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
import React,{Component} from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Button, Input} from 'react-native-elements';
// import {Button, TextField} from '@material-ui/core';
// import {Button, Text, TextInput} from 'react-native-paper';


export class Login extends Component{
    constructor(){
        super();
        this.state = {
            serverusr: '',
            serverpswd: '',
            username: '',
            password: '',
            switchValue: false
        }
    }

    getCredentials = async () => {
        let isResponse = false;
        // await fetch("http://127.0.0.1:8000/api/login")
        await fetch("https://jasondz.pythonanywhere.com/api/login")
        .then(response => response.json())
        .then(json => JSON.stringify(json))
        .then(str => JSON.parse(str))
        .then(parsed => this.setState({"serverusr": parsed["User"], "serverpswd": parsed["Password"]}))
        .then(() => {isResponse=true})
        .catch(error =>{
            alert(`${error.message}`)
        })
        return isResponse;
    }
    
    render(){
        const authenticate = () =>{
            if(this.state.username == this.state.serverusr && this.state.password == this.state.serverpswd){
                this.props.updateView("dashboard");
                // console.log("switch to dashboard!");
            }else{
                alert("Wrong credentials! (authenticate)")
            }
        }

        const sendRequest = async () => {
            console.log("pressed!");
            let username = this.state.username;
            let password = this.state.password;
            
            if(username !== "" && password !== ""){
                // const isResponse = this.getCredentials();
                // if(isResponse){
                //     authenticate();
                // }
                this.getCredentials()
                .then((isResponse) => {
                    if(isResponse){
                        alert(`Response: ${isResponse}`)
                        authenticate();
                    }else{
                        alert(`Response: ${isResponse}`)
                    }
                })
                    // .then();
                    //setTimeout(()=> {authenticate()}, 2000);
                    // console.log(this.state.username);
                    // console.log(this.state.password);
            }else{
                alert("Please fill all the fields!")
            }
        }

    
        const updateUsername = (value) => {
            console.log(value);
            this.setState({username: value});
        }
    
        const updatePassword = (value) => {
            this.setState({password: value});
        }

        const layout = StyleSheet.create({
            container: {
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#e1e1e1'
            },

            Button: {
                width: '90%',
                //backgroundColor: '#17AFF9'
            },

            input: {
                width: '80%',
                height: '20%',
                textAlign: 'center',
                fontSize: 20
            }
        });

        return(
            <SafeAreaView style={layout.container}>
                <Input style={layout.input} onChangeText={(value) => updateUsername(value)} placeholder='Username' leftIcon={ <Icon name='user' size={24} color='black'/> }/>
                <Input style={layout.input} onChangeText={(value) => updatePassword(value)} placeholder='Password' leftIcon={ <Icon name='key' size={24} color='black' />} secureTextEntry={true} />
                {/* <TextInput onChangeText={(value) => updateUsername(value)} placeholder="Username" style={layout.TextInput}></TextInput>
                <TextInput onChangeText={(value) => updatePassword(value)} secureTextEntry={true} placeholder="Password"  style={layout.TextInput}></TextInput> */}
                <View style={layout.Button}>
                    <Button onPress={sendRequest} title="LOGIN" />
                </View>
            </SafeAreaView>
        );

    }
}
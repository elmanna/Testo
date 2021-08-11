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

    render(){
        const getCredentials = async () =>{
            let response = await fetch("https://jasondz.pythonanywhere.com/api/login");
            //let response = await fetch("http://0.0.0.0:8000/api/login/");
            let json = await response.json();
            const str = await JSON.stringify(json);
            console.log(str);
            const parsed = JSON.parse(str);
            this.setState({"serverusr": parsed["User"], "serverpswd": parsed["Password"]});
        }

        // const getCredentials = async () =>{
        //     useEffect(() => {
        //         fetch('login')
        //           .then((response) => response.json())
        //           .then((json) => console.log(json))
        //           .catch((error) => console.error(error))
        //       });
        // }


        // const getCredentials = async () =>{
        //     let res;
        //     fetch('api/login')
        //         .then(response => response.json())
        //         .then(response => console.log(response))
        //         .catch(error => console.log(error));
        // }

        const authenticate = () =>{
            if(this.state.username == this.state.serverusr && this.state.password == this.state.serverpswd){
                this.props.updateView("dashboard");
                // console.log("switch to dashboard!");
            }else{
                console.log("wronge credentials!!");
            }
        }

        const sendRequest = () => {
            let username = this.state.username;
            let password = this.state.password;
            
            if(username !== "" && password !== ""){
                getCredentials();
                // console.log(this.state.username);
                // console.log(this.state.password);
                setTimeout(()=> {authenticate()}, 3000);
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
                    <Button onPress={sendRequest()} title="LOGIN">
                    </Button>
                </View>
            </SafeAreaView>
        );

    }
}
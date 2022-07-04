import React, { useState } from 'react';
import auth from '@react-native-firebase/auth'

import { Container, Account, Title, Subtitle } from './styles';
import { ButtonText } from '../../components/ButtonText';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { Alert } from 'react-native';

export function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleSignInAnonymously(){
    const { user } = await auth().signInAnonymously();
    console.log(user)
  }

  async function handleCreateUserAccount(){
    auth().createUserWithEmailAndPassword(email, password).then(() => Alert.alert('Usuario criado com sucesso!')).catch(error => {
      console.log(error.code);

      if(error.code === 'auth/email-already-in-use'){
        return Alert.alert('E-mail já cadastrado. Por favor, escolha outro e-mail para cadastrar!');
      }

      if(error.code === 'auth/invalid-email'){
        return Alert.alert('E-mail inválido!. Por favor, escolha outro e-mail para cadastrar!');
      }

      if(error.code === 'auth/weak-password'){
        return Alert.alert('Senha fraca!. Por favor, crie uma senha de no minimo 6 digitos!');
      }
    })
  } 

  function handleSignInEmailAndPassword(){
    auth()
    .signInWithEmailAndPassword(email, password)
    .then(({ user }) => console.log(user))
    .catch(error => {
      if(error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password'){
        return Alert.alert('Usuário não encontrado!\nE-mail e/ou senha inválido');
      }
    })

   
  }

  function handleForgotPassoword(){
    auth().sendPasswordResetEmail(email).then(() => Alert.alert('Enviamos um link no seu e-mail para recuperação da senha!'))
  }

  return (
    <Container>
      <Title>MyShopping</Title>
      <Subtitle>monte sua lista de compra te ajudar nas compras</Subtitle>

      <Input
        placeholder="e-mail"
        keyboardType="email-address"
        onChangeText={setEmail}
      />

      <Input
        placeholder="senha"
        secureTextEntry
        onChangeText={setPassword}
      />

      <Button title="Entrar" onPress={handleSignInEmailAndPassword} />

      <Account>
        <ButtonText title="Recuperar senha" onPress={handleForgotPassoword} />
        <ButtonText title="Criar minha conta" onPress={handleCreateUserAccount} />
      </Account>
    </Container>
  );
}
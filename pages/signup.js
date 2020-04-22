import {Button, Form, Icon, Message, Segment} from 'semantic-ui-react'
import Link from 'next/link'
import React from 'react'
import catchErrors from '../utils/catchErrors';
import axios from 'axios';
import baseUrl from '../utils/baseUrl';
import { handleLogin } from '../utils/auth';

const IINITIAL_USER = {
  name:"",
  email: "",
  password: "",
}

function Signup() {
  const [user, setUser] = React.useState(IINITIAL_USER);
  const [disabled, setDisabled] = React.useState(true);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");

  React.useEffect(()=> {
    const isUser = Object.values(user).every( e1 => Boolean(e1));
    isUser ? setDisabled(false) : setDisabled(true);
  }, [user])
  
  function handlechange(event){
    const {name, value} = event.target;
    setUser(prevStat =>({ ...prevStat, [name]: value }))
  }

  async function handleSubmit(){
    event.preventDefault();
    try{
      setLoading(true);
      setError("");
      const url = `${baseUrl}/api/signup`;
      const payload = { ...user };
      const response = await axios.post(url, payload); //token gets sent to client 
      handleLogin(response.data);
      console.log({response})
    } catch(error){
      catchErrors(error, setError);

    } finally{
      setLoading(false);
    }
  }

  return ( 
  <>
    <Message 
    attached
    icon="settings"
    header="Create a new account"
    color="blue"
    />
    <Form  loading={loading} error={Boolean(error)} onSubmit={handleSubmit}>
      <Message
        error
        header="Oops!!"
        content={error}
      />
      <Segment>
        <Form.Input
          fluid 
          icon= "user"
          iconPosition="left"
          label="Name"
          placeholder="Name"
          name= "name"
          value = {user.name}
          onChange={handlechange}
        />
        <Form.Input
          fluid 
          icon= "envelope"
          iconPosition="left"
          label="Email"
          placeholder="Email"
          name= "email"
          type = "email"
          value = {user.email}
          onChange={handlechange}
        />
        <Form.Input
          fluid 
          icon= "lock"
          iconPosition="left"
          label="Password"
          placeholder="Password"
          name= "password"
          type= "password"
          value = {user.passowrd}
          onChange={handlechange}
        />
        <Button
          disabled = {disabled || loading}
          icon = "signup"
          type = "submit"
          color="google plus"
          content="Signup"
          />
      </Segment>
    </Form>
    <Message attached="bottom" warning>
      <Icon name="help"/>
        Existing user? {" "}
        <Link href="/login">
          <a>Log in here</a>
        </Link> {" "} instead.
    </Message>
  </>
  );
}

export default Signup;

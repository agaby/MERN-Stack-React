import {Button, Form, Icon, Message, Segment} from 'semantic-ui-react'
import Link from 'next/link'
import React from 'react'
import catchErrors from '../utils/catchErrors';
import baseURL from '../utils/baseUrl';
import axios from 'axios';
import { handleLogin } from '../utils/auth';

const IINITIAL_USER = {
  email: "",
  password: ""
};

function Login() {

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
      const url = `${baseURL}/api/login`;
      const payload = { ...user};
      console.log({payload});
      const response = await axios.post(url, payload);
      handleLogin(response.data);
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
    icon="privacy"
    header="Welcome Back!"
    content="Log in with email and passowrd"
    color="blue"
    />
    <Form  error={Boolean(error)} loading={loading}  onSubmit={handleSubmit}>
      <Message
        error
        header="Oops!!"
        content={error}
      />
      <Segment>
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
          value = {user.password}
          onChange={handlechange}
        />
        <Button
          disabled = {disabled || loading}
          icon = "sign in"
          type = "submit"
          color="google plus"
          content="Log in"
          />
      </Segment>
    </Form>
    <Message attached="bottom" warning>
      <Icon name="help"/>
        New user? {" "}
        <Link href="/signup">
          <a>Sign up here</a>
        </Link> {" "}
         instead.
    </Message>
  </>
  );
}

export default Login;

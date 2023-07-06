import React from 'react';
import LoginForm from '../LoginForm/LoginForm';
import { useHistory } from 'react-router-dom';
import {Container} from '@mui/material'

function LoginPage() {
  const history = useHistory();

  return (
    <Container maxWidth='sm' sx={{display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center'}}>
      <LoginForm />
        <button
          type="button"
          className="btn btn_asLink"
          onClick={() => {
            history.push('/registration');
          }}
        >
          Register
        </button>
    </Container>
  );
}

export default LoginPage;

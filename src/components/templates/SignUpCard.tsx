import * as React from 'react';
import { useState } from 'react';
import { Box, Button, Divider, FormControl, FormLabel, TextField, Typography } from '@mui/material';
import MuiCard from '@mui/material/Card';
import { styled } from '@mui/material/styles';
import { GoogleIcon, SitemarkIcon } from './CustomIcons';
import { UserDataType} from "../../utils/types-bakery-shop.ts";

const Card = styled(MuiCard)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  width: '100%',
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: 'auto',
  [theme.breakpoints.up('sm')]: {
    maxWidth: '450px',
  },
  boxShadow: 'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
}));

type Props = {
  signUpFn: (userData: UserDataType) => Promise<void>;
};

export const SignUpCard: React.FC<Props> = ({ signUpFn }) => {
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [nameError, setNameError] = useState('');
  const [lastNameError, setLastNameError] = useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get('email') as string;
    const password = data.get('password') as string;
    const first_name = data.get('first_name') as string;
    const last_name = data.get('last_name') as string;

    if (validateInputs(email, password, first_name, last_name)) {
      try {
        await signUpFn({ email, password, first_name, last_name});
      } catch (e: unknown) {
        if (e instanceof Error) {
          alert(e.message);
        } else {
          alert("An unexpected error occurred.");
        }
      }
    }
  };

  const validateInputs = (email: string, password: string, first_name: string, last_name: string) => {
    let isValid = true;
    setEmailError('');
    setPasswordError('');
    setNameError('');
    setLastNameError('');

    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setEmailError('Please enter a valid email address.');
      isValid = false;
    }

    if (!password || password.length < 6) {
      setPasswordError('Password must be at least 6 characters long.');
      isValid = false;
    }
    if (!first_name) {
      setNameError('First name is required.');
      isValid = false;
    }

    if (!last_name) {
      setLastNameError('Last name is required.');
      isValid = false;
    }
    return isValid;
  };

  return (
      <Box display="flex" flexDirection="column" justifyContent="center" minHeight="100vh" padding={2}>
        <Card variant="outlined">
          <SitemarkIcon />
          <Typography component="h1" variant="h4">
            Sign up
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ display: 'flex', flexDirection: 'column', width: '100%', gap: 2 }}>
            <FormControl>
              <FormLabel htmlFor="email">Email</FormLabel>
              <TextField id="email" name="email" required fullWidth variant="outlined" error={!!emailError} helperText={emailError} />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="password">Password</FormLabel>
              <TextField id="password" name="password" type="password" required fullWidth variant="outlined" error={!!passwordError} helperText={passwordError} />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="first_name">First Name</FormLabel>
              <TextField id="first_name" name="first_name" required fullWidth variant="outlined" error={!!nameError} helperText={nameError} />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="last_name">Last Name</FormLabel>
              <TextField id="last_name" name="last_name" required fullWidth variant="outlined" error={!!lastNameError} helperText={lastNameError} />
            </FormControl>
            <Button type="submit" fullWidth variant="contained">Sign up</Button>
          </Box>
          <Divider>or</Divider>
          <Button fullWidth variant="outlined" startIcon={<GoogleIcon />} onClick={() => signUpFn({ email: "GOOGLE", password: "123456", first_name: "Google", last_name: "User" })}>
            Sign up with Google
          </Button>
        </Card>
      </Box>
  );
};

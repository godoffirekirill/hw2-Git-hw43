import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import {Alert} from "@mui/material";
import FormControlLabel from '@mui/material/FormControlLabel';
import Divider from '@mui/material/Divider';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import MuiCard from '@mui/material/Card';
import { styled } from '@mui/material/styles';

import { GoogleIcon,  SitemarkIcon } from './CustomIcons';
import {LoginData} from "../../utils/types-bakery-shop.ts";
import {useNavigate} from "react-router-dom";

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
    boxShadow:
        'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
}));

type Props= {
    submitFn:(loginData: LoginData)=>void;
}

export const SignInCard: React.FC<Props>=({submitFn}) => {
    const [emailError, setEmailError] = React.useState(false);
    const [emailErrorMessage, setEmailErrorMessage] = React.useState('');
    const [passwordError, setPasswordError] = React.useState(false);
    const [passwordErrorMessage, setPasswordErrorMessage] = React.useState('');
    const navigate = useNavigate();

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const data = new FormData(event.currentTarget);
        const email=data.get('email') as string;
        const password=data.get('password') as string;
        console.log({
            email,
            password,
        });
        if (validateInputs(email,password)){
            submitFn({email,password});
        }
    };

    const validateInputs =
        (email:string, password:string) => {


        let isValid = true;

        if (!email || !/\S+@\S+\.\S+/.test(email)) {
            setEmailError(true);
            setEmailErrorMessage('Please enter a valid email address.');
            isValid = false;
        } else {
            setEmailError(false);
            setEmailErrorMessage('');
        }

        if (!password|| password.length < 6) {
            setPasswordError(true);
            setPasswordErrorMessage('Password must be at least 6 characters long.');
            isValid = false;
        } else {
            setPasswordError(false);
            setPasswordErrorMessage('');
        }

        return isValid;
    };



    return (
        <Box display="flex" flexDirection="column" justifyContent="center" minHeight="100vh" padding={2}>
            <Card variant="outlined">
                <SitemarkIcon />
                <Typography component="h1" variant="h4">
                    Sign in
                </Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ display: 'flex', flexDirection: 'column', width: '100%', gap: 2 }}>
                    <FormControl>
                        <FormLabel htmlFor="email">Email</FormLabel>
                        <TextField
                            error={emailError}
                            helperText={emailErrorMessage}
                            id="email"  // ✅ Добавлено
                            name="email"  // ✅ Добавлено
                            type="email"
                            placeholder="your@email.com"
                            autoComplete="email"
                            autoFocus
                            required
                            fullWidth
                            variant="outlined"
                            color={emailError ? 'error' : 'primary'}
                        />
                    </FormControl>

                    <FormControl>
                        <FormLabel htmlFor="password">Password</FormLabel>
                        <TextField
                            error={passwordError}
                            helperText={passwordErrorMessage}
                            id="password"  // ✅ Добавлено
                            name="password"  // ✅ Добавлено
                            placeholder="••••••"
                            type="password"
                            autoComplete="current-password"
                            required
                            fullWidth
                            variant="outlined"
                            color={passwordError ? 'error' : 'primary'}
                        />
                    </FormControl>

                    <FormControlLabel control={<Checkbox value="remember" color="primary" />} label="Remember me" />
                    {(passwordError || emailError) &&
                        <Alert severity="error" onClose={() => {
                            setEmailError(false);
                            setEmailErrorMessage("");
                            setPasswordError(false);
                            setPasswordErrorMessage("")
                        }}>ERROR! Wrong credentials! Try again!</Alert>}
                    <Button type="submit" fullWidth variant="contained">
                        Sign in
                    </Button>
                </Box>
                <Divider>or</Divider>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <Button fullWidth variant="outlined" onClick={() => submitFn({email:"GOOGLE", password: "123456"})} startIcon={<GoogleIcon />}>
                        Sign in with Google
                    </Button>

                    <Typography sx={{ textAlign: 'center' }}>
                        Don&apos;t have an account?{' '}
                        <Link onClick={() => navigate('/sign_up')} variant="body2" sx={{ alignSelf: 'center', cursor: 'pointer' }}>
                            Sign up
                        </Link>

                    </Typography>
                </Box>
            </Card>
        </Box>
    );
}

import React from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import { Button } from '../button/button';
import axios from 'axios';

export const GBTN = () => {
    const login = useGoogleLogin({
        flow: 'auth-code',
        onSuccess: async (codeResponse) => {
            console.log(codeResponse);
            // TODO: Change to super API:
            const tokens = await axios.post('http://localhost:3001/auth/google', {
                //super backend url
                code: codeResponse.code,
            });

            console.log(tokens);
        },
        onError: (errorResponse) => console.log(errorResponse),
    });
    return <Button onClick={() => login()} label="Sign in with Google 🚀" />;
};

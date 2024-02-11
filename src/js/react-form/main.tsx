import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { ModalProvider } from './context/modal-context.tsx';
import { AppFormProvider } from './context/app-form-context.tsx';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { CLIENT_ID as GOOGLE_CLIENT_ID } from './constants/google.ts';
import { PublicClientApplication } from '@azure/msal-browser';
import { CLIENT_ID as MICROSOFT_CLIENT_ID } from './constants/microsoft.ts';
import { MsalProvider } from '@azure/msal-react';
import { STAFFEX_MICROSOFT_AUTH } from './constants/urls.ts';
import 'react-toastify/dist/ReactToastify.css';
import './styles/toast.css';

const root = document.getElementById('root');

if (root) {
    // <MsalInstanceSnippet>
    const msalInstance = new PublicClientApplication({
        auth: {
            authority: 'https://login.microsoftonline.com/consumers',
            clientId: MICROSOFT_CLIENT_ID,
            redirectUri: '',
            authorityMetadata: JSON.stringify({
                authorization_endpoint: 'https://login.microsoftonline.com/consumers/oauth2/v2.0/authorize',
                token_endpoint: STAFFEX_MICROSOFT_AUTH,
                issuer: 'https://login.microsoftonline.com/{tenantid}/v2.0',
                //userinfo_endpoint: 'http://localhost:8180/realms/example-realm/protocol/openid-connect/userinfo'
            }),
        },
        cache: {
            cacheLocation: 'sessionStorage',
            storeAuthStateInCookie: false,
        },
    });

    ReactDOM.createRoot(root).render(
        <React.StrictMode>
            <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
                <MsalProvider instance={msalInstance}>
                    <AppFormProvider>
                        <ModalProvider>
                            <App />
                        </ModalProvider>
                    </AppFormProvider>
                </MsalProvider>
            </GoogleOAuthProvider>
        </React.StrictMode>,
    );
}

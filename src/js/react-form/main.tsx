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

const root = document.getElementById('root');

if (root) {
    // <MsalInstanceSnippet>
    const msalInstance = new PublicClientApplication({
        auth: {
            clientId: MICROSOFT_CLIENT_ID,
        },
        cache: {
            cacheLocation: 'sessionStorage',
            storeAuthStateInCookie: true,
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

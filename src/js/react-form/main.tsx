import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { ModalProvider } from './context/modal-context.tsx';
import { AppFormProvider } from './context/app-form-context.tsx';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { CLIENT_ID as GOOGLE_CLIENT_ID } from './constants/google.ts';

const root = document.getElementById('root');

if (root) {
    ReactDOM.createRoot(root).render(
        <React.StrictMode>
            <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
                <AppFormProvider>
                    <ModalProvider>
                        <App />
                    </ModalProvider>
                </AppFormProvider>
            </GoogleOAuthProvider>
        </React.StrictMode>,
    );
}

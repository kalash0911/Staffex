import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { ModalProvider } from './context/modal-context.tsx';
import { AppFormProvider } from './context/app-form-context.tsx';
import { GoogleOAuthProvider } from '@react-oauth/google';

const root = document.getElementById('root');

if (root) {
    ReactDOM.createRoot(root).render(
        <React.StrictMode>
            <GoogleOAuthProvider clientId="643543319393-obe6e002fj6l7djfeeasp3l2k1qb2vvh.apps.googleusercontent.com">
                <AppFormProvider>
                    <ModalProvider>
                        <App />
                    </ModalProvider>
                </AppFormProvider>
            </GoogleOAuthProvider>
        </React.StrictMode>,
    );
}

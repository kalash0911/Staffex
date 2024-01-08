import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { ModalProvider } from './context/modal-context.tsx';
import { AppFormProvider } from './context/app-form-context.tsx';

const root = document.getElementById('root');

if (root) {
  ReactDOM.createRoot(root).render(
    <React.StrictMode>
      <ModalProvider>
        <AppFormProvider>
          <App />
        </AppFormProvider>
      </ModalProvider>
    </React.StrictMode>,
  );
}

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstrap styles
import 'react-toastify/dist/ReactToastify.css'; // Toastify styles
import { TokenProvider } from './TokenContext';
import {UserIDProvider} from './UserContext/UserIDContext';
import { UsernameProvider} from './UserContext/UsernameContext';
import { ProfilePictureProvider} from './UserContext/ProfilePictureContext';
import { RoleProvider } from './UserContext/RoleContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <TokenProvider> <UserIDProvider> <UsernameProvider>
      <ProfilePictureProvider>
        <RoleProvider>

      <App />
        </RoleProvider>
      </ProfilePictureProvider>
    </UsernameProvider> </UserIDProvider> </TokenProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

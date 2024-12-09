import React, {createContext, useState} from "react";
import ReactDOM from 'react-dom';
import App from './App';

export const UserContext = createContext();

export const UserProvider = ({children}) => 
{
    const [userID, setUserID] = useState('');
    const [username, setUsername] = useState('');
    const [profilePicture, setProfilePicture] = useState('');

    return(
        <UserContext.Provider value={[{userID, setUserID}, {username, setUsername}, {profilePicture, setProfilePicture}]}>
            {children}
        </UserContext.Provider>
    );
}
import React, {createContext, useState} from "react";
import ReactDOM from 'react-dom';
import App from './App';

export const UserContext = createContext();

export const UserProvider = ({children}) => 
{
    const [username, setUsername] = useState('');
    const [profilePicture, setProfilePicture] = useState("");
    const [role, setRole] = useState('');
    const [userID, setUserID] = useState('');

    return(
        <UserContext.Provider value={[{userID, setUserID}, {username, setUsername}, {profilePicture, setProfilePicture},{role, setRole}]}>
            {children}
        </UserContext.Provider>
    );
}
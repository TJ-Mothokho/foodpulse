import React, {createContext, useState} from "react";
import ReactDOM from 'react-dom';
import App from '../App';

export const ProfilePictureContext = createContext();

export const ProfilePictureProvider = ({children}) => 
{
    const [profilePicture, setProfilePicture] = useState('');

    return(
        <ProfilePictureContext.Provider value={{profilePicture, setProfilePicture}}>
            {children}
        </ProfilePictureContext.Provider>
    );
}
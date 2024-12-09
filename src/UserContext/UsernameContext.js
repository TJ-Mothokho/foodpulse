import React, {createContext, useState} from "react";
import ReactDOM from 'react-dom';
import App from '../App';

export const UsernameContext = createContext();

export const UsernameProvider = ({children}) => 
{
    const [username, setUsername] = useState('');

    return(
        <UsernameContext.Provider value={{username, setUsername}}>
            {children}
        </UsernameContext.Provider>
    );
}
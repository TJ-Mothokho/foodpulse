import React, {createContext, useState} from "react";
import ReactDOM from 'react-dom';
import App from './App';

export const TokenContext = createContext();

export const TokenProvider = ({children}) => 
{
    const [token, setToken] = useState('');

    return(
        <TokenContext.Provider value={{token, setToken}}>
            {children}
        </TokenContext.Provider>
    );
}
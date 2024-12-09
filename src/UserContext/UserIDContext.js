import React, {createContext, useState} from "react";
import ReactDOM from 'react-dom';
import App from '../App';

export const UserIDContext = createContext();

export const UserIDProvider = ({children}) => 
{
    const [userID, setUserID] = useState('');

    return(
        <UserIDContext.Provider value={{userID, setUserID}}>
            {children}
        </UserIDContext.Provider>
    );
}
import { createContext, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children, user }) => {

    const [loggedIn, setLoggedIn] = useState(user !== null);

    return <UserContext.Provider value={{ loggedIn, setLoggedIn }}>
        {children}
    </UserContext.Provider>
}
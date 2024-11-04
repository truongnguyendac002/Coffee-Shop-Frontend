import { createContext, useState } from "react";
export const AuthContext = createContext({
    "email": "",
    "roleName": "",
    "name": "",
    "phone": "",
    "profile_img": "",
    "status": "",
    "id": "",
});

export const AuthWrapper = ({ children }) => {
    const [user, setUser] = useState({
        "email": "",
        "roleName": "",
        "name": "",
        "phone": "",
        "profile_img": "",
        "status": "",
        "id": "",
    });
    return (
        <AuthContext.Provider value={{ user, setUser }}>
            {children}
        </AuthContext.Provider>
    );
};

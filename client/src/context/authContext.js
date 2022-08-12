import { useState, createContext } from 'react';
import * as authService from '../services/authService';

const AuthContext = createContext();

const initialState = { _id: '', username: '', email: '' };

const AuthContextProvider = ({ children }) => {
    const [userInfo, setUserInfo] = useState(initialState);

    /*const login = ({ user }) => {

    }*/

    const register = async (user) => {
        try {
            const response = authService.register({ user });

            if (response === 'ok') {
                setUserInfo(user);
            }
            else {
                throw new Error('Unsuccessfull registry');
            }
        }
        catch (err) {
            console.log(err);
            return 'err';
        }
    }

    const login = async ({ username, password }) => {
        try {
            const response = authService.login({ username, password });
            if (response === 'ok') {
                setUserInfo(user);
            }
            else {
                throw new Error('Unsuccessfull registry');
            }
        }
        catch (err) {
            console.log(err);
            return 'err';
        }
    }
    return (
        <AuthContext.Provider value={{ userInfo, register, login }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;
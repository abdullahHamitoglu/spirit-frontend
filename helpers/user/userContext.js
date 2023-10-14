// UserContext.js

import axios from 'axios';
import { useRouter } from 'next/router';
import { createContext, useContext, useReducer } from 'react';
import { toast } from 'react-toastify';

const UserContext = createContext();

const initialUserState = {
    user: null,
    isAuthenticated: false,
};

const userReducer = (state, action) => {
    
    switch (action.type) {
        case 'LOGIN':
            return {
                ...state,
                user: action.user,
                isAuthenticated: true,
            };
        case 'LOGOUT':
            return {
                ...state,
                user: null,
                isAuthenticated: false,
            };
        default:
            return state;
    }
}

export function UserProvider({ children }) {
    const { locale } = useRouter()
    const [state, dispatch] = useReducer(userReducer, initialUserState);
    const router = useRouter()
    const register = async (userData) => {
        try {
            // Send a POST request to your registration API endpoint
            await axios({
                method: 'post',
                url: process.env.API_URL + `api/v1/customer/register?locale=${locale.slice(0, 2)}`,
                data: userData,
            }).then(res => {
                console.log(res);
                if (res.data) {
                    toast.success(res.data.message)
                }
                if(res.status == 200 ){
                    router.push('/page/account/login')
                }
            }).catch(function (error, errors) {
                if (error.response) {
                    toast.error(error.response.data.message);
                }
                console.log(errors, error);
            });
            
        } catch (error) {
            
            console.error('Registration failed:', error);
        }
    }
    
    
    const login = async (userData) => {
        await axios({
            method: 'post',
            url: process.env.API_URL + `api/v1/customer/login?locale=${locale.slice(0, 2)}`,
            data: userData,
        }).then(res => {
            console.log(res);
            if (res.data) {
                toast.success(res.data.message)
                dispatch({ type: 'LOGIN', user: res.data.user });
                localStorage.setItem(res.data.user.token)
            }
            if(res.status == 200 ){
                router.push('/page/account/login')
            }
        }).catch(function (error, errors) {
            if (error.response) {
                toast.error(error.response.data.message);
            }
            console.log(errors, error);
        });
    }
    return (
        <UserContext.Provider value={{ state, dispatch, register, login }}>
            {children}
        </UserContext.Provider>
    );
}

export function useUser() {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
}
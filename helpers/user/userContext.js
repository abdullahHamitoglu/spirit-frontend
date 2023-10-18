// UserContext.js

import axios from 'axios';
import { useRouter } from 'next/router';
import { createContext, useContext, useEffect, useReducer } from 'react';
import { toast } from 'react-toastify';
import { getUserAgent } from './getUserAgent';

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
    const osDetails = getUserAgent();
    const router = useRouter();

    // Load user data from local storage on initial load
    useEffect(() => {
        const savedUser = localStorage.getItem('user');
        if (savedUser) {
            dispatch({ type: 'LOGIN', user: JSON.parse(savedUser) });
        }
    }, []);

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
                if (res.status == 200) {
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
            data: { ...userData, device_name: osDetails.name },
        }).then(res => {
            if (res.data) {
                toast.success(res.data.message)
                dispatch({ type: 'LOGIN', user: res.data.user });
            }
            if (res.status == 200) {
                // Save user data to local storage
                localStorage.setItem('user', JSON.stringify(res.data.data));
                localStorage.setItem('token', res.data.token);
                router.push('/page/account/login');
            }
        }).catch(function (error, errors) {
            if (error.response) {
                toast.error(error.response.data.message);
            }
            console.log(errors, error);
        });
    }

    const logout = () => {
        // Remove user data from local storage
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        dispatch({ type: 'LOGOUT' });
    }

    const updateProfile = async (profileData) => {
        await axios({
            method: 'post',
            url: process.env.API_URL + `api/v1/customer/profile?locale=${locale.slice(0, 2)}`,
            auth: `Bearer ${localStorage.get('token')}`,
            data: profileData,
        }).then(res => {
            if (res.data) {
                toast.success(res.data.message)
                dispatch({ type: 'LOGIN', user: res.data.user });
            }
            if (res.status == 200) {
                // Save user data to local storage
                localStorage.setItem('user', JSON.stringify(res.data.data));
                localStorage.setItem('token', res.data.token);
                router.push('/page/account/login');
            }
        }).catch(function (error, errors) {
            if (error.response) {
                toast.error(error.response.data.message);
            }
            console.log(errors, error);
        });
    }
    const getUserDetails = async () => {
        try {
            const response = await axios.get(
                `${process.env.API_URL}api/v1/customer/get?locale=${locale.slice(0, 2)}`, 
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                }
            );

            dispatch({ user: JSON.parse(response.data.data) });
        } catch (error) {
            console.error('Get user details failed:', error);
            return null;
        }
    }
    
    return (
        <UserContext.Provider value={{ state, dispatch, register, login, logout, updateProfile, getUserDetails }}>
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
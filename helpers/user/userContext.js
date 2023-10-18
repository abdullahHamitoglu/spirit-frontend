// UserContext.js

import axios from 'axios';
import { useRouter } from 'next/router';
import { createContext, useContext, useEffect, useReducer, useState } from 'react';
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
        checkTokenExpiry();
        if (savedUser) {
            dispatch({ type: 'LOGIN', user: JSON.parse(savedUser) });
        }
    }, []);

    const setToken = (token) => {
        const expirationTime = new Date().getTime() + 24 * 60 * 60 * 1000; // 24 hours in milliseconds
        localStorage.setItem('token', token);
        localStorage.setItem('tokenExpiry', expirationTime);
    };
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
                setToken(res.data.token);
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
        localStorage.removeItem('tokenExpiry');
        dispatch({ type: 'LOGOUT' });
    }
    const checkTokenExpiry = () => {
        const tokenExpiry = localStorage.getItem('tokenExpiry');
        if (tokenExpiry && new Date().getTime() >= tokenExpiry) {
            logout();
        }
    };
    const updateProfile = async (profileData) => {
        await axios({
            method: 'put',
            url: process.env.API_URL + `api/v1/customer/profile`,
            auth: `Bearer ${localStorage.getItem('token')}`,
            data: profileData,
        }).then(res => {
            if (res.data) {
                toast.success(res.data.message)
                dispatch({ type: 'LOGIN', user: res.data.user });
            }
            if (res.status == 200) {
                // Save user data to local storage
                localStorage.setItem('user', JSON.stringify(res.data.data));
                setToken(res.data.token);
                router.push('/page/account/login');
            }
        }).catch(function (error, errors) {
            if (error.response) {
                toast.error(error.response.data.message);
            }
            console.log(errors, error);
        });
    }
    const fetchUserData = async () => {
        try {
            const token = localStorage.getItem('token');
            if (token) {
                // Send a GET request to fetch the user data using the token
                const response = await axios.get(
                    process.env.API_URL + 'api/v1/customer/get',
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                const userData = response.data;
                console.log(userData);
                dispatch({ type: 'LOGIN', user: userData });
            }
        } catch (error) {
            console.error('Failed to fetch user data:', error);
        }
    };

    // ... (rest of your code)

    return (
        <UserContext.Provider value={{ state, dispatch, register, login, logout, updateProfile, fetchUserData }}>
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
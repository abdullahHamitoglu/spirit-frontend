// userStore.js
import { create } from "zustand";
import { getUserAgent } from "./getUserAgent";
import { toast } from "react-toastify";
import axios from "axios";
import { persist, createJSONStorage } from "zustand/middleware";
import uuid from "react-uuid";
import { destroyCookie, setCookie } from "nookies";

const osDetails = getUserAgent();

const useUserStore = create(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      token: null,
      expirationTime: null,
      fcmToken: null,
      addresses: [],
      address: [],
      api_session: '',
      registeredDeviceID: null,
      register: async (userData, locale) => {
        await axios({
          method: "post",
          withCredentials: true,
          url: `${process.env.NEXT_PUBLIC_API_URL
            }api/v1/customer/register?locale=${locale.slice(0, 2)}`,
          data: userData,
        })
          .then((res) => {
            if (res.data) {
              toast.success(res.data.message);
              set({ api_session: res.headers['Cet-Cookie'].toString().split(';')[0] });
            }
          })
          .catch(function (error, errors) {
            if (error.response) {
              toast.error(error.response.data.message);
            }
            console.log(errors, error);
          });
      },
      login: async (userData, locale) => {
        await axios({
          method: "post",
          url: `${process.env.NEXT_PUBLIC_API_URL}api/v1/customer/login?locale=${locale.slice(0, 2)}`,
          data: { ...userData, device_name: osDetails.name },
        })
          .then((res) => {
            if (res.data && res.status == 200) {
              setCookie(null, "token", res.data.token, {
                maxAge: 7 * 24 * 60 * 60,
                path: "/",
              });
              toast.success(res.data.message);
              console.log(res.headers);
              set({
                user: res.data.data,
                isAuthenticated: true,
                token: res.data.token,
                api_session: '',
                expirationTime: new Date().getTime() + 24 * 60 * 60 * 1000,
              });
              document
                .querySelector("meta[name=token]")
                .setAttribute("content", res.data.token);
            }
          })
          .catch(function (error, errors) {
            if (error.response) {
              toast.error(error.response.data.message);
            }
            console.log(errors, error);
          });
      },
      checkTokenExpiry: () => {
        if (get().tokenExpiry && new Date().getTime() >= get().tokenExpiry) {
          set({
            user: null,
            isAuthenticated: false,
            token: null,
            expirationTime: null,
          });
        }
      },

      updateProfile: async (data) => {
        await axios({
          method: "put",
          url: process.env.NEXT_PUBLIC_API_URL + `api/v1/customer/profile`,

          withCredentials: true,
          headers: {
            Authorization: `Bearer ${get().token}`,
          },
          data,
        })
          .then((res) => {
            if (res.data) {
              toast.success(res.data.message);
              set({ user: res.data.data, isAuthenticated: true });
            }
          })
          .catch(function (error, errors) {
            if (error.message) {
            }
            console.log(errors, error);
          });
      },

      logout: () => {
        set({
          user: null,
          isAuthenticated: false,
          token: null,
          expirationTime: null,
        });
        destroyCookie(null, 'token');
      },
      forgetPwd: async (data, locale) => {
        await axios({
          method: "post",
          url:
            process.env.NEXT_PUBLIC_API_URL +
            `api/v1/customer/forgot-password?locale=${locale.slice(0, 2)}`,
          data,
        }).then((res) => {
          if (res.data && res.status == 200) {
            toast.success(res.data.message);
            set({
              user: res.data.data,
              isAuthenticated: true,
              token: res.data.token,
              expirationTime: new Date().getTime() + 24 * 60 * 60 * 1000,
            });
          }
        })
          .catch(function (error, errors) {
            if (error.response) {
              toast.error(error.response.data.message);
            }
            console.log(errors, error);
          });
      },
      addAddress: async (data, locale) => {
        await axios({
          method: "POST",
          url: `${process.env.NEXT_PUBLIC_API_URL}api/v1/customer/addresses`,
          params: {
            locale: locale.slice(0, 2),
          },
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${get().token}`,
          },
          data,
        })
          .then((res) => {
            if (res.data && res.status == 200) {
              toast.success(res.data.message);
              get().getAddresses(locale)
            }
          })
          .catch((error) => {
            if (error.response.data) {
              toast.error(error.response.data.message);
            }
            console.error(error);
          });
      },
      getAddresses: async (locale) => {
        await axios({
          method: "get",
          url: `${process.env.NEXT_PUBLIC_API_URL}api/v1/customer/addresses`,
          params: {
            locale: locale.slice(0, 2),
          },

          withCredentials: true,
          headers: {
            Authorization: `Bearer ${get().token}`,
          },
        })
          .then((res) => {
            set({
              addresses: res.data.data,
              address: res.data.data[0],
            });
          })
          .catch((error) => {
            if (error.response.data) {
              toast.error(error.response.data.message);
            }
            console.error(error);
          });
      },
      getAddressById: async (locale, id) => {
        await axios({
          method: "get",
          url: `${process.env.NEXT_PUBLIC_API_URL}api/v1/customer/addresses/${id}`,
          params: {
            locale: locale.slice(0, 2),
          },

          withCredentials: true,
          headers: {
            Authorization: `Bearer ${get().token}`,
          },
        })
          .then((response) => {
            set({ address: response.data.data });
          })
          .catch((error) => {
            console.error(error);
          });
      },
      updateAddress: async (data, locale, id, closeModal) => {
        await axios({
          method: "put",
          url: `${process.env.NEXT_PUBLIC_API_URL}api/v1/customer/addresses/${id}`,
          headers: {
            Authorization: `Bearer ${get().token}`,
          },
          params: {
            locale: locale.slice(0, 2),
          },
          withCredentials: true,
          data,
        })
          .then((res) => {
            toast(res.data.message);
            closeModal();
          })
          .catch((error) => {
            if (error.response.data) {
              toast.error(error.response.data.message);
            }
            console.error(error);
          });
      },
      deleteAddress: async (locale, id) => {
        await axios({
          method: "DELETE",
          url: `${process.env.NEXT_PUBLIC_API_URL}api/v1/customer/addresses/${id}`,
          params: {
            locale: locale.slice(0, 2),
          },

          withCredentials: true,
          headers: {
            Authorization: `Bearer ${get().token}`,
          },
        })
          .then((res) => {
            toast(res.data.message);
          })
          .catch((error) => {
            if (error.response.data) {
              toast.error(error.response.data.message);
            }
            console.error(error);
          });
      },

      registerDevice: async () => {
        if (get().fcmToken == null) {
          set({ fcmToken: uuid().replaceAll('-', '') })
        }
        if (get().fcmToken != null && !get().registeredDeviceID) {
          await axios({
            method: "post",
            url: `${process.env.NEXT_PUBLIC_API_URL}api/v1/register_device`,
            data: {
              fcmToken: get().fcmToken,
              os: "web",
            },
          }).then((res) => {
            set({ registeredDeviceID: res.data.deviceDetails.id });
          })
            .catch(function (error) {
              if (error.response) {
                toast.error(error.response.data.message);
              }
              console.error(error);
            });
        }
      },
    }),
    {
      name: "userStorage", // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
    },
  ),
);

export default useUserStore;

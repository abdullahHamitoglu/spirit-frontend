import axios from "axios";

export async function getAddresses(token) {
    const response = await axios({
        method: 'get',
        url: `${process.env.NEXT_PUBLIC_API_URL}api/v1/customer/addresses`,
        headers: {
            'Authorization': `Bearer ${JSON.parse(window.localStorage.getItem('user-storage')).state.token}`
        },
    }).catch((error)=>{
        console.error(error);
    })
    console.log(token);
    return response.data.data;
};
export async function getAddressById(locale, id) {
    const response = await axios({
        method: 'get',
        url: `${process.env.NEXT_PUBLIC_API_URL}api/v1/customer/addresses/${id}`,
        params: {
            locale: locale.slice(0, 2),
        },
        headers: {
            'Authorization': `Bearer ${JSON.parse(window.localStorage.getItem('user-storage')).state.token}`,
        },
    }).catch((error) => {
        console.log(error);
    });

    return response.data.data;
}
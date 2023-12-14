import axios from "axios";

//api/v1/customer/orders/


export async function GetOrders(locale, token , currency) {
    try {

        const response = await axios({
            method: 'get',
            url: `${process.env.NEXT_PUBLIC_API_URL}api/v1/customer/orders`,
            params: {
                locale: locale.slice(0, 2),
                currency,
            },
            withCredentials: true,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })

        return response.data.data;
    } catch (error) {
        return []
    }

}
export async function GetOrderByID(locale, order_id, token) {
    try {

        const response = await axios({
            method: 'get',
            url: `${process.env.NEXT_PUBLIC_API_URL}api/v1/customer/orders/${order_id}`,
            params: {
                locale: locale.slice(0, 2)
            },
            withCredentials: true,

            headers: {
                Authorization: `Bearer ${token}`,
            },
        })

        return response.data.data;
    } catch (error) {
        return []
    }

}
export async function CancelOrder(locale, order_id, token) {
    try {

        const response = await axios({
            method: 'post',
            url: `${process.env.NEXT_PUBLIC_API_URL}api/v1/customer/orders/${order_id}/cancel`,
            params: {
                locale: locale.slice(0, 2)
            },
            withCredentials: true,

            headers: {
                Authorization: `Bearer ${token}`,
            },
        })

        return response.data.data;
    } catch (error) {
        return []
    }

}

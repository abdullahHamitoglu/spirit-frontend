import axios from "axios";
import { toast } from "react-toastify";

export async function getPosts(locale, currencyCode) {
    try {
        const response = await axios({
            method: "GET",
            url: `${process.env.NEXT_PUBLIC_API_URL}api/v1/blog/posts`,
            params: {
                locale: locale.slice(0, 2),
                currency: currencyCode,
                page: 1,
            },
        })
        return response.data.data;
    } catch (error) {
        return []
    }
}
export async function getPostById(locale, currencyCode, id) {
    try {
        const response = await axios({
            method: "GET",
            url: `${process.env.NEXT_PUBLIC_API_URL}api/v1/blog/posts/${id}`,
            params: {
                locale: locale.slice(0, 2),
                currency: currencyCode,
                page: 1,
            },
        })
        return response.data.data;
    } catch (error) {
        return []
    }
}
export async function getPostComments(locale, currencyCode, id) {
    try {
        const response = await axios({
            method: "GET",
            url: `${process.env.NEXT_PUBLIC_API_URL}api/v1/blog/posts/${id}/comments`,
            params: {
                locale: locale.slice(0, 2),
                currency: currencyCode,
                page: 1,
            },
        })
        return response.data.data;
    } catch (error) {
        return []
    }
}
export async function addCommentPost(locale, data, id, token) {
    try {
        const response = await axios({
            method: "POST",
            url: `${process.env.NEXT_PUBLIC_API_URL}api/v1/blog/posts/${id}/comment`,
            params: {
                locale: locale.slice(0, 2),
                page: 1,
            },
            headers: {
                Authorization: `Bearer ${token}`,
            },
            data
        }).then((response) => {
            toast.success(response.data.message)
        });
    } catch (error) {
        toast.error('error');
    }
}
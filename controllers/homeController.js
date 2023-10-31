import axios from "axios";

export async function getPageData(locale, page) {
    try {
        const response = await axios(`${process.env.NEXT_PUBLIC_API_URL}api/v1/pages-slug/${page}?locale=${locale.slice(0, 2)}`);
        return response.data.data;
    } catch (error) {
        throw error;
    }
}
import axios from "axios";
import { parseCookies } from "nookies";


const { token, currencyCode } = parseCookies();


const currency = currencyCode;
export async function getAddresses(locale, token) {
  const response = await axios({
    method: "GET",
    url: `${process.env.NEXT_PUBLIC_API_URL}api/v1/customer/addresses`,
    params: {
      locale: locale.slice(0, 2),
    },
    withCredentials: true,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).catch((error) => {
    console.error(error);
  });

  return response.data.data;
}
export async function getAddressById(locale, id, token ,currency) {
  try {
    const response = await axios({
      method: 'get',
      url: `${process.env.NEXT_PUBLIC_API_URL}api/v1/customer/addresses/${id}`,
      params: {
        locale: locale.slice(0, 2),
        currency
      },
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).catch((error) => {
      console.error(error);
    });

    return response.data.data;
  } catch (error) {
    return []
  }
}
export async function teatToken(locale, id) {


  return response.data.data;
}



import axios from "axios";

export async function getAddresses(locale,  token) {
    const response = await axios({
      method: "GET",
      url: `${process.env.NEXT_PUBLIC_API_URL}api/v1/customer/addresses`,
      params: {
        locale: locale.slice(0, 2),
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).catch((error) => {
      console.log(error);
    });
  
    return response.data.data;
  }
export async function getAddressById(locale, id, token) {
    const response = await axios({
        method: 'get',
        url: `${process.env.NEXT_PUBLIC_API_URL}api/v1/customer/addresses/${id}`,
        params: {
            locale: locale.slice(0, 2),
        },
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }).catch((error) => {
        console.log(error);
    });

    return response.data.data;
}
export async function teatToken(locale, id) {


    return response.data.data;
}



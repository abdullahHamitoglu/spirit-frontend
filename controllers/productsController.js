import currencyStore from "@/helpers/Currency/CurrencyStore";
import axios from "axios";
import { toast } from "react-toastify";

const currency = currencyStore.getState().selectedCurrency.code;
export async function getProducts(locale, params, token) {
  const response = await axios({
    method: "GET",
    url: `${process.env.NEXT_PUBLIC_API_URL}api/v1/products`,
    params: {
      locale: locale.slice(0, 2),
      currency: currency,
      page: 1,
      ...params,
    },
    withCredentials: true,
    headers: {
      'Authorization': `Bearer ${token}`,
    }
  }).catch((error) => {
    console.error(error);
  });

  return response.data;
}
export async function getProductsByCategorySlug(locale, params, token, slug) {
  const response = await axios({
    method: "GET",
    url: `${process.env.NEXT_PUBLIC_API_URL}api/v1/get-category-products/${slug}`,
    params: {
      locale: locale.slice(0, 2),
      currency: currency,
      page: 1,
      ...params,
    },
    withCredentials: true,
    headers: {
      'Authorization': `Bearer ${token}`,
    }
  }).catch((error) => {
    console.error(error);
  });

  return response.data;
}
export async function getProductBySlug(locale, slug) {
  const response = await axios({
    url: `${process.env.NEXT_PUBLIC_API_URL}api/v1/products-slug/${slug}`,
    params: {
      locale: locale.slice(0, 2),
      currency: currency,
    },
  }).catch((error) => {
    console.error(error);
  });

  return response.data.data;
}
export async function getProductReviews(locale, id, params) {
  const response = await axios({
    url: `${process.env.NEXT_PUBLIC_API_URL}api/v1/products/${id}/reviews`,
    params: {
      locale: locale.slice(0, 2),
      currency: currency,
      page: 1,
      ...params
    },
  }).catch((error) => {
    console.error(error);
  });

  return response.data.data;
}


export async function getCatagories(locale, id) {
  const response = await axios({
    method: "GET",
    url: `${process.env.NEXT_PUBLIC_API_URL}api/v1/categories`,
    params: {
      locale: locale.slice(0, 2),
      currency: currency,
      parent_id: id ?? 1,
    },
  }).catch((error) => {
    console.error(error);
  });

  return response.data.data;
}
export async function getCategoryBySlug(locale, slug, token, query) {

  const response = await axios({
    method: "GET",
    url: `${process.env.NEXT_PUBLIC_API_URL}api/v1/categories-slug/${slug}`,
    withCredentials: true,
    headers: {
      'Authorization': `Bearer ${token}`,
    },
    params: {
      locale: locale.slice(0, 2),
      currency: currency,
      ...query
    },
  }).catch((error) => {
    console.error(error);
  });

  return response.data.data;
}
export async function getCategoriesTree(locale) {
  const response = await axios({
    method: "GET",
    url: `${process.env.NEXT_PUBLIC_API_URL}api/v1/categories-tree`,
    params: {
      locale: locale.slice(0, 2),
      currency: currency,
      parent_id: 1,
    },
  }).catch((error) => {
    console.error(error);
  });

  return response.data.data;
}

export async function getBrands(locale) {
  try {
    const response = await axios({
      method: "GET",
      url: `${process.env.NEXT_PUBLIC_API_URL}api/v1/brands`,
      params: {
        locale: locale.slice(0, 2),
        currency: currency,
      },
    });

    return response.data.data;
  } catch (error) {
    throw error;
  }
}

export async function getFilterAttr(locale, params) {
  try {
    const response = await axios({
      method: "GET",
      url: `${process.env.NEXT_PUBLIC_API_URL}api/v1/filterable-attributes`,
      params: {
        locale: locale.slice(0, 2),
        currency: currency,
        ...params,
      },
    });
    return response.data.data;
  } catch (error) {
    throw error;
  }
}
export async function getMaxPrice(locale, params) {
  try {
    const response = await axios({
      method: "GET",
      url: `${process.env.NEXT_PUBLIC_API_URL}api/v1/maximum-price`,
      params: {
        locale: locale.slice(0, 2),
        currency: currency,
        ...params,
      },
    });
    return response.data.data;
  } catch (error) {
    throw error;
  }
}
export async function addReview(locale, data, id, token) {
  try {
    const response = await axios({
      method: "post",
      url: `${process.env.NEXT_PUBLIC_API_URL}api/v1/products/${id}/reviews`,
      params: {
        locale: locale.slice(0, 2)
      },
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      data
    }).then((response) => {
      toast.success(response.data.message)
    }).catch((error) => {
      toast.error(error);
    });
  } catch (error) {
    throw error;
  }
}

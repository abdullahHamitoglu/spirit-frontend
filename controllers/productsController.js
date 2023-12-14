import currencyStore from "@/helpers/Currency/CurrencyStore";
import axios from "axios";
import { toast } from "react-toastify";

const currency = currencyStore.getState().selectedCurrency.code;
export async function getProductsByBrandSlug(locale, params, token, slug, currencyCode) {
  const response = await axios({
    method: "GET",
    url: `${process.env.NEXT_PUBLIC_API_URL}api/v1/get-brand-products/${slug}`,
    params: {
      locale: locale.slice(0, 2),
      currency: currencyCode,
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
export async function getProductsByCategorySlug(locale, params, token, slug, currencyCode) {
  try {
    const response = await axios({
      method: "GET",
      url: `${process.env.NEXT_PUBLIC_API_URL}api/v1/get-category-products/${slug}`,
      params: {
        locale: locale.slice(0, 2),
        currency: currencyCode,
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
  } catch (error) {
    return []
  }
}
export async function getProducts(locale, params, token, currencyCode) {
  try {
    const response = await axios({
      method: "GET",
      url: `${process.env.NEXT_PUBLIC_API_URL}api/v1/products`,
      params: {
        locale: locale.slice(0, 2),
        currency: currencyCode,
        page: 1,
        ...params,
      },
      withCredentials: true,
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    })
    return response.data;
  } catch (error) {
    return []
  }
}
export async function getProductBySlug(locale, slug, currencyCode) {
  const response = await axios({
    url: `${process.env.NEXT_PUBLIC_API_URL}api/v1/products-slug/${slug}`,
    params: {
      locale: locale.slice(0, 2),
      currency: currencyCode,
    },
  }).catch((error) => {
    console.error(error);
  });

  return response.data.data;
}
export async function getProductReviews(locale, id, params, currencyCode) {
  const response = await axios({
    url: `${process.env.NEXT_PUBLIC_API_URL}api/v1/products/${id}/reviews`,
    params: {
      locale: locale.slice(0, 2),
      currency: currencyCode,
      page: 1,
      ...params
    },
  }).catch((error) => {
    console.error(error);
  });

  return response.data.data;
}


export async function getCatagories(locale, id, currencyCode) {
  const response = await axios({
    method: "GET",
    url: `${process.env.NEXT_PUBLIC_API_URL}api/v1/categories`,
    params: {
      locale: locale.slice(0, 2),
      currency: currencyCode,
      parent_id: id ?? 1,
    },
  }).catch((error) => {
    console.error(error);
  });

  return response.data.data;
}
export async function getCategoryBySlug(locale, slug, token, query, currencyCode) {
  try {

    const response = await axios({
      method: "GET",
      url: `${process.env.NEXT_PUBLIC_API_URL}api/v1/category-children/${slug}`,
      withCredentials: true,
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      params: {
        locale: locale.slice(0, 2),
        currency: currencyCode,
        ...query
      },
    })

    return response.data.data;
  } catch (error) {
    console.log(error);
    return []
  }
}
export async function getCategoriesTree(locale, currencyCode) {
  try {
    const response = await axios({
      method: "GET",
      url: `${process.env.NEXT_PUBLIC_API_URL}api/v1/categories-tree`,
      params: {
        locale: locale.slice(0, 2),
        currency: currencyCode,
        parent_id: 1,
      },
    }).catch((error) => {
      console.error(error);
    });

    return response.data.data;

  } catch (error) {
    return []
  }
}

export async function getBrands(locale, currencyCode) {
  try {
    const response = await axios({
      method: "GET",
      url: `${process.env.NEXT_PUBLIC_API_URL}api/v1/brands`,
      params: {
        locale: locale.slice(0, 2),
        currency: currencyCode,
      },
    });

    return response.data.data;
  } catch (error) {
    throw error;
  }
}

export async function getFilterAttr(locale, params, currencyCode) {
  try {
    const response = await axios({
      method: "GET",
      url: `${process.env.NEXT_PUBLIC_API_URL}api/v1/filterable-attributes`,
      params: {
        locale: locale.slice(0, 2),
        currency: currencyCode,
        ...params,
      },
    });
    return response.data.data;
  } catch (error) {
    throw error;
  }
}
export async function getMaxPrice(locale, params, currencyCode) {
  try {
    const response = await axios({
      method: "GET",
      url: `${process.env.NEXT_PUBLIC_API_URL}api/v1/maximum-price`,
      params: {
        locale: locale.slice(0, 2),
        currency: currencyCode,
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

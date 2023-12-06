import React, { useState, useContext, useEffect } from "react";
import { Col, Row, Media, Button, Spinner } from "reactstrap";

import ProductItem from "../../../components/common/product-box/ProductBox12";

import { useRouter } from "next/router";
import ProductCardLoader from "../../../components/common/ProductCardLoader";
import { CompareContext } from "../../../helpers/Compare/CompareContext";
import currencyStore from "@/helpers/Currency/CurrencyStore";
import useWishListStore from "@/helpers/wishlist/wishlistStore";
import useCartStore from "@/helpers/cart/cartStore";
import { useTranslation } from "react-i18next";
import { getProducts } from "@/controllers/productsController";
import useUserStore from "@/helpers/user/userStore";

const ProductList = ({ colClass, layoutList, openSidebar, noSidebar, products, page, productsData, setProductsData }) => {
  const { wishList } = useWishListStore();
  const { addToCart, getCart } = useCartStore();
  const { token } = useUserStore();
  const compareContext = useContext(CompareContext);
  const router = useRouter();
  const { locale } = useRouter();
  const [limit, setLimit] = useState(8);
  const { selectedCurrency } = currencyStore()
  const symbol = selectedCurrency.symbol;
  const [grid, setGrid] = useState(colClass);
  const [sortBy, setSortBy] = useState("AscOrder");
  const [isLoading, setIsLoading] = useState(false);
  const [layout, setLayout] = useState(layoutList);
  const [url, setUrl] = useState();
  const [quantity, setQuantity] = useState(1);
  const { t } = useTranslation();
  const [pageCount, setPageCount] = useState(1); // Initialize pageCount to 1
  const handlePagination = async () => {
    setIsLoading(true);
    // Increment pageCount before making the API call
    let nextPageCount = pageCount + 1;
    try {
      const response = await getProducts(locale, { ...router.query, page: nextPageCount }, token);
      // Update state only if the API call is successful
      setPageCount(nextPageCount);
      setProductsData((prevData) => [...prevData, ...response.data]);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setIsLoading(false);
    }
  };
  const handleScroll = () => {
    const windowHeight = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
    const body = document.body;
    const html = document.documentElement;
    const docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
    const windowBottom = windowHeight + window.pageYOffset;
    if (windowBottom >= docHeight - 400 && !isLoading) {
      handlePagination();
    }
  };
  const handelSortBy = async (event) => {
    setIsLoading(true);
    setProductsData([]);
    router.push({
      query: {
        sort: event.target.value.split(',')[0],
        order: event.target.value.split(',')[1]
      }
    },
      undefined, { shallow: true })
    try {
      const response = await getProducts(locale, router.query, token);
      console.log(response);
      setProductsData(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setIsLoading(false);
    }

  };
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    // Remove the event listener when the component is unmounted
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll])
  return (
    <Col className="collection-content">
      <div className="page-main-content">
        <Row>
          <Col sm="12">
            <Row>
              <Col xs="12">
                {/* <ul className="product-filter-tags">
                  {selectedBrands.map((brand, i) => (
                    <li key={i}>
                      <a href={null} className="filter_tag">
                        {brand}
                        <i
                          className="fa fa-close"
                          onClick={() => removeBrand(brand)}
                        ></i>
                      </a>
                    </li>
                  ))}
                  {selectedColor ? (
                    <li>
                      <a href={null} className="filter_tag">
                        {selectedColor}
                        <i className="fa fa-close" onClick={removeColor}></i>
                      </a>
                    </li>
                  ) : (
                    ""
                  )}
                  {selectedSize.map((size, i) => (
                    <li key={i}>
                      <a href={null} className="filter_tag">
                        {size}
                        <i
                          className="fa fa-close"
                          onClick={() => removeSize(size)}
                        ></i>
                      </a>
                    </li>
                  ))}
                  {
                    <li>
                      <a href={null} className="filter_tag">
                        price: {selectedPrice.min}- {selectedPrice.max}
                      </a>
                    </li>
                  }
                </ul> */}
              </Col>
            </Row>
            <div className="collection-product-wrapper">
              <div className="product-top-filter">
                {!noSidebar ? (
                  <Row>
                    <Col xl="12">
                      <div
                        className="filter-main-btn"
                        onClick={() => openSidebar()}
                      >
                        <span className="filter-btn btn btn-theme">
                          <i className="fa fa-filter" aria-hidden="true"></i>{" "}
                          Filter
                        </span>
                      </div>
                    </Col>
                  </Row>
                ) : (
                  ""
                )}
                <Row>
                  <Col>
                    <div className="product-filter-content">
                      <div className="collection-view">
                        <ul>
                          <li>
                            <i
                              className="fa fa-th grid-layout-view"
                              onClick={() => {
                                setLayout("");
                                setGrid("col-lg-3");
                              }}
                            ></i>
                          </li>
                          <li>
                            <i
                              className="fa fa-list-ul list-layout-view"
                              onClick={() => {
                                setLayout("list-view");
                                setGrid("col-lg-12");
                              }}
                            ></i>
                          </li>
                        </ul>
                      </div>
                      <div
                        className="collection-grid-view"
                        style={
                          layout === "list-view"
                            ? { visibility: "hidden" }
                            : { visibility: "visible" }
                        }
                      >
                        <ul>
                          <li>
                            <Media
                              src={`/assets/images/icon/2.png`}
                              alt=""
                              className="product-2-layout-view"
                              onClick={() => setGrid("col-lg-6")}
                            />
                          </li>
                          <li>
                            <Media
                              src={`/assets/images/icon/3.png`}
                              alt=""
                              className="product-3-layout-view"
                              onClick={() => setGrid("col-lg-4")}
                            />
                          </li>
                          <li>
                            <Media
                              src={`/assets/images/icon/4.png`}
                              alt=""
                              className="product-4-layout-view"
                              onClick={() => setGrid("col-lg-3")}
                            />
                          </li>
                          <li>
                            <Media
                              src={`/assets/images/icon/6.png`}
                              alt=""
                              className="product-6-layout-view"
                              onClick={() => setGrid("col-lg-2")}
                            />
                          </li>
                        </ul>
                      </div>
                      <div className="product-page-filter">
                        <select
                          onChange={(e) => handelSortBy(e)}
                          aria-label="Sort By"
                          className="selective-div border-normal styled-select"
                        >
                          <option value="name,asc" selected="selected">
                            {t('from_a_to_z')}
                          </option>
                          <option value="name,desc">{t('from_z_to_a')}</option>
                          <option value="created_at,desc">{t('newest_first')}</option>
                          <option value="created_at,asc">{t('oldest_first')}</option>
                          <option value="price,asc">{t('cheapest_first')}</option>
                          <option value="price,desc">{t('expensive_first')}</option>
                        </select>
                      </div>
                    </div>
                  </Col>
                </Row>
              </div>
              <div className={`product-wrapper-grid tools-grey ${layout}`}>
                <Row>
                  {/* Product Box */}
                  {!productsData ||
                    productsData.length === 0 ?
                    (
                      productsData &&
                        productsData &&
                        productsData.length === 0 ?
                        '' : (
                          <>
                            <div lassName={grid} className="col-xl-3 col-lg-4 col-6">
                              <ProductCardLoader />
                            </div>
                            <div lassName={grid} className="col-xl-3 col-lg-4 col-6">
                              <ProductCardLoader />
                            </div>
                            <div lassName={grid} className="col-xl-3 col-lg-4 col-6">
                              <ProductCardLoader />
                            </div>
                            <div lassName={grid} className="col-xl-3 col-lg-4 col-6">
                              <ProductCardLoader />
                            </div>
                          </>
                        )
                    ) : (
                      productsData &&
                      productsData.map((product, i) => (
                        <div className={grid} key={i}>
                          <div className="product">
                            <ProductItem
                              des={true}
                              product={product}
                              symbol={symbol}
                              cartClass="cart-info cart-wrap"
                              addCompare={() =>
                                compareContext.addToCompare(product)
                              }
                              addWishlist={() =>
                                // wishlistContext.addToWish(product)
                                wishList('post', product.id)
                              }
                              addCart={() => {
                                addToCart({
                                  product_id: product.id,
                                  quantity,
                                });
                                getCart();
                              }
                              }
                            />
                          </div>
                        </div>
                      ))
                    )}
                  {isLoading && (
                    <>
                      <div lassName={grid} className="col-xl-3 col-lg-4 col-6">
                        <ProductCardLoader />
                      </div>
                      <div lassName={grid} className="col-xl-3 col-lg-4 col-6">
                        <ProductCardLoader />
                      </div>
                      <div lassName={grid} className="col-xl-3 col-lg-4 col-6">
                        <ProductCardLoader />
                      </div>
                      <div lassName={grid} className="col-xl-3 col-lg-4 col-6">
                        <ProductCardLoader />
                      </div>
                    </>
                  )}
                </Row>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </Col>
  );
};

export default ProductList;
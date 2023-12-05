import React, { useContext, useEffect, useState } from "react";
import { Row, Col, Container } from "reactstrap";
import PostLoader from "../PostLoader";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import ProductItem from "../product-box/ProductBox12";
import useCartStore from "../../../helpers/cart/cartStore";
import currencyStore from "../../../helpers/Currency/CurrencyStore";
import useWishListStore from "../../../helpers/wishlist/wishlistStore";


const TopCollection = ({ type, title, subtitle, designClass, noSlider, cartClass, productSlider, titleClass, noTitle, innerClass, inner, backImage, collection }) => {
  const { wishList, wishListLoading } = useWishListStore();

  const { selectedCurrency } = currencyStore()

  const symbol = selectedCurrency.symbol;

  const {addToCart,getCart} = useCartStore();
  const [delayProduct, setDelayProduct] = useState(true);

  var data = collection;
  useEffect(() => {
    setTimeout(() => {
      setDelayProduct(false);
    }, 1);
  }, [delayProduct]);
  return (
    <>
      <section className={designClass + ' ' + 'tools-grey'}>
        <Container>
          <Row>
            <Col>
              {noTitle === "null" ? (
                ""
              ) : (
                <div className={innerClass}>
                  {subtitle ? <h4>{subtitle}</h4> : ""}
                  <h2 className={inner}>{data && data.collection_name}</h2>
                  {titleClass ? (
                    <hr role="tournament6" />
                  ) : (
                    <div className="line">
                      <span></span>
                    </div>
                  )}
                </div>
              )}

              {delayProduct ? (
                <div className="row mx-0 margin-default">
                  <div className="col-xl-3 col-lg-4 col-6">
                    <PostLoader />
                  </div>
                  <div className="col-xl-3 col-lg-4 col-6">
                    <PostLoader />
                  </div>
                  <div className="col-xl-3 col-lg-4 col-6">
                    <PostLoader />
                  </div>
                  <div className="col-xl-3 col-lg-4 col-6">
                    <PostLoader />
                  </div>
                </div>
              ) : (
                <>
                  <Swiper
                    spaceBetween={20}
                    slidesPerView={6}
                    breakpoints={{
                      1200: {
                        slidesPerView: 6,
                      },
                      1090: {
                        slidesPerView: 4,
                      },
                      768: {
                        slidesPerView: 3,
                      },
                      0:{
                        slidesPerView:2
                      }
                    }}
                    centeredSlides={false}
                    centerInsufficientSlides={true}
                  >
                    {data &&
                      data.collection_products.map((product, i) => (
                        <SwiperSlide key={i}>
                          <ProductItem
                            des={true}
                            product={product}
                            symbol={symbol}
                            cartClass="cart-info cart-wrap"
                            addWishlist={() =>
                              wishList('post', product.id)
                            }
                            wishListLoading={wishListLoading}
                            addCart={() =>{
                              addToCart({
                                product_id:product.id,
                                quantity : 1,
                              })
                              getCart()
                              }
                            }
                          />
                        </SwiperSlide>
                      ))
                    }
                  </Swiper>
                </>
              )}
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default TopCollection;

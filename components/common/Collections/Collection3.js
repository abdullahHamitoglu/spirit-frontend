import React, { useContext, useEffect, useState } from "react";
import { Row, Col, Container, Media } from "reactstrap";
import PostLoader from "../PostLoader";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import ProductItem from "../product-box/ProductBox12";
import useCartStore from "../../../helpers/cart/cartStore";
import currencyStore from "../../../helpers/Currency/CurrencyStore";
import useWishListStore from "../../../helpers/wishlist/wishlistStore";
import Link from "next/link";
import CardLoader from "../cardLoader";
import { useRouter } from "next/router";


const TopCollection = ({ type, title, subtitle, designClass, noSlider, cartClass, productSlider, titleClass, noTitle, innerClass, inner, backImage, collection }) => {
  const { wishList, wishListLoading } = useWishListStore();

  const { selectedCurrency } = currencyStore()
  const { locale } = useRouter();
  const symbol = selectedCurrency.symbol;

  const { addToCart, getCart } = useCartStore();
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
              <div className={innerClass}>
                <h2 className={inner}>{collection.title}</h2>
              </div>
              {collection.image &&
                <Link href={collection.path} className="my-5 d-block">
                  <Media className="mw-100" src={collection.image} alt={collection.title} />
                </Link>
              }
              {!collection && !collection.items && collection.items.length < 0 ? (
                <div className="row mx-0 margin-default">
                  <div className="col-xl-3 col-lg-4 col-6">
                    <CardLoader />
                  </div>
                  <div className="col-xl-3 col-lg-4 col-6">
                    <CardLoader />
                  </div>
                  <div className="col-xl-3 col-lg-4 col-6">
                    <CardLoader />
                  </div>
                  <div className="col-xl-3 col-lg-4 col-6">
                    <CardLoader />
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
                      0: {
                        slidesPerView: 2
                      }
                    }}
                    centeredSlides={false}
                    centerInsufficientSlides={true}
                  >
                    {collection && collection.items && collection.items.length > 0 &&
                      collection.items.map((product, i) => (
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
                            addCart={() => {
                              addToCart(locale,
                                {
                                  product_id: product.id,
                                  quantity: 1,
                                })
                              getCart(locale)
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

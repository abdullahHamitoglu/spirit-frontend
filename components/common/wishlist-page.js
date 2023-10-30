import React, { useContext, useEffect } from "react";
import { Container, Row, Col, Table } from "reactstrap";
import { WishlistContext } from "@/helpers/wishlist/WishlistContext";
import CartContext from "@/helpers/cart/index";
import { useRouter } from "next/router";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import useWishListStore from "@/helpers/wishlist/wishlistStore";
import { toast } from "react-toastify";
import useUserStore from "@/helpers/user/userStore";

const WishlistPage = () => {
  const router = useRouter();
  const { wishList, wishListItems } = useWishListStore();
  const { t } = useTranslation();
  if (wishListItems.length <= 0) {
    router.push('/');
    toast.warn(t('wishlist_is_empty'))
  }
  const checkOut = () => {
    router.push("/page/account/checkout");
  };
  useEffect(() => {
    wishList('get');
  }, []);

  return (
    <>
      {wishListItems.length >= 0 ? (
        <section className="wishlist-section section-b-space">
          <Container>
            <Row>
              <Col sm="12">
                <Table className="table cart-table table-responsive-xs">
                  <thead>
                    <tr className="table-head">
                      <th scope="col">{t('image')}</th>
                      <th scope="col">{t('product_name')}</th>
                      <th scope="col">{t('price')}</th>
                      <th scope="col">{t('availability')}</th>
                      <th scope="col">{t('action')}</th>
                    </tr>
                  </thead>
                  {wishListItems.map((item, i) => (
                    <tbody key={i}>
                      <tr>
                        <td>
                          <a href="#">
                            <img src={item.product.images.length > 0 ? item.product.images[0].small_image_url : "/assets/images/lazy.jpg"} alt="" />
                          </a>
                        </td>
                        <td>
                          <a href="#">{item.product.name}</a>
                          <Row className="mobile-cart-content">
                            <div className="col-xs-3">
                              <p>{item.product.in_stock ? t('in_stock') : t('out_of_stock')}</p>
                            </div>
                            <div className="col-xs-3">
                              <h2 className="td-color">${item.product.price}</h2>
                            </div>
                            <div className="col-xs-3">
                              <h2 className="td-color">
                                <a href="#" className="icon me-1">
                                  <i className="fa fa-close"></i>
                                </a>
                                <a href="#" className="cart">
                                  <i className="fa fa-shopping-cart"></i>
                                </a>
                              </h2>
                            </div>
                          </Row>
                        </td>
                        <td>
                          <h2>{item.product.formatted_price}</h2>
                        </td>
                        <td>
                          <p>{item.product.in_stock > 0 ? t('in_stock') : t('out_of_stock')}</p>
                        </td>
                        <td>
                          <a
                            href={null}
                            className="icon me-3"
                            onClick={() => wishList('POST', item.product.id)}
                          >
                            <i className="fa fa-times"></i>
                          </a>
                          <a
                            href={null}
                            className="cart"
                            onClick={() => wishList('POST', item.product.id, true)}
                          >
                            <i className="fa fa-shopping-cart"></i>
                          </a>
                        </td>
                      </tr>
                    </tbody>
                  ))}
                </Table>
              </Col>
            </Row>
            <Row className="wishlist-buttons">
              <Col sm="12">
                <Link href={"/"} className="btn btn-solid">
                  {t('continue_shopping')}
                </Link>
                <a href={null} className="btn btn-solid" onClick={checkOut}>
                  {t('check_out')}
                </a>
              </Col>
            </Row>
          </Container>
        </section>
      ) : (
        ""
      )}
    </>
  );
};

export default WishlistPage;

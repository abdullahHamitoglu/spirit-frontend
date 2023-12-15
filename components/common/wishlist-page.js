import React, { useContext, useEffect, useState } from "react";
import { Container, Row, Col, Table, Button, Spinner, Media } from "reactstrap";
import { useRouter } from "next/router";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import useWishListStore from "../../helpers/wishlist/wishlistStore";

const WishlistPage = ({ wishListItems }) => {
  const router = useRouter();
  const { wishList, updatedWishListItems } = useWishListStore();
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false)
  const [wishListItemsData, setWishListItemsData] = useState(wishListItems)
  if (wishListItemsData.length < 0) {
    router.push('/');
    toast.warn(t('wishlist_is_empty'))
  }
  const checkOut = () => {
    router.push("/account/checkout");
  };

  const handleRemove = async (id) => {
    setLoading(true);
    await wishList('POST', id);
    setLoading(false);
    document.getElementById(id).remove();
  }
  const handleMove = async (id) => {
    setLoading(true);
    await wishList('POST', id, true);
    setLoading(false);
    document.getElementById(id).remove();
  }

  return (
    <>
      {wishListItemsData.length > 0 ? (
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
                  {wishListItemsData.map((item, i) => (
                    <tbody key={i} id={item.product.id}>
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
                          <Button
                            color={loading ? "secondary" : "danger"}
                            disabled={loading}
                            className="icon me-3 p-2 rounded d-inline-flex justify-content-center align-items-center"
                            onClick={() => handleRemove(item.product.id)}
                          >
                            {loading ? <Spinner size='sm' className="m-0" /> :
                              <i className="fa fa-times"></i>
                            }
                          </Button>
                          <Button
                            color="success"
                            className="icon me-3 p-2 rounded d-inline-flex justify-content-center align-items-center"
                            onClick={() => handleMove(item.product.id)}
                          >
                            <i className="fa fa-shopping-cart"></i>
                          </Button>
                        </td>
                      </tr>
                    </tbody>
                  ))}
                </Table>
              </Col>
            </Row>
            <Row className="wishlist-buttons">
              <Col sm="12">
                <Link href={"/products"} className="btn btn-solid">
                  {t('continue_shopping')}
                </Link>
                <Link href={'/account/checkout'} className="btn btn-solid" onClick={checkOut}>
                  {t('check_out')}
                </Link>
              </Col>
            </Row>
          </Container>
        </section>
      ) : (
        <section className="cart-section section-b-space">
          <Container>
            <Row>
              <Col sm="12">
                <div>
                  <div className="col-sm-12 empty-cart-cls text-center">
                    <Media
                      src="/assets/images/icon-empty-cart.png"
                      className="img-fluid mb-4 m-auto"
                      alt={t('wishlist_is_empty')}
                    />
                    <h3>
                      <strong>{t('wishlist_is_empty')}</strong>
                    </h3>
                    <h4>{t('explore_more_shortlist_items')}</h4>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </section>
      )}
    </>
  );
};

export default WishlistPage;

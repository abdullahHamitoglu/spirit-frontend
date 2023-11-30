import React, { useContext } from 'react';
import { Container, Row, Col } from 'reactstrap';
import LeftCollection from '../../../../components/common/Collections/LeftCollection';
import ProductItem from '../../../../components/common/product-box/ProductBox1';


import { CompareContext } from '../../../../helpers/Compare/CompareContext';
import { WishlistContext } from '../../../../helpers/wishlist/WishlistContext';
import CartContext from '../../../../helpers/cart';

const ProductBox = ({ type, cartClass, productDetail }) => {
    const context = useContext(CartContext)
    const contextWishlist = useContext(WishlistContext);
    const contextCompare = useContext(CompareContext);
    const quantity = context.quantity;

    var data = []

    return (
        <section className="section-b-space">
            <div className="full-box">
                <Container>
                    <div className="title4">
                        <h2 className="title-inner4">best selling products</h2>
                        <div className="line"><span></span></div>
                    </div>
                    <Row>
                        <Col md="4">
                            <LeftCollection type={type} border="card-border" product={3} />
                        </Col>
                        <Col md="4" className="center-slider">
                            {data && data.products.items.slice(0, 1).map((product, index) =>
                                <div key={index}>
                                    <ProductItem product={product}
                                        addCompare={() => contextCompare.addToCompare(product)}
                                        addWishlist={() => contextWishlist.addToWish(product)}
                                        productDetail={productDetail}
                                        addCart={() => context.addToCart(product, quantity)} key={index} cartClass={cartClass} />
                                </div>
                            )
                            }
                        </Col>
                        <Col md="4">
                            <LeftCollection type={type} border="card-border" product={3} />
                        </Col>
                    </Row>
                </Container>
            </div>
        </section>
    )
}

export default ProductBox;
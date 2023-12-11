import React, { Fragment, useContext } from "react";
import Link from "next/link";
import { Button, Media } from "reactstrap";
import useCartStore from "../../../helpers/cart/cartStore";

const CartCheckout = ({ item }) => {
  const { removeFromCart } = useCartStore();
  return (
    <Fragment>
      <li className="border-bottom pb-2 mb-3 position-relative">
        <div className="media">
          <Link href={"/products/" + item.product.url_key} className="w-50">
            {item.product.base_image.length ??
              <Media alt="" className="me-3 mw-100 w-100" src={`${item.product.base_image.small_image_url}`} />
            }
          </Link>
          <div className="media-body">
            <Link href={"/products/" + item.product.url_key}>
              <h6>{item.product.name}</h6>
            </Link>

            <h4>
              <span>
                {item.product.formatted_price}
              </span>
            </h4>
          </div>

          <Button color="danger" className="close-circle h-25 rounded d-flex p-2 position-absolute top-0">
            <i
              className="fa fa-times"
              aria-hidden="true"
              onClick={() => removeFromCart(item.id)}></i>
          </Button>
        </div>
      </li>
    </Fragment>
  );
};

export default CartCheckout;

import React, { Fragment, useContext } from "react";
import Link from "next/link";
import { Media } from "reactstrap";
import useCartStore from "@/helpers/cart/cartStore";

const CartHeader = ({ item }) => {
  const { removeFromCart } = useCartStore();
  return (
    <Fragment>
      <li>
        <div className="media">
          <Link href={"/products/" + item.product.url_key}>
            {item.product.base_image.length ??
              <Media alt="" className="me-3" src={`${item.product.base_image.small_image_url}`} />
            }
          </Link>
          <div className="media-body">
            <Link href={"/products/" + item.product.url_key}>
              {/* <a> */}
              <h6>{item.product.name}</h6>
              {/* </a> */}
            </Link>

            <h4>
              <span>
                {item.product.formatted_price}
              </span>
            </h4>
          </div>
        </div>
        <div className="close-circle">
          <i
            className="fa fa-times"
            aria-hidden="true"
            onClick={() => removeFromCart(item.id)}></i>
        </div>
      </li>
    </Fragment>
  );
};

export default CartHeader;

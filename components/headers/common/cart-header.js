import React, { Fragment, useContext } from "react";
import Link from "next/link";
import CartContext from "../../../helpers/cart";
import { Media } from "reactstrap";

const CartHeader = ({ item, symbol }) => {
  const context = useContext(CartContext);
  return (
    <Fragment>
      <li>
        <div className="media">
          <Link href={"/product-details/" + item.id}>
            {item.images.length > 0 ??
              <Media alt="" className="me-3" src={`${item.images[0].original_image_url}`} />
            }
          </Link>
          <div className="media-body">
            <Link href={"/product-details/" + item.id}>
              {/* <a> */}
              <h6>{item.title}</h6>
              {/* </a> */}
            </Link>

            <h4>
              <span>
                {item.formatted_price}
              </span>
            </h4>
          </div>
        </div>
        <div className="close-circle">
          <i
            className="fa fa-times"
            aria-hidden="true"
            onClick={() => context.removeFromCart(item)}></i>
        </div>
      </li>
    </Fragment>
  );
};

export default CartHeader;

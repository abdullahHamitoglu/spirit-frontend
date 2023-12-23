import useCartStore from '@/helpers/cart/cartStore';
import React from 'react'
import { Input, Spinner, Button } from "reactstrap";
import { useRouter } from "next/router";

export default function CartCount({ item }) {
    const [count, setCount] = React.useState(item.quantity);
    const {
        updateQty
    } = useCartStore();
    const { locale } = useRouter();
    // Define the plusQty function
    const plusQty = async (id, q) => {
        setCount(q + 1)
        await updateQty(id, q + 1, locale);
    };

    // Define the minusQty function
    const minusQty = async (id, q) => {
        if (q > 1) {
            setCount(q - 1);
            await updateQty(id, q - 1, locale);
        }
    };
    return (
        <div className="qty-box">
            <div className="input-group">
                <span className="input-group-prepend">
                    <button
                        type="button"
                        className="btn quantity-left-minus"
                        onClick={() => minusQty(item.id, item.quantity)}
                        data-type="minus"
                        data-field=""
                    >
                        <i className="fa fa-angle-right"></i>
                    </button>
                </span>

                <Input
                    type="text"
                    name="quantity"
                    value={count}
                    disabled
                    className="form-control input-number"
                />
                <span className="input-group-prepend">
                    <button
                        type="button"
                        className="btn quantity-right-plus"
                        onClick={() => plusQty(item.id, item.quantity)}
                        data-type="plus"
                        data-field=""
                    >
                        <i className="fa fa-angle-left"></i>
                    </button>
                </span>
            </div>
        </div>
    )
}

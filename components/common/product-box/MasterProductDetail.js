import React from "react";

const MasterProductDetail = ({
  product,
  productDetail,
  currency,
  uniqueTags,
  detailClass,
  title,
  des,
  variantChangeByColor,
}) => {
  let RatingStars = [];
  let rating = product.reviews.average_rating;
  for (var i = 0; i < rating; i++) {
    RatingStars.push(<i className="fa fa-star" key={i}></i>);
  }
  return (
    <div className={`product-detail ${productDetail} ${detailClass}`}>
      <div>
        {title !== "Product style 4" ? (
          <div className="rating">{RatingStars}</div>
        ) : (
          ""
        )}
        <h6>{product.name}</h6>
        <p>{product.short_description}</p>
        <h4>
          {product.formatted_price}
          {parseFloat(product.special_price) < 0 ?
            <del>
              <span className="money">
                {product.formatted_special_price}
              </span>
            </del>
            : ''}
        </h4>

        {/* {product.variants.map((vari) => {
          var findItem = uniqueTags.find((x) => x.color === vari.color);
          if (!findItem) uniqueTags.push(vari);
        })} */}

        {product.type === "jewellery" ||
          product.type === "nursery" ||
          product.type === "beauty" ||
          product.type === "electronics" ||
          product.type === "goggles" ||
          product.type === "watch" ||
          product.type === "pets" ? (
          ""
        ) : (
          <>
            {
              <ul className="color-variant">
                {uniqueTags.map((vari, i) => {
                  return (
                    <li
                      className={vari.color}
                      key={i}
                      title={vari.color}
                      onClick={() =>
                        variantChangeByColor(vari.image_id, product.images)
                      }
                    ></li>
                  );
                })}
              </ul>}
          </>
        )}
      </div>
    </div>
  );
};

export default MasterProductDetail;

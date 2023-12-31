import React from "react";
import ContentLoader from "react-content-loader";

const ProductCardLoader = () => (
  <ContentLoader
    speed={2}
    width={'100%'}
    height={330}
    viewBox="0 0 100% 330"
    className="p-2"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <rect x="0" y="0" rx="5" ry="5" width="100%" height="200" />
    <rect x="0" y="210" rx="5" ry="5" width="80%" height="40" />
    <rect x="85%" y="210" rx="5" ry="5" width="15%" height="40" />
    <rect x="0" y="260" rx="5" ry="5" width="100%" height="20" />
    <rect x="0" y="290" rx="5" ry="5" width="100%" height="20" />
  </ContentLoader>
);

export default ProductCardLoader;

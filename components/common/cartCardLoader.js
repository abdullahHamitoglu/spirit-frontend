import React from "react";
import ContentLoader from "react-content-loader";

const CartCardLoader = (props) => (
  <ContentLoader viewBox="0 0 100% 180" height={230} width={'100%'} {...props}>
    <rect x="0" y="0" rx="4" ry="4" width="48%" height="25" />
    <rect x="0" y="35" rx="4" ry="4" width="48%" height="25" />
    <rect x="0" y="71" rx="4" ry="4" width="48%" height="25" />
    <rect x="52%" y="0" rx="5" ry="5" width="48%" height="100" />
    <rect x="0" y="110" rx="4" ry="4" width="100%" height="25" />
    <rect x="0" y="145" rx="4" ry="4" width="100%" height="25" />
    <rect x="0" y="180" rx="4" ry="4" width="100%" height="25" />
  </ContentLoader>
);

export default CartCardLoader;

import React from "react";
import ContentLoader from "react-content-loader";

const CardLoader = (props) => (
  <ContentLoader viewBox="0 0 100% 160" height={160} width={'100%'} {...props}>
    <rect x="0" y="13" rx="4" ry="4" width="100%" height="30" />
    <rect x="0" y="50" rx="5" ry="5" width="100%" height="100" />
  </ContentLoader>
);

export default CardLoader;

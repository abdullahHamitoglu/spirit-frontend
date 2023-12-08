import React from "react";
import ContentLoader from "react-content-loader";

const ButtonLoader = (props) => (
  <ContentLoader viewBox="0 0 100% 160" height={160} width={'100%'} {...props}>
    <rect x="0" y="30" rx="5" ry="5" width="100%" height="50" />
  </ContentLoader>
);

export default ButtonLoader;

import React from 'react'
import ContentLoader from 'react-content-loader'

const CheckoutLoader = ({ ...rest }) => (
  <ContentLoader height="100%" width="100%" viewBox="0 0 265 230" {...rest}
    style={{
      minWidth: "600px",
      minHeight: "700px"
    }}>
    <rect x="15" y="15" rx="4" ry="4" width="350" height="25" />
    <rect x="15" y="50" rx="2" ry="2" width="350" height="150" />
    <rect x="15" y="230" rx="2" ry="2" width="170" height="20" />
    <rect x="60" y="230" rx="2" ry="2" width="170" height="20" />
  </ContentLoader>
)


export default CheckoutLoader
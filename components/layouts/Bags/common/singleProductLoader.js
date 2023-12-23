import React from 'react'
import ContentLoader from 'react-content-loader'


const SingleProductLoader = props => {
    return (
        <ContentLoader viewBox="0 0 1300 500" height={720} width={"100%"} {...props}>
            <rect x="20" y="15" width="300" height="320" />
            <rect x="92" y="347" width="45" height="45" />
            <rect x="148" y="347" width="45" height="45" />
            <rect x="205" y="347" width="45" height="45" />
            <rect x="361" y="17" width="420" height="33" />
            <rect x="361" y="71" width="315" height="33" />
            <rect x="361" y="125" width="233" height="20" />
            <rect x="361" y="216" width="195" height="13" />
            <rect x="361" y="251" width="195" height="13" />
            <rect x="367" y="311" width="130" height="38" />
            <rect x="515" y="311" width="130" height="38" />
        </ContentLoader>
    )
}

export default SingleProductLoader
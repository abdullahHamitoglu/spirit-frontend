import React from 'react';
import { Col, Media } from 'reactstrap';
import NewProduct from './newProduct';
import Category from './category';
import Brand from './brand'
import Color from './color'
import Size from './size'
import Price from './price';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const FilterPage = ({sm,sidebarView,closeSidebar}) => {
    return (
        <>
            <Col sm={sm} className="collection-filter" style={sidebarView ? {left:"0px"} : {}}>
                {/* <!-- side-bar colleps block stat --> */}
                <div className="collection-filter-block">
                    {/* <!-- brand filter start --> */}
                    <div className="collection-mobile-back" onClick={() => closeSidebar()}>
                        <span className="filter-back">
                            <i className="fa fa-angle-left" aria-hidden="true"></i> back
                        </span>
                    </div>
                    <Category />
                    <Brand/>
                    <Color/>
                    <Size/>
                    <Price />
                </div>
                {/* <!-- silde-bar colleps block end here -->*/}
                <NewProduct />
                {/* <!-- side-bar banner start here -->  */}
                <div className="collection-sidebar-banner">
                    <a href={null}><Media src='/assets/images/side-banner.png' className="img-fluid blur-up lazyload" alt="" /></a>
                </div>
                {/* <!-- side-bar banner end here --> */}
            </Col>
        </>
    )
}

export async function getStaticProps(context) {
    // extract the locale identifier from the URL
    const { locale } = context
  
    return {
      props: {
        // pass the translation props to the page component
        ...(await serverSideTranslations(locale)),
      },
    }
  }
  
export default FilterPage;
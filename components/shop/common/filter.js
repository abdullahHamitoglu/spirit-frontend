import React from 'react';
import { Col, Media } from 'reactstrap';
import NewProduct from './newProduct';
import Category from './category';
import Brand from './brand';
import Price from './price';
import { useTranslation } from 'react-i18next';

const FilterPage = ({ sm, sidebarView, closeSidebar, categories, brands }) => {
    const { t } = useTranslation()
    return (
        <>
            <Col sm={sm} className="collection-filter" style={sidebarView ? { left: "0px" } : {}}>
                {/* <!-- side-bar collops block stat --> */}
                <div className="collection-filter-block">
                    {/* <!-- brand filter start --> */}
                    <div className="collection-mobile-back" onClick={() => closeSidebar()}>
                        <span className="filter-back">
                            <i className="fa fa-angle-left" aria-hidden="true"></i> {t('back')}
                        </span>
                    </div>
                    <Category categories={categories} />
                    <Brand brands={brands} />
                    {/* <Color/>
                    <Size/> */}
                    <Price />
                </div>
                {/* <!-- slide-bar collops block end here -->*/}
                <NewProduct />
                {/* <!-- side-bar banner start here -->  */}
                <div className="collection-sidebar-banner">
                    <a href={null}>
                        <Media src='/assets/images/side-banner.png' className="img-fluid blur-up lazyload" alt="banner" />
                    </a>
                </div>
                {/* <!-- side-bar banner end here --> */}
            </Col>
        </>
    )
}

export default FilterPage;
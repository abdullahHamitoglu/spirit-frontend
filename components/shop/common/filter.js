import React, { useState } from 'react';
import { Col, Media } from 'reactstrap';
import NewProduct from './newProduct';
import Category from './category';
import Brand from './brand';
import Price from './price';
import { useTranslation } from 'react-i18next';
import FilterOptions from './filterOptions';
import { useRouter } from 'next/router';
import useFilterStore from '@/helpers/filter/filterStore';
import { getProducts } from '@/controllers/productsController';
import useUserStore from '@/helpers/user/userStore';

const FilterPage = ({ sm, sidebarView, closeSidebar, attributes, setProductsData }) => {
    const { t } = useTranslation();
    const router = useRouter();
    const { locale } = useRouter();
    const [loading, setLoading] = useState(false);
    const { filteredProducts } = useFilterStore();
    const { token } = useUserStore();
    const showFilterResults = async () => {
        const response = await getProducts(locale, router.query);
        setProductsData(response.data);
    }
    if (attributes.length) {
        return false
    }
    return (
        <>
            {attributes.length > 0 &&
                <Col sm={sm} className="collection-filter" style={sidebarView ? { left: "0px" } : {}}>
                    {/* <!-- side-bar collops block stat --> */}
                    <div className="collection-filter-block">
                        {/* <!-- brand filter start --> */}
                        <div className="collection-mobile-back" onClick={() => closeSidebar()}>
                            <span className="filter-back">
                                <i className="fa fa-angle-left" aria-hidden="true"></i> {t('back')}
                            </span>
                        </div>
                        {/* <Category categories={categories} /> */}
                        { attributes.map((attribute, i) => (
                            attribute.type != 'price' ?
                                <FilterOptions key={i} attr={attribute} /> :
                                <Price key={i} />
                        ))}
                        <Col md="12">
                            <button type="submit" className="btn btn-solid w-100 ms-auto mb-4" onClick={() => showFilterResults()}>{t('show_results')}</button>
                        </Col>
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
            }
        </>
    )
}

export default FilterPage;
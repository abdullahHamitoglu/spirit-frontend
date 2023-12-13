import React, { useState } from 'react';
import { Col, Media, Spinner } from 'reactstrap';
import NewProduct from './newProduct';
import Category from './category';
import Brand from './brand';
import Price from './price';
import { useTranslation } from 'react-i18next';
import FilterOptions from './filterOptions';
import { useRouter } from 'next/router';
import useFilterStore from '@/helpers/filter/filterStore';
import useUserStore from '@/helpers/user/userStore';
import currencyStore from '@/helpers/Currency/CurrencyStore';

const FilterPage = ({ sm, sidebarView, closeSidebar, attributes, setProductsData, getProducts }) => {
    const { t } = useTranslation();
    const router = useRouter();
    const { locale } = useRouter();
    const [loading, setLoading] = useState(false);
    const { selectedCurrency } = currencyStore();
    const { filteredProducts } = useFilterStore();
    const { token } = useUserStore();
    const showFilterResults = async () => {
        setLoading(true)
        const response = await getProducts(locale, { ...router.query, currency: selectedCurrency.code }, token, (router.query.slug ? router.query.slug[0] : ''));
        setProductsData(response.data);
        setLoading(false)
    }
    if (attributes.length < 0) {
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
                        {attributes.map((attribute, i) => (
                            attribute.type != 'price' ?
                                <FilterOptions key={i} attr={attribute} /> :
                                <Price key={i} />
                        ))}
                        <Col md="12">
                            <button type="submit" disabled={loading} className="btn btn-solid w-100 ms-auto mb-4" onClick={() => showFilterResults()}>
                                {loading ?
                                    <>
                                        {t('loading')}
                                        <Spinner size='sm'>
                                        </Spinner>
                                    </>
                                    : t('show_results')
                                }
                            </button>
                        </Col>
                    </div>
                    {/* <!-- slide-bar collops block end here -->*/}
                    {/* <NewProduct /> */}
                    {/* <!-- side-bar banner start here -->  */}
                    {/* <div className="collection-sidebar-banner">
                        <a href={null}>
                            <Media src='/assets/images/side-banner.png' className="img-fluid blur-up lazyload" alt="banner" />
                        </a>
                    </div> */}
                    {/* <!-- side-bar banner end here --> */}
                </Col>
            }
        </>
    )
}

export default FilterPage;
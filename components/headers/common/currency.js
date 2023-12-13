import React, { useContext, useEffect } from "react";
import { Media } from "reactstrap";
import { useTranslation } from 'next-i18next';
import Link from "next/link";
import { useRouter } from "next/router";
import currencyStore from "../../../helpers/Currency/CurrencyStore";



const Currency = ({ icon }) => {
  const { fetchCurrencies, currencies, setCurrency, selectedCurrency } = currencyStore();
  const { t } = useTranslation();
  const { locale, locales } = useRouter();
  const router = useRouter();
  useEffect(() => {
    fetchCurrencies(locale);
  }, []);
  
  const handleCurrencyClick = async (currencyID) => {
    await setCurrency(locale, currencyID);
    router.reload();
  };
  
  return (
    <li className="onhover-div mobile-setting">
      <div>
        <Media src={icon} className="img-fluid" alt="" />
        <i className="fa fa-cog"></i>
      </div>
      <div className="show-div setting">
        <h6>{t('language')}</h6>
        <ul>
            <li>
              <Link href={{ pathname: router.pathname, query: router.query, }} locale="ar-KW">
                {t('ar-kw')}
              </Link>
            </li>
            <li>
              <Link href={{ pathname: router.pathname, query: router.query, }} locale="en-US">
                {t('en-us')}
              </Link>
            </li>
        </ul>
        <h6>{t("currency")}</h6>
        <ul className="list-inline">
          {currencies.data && currencies.data.map((currency, i) => (
            <li className={selectedCurrency.code.toLowerCase() == currency.code.toLowerCase() ? 'active fw-bolder' : ''} key={i} title={currency.name}>
              <div onClick={() => handleCurrencyClick(currency.id)} title={currency.name}>
                {currency.code} {currency.symbol}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </li>
  );
};

export default Currency;

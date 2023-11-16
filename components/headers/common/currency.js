import React, { useContext, useEffect } from "react";
import { Media } from "reactstrap";
import { useTranslation } from 'next-i18next';
import Link from "next/link";
import { useRouter } from "next/router";
import currencyStore from "../../../helpers/Currency/CurrencyStore";



const Currency = ({ icon }) => {
  const { fetchCurrencies, currencies, setCurrency , selectedCurrency } = currencyStore();
  const { t } = useTranslation();
  const { locale, locales } = useRouter();
  const router = useRouter();
  useEffect(() => {
      fetchCurrencies(locale);
  }, []);

  const handleCurrencyClick = (currency) => {
    setCurrency(currency);
  };
  return (
    <li className="onhover-div mobile-setting">
      <div>
        <Media src={icon} className="img-fluid" alt="" />
        <i className="fa fa-cog"></i>
      </div>
      <div className="show-div setting">
        <h6>language</h6>
        <ul>
          {locales.map((l, i) => (
            <li key={i}>
              <Link href={{ pathname: router.pathname, query: router.query, }} locale={l}>
                {t(l.toLowerCase().replace('-', ''))}
              </Link>
            </li>
          ))}
        </ul>
        <h6>currency</h6>
        <ul className="list-inline">
          {currencies.data && currencies.data.map((currency, i) => (
            <li className={selectedCurrency == currency.code ? 'true' : 'false'} key={i} title={currency.name}>
              <div onClick={() => handleCurrencyClick(currency)} title={currency.name}>
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

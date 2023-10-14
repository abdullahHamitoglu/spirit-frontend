import React, { useContext, useEffect } from "react";
import { Media } from "reactstrap";
import { useTranslation } from 'next-i18next';
import { CurrencyContext } from '../../../helpers/Currency/CurrencyContext';
import Link from "next/link";
import { useRouter } from "next/router";



const Currency = ({ icon }) => {
  const { state, setCurrency } = useContext(CurrencyContext);
  const { selectedCurrency, currencies } = state;
  const { t } = useTranslation();
  const { locale, locales } = useRouter();
  
  
  const handleCurrencyClick = (currencyCode) => {
    console.log(currencyCode)
    setCurrency(currencyCode);
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
              <Link href='' locale={l}>
                {t(l.toLowerCase().replace('-',''))}
              </Link>
            </li>
          ))}
        </ul>
        <h6>currency</h6>
        <ul className="list-inline">
          {currencies.data && currencies.data.map((currency, i) => (
              <li key={i} title={currency.name}>
                <div onClick={() => handleCurrencyClick(currency.code)}>
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

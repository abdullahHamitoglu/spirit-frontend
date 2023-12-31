import React, { useContext, useEffect } from "react";
import { Media } from "reactstrap";
import { useTranslation } from 'next-i18next';
import Link from "next/link";
import { useRouter } from "next/router";
import currencyStore from "../../../helpers/Currency/CurrencyStore";
import { setCookie } from "nookies";



const Currency = ({ icon }) => {
  const { fetchCurrencies, currencies, setCurrency, selectedCurrency } = currencyStore();
  const { t } = useTranslation();
  const { locale, locales } = useRouter();
  const router = useRouter();
  useEffect(() => {
    fetchCurrencies(locale);
  }, [locale,]);

  const handleCurrencyClick = async (currencyID, currencyCode) => {
    await setCurrency(locale, currencyID);
    console.log(currencyCode);
    await setCookie(null, "currencyCode", currencyCode, {
      maxAge: 7 * 24 * 60 * 60,
      path: "/",
    });
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
            <Link href={{ pathname: router.pathname, query: router.query, }} locale="ar">
              {t("arabic")}
            </Link>
          </li>
          <li>
            <Link href={{ pathname: router.pathname, query: router.query, }} locale="en">
              {t("english")}
            </Link>
          </li>
        </ul>
        <h6>{t("country")}</h6>
        <ul className="list-inline">
          {currencies.data && currencies.data.map((currency, i) => (
            <li className={`text-start ${selectedCurrency.id == currency.id ? 'active fw-bolder' : ''}`} key={i} title={currency.name}>
              <div  onClick={() => handleCurrencyClick(currency.id, currency.currency_code)} title={currency.name}>
                {currency.name} {currency.symbol}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </li>
  );
};

export default Currency;

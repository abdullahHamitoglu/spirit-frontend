import React, { useContext } from "react";
import { useQuery } from "@apollo/client";
import { gql } from "@apollo/client";
import { Media } from "reactstrap";
import language from "../../constant/langConfig.json";
import { useTranslation } from 'next-i18next';
import { CurrencyContext } from "../../../helpers/Currency/CurrencyContext";
import Link from "next/link";
import { useRouter } from "next/router";

const GET_CURRENCY = gql`
  query {
    getCurrency {
      currency
      name
      symbol
      value
    }
  }
`;

const Currency = ({ icon }) => {
  var { data } = useQuery(GET_CURRENCY);
  const Context = useContext(CurrencyContext);
  const selectedCurrency = Context.currencyContext.selectedCurrency;
  const { t } = useTranslation();
  console.log("data", data);
  const { locale, locales } = useRouter();

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
          {data &&
            data.getCurrency.map((cur, i) => (
              <li key={i}>
                <div onClick={() => selectedCurrency(cur)}>
                  {cur.symbol} {cur.currency}
                </div>
              </li>
            ))}
        </ul>
      </div>
    </li>
  );
};

export default Currency;

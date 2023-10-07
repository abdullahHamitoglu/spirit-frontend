import React, { useContext } from "react";
import { useQuery } from "@apollo/client";
import { gql } from "@apollo/client";
import { Media } from "reactstrap";
import language from "../../constant/langConfig.json";
// import i18next from "../../constant/i18n";
import { CurrencyContext } from "../../../helpers/Currency/CurrencyContext";
import Link from "next/link";

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

const Currency = ({ icon ,locale}) => {
  var { data } = useQuery(GET_CURRENCY);
  const Context = useContext(CurrencyContext);
  const selectedCurrency = Context.currencyContext.selectedCurrency;

  console.log("data", data);


  return (
    <li className="onhover-div mobile-setting">
      <div>
        <Media src={icon} className="img-fluid" alt="" />
        <i className="fa fa-cog"></i>
      </div>
      <div className="show-div setting">
        <h6>language</h6>
        <ul>
          {language.map((item, i) => (
            <li key={i}>
              <Link href='' locale={item.val}>
                {item.lang}
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
export async function getStaticProps({locale}) {
  // Call an external API endpoint to get posts.
  // You can use any data fetching library
  
 
  // By returning { props: { posts } }, the Blog component
  // will receive `posts` as a prop at build time
  return {
    props: {
      locale,
    },
  }
}

export default Currency;

import React, { useState, useContext, useEffect } from "react";
import { useRouter } from "next/router";
import { Collapse } from "reactstrap";
import { useTranslation } from "react-i18next";
import useFilterStore from "../../../helpers/filter/filterStore";
import RangeSlider from 'react-range-slider-input';
import 'react-range-slider-input/dist/style.css';

const Price = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { maxPrice, getMaxPrice, setPrice } = useFilterStore();
  const toggle = () => setIsOpen(!isOpen);
  const { t } = useTranslation();
  const { locale } = useRouter();
  const router = useRouter();
  useEffect(() => {
    getMaxPrice(locale, { ...router.query, price: '' });
  }, []);

  const priceHandle = (event) => {
    document.querySelector('.priceStart').innerHTML = event[0];
    document.querySelector('.priceEnd').innerHTML = event[1];
    if (event) {
      router.push({
        pathname: router.pathname,
        query: {
          ...router.query,
          price: event[0] + ',' + event[1]
        },
      });
    }
    router.push(router)
  };
  return (
    <div className="collection-collapse-block border-0 open">
      <h3 className="collapse-block-title" onClick={toggle}>
        {t('price')}
      </h3>
      <Collapse isOpen={isOpen}>
        <div className="collection-collapse-block-content">
          <div className="wrapper mt-3">
            <div className="range-slider">
              <RangeSlider step="1" min={0}
                max={Math.floor(maxPrice)}
                onInput={(event) => {
                  priceHandle(event);
                }}
                defaultValue={router.query.price ? router.query.price.split(',') : [0, Math.ceil(maxPrice)]}
              />
            </div>
            <div className="priceText">
              <span className="priceStart">{router.query.price ? router.query.price.split(',')[0] : '0'}</span>
              <span className="priceEnd">{router.query.price ? router.query.price.split(',')[1] : maxPrice}</span>
            </div>
          </div>
        </div>
      </Collapse>
    </div>
  );
};

export default React.memo(Price);

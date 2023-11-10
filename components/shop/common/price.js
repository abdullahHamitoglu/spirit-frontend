import React, { useState, useContext, useEffect } from "react";
import { Range, getTrackBackground } from "react-range";
import FilterContext from "../../../helpers/filter/FilterContext";
import { Router, useRouter } from "next/router";
import { Collapse } from "reactstrap";
import { useTranslation } from "react-i18next";
import useFilterStore from "../../../helpers/filter/filterStore";

const Price = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { maxPrice, getMaxPrice, setPrice } = useFilterStore();
  const [values, setValues] = useState([0, Math.floor(maxPrice)]);
  const toggle = () => setIsOpen(!isOpen);
  const { t } = useTranslation();
  const { locale } = useRouter();
  const router = useRouter();
  useEffect(() => {
    getMaxPrice(locale, {...router.query , price: ''});
  }, []);

  const priceHandle = (value) => {
    if (value) {
      router.query.price = value[0] + ',' + value[1];
      router.push(router);
      setPrice(value)
      setValues(value);
    }
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
              <Range
                values={values}
                step={10}
                min={0}
                max={Math.floor(maxPrice)}
                onChange={(price) => {
                  priceHandle(price);
                }}
                renderTrack={({ props, children }) => (
                  <div
                    onMouseDown={props.onMouseDown}
                    onTouchStart={props.onTouchStart}
                    style={{
                      ...props.style,
                      height: "36px",
                      display: "flex",
                      width: "100%",
                    }}>
                    <output style={{ marginTop: "30px" }}>{values[0]}</output>
                    <div
                      ref={props.ref}
                      style={{
                        height: "5px",
                        width: "100%",
                        borderRadius: "4px",
                        background: getTrackBackground({
                          values,
                          colors: ["#ccc", "#f84c3c", "#ccc"],
                          min: 0,
                          max: Math.floor(maxPrice),
                        }),
                        alignSelf: "center",
                      }}>
                      {children}
                    </div>
                    <output style={{ marginTop: "30px" }}>{values[1]}</output>
                  </div>
                )}
                renderThumb={({ props }) => (
                  <div
                    {...props}
                    style={{
                      ...props.style,
                      height: "16px",
                      width: "16px",
                      borderRadius: "60px",
                      backgroundColor: "#f84c3c",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      boxShadow: "0px 2px 6px #AAA",
                    }}></div>
                )}
              />
            </div>
          </div>
        </div>
      </Collapse>
    </div>
  );
};

export default Price;

import React, { useState, useContext } from "react";
import { useQuery } from "@apollo/client";

import { Collapse, Input } from "reactstrap";
import FilterContext from "../../../helpers/filter/FilterContext";
import { useTranslation } from "react-i18next";



const Brand = (brands) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleBrand = () => setIsOpen(!isOpen);

  const { t } = useTranslation();

  return (
    <div className="collection-collapse-block open">
      <h3 className="collapse-block-title" onClick={toggleBrand}>
        {t('brand')}
      </h3>
      <Collapse isOpen={isOpen}>
        <div className="collection-collapse-block-content">
          <div className="collection-brand-filter">
            {brands.brands.length === 0 
              ? "loading"
              : brands &&
              brands.brands.map((brand, index) => (
                <div
                  className="form-check custom-checkbox collection-filter-checkbox"
                  key={index}
                >
                  <Input
                    type="checkbox"
                    className="custom-control-input"
                    id={brand.slug}
                  />
                  <label className="custom-control-label" htmlFor={brand.slug}>
                    {brand.label}
                  </label>
                </div>
              ))}
          </div>
        </div>
      </Collapse>
    </div>
  );
};

export default Brand;

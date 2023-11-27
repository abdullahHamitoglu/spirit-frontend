import React, { useState, useContext } from "react";
import { Collapse, Input } from "reactstrap";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/router";
import { MultiSelect } from 'primereact/multiselect';

//theme
import "primereact/resources/themes/lara-light-indigo/theme.css";



const FilterOptions = (attr) => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const toggleBrand = () => setIsOpen(!isOpen);
  const { pathname, query } = router;

  const handleChange = (event, option, type) => {
    const checkedInputs = document.querySelectorAll(`input[name=${attr.attr.code}]:checked`);
    const values = Array.from(checkedInputs).map((element) => element.value);

    router.push({
      pathname,
      query: {
        ...query,
        [type]: values.join(',')
      },
    },
      undefined, { shallow: true }
    );
  };

  return (
    <div className="collection-collapse-block open">
      <h3 className="collapse-block-title" onClick={toggleBrand}>
        {attr.attr.name}
      </h3>
      <Collapse isOpen={isOpen}>
        <div className="collection-collapse-block-content">
          <div className="collection-brand-filter">
            {attr && attr.attr && attr.attr.options &&
              attr.attr.options.map((option, index) => (
                <div className="form-check custom-checkbox collection-filter-checkbox ms-1" key={index}>
                  <Input
                    checked={router.query[attr.attr.code] && router.query[attr.attr.code].includes(option.label)}
                    type="checkbox"
                    className="custom-control-input"
                    name={attr.attr.code}
                    id={option.label.toLowerCase()}
                    value={option.label}
                    onChange={(event) => handleChange(event, option, attr.attr.code)}
                  />
                  <label className="custom-control-label" htmlFor={option.label.toLowerCase()}>
                    {option.label}
                  </label>
                </div>
              ))}
          </div>
        </div>
      </Collapse>
    </div>
  );
};

export default FilterOptions;

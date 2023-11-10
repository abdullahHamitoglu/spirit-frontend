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
  const { pathname, asPath, query } = router;

  const handleChange = (event, option, type) => {
    if (event.target.checked) {
      var q = `${option.label}`
      router.push({
        pathname,
        query: {
          ...query,
          [type]: q
        },
      });
    } else {
      var q = `${query.options && query.options}`
      router.push({
        pathname,
        query: {
          ...query,
          [type]: q.replace(option.label, '')
        },
      });
    }
  };

  return (
    <div className="collection-collapse-block open">
      <h3 className="collapse-block-title" onClick={toggleBrand}>
        {attr.attr.name}
      </h3>
      <Collapse isOpen={isOpen}>
        <div className="collection-collapse-block-content">
          <div className="collection-brand-filter">
            <MultiSelect onChange={(event) => handleChange(event, event.target, attr.attr.code)} options={attr.attr.options} optionLabel="label"
              placeholder="Select Cities" maxSelectedLabels={3} className="w-full md:w-20rem" />
            {/* {attr && attr.attr && attr.attr.options &&
              attr.attr.options.map((option, index) => (
                <div className="form-check custom-checkbox collection-filter-checkbox ms-1" key={index}>

                  <Input
                    checked={router.query.options && router.query.options.includes(option.label)}
                    type="checkbox"
                    className="custom-control-input"
                    name={option.label}
                    id={option.id}
                    onChange={(event) => handleChange(event, option, attr.attr.code)}
                  />
                  <label className="custom-control-label" htmlFor={option.id}>
                    {option.label}
                  </label>
                </div>
              ))} */}
          </div>
        </div>
      </Collapse>
    </div>
  );
};

export default FilterOptions;

import ThreeDots from "@/components/common/ThreeDots";
import PageLoader from "@/components/layouts/Bags/common/PageLoader";
import algoliasearch from "algoliasearch";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Hits, InstantSearch, SearchBox } from "react-instantsearch";
import {
  Button,
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  Row,
} from "reactstrap";

const closeSearch = () => {
  document.getElementById("search-overlay").style.display = "none";
};
const searchClient = algoliasearch(process.env.NEXT_PUBLIC_ALGOLIA_APP_ID, process.env.NEXT_PUBLIC_ALGOLIA_SECRET);

function Hit({ hit }) {
  return (
    <a href={`/products/${hit.url_key}`} className="search-result">
      <span className="name">{hit.name} <span className="desc">{hit.short_description}</span></span>
      <span className="price">${hit.price}</span>
    </a>
  );
}

const SearchOverlay = () => {
  const { t } = useTranslation();
  const { locale, query } = useRouter();
  const [loading, setLoading] = useState(false)
  const router = useRouter();
  const handleFocus = (event) => {
    if ((event.keyCode === 13)) {
      event.preventDefault();
      if (event.target.value.length >= 3) {
        setLoading(true);
        router.push(`/search/?key=${event.target.value}`);
      }
    }
  }
  const handleSearch = (e) => {
    searchClient.search({
      indexName: "products_index",
      query,
      // Set the query language based on the current locale
      queryLanguages: [locale],
      locale: locale
    });
  };
  useEffect(() => {
    setLoading(false)
    closeSearch()
  }, [query])
  return (
    <>
      <div id="search-overlay" className="search-overlay">
        <div>
          <span className="closebtn" onClick={closeSearch} title="Close Overlay">
            ×
          </span>
          <div className="overlay-content">
            <Container>
              <Row>
                <Col xl="12">
                  {loading ? <ThreeDots /> :
                    <InstantSearch indexName="products_index" searchClient={searchClient}>
                      <SearchBox placeholder={t('search_a_product')} typeof="text"
                        onChange={(event) => { handleSearch(event) }}
                        onKeyDown={(event) => handleFocus(event)}
                        classNames={{
                          root: 'border-0',
                          form: 'border-0',
                          input: 'form-control',
                        }} />
                      <Hits hitComponent={Hit} classNames={{
                        root: 'd-flex',
                        list: 'd-flex flex-column w-100',
                      }} />
                    </InstantSearch>
                  }
                </Col>
              </Row>
            </Container>
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchOverlay;

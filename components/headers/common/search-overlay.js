import algoliasearch from "algoliasearch";
import React from "react";
// import { Hits, InstantSearch, SearchBox } from "react-instantsearch";
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
// const searchClient = algoliasearch(process.env.NEXT_PUBLIC_ALGOLIA_APP_ID, process.env.NEXT_PUBLIC_ALGOLIA_SECRET);

function Hit({ hit }) {
  return (
    <a href={`/products/${hit.url_key}`} className="search-result">
      <span className="name">{hit.name} <span className="desc">{hit.short_description}</span></span>
      <span className="price">${hit.price}</span>
    </a>
  );
}

const SearchOverlay = () => {
  return (
    <div id="search-overlay" className="search-overlay">
      <div>
        <span className="closebtn" onClick={closeSearch} title="Close Overlay">
          ×
        </span>
        <div className="overlay-content">
          <Container>
            <Row>
              <Col xl="12">
                {/* <InstantSearch indexName="products_index" searchClient={searchClient}>
                  <SearchBox placeholder="Search a Product" typeof="text" classNames={{
                    root: 'border-0',
                    form: 'border-0',
                    input: 'form-control',
                  }} />
                  <Hits hitComponent={Hit} classNames={{
                    root: 'd-flex',
                    list: 'd-flex flex-column w-100',
                  }} />
                </InstantSearch> */}
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    </div>
  );
};

export default SearchOverlay;

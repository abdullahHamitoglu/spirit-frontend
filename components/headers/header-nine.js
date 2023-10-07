import React, { Fragment } from "react";
import LogoImage from "./common/logo";
import TopBar from "./common/topbar";
import NavBar from "./common/navbar";
import { Media, Container, Row, Col } from "reactstrap";
import CartContainer from "../containers/CartContainer";
import Currency from "./common/currency";
import SearchOverlay from "./common/search-overlay";

const HeaderNine = ({ logoName }) => {
  const openSearch = () => {
    document.getElementById("search-overlay").style.display = "block";
  };

  return (
    <Fragment>
      <header className="header-gym">
        <div className="mobile-fix-option"></div>
        <TopBar />

        <Container>
          <Row>
            <Col sm="12">
              <div className="main-menu">
                <div className="menu-left">
                  <div className="brand-logo">
                    <LogoImage logo={logoName} />
                  </div>
                </div>
                <div className="menu-right pull-right">
                  <div>
                    <NavBar />
                  </div>
                  <div>
                    <div className="icon-nav">
                      <ul>
                        <li className="onhover-div mobile-search">
                          <div>
                            <Media
                              src="/assets/images/icon/search.png"
                              onClick={openSearch}
                              className="img-fluid"
                              alt=""
                            />
                            <i
                              className="fa fa-search"
                              onClick={openSearch}
                            ></i>
                          </div>
                        </li>
                        <Currency icon="/assets/images/icon/setting.png" />
                        <CartContainer icon="../../public/assets/images/icon/Add-to-cart.png" />
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </header>
      <SearchOverlay />
    </Fragment>
  );
};

export default HeaderNine;

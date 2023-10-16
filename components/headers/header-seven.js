import React, { useState, useEffect } from "react";
import Link from "next/link";
import NavBar from "./common/navbar";
import LogoImage from "./common/logo";
import { Media, Row, Col, Container } from "reactstrap";
import Currency from "./common/currency";
import CartContainer from "../containers/CartContainer";
import SearchOverlay from "./common/search-overlay";
import Image from "next/image";
import { useRouter } from "next/router";

const HeaderSeven = ({ logoName }) => {
  const { state, logout } = useUser();

  const router = useRouter()
  useEffect(() => {
    setTimeout(function () {
      document.querySelectorAll(".loader-wrapper").style = "display:none";
    }, 2000);
  }, []);

  const openSearch = () => {
    document.getElementById("search-overlay").style.display = "block";
    router.reload()
  };
  const handelLogOut = () => {
    logout();
  }
  return (
    <>
      <header className="header-5">
        <div className="mobile-fix-option"></div>
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
                    <nav id="main-nav">
                      <NavBar />
                    </nav>
                  </div>
                  <div className="top-header">
                    <ul className="header-dropdown">
                      <li className="mobile-wishlist">
                        <Link href="/page/account/wishlist">
                          {/* <a> */}
                          <img src="/assets/images/icon/heart.png" alt="" />
                          {/* </a> */}
                        </Link>
                      </li>
                      <li className="onhover-dropdown mobile-account">
                        <img src="/assets/images/icon/avatar.png" alt="" />
                        <ul className="onhover-show-div">
                          <li>
                            <Link href="/page/account/login" data-lng="en">
                              Login
                            </Link>
                          </li>
                          <li>
                            <Link onClick={() => handelLogOut()} data-lng="en">
                              {/* <a > */}
                              Logout
                              {/* </a> */}
                            </Link>
                          </li>
                        </ul>
                      </li>
                    </ul>
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
                              onClick={openSearch}></i>
                          </div>
                        </li>
                        <Currency icon="/assets/images/icon/setting.png" />
                        <CartContainer icon="/assets/images/icon/cart.png" />
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
    </>
  );
};

export default HeaderSeven;

import React from "react";
import { Container, Row, Col } from "reactstrap";
import Link from "next/link";
import { useRouter } from "next/router";
import { useUser } from "@/helpers/user/userContext";

const TopBarDark = ({ topClass, fluid }) => {
  const { state, dispatch } = useUser();

  const router = useRouter();
  const Logout = () => {
    dispatch({ type: 'LOGOUT' });
    router.reload()
  };

  return (
    <div className={topClass}>
      <Container fluid={fluid}>
        <Row>
          <Col lg="6">
            <div className="header-contact">
              <ul>
                <li>Welcome to Our store Multikart</li>
                <li>
                  <i className="fa fa-phone text-white" aria-hidden="true"></i>
                  Call Us: 123 - 456 - 7890
                </li>
              </ul>
            </div>
          </Col>
          <Col lg="6" className="text-end">
            <ul className="header-dropdown">
              <li className="mobile-wishlist">
                <Link href="/page/account/wishlist">
                  {/* <a> */}
                  <i className="fa fa-heart" aria-hidden="true"></i> wishlist
                  {/* </a> */}
                </Link>
              </li>
              <li className="onhover-dropdown mobile-account">
                <i className="fa fa-user" aria-hidden="true"></i> My Account
                <ul className="onhover-show-div">
                  <li>
                    <Link href={`/page/account/login`}>
                      Login
                    </Link>
                  </li>
                  <li>
                    <Link href={`/page/account/register`}>
                      Register
                    </Link>
                  </li><li onClick={() => Logout()}>
                    <a>Logout</a>
                  </li>
                </ul>
              </li>
            </ul>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default TopBarDark;

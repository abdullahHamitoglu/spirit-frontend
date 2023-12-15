import React, { use, useEffect, useState } from "react";
import CommonLayout from "@/components/shop/common-layout";
import { Container, Row, Col } from "reactstrap";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "react-i18next";
import useUserStore from "@/helpers/user/userStore";
import Link from "next/link";
import { useRouter } from "next/router";
import { getPageData } from "@/controllers/homeController";
import nookies, { parseCookies } from "nookies";

const Dashboard = ({ page }) => {
  const [accountInfo, setAccountInfo] = useState(false);
  const { getAddresses, user, logout, isAuthenticated, deleteAddress, addresses } =
    useUserStore();
  const { t } = useTranslation();
  const { locale } = useRouter();
  const router = useRouter();
  if (!isAuthenticated && !user) {
    router.push({
      pathname: "/account/login",
      locale,
      query: {
        redirectUrl: router.pathname,
      },
    });
  }
  const handleDeleteAddress = (id) => {
    deleteAddress(locale, id);
    getAddresses(locale);
  };
  useEffect(() => {
    getAddresses(locale);
  }, []);
  return (
    <CommonLayout parent={t("home")} title={t("dashboard")}>
      <section className="section-b-space">
        <Container>
          <Row>
            <Col lg="3">
              {window.innerWidth <= 991 ? (
                <div
                  className="account-sidebar"
                  onClick={() => setAccountInfo(!accountInfo)}
                >
                  <a className="popup-btn">{t("my_account")}</a>
                </div>
              ) : (
                ""
              )}
              <div
                className="dashboard-left"
                style={accountInfo ? { left: "0px" } : {}}
              >
                <div
                  className="collection-mobile-back"
                  onClick={() => setAccountInfo(!accountInfo)}
                >
                  <span className="filter-back">
                    <i className="fa fa-angle-left" aria-hidden="true"></i>{" "}
                    {t("back")}
                  </span>
                </div>
                <div className="block-content">
                  <ul>
                    <li className="active">
                      <Link href="/account/profile">{t("account_info")}</Link>
                    </li>
                    <li>
                      <Link href="/addresses">{t('address_book')}</Link>
                    </li>
                    <li>
                      <Link href="/account/orders">{t("my_orders")}</Link>
                    </li>
                    <li>
                      <Link href="/account/wishlist">{t("my_wishlist")}</Link>
                    </li>
                    <li>
                      <Link href="/account/profile">{t("my_account")}</Link>
                    </li>
                    <li>
                      <Link href="/account/profile#change_password">
                        {t("change_password")}
                      </Link>
                    </li>
                    <li className="last">
                      <a onClick={() => logout()}>{t("log_out")}</a>
                    </li>
                  </ul>
                </div>
              </div>
            </Col>
            <Col lg="9">
              <div className="dashboard-right">
                <div className="dashboard">
                  <div className="page-title">
                    <h2>{page.title}</h2>
                  </div>
                  <div className="welcome-msg">
                    <p>{page.title}</p>
                    <p dangerouslySetInnerHTML={{ __html: page.content }} />
                  </div>
                  <div className="box-account box-info">
                    <div className="box-head">
                      <h2>{t("account_information")}</h2>
                    </div>
                    <Row>
                      <Col sm="12">
                        <div className="box">
                          <div className="box-title">
                            <h3>{t("contact_information")}</h3>
                            <Link href="/account/profile">{t("edit")}</Link>
                          </div>
                          <Row>
                            <Col md='6' className="box-content">
                              <h6>{user.name} </h6>
                              <h6>{user.email}</h6>
                              <h6>
                                <Link href="/account/profile">
                                  {t("change_password_link")}
                                </Link>
                              </h6>
                            </Col>
                            <Col md='6' className="box-content">
                              <h6>{user.phone_code} {user.phone} </h6>
                              <h6>{user.date_of_birth} - {user.gender}</h6>
                            </Col>
                          </Row>
                        </div>
                      </Col>
                    </Row>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </CommonLayout>
  );
};

export async function getServerSideProps(context) {
  const { locale } = context;
  const cookies = parseCookies(context);

  const page = await getPageData(locale, "dashboard");
  return {
    props: {
      page,
      ...(await serverSideTranslations(locale)),
    },
  };
}

export default Dashboard;

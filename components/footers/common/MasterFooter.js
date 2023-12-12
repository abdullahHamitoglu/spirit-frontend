import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  Container,
  Row,
  Col,
  Form,
  FormGroup,
  Input,
  Button,
  Collapse,
} from "reactstrap";
import LogoImage from "../../headers/common/logo";
import CopyRight from "./copyright";
import { useTranslation } from "react-i18next";
import { CoreConfigFrontFields, coreConfigFrontFields, getPagesData } from "@/controllers/homeController";
import { useRouter } from "next/router";
import { getCategoriesTree } from "@/controllers/productsController";

const MasterFooter = ({
  containerFluid,
  logoName,
  layoutClass,
  footerClass,
  footerLayOut,
  footerSection,
  belowSection,
  belowContainerFluid,
  CopyRightFluid,
  newLatter,
}) => {
  const [isOpen, setIsOpen] = useState();
  const [collapse, setCollapse] = useState(0);
  const width = window.innerWidth <= 767;
  const { t } = useTranslation();
  const [fields, setFields] = useState({});
  const [pages, setPages] = useState([]);
  const { locale } = useRouter();
  const getFields = async () => {
    const response = await coreConfigFrontFields(locale);
    setFields(response);
  }
  const getPages = async () => {
    const response = await getPagesData(locale);
    setPages(response);
  }
  useEffect(() => {
    const changeCollapse = () => {
      if (window.innerWidth <= 767) {
        setCollapse(0);
        setIsOpen(false);
      } else setIsOpen(true);
    };

    window.addEventListener("resize", changeCollapse);

    return () => {
      getFields();
      getPages();
      window.removeEventListener("resize", changeCollapse);
    };

  }, []);
  const router = useRouter();
  const [categories, setCategories] = useState([]);
  const fetchCates = async () => {
    const response = await getCategoriesTree(router.locale);
    setCategories(response);
  };

  useEffect(() => {
    fetchCates();
  }, [])
  return (
    <div>
      <footer className={footerClass}>
        {/* newLatter ? (
          <div className={footerLayOut}>
            <Container fluid={containerFluid ? containerFluid : ""}>
              <section className={footerSection}>
                <Row>
                  <Col lg="6">
                    <div className="subscribe">
                      <div>
                        <h4>{t('footer.subscribeTitle')}</h4>
                        <p>{t('footer.subscribeDescription')}</p>
                      </div>
                    </div>
                  </Col>
                  <Col lg="6">
                    <Form className="form-inline subscribe-form">
                      <div className="mx-sm-3">
                        <Input
                          type="text"
                          className="form-control"
                          id="exampleFormControlInput1"
                          placeholder={t('footer.enterEmailPlaceholder')}
                        />
                      </div>
                      <Button type="submit" className="btn btn-solid">
                        {t('footer.subscribeButton')}
                      </Button>
                    </Form>
                  </Col>
                </Row>
              </section>
            </Container> 
          </div>
        ) : (
          ""
        )*/}

        <section className={belowSection}>
          <Container fluid={belowContainerFluid ? belowContainerFluid : ""}>
            <Row className="footer-theme partition-f">
              <Col lg="4" md="6">
                <div
                  className={`footer-title ${isOpen && collapse == 1 ? "active" : ""
                    } footer-mobile-title`}>
                  <h4
                    onClick={() => {
                      setCollapse(1);
                      setIsOpen(!isOpen);
                    }}>
                    {t('footer.aboutTitle')}
                    <span className="according-menu"></span>
                  </h4>
                </div>
                <Collapse
                  isOpen={width ? (collapse === 1 ? isOpen : false) : true}>
                  <div className="footer-contant">
                    <div className="footer-logo">
                      <LogoImage logo={logoName} />
                    </div>
                    <p>{t('footer.aboutContent')}</p>
                    <div className="footer-social">
                      <ul>
                        <li>
                          <a href="https://www.facebook.com" target="_blank">
                            <i className="fa fa-facebook" aria-hidden="true"></i>
                          </a>
                        </li>
                        <li>
                          <a href="https://plus.google.com" target="_blank">
                            <i className="fa fa-google-plus" aria-hidden="true"></i>
                          </a>
                        </li>
                        <li>
                          <a href="https://twitter.com" target="_blank">
                            <i className="fa fa-twitter" aria-hidden="true"></i>
                          </a>
                        </li>
                        <li>
                          <a href="https://www.instagram.com" target="_blank">
                            <i className="fa fa-instagram" aria-hidden="true"></i>
                          </a>
                        </li>
                        <li>
                          <a href="https://rss.com" target="_blank">
                            <i className="fa fa-rss" aria-hidden="true"></i>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </Collapse>
              </Col>
              {pages.length > 0 &&
                <Col className={`offset-xl-1`}>
                  <div className="sub-title">
                    <div
                      className={`footer-title ${isOpen && collapse == 2 ? "active" : ""
                        } `}>
                      <h4
                        onClick={() => {
                          if (width) {
                            setIsOpen(!isOpen);
                            setCollapse(2);
                          } else setIsOpen(true);

                        }}
                        className="overflow-hidden text-nowrap">
                        {t('pages')}
                        <span className="according-menu"></span>
                      </h4>
                    </div>
                    <Collapse
                      isOpen={width ? (collapse === 2 ? isOpen : false) : true}>
                      <div className="footer-contant">
                        <ul>
                          {pages.slice(0, 6).map((page, i) => (
                            <li key={i}>
                              <Link href={page.url_key}>
                                {page.title}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </Collapse>
                  </div>
                </Col>
              }
              {pages.slice(6, 12).length > 0 &&
                <Col>
                  <div className="sub-title">
                    <div
                      className={`footer-title ${isOpen && collapse == 2 ? "active" : ""
                        } `}>
                      <h4
                        onClick={() => {
                          if (width) {
                            setIsOpen(!isOpen);
                            setCollapse(2);
                          } else setIsOpen(true);
                        }}
                        className="overflow-hidden text-nowrap">
                        {t('pages')}
                        <span className="according-menu"></span>
                      </h4>
                    </div>
                    <Collapse
                      isOpen={width ? (collapse === 2 ? isOpen : false) : true}>
                      <div className="footer-contant">
                        <ul>
                          {pages.slice(6, 12).map((page, i) => (
                            <li key={i}>
                              <Link href={page.url_key}>
                                {page.title}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </Collapse>
                  </div>
                </Col>
              }
              <Col>
                <div className="sub-title">
                  <div
                    className={`footer-title ${isOpen && collapse == 4 ? "active" : ""
                      } `}>
                    <h4
                      onClick={() => {
                        if (width) {
                          setIsOpen(!isOpen);
                          setCollapse(4);
                        } else setIsOpen(true);
                      }}>
                      {t('footer.storeInformationTitle')}
                      <span className="according-menu"></span>
                    </h4>
                  </div>
                  <Collapse
                    isOpen={width ? (collapse === 4 ? isOpen : false) : true}>
                    <div className="footer-contant">
                      <ul className="contact-list">
                        {fields.length > 0 ? fields.map((field, i) => (
                          <li>
                            {field.code.indexOf('address') > 0 ? <i className="fa fa-map-marker"></i> : ''}
                            {field.code.indexOf('phone') > 0 ? <i className="fa fa-phone"></i> : ''}
                            {field.code.indexOf('email') > 0 ? <i className="fa fa-envelope"></i> : ''}
                            {field.name} : {field.value}
                          </li>
                        )) : ''}
                        {/* <li>
                          <i className="fa fa-phone"></i>{t('footer.storePhoneNumber')}
                        </li>
                        <li>
                          <i className="fa fa-envelope-o"></i>{t('footer.storeEmail')}
                        </li>
                        <li>
                          <i className="fa fa-fax"></i>{t('footer.storeFax')}
                        </li> */}
                      </ul>
                    </div>
                  </Collapse>
                </div>
              </Col>
            </Row>
          </Container>
        </section>

        <CopyRight
          layout={layoutClass}
          fluid={CopyRightFluid ? CopyRightFluid : ""}
        />
      </footer>
    </div>
  );
};
export default MasterFooter;

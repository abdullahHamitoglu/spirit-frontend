import React from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import CommonLayout from "@/components/shop/common-layout";
import * as Yup from 'yup';
import { Container, Row, Form, Input, Label, Col } from 'reactstrap';
import { Field, Formik } from 'formik';
import CartLoader from "@/components/layouts/Bags/common/cartLoader";
import { isEqual } from "lodash";
import useUserStore from "@/helpers/user/userStore";
import { getAddressById, getAddresses } from "@/controllers/addressesController";
import { parseCookies } from "nookies";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const UniqueAddress = () => {
  const [address, setAddress] = React.useState({});
  const [loading, setLoading] = React.useState(false);
  const { query } = useRouter();

  const currentAddressId = query.id;

  const { t } = useTranslation();
  const { locale } = useRouter();
  const { updateAddress } = useUserStore();



  const addressValidationSchema = Yup.object().shape({
    company_name: Yup.string().required(t('first_name_required')),
    first_name: Yup.string().required(t('first_name_required')),
    last_name: Yup.string().required(t('first_name_required')),
    email: Yup.string().email(t('invalid_email')).required(t('first_name_required')),
    address1: Yup.array().required(t('first_name_required')),
    state: Yup.string().required(t('first_name_required')),
    city: Yup.string().required(t('first_name_required')),
    postcode: Yup.string().required(t('first_name_required')),
    phone: Yup.string().required(t('first_name_required')),
    vat_id: Yup.string().required(t('first_name_required')),
  });

  const getUniqueAddress = async () => {
    try {
      setLoading(true);
      const response = await axios({
        method: 'get',
        url: `${process.env.NEXT_PUBLIC_API_URL}api/v1/customer/addresses/${currentAddressId}`,
        params: {
          locale: locale.slice(0, 2),
        },
        headers: {
          'Authorization': `Bearer ${JSON.parse(window.localStorage.getItem('user-storage')).state.token}`,
        },
      });

      const { data } = response.data;

      setAddress(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  React.useEffect(() => {
    getUniqueAddress();
  }, []);

  return (

    <CommonLayout parent={t('home')} title={address.company_name}>
      {loading && address ? <CartLoader className="d-flex justify-content-center w-100" /> :
        <section className="contact-page register-page section-b-space">
          <Container>
            <Row>
              <Col sm="12">
                <h3>{t("shipping_address")}</h3>
                <Formik
                  initialValues={{
                    company_name: address.company_name,
                    first_name: address.first_name,
                    last_name: address.last_name,
                    email: address.email,
                    address1: address.address1 && address.address1.length > 0 ? address.address1[0] : '',
                    country: address.country,
                    state: address.state,
                    city: address.city,
                    postcode: address.postcode,
                    phone: address.phone,
                    vat_id: address.vat_id
                  }}
                  validationSchema={addressValidationSchema}
                  onSubmit={(values, { setSubmitting }) => {
                    updateAddress(values, locale, currentAddressId);
                    setSubmitting(false);
                  }}
                >
                  {({ values, errors, touched, handleSubmit, isSubmitting, setFieldValue, setFieldValues }) => (
                    <Form className="theme-form" onSubmit={handleSubmit}>
                      <Row>
                        <Col md="6">
                          <Label className="form-label" for="company_name">
                            {t('company_name')}
                            {errors.company_name && touched.company_name && <span className="error ms-1 text-danger">{errors.company_name}</span>}
                          </Label>
                          <Field
                            type="text"
                            className="form-control"
                            id="company_name"
                            name='company_name'
                            placeholder={t('inter.company_name')}
                            onChange={(e) => setFieldValue('company_name', e.target.value)}
                            value={values.company_name}
                            required=""
                          />
                        </Col>
                        <Col md="6">
                          <Label className="form-label" for="first_name">
                            {t('first_name')}
                            {errors.first_name && touched.first_name && <span className="error ms-1 text-danger">{errors.first_name}</span>}
                          </Label>
                          <Field
                            type="text"
                            className="form-control"
                            id="first_name"
                            name='first_name'
                            placeholder={t('inter.name')}
                            value={values.first_name}
                            onChange={(e) => setFieldValue('first_name', e.target.value)}
                            required=""
                          />
                        </Col>
                        <Col md="6">
                          <Label className="form-label" for="last_name">
                            {t('last_name')}
                            {errors.last_name && touched.last_name && <span className="error ms-1 text-danger">{errors.last_name}</span>}
                          </Label>
                          <Field
                            type="text"
                            className="form-control"
                            id="last_name"
                            name='last_name'
                            placeholder={t('inter.name')}
                            required=""
                            value={values.last_name}
                            onChange={(e) => setFieldValue('last_name', e.target.value)}
                          />
                        </Col>
                        <Col md="6">
                          <Label className="form-label" for="email">
                            {t('email')}
                          </Label>
                          <Field
                            type="email"
                            className="form-control"
                            id="email"
                            placeholder={t('inter.email')}
                            name="email"
                          />
                        </Col>
                        <Col md="6">
                          <Label className="form-label" for="phone">
                            {t('phone')}
                          </Label>
                          <Field
                            type="number"
                            className="form-control"
                            id="phone"
                            name='phone'
                            placeholder={t('inter.number')}
                            value={values.phone}
                            onChange={(e) => setFieldValue('phone', e.target.value)}
                            required=""
                          />
                        </Col>
                        <Col md="6">
                          <Label className="form-label" for="state">
                            {t('state')}
                            {errors.state && touched.state && <span className="error ms-1 text-danger">{errors.state}</span>}
                          </Label>
                          <Field
                            type="text"
                            className="form-control"
                            id="state"
                            name='state'
                            placeholder={t('inter.state')}
                            value={values.state}
                            onChange={(e) => setFieldValue('state', e.target.value)}
                            required=""
                          />
                        </Col>
                        <Col md="6">
                          <Label className="form-label" for="address1">
                            {t("address_label")}
                          </Label>
                          <Input
                            type="text"
                            className="form-control"
                            id="address1"
                            name="address1"
                            placeholder={t("address_label")}
                            value={[values.address1]}
                            onChange={(e) => setFieldValue('address1', [e.target.value])}
                            required=""
                          />
                        </Col>
                        <Col md="6">
                          <Label className="form-label" for="zip-code">
                            {t("postcode")}
                          </Label>
                          <Input
                            type="number"
                            className="form-control"
                            id="zip-code"
                            name="postcode"
                            placeholder={t("postcode")}
                            required=""
                            value={values.postcode}
                            onChange={(e) => setFieldValue('postcode', e.target.value)}
                          />
                        </Col>
                        <Col md="6">
                          <Label className="form-label" for="country">
                            {t("country_label")}
                          </Label>
                          <Input
                            type="text"
                            className="form-control"
                            id="country"
                            name="country"
                            placeholder={t("country_label")}
                            value={values.country}
                            onChange={(e) => setFieldValue('country', e.target.value)}
                            required=""
                          />
                        </Col>
                        <Col md="6">
                          <Label className="form-label" for="city">
                            {t("city_label")}
                          </Label>
                          <Input
                            type="text"
                            className="form-control"
                            id="city"
                            name="city"
                            placeholder={t("city_label")}
                            required=""
                            value={values.city}
                            onChange={(e) => setFieldValue('city', e.target.value)}
                          />
                        </Col>
                        <div className="col-md-12">
                          <button className="btn btn-sm btn-solid" type="submit" name="submit_button" disabled={isEqual(values, address)}>
                            {t("button_text")}
                          </button>
                        </div>
                      </Row>
                    </Form>
                  )}
                </Formik>
              </Col>
            </Row>
          </Container>
        </section>
      }
    </CommonLayout>
  );
};
export async function getStaticPaths() {
  return {
    paths: [
      // String variant:
      // Object variant:
      { params: { id: '9' } },
    ],
    fallback: true,
  }
}
export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale)),
    }
  } 
}

export default UniqueAddress;
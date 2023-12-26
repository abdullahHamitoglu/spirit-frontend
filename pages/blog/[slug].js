import CommonLayout from "@/components/shop/common-layout";
import { addCommentPost, getPostById, getPostBySlug, getPostComments } from "@/controllers/blogController";
import useUserStore from "@/helpers/user/userStore";
import { useFormik } from "formik";
import moment from "moment";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import { parseCookies } from "nookies";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { Container, Form, Input, Label, Media, Row, Col, Spinner } from "reactstrap";
import * as Yup from 'yup';

function post({ post, comments }) {
  const { t } = useTranslation();
  const { locale } = useRouter();
  const router = useRouter();
  const { token, isAuthenticated } = useUserStore();
  console.log(post);
  const formik = useFormik({
    initialValues: {
      name: '',
      comment: '',
      email: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required(t('name_required')),
      comment: Yup.string().required(t('comment_required')),
      email: Yup.string().email(t('invalid_email')).required(t('email_required')),
    }),
    onSubmit: async (values) => {
      console.log(values);
      await addCommentPost(locale, values, post.id, token);
    },
  });
  return (
    <CommonLayout parent={t("home")} title={t("blogs")} titleLink={'/blog'} subTitle={post.name}>
      <section className="blog-detail-page section-b-space ratio2_3">
        <Container>
          <Row>
            <Col sm="12" className="blog-detail">
              <h1 className="h3">{post.name}</h1>
              <ul className="post-social">
                <li>{t('posted_by')} : {post.author}</li>
                <li>
                  <i className="fa fa-heart"></i> {post.like_count} {t("hits")}
                </li>
                <li>
                  <i className="fa fa-comments"></i> {post.comments_count} {t('comment')}
                </li>
              </ul>
              <p dangerouslySetInnerHTML={{ __html: post.description }} />
            </Col>
          </Row>
          <Row className="section-b-space">
            <Col sm="12">
              <ul className="comment-section">
                {comments && comments.map((comment) => (
                  <li className="w-100">
                    <div className="media">
                      <div className="media-body">
                        <h6>
                          {comment.name} <span>( {moment(comment.created_at).format('D/M/Y - HH:MM')} )</span>
                        </h6>
                        <p>
                          {comment.comment}
                        </p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </Col>
          </Row>
          <Row className="blog-contact">
            <Col sm="12">
              <h2>{t('leave_your_comment')}</h2>
              <Form className="theme-form" onSubmit={formik.handleSubmit}>
                <Row>
                  <Col md="12"> 
                    <Label className="form-label" htmlFor="name">
                      {t('name')}
                    </Label>
                    <Input
                      type="text"
                      className={`form-control ${formik.errors.name ? 'is-invalid' : ''}`}
                      id="name"
                      placeholder={t('inter.name')}
                      required=""
                      onChange={formik.handleChange}
                      value={formik.values.name} 
                      name="name"
                    />
                    {formik.errors.name && (
                      <div className="invalid-feedback">{formik.errors.name}</div>
                    )}
                  </Col>
                  <Col md="12">
                    <Label className="form-label" htmlFor="email">
                      {t('email')}
                    </Label>
                    <Input
                      type="email"
                      className={`form-control ${formik.errors.email ? 'is-invalid' : ''}`}
                      id="email"
                      placeholder={t('email')}
                      required=""
                      onChange={formik.handleChange}
                      value={formik.values.email}
                      name="email"
                    />
                    {formik.errors.email && (
                      <div className="invalid-feedback">{formik.errors.email}</div>
                    )}
                  </Col>
                  <Col md="12">
                    <Label className="form-label" htmlFor="comment">
                      {t('comment')}
                    </Label>
                    <Input
                      type="textarea"
                      className={`form-control ${formik.errors.comment ? 'is-invalid' : ''}`}
                      placeholder={t('write_your_comment')}
                      id="comment"
                      rows="6"
                      onChange={formik.handleChange}
                      value={formik.values.comment}
                      name="comment"
                    />
                    {formik.errors.comment && (
                      <div className="invalid-feedback">{formik.errors.comment}</div>
                    )}
                  </Col>
                  <Col md="12">
                    <button className="btn btn-solid" type={isAuthenticated ? "submit" : "button"} onClick={() => !isAuthenticated && router.push('/account/login')}>
                      {formik.isSubmitting ? <Spinner size='sm' /> : t('submit')}
                    </button>
                  </Col>
                </Row>
              </Form>
            </Col>
          </Row>
        </Container>
      </section>
    </CommonLayout>
  );
}
export async function getServerSideProps(context) {
  try {

    const { locale, query, params } = context;
    const { token, currencyCode } = parseCookies(context);
    const post = await getPostBySlug(locale, currencyCode, params.slug);
    const comments = await getPostComments(locale, currencyCode, params.slug);
    if (!post.length <= 0) {
      return {
        notFound: true
      }
    }
    return {
      props: {
        post,
        comments,
        ...(await serverSideTranslations(locale)),
      },
    };
  } catch (error) {
    return {
      notFound: true
    }
  }
}
export default post;
import React from 'react';
import { Field, Formik } from 'formik';
import * as Yup from 'yup';
import { Form, FormGroup, Label, Input, Button, Col, Row } from 'reactstrap';
import { Rating } from '@mui/material';
import Trans from '@/helpers/Trans';
import { addReview } from '@/controllers/productsController';
import { useRouter } from 'next/router';
import useUserStore from '@/helpers/user/userStore';
const RatingForm = ({ id }) => {
    const validationSchema = Yup.object().shape({
        title: Yup.string().required(Trans('this_field_is_required')),
        comment: Yup.string().required(Trans('this_field_is_required')),
        rating: Yup.number().required(Trans('this_field_is_required')),
    });
    const { locale } = useRouter();
    const { token } = useUserStore();
    return (
        <Formik
            initialValues={{ title: '', comment: '', rating: 0 }}
            validationSchema={validationSchema}
            onSubmit={(values, { setSubmitting }) => {
                addReview(locale, values, id, token);
                setSubmitting(false);
            }}>
            {({ handleChange, errors, handleSubmit }) => (
                <Form onSubmit={handleSubmit} className=' theme-form my-5'>
                    <Row>
                        <Col md="6" sm="12" xs="12" className="form-group">
                            <Label for="title" className='form-label'>{Trans('title')} </Label>
                            <Field
                                type="text"
                                id="title"  
                                name="title"
                                className={`form-control ${errors.title ? 'is-invalid' : ''} text-start`}
                                onChange={handleChange}
                            />
                            {errors.title && <div className="invalid-feedback">{errors.title}</div>}
                        </Col>
                        <Col md="6" sm="12" xs="12" className="form-group">
                            <Label for="comment" className='form-label'>{Trans('comment')}</Label>
                            <Field
                                id="comment"
                                name="comment"
                                className={`form-control ${errors.comment ? 'is-invalid' : ''} text-start`}
                                rows="5"
                                onChange={handleChange}
                            />
                            {errors.comment && <div className="invalid-feedback">{errors.comment}</div>}
                        </Col>
                        <Col md="6" sm="12" xs="12" className="form-group">
                            <Label for="rating" className='form-label'>{Trans('rating')}</Label><br />
                            <Rating name="rating" className='mb-4' defaultValue={1} size="large" dir='ltr' onChange={handleChange} />
                        </Col>
                        <Col md="12" sm="12" xs="12" className="form-group">
                            <Button className='btn-solid ' type="submit">{Trans('submit')}</Button>
                        </Col>
                    </Row>
                </Form>
            )}
        </Formik>
    );
};

export default RatingForm;

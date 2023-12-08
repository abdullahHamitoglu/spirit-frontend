import React, { useEffect, useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Col, Label } from 'reactstrap';
import AddressForm from '../account/addressPageForm';
import { Field, Form, Formik } from 'formik';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import useUserStore from '@/helpers/user/userStore';
import addressStore from '@/helpers/address/addressStore';
import * as Yup from 'yup';
import ContactFormLoader from '../layouts/Bags/common/formLoader';
import CustomPhoneInput from '../account/customPhoneInput';
import { isEqual } from 'lodash';
import axios from 'axios';
import Cheerio from 'cheerio';

function PaymentModal(args) {
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const { t } = useTranslation();
    const { locale, query } = useRouter();
    
    return (
        <div>
            <Modal {...args} centered backdrop='static' size='xl' >
                <ModalHeader toggle={args.toggle}>
                    {t("payment")}
                </ModalHeader>
                <ModalBody className='p-4'>
                    
                </ModalBody>
            </Modal>
        </div>
    );
}

export default PaymentModal;
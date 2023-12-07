import addressStore from '@/helpers/address/addressStore';
import { Field } from 'formik';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { PhoneInput } from 'react-international-phone';
import 'react-international-phone/style.css';
import { Row } from 'reactstrap';
function CustomPhoneInput({ values, isDetails, setFieldValue }) {
    const { t } = useTranslation();
    const [phone, setPhone] = useState('');
    const { getCountries, countries } = addressStore();
    const { locale } = useRouter();
    useEffect(() => {
        if (countries.length <= 0) {
            getCountries(locale);
        }
    }, []);
    return (
        <>
            <Row className='m-0' dir='ltr'>
                <Field
                    disabled={isDetails}
                    className="form-control  w-25 px-3"
                    as="select"
                    id="phone_code"
                    placeholder={t('inter.phone_code')}
                    name="phon_code"
                    value={values.phone_code}
                    onChange={(e) => setFieldValue('phone_code', e.target.value)}
                >
                    {countries && countries.map((country) => (
                        <option value={country.phone_code}>{`${country.phone_code} ${country.name}`}</option>
                    ))}
                </Field>
                <Field
                    disabled={isDetails}
                    type="number"
                    className="form-control w-75"
                    id="phone"
                    name='phone'
                    placeholder={t('inter.number')}
                    value={values.phone}
                    onChange={(e) => setFieldValue('phone', e.target.value)}
                    required=""
                />
            </Row>
        </>
    );
}

export default CustomPhoneInput;
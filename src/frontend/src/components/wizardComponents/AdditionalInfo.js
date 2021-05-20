import React, {useState} from 'react';
import {Link} from 'react-router-dom'
import {Button, Form} from 'react-bootstrap'
import {Formik} from 'formik'
import {useHistory} from 'react-router-dom'
import * as Yup from 'yup'

/**
 * Represents the page for inputting information
 * @param {*} props Object that represents the current booking
 * @returns 
 */
export default function AdditionalInfo(props){
    const history = useHistory()                    //Constant for pages that have the user have been on
    const numberRegExp = /^[0-9 \b]+$/              //What is allowed in tel

    //Saves values to current booking
    function saveValues(values){
        props.booking.name = values.name
        props.booking.tel = values.tel
        props.booking.info = values.info
    }
    
    //The validation to go to the next page
    const validationSchema = Yup.object().shape({
        name: Yup.string()
        .min(2, '*Namn måste vara minst 2 tecken')
        .max(100, '*Namn kan inte vara mer än 100 tecken')
        .required('*Du måste ange ett namn'),
        tel: Yup.string()
        .matches(numberRegExp, '*Telefonnummer är inte giltigt')
        .required('*Du måste ange ett telefonnummer'),
        info: Yup.string()
        .max(150, '*Övrig info kan inte vara mer än 150 tecken'),
        box: Yup.bool().oneOf([true], '*Du måste godkänna hantering av data')

    })

    return (
        <div>                                       
            <Formik
                initialValues={{ name:props.booking.name, tel:props.booking.tel, info:props.booking.info, box:false}}
                validationSchema={validationSchema}
                onSubmit={(values, {setSubmitting, resetForm}) => {
                    setSubmitting(true);
                    props.booking.name = values.name
                    props.booking.tel = values.tel
                    props.booking.info = values.info
                    setSubmitting(false)
                    history.push('/confirm')
                }}
            >
            {( {values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting }) => (
                <Form onSubmit={handleSubmit}>
                    <div className='text_box'>
                        <Form.Group controlId="formName">
                            <Form.Label>Namn</Form.Label>
                            <Form.Control 
                                type='text'
                                name='name'
                                placeholder='Skriv in namn'
                                onChange={handleChange}
                                value={values.name}
                                className={touched.name && errors.name ? "has-error" : null}
                            />
                            {touched.name && errors.name ? (
                            <div className="error-message">{errors.name}</div>
                            ): null}
                        </Form.Group>
                        <Form.Group controlId="tel">
                            <Form.Label>Telefonnummer</Form.Label>
                            <Form.Control 
                                type='text'
                                name='tel'
                                placeholder='Skriv in telefonnummer'
                                onChange={handleChange}
                                value={values.tel}
                                className={touched.tel && errors.tel ? "has-error" : null}
                            />
                            {touched.tel && errors.tel ? (
                            <div className="error-message">{errors.tel}</div>
                            ): null}
                        </Form.Group>
                        <Form.Group controlId="info">
                            <Form.Label>Övrig information</Form.Label>
                            <Form.Control 
                                as='textarea'
                                type='text'
                                name='info'
                                placeholder='Allergier, etc.'
                                onChange={handleChange}
                                value={values.info}
                                className={touched.info && errors.info ? "has-error" : null}
                            />
                            {touched.info && errors.info ? (
                            <div className="error-message">{errors.info}</div>
                            ): null}
                        </Form.Group>
                        <Form.Group>
                            <Form.Label className="GDPR" >Jag godkänner att Hamncafét får lagra och använda
                            <br/> mina personuppgifter i enlighet med GDPR</Form.Label>
                            <Form.Control 
                                type='checkbox'
                                name='box'
                                id='box'
                                value={values.box}
                                onChange={handleChange}
                                className={touched.box && errors.box ? "has-error" : null}
                            />
                            {touched.box && errors.box ? (
                            <div className="error-message">{errors.box}</div>
                            ): null}
                        </Form.Group>
                    </div>
                    <Link className='prevLink' to='/timelist' onClick={() => saveValues(values)}>
                        <Button>
                            Tillbaka
                        </Button>
                    </Link>
                    <Button variant='primary' type='submit' disabled={isSubmitting}>
                        Nästa
                    </Button>
                </Form>
            )}
            </Formik>
        </div>
    )
}
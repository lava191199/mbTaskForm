import React, { useContext, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Button, FormGroup, Input, Label, Row, Col } from 'reactstrap';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import Select from 'react-select';
import * as Yup from 'yup';
import DatePicker from "react-datepicker";


function Parent() {
    const collegeData = useSelector((state) => state?.taskReducer?.collegeData);
    const collegeOptions = [...collegeData]?.map((item) => ({ ...item, value: item?.name, label: item?.name }));
    console.log("ParentCollegeData", collegeOptions);
    return (
        <Formik
            initialValues={{
                name: '',
                birthDate: '',
                email: '',
                phone: '',
                gender: '',
                college: '',
                hobbies: [],
                streetName: '',
                city: '',
                state: '',
                zip: '',
                // address:'',
            }}
            onSubmit={(values) => {
                console.log(values);
            }}
            validationSchema={Yup.object().shape({
                name: Yup.string().min(2, "Must be more than 1 characters").max(30, "Must be less than 30 characters").required("This field is requried")
                    .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for this field "),
                college: Yup.string().required("This Field Is Required"),
                email: Yup.string().email("Invalid Email Formate").required("This Field Is Required"),
                phone: Yup.number().typeError("That doesn't look like a phone number").positive("A phone number can't start with a minus")
                    .integer("A phone number can't include a decimal point").min(9999999, "Minimum 8 digits Required").required('This field is requried'),
                dateOfBirth: Yup.string().required("This field is requried"),
                gender: Yup.string().required("This field is requried"),
                city: Yup.string().required("This field is requried"),
                streetName: Yup.string().required("This field is requried"),
                state: Yup.string().required("This field is requried"),
                zip: Yup.number().typeError("That doesn't look like a zip code").positive("A zip code can't start with a minus")
                    .integer("A zip code can't include a decimal point").min(9999, "Minimum  5 digits Required").required('This field is requried'),
            })}
        >
            {({ values, errors, setFieldValue, setFieldTouched, touched }) => {
                console.log("FormikValues", values);
                return <Form>
                    <Row>
                        <Col md={6}>
                            <FormGroup>
                                <Label for="exampleEmail">Name </Label>
                                <Field id="exampleEmail" name="name" placeholder="Enter Name" className={'form-control ' + (errors.name && touched.name ? 'is-invalid' : '')} type="text" />
                                <div className='error-message'><ErrorMessage name='name' /></div>
                            </FormGroup>
                        </Col>
                        <Col md={6}>
                            <FormGroup>
                                <Label>College</Label>
                                <Select
                                    name="selectedSheet"
                                    placeholder="Select College"
                                    value={values?.college && collegeOptions?.find((item) => item?.value === values?.college)}
                                    onChange={(e) => setFieldValue("college", e.value)}
                                    options={collegeOptions}
                                    getOptionLabel={option => option.label}
                                    getOptionValue={option => option.value}
                                    onBlur={() => setFieldTouched('college', true)}
                                    noOptionsMessage={() => "No Colleges To Select"}
                                />
                                {errors.college && touched.college && <div className='error-message'>{errors.college}</div>}

                            </FormGroup>
                        </Col>

                    </Row>
                    <Row>
                        <Col md={6}>
                            <FormGroup>
                                <Label for="exampleEmail">Email</Label>
                                <Field id="exampleEmail" name="email" placeholder="Enter Email" className="form-control" type="email" />
                                <div className='error-message'><ErrorMessage name='email' /></div>
                            </FormGroup>
                        </Col>
                        <Col md={6}>
                            <FormGroup>
                                <Label for="exampleEmail">Phone Number</Label>
                                <Field id="exampleEmail" name="phone" placeholder="Enter Mobile Nmuber" className="form-control" />
                                <div className='error-message'><ErrorMessage name='phone' /></div>
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6}>
                            <FormGroup>
                                <Label for="exampleEmail">
                                    Date Of Birth
                                </Label>
                                <DatePicker
                                    name="dateOfBirth"
                                    wrapperClassName="datePicker"
                                    // popperPlacement="right-center"
                                    placeholderText="Enter Date Of Birth"
                                    selected={values?.birthDate}
                                    // readOnly={actionType === EOprationalActions.EDIT || (actionData && actionData?.dob !== '')}
                                    popperModifiers={{
                                        name: "preventOverflow",
                                        options: {
                                            rootBoundary: "viewport",
                                            tether: false,
                                            altAxis: true,
                                        }
                                    }}
                                    popperProps={{
                                        positionFixed: true // use this to make the popper position: fixed
                                    }}
                                    onChange={(e) => {
                                        setFieldValue('birthDate', e);
                                    }}
                                    // maxDate={moment().toDate()}
                                    dateFormat="dd/MM/yyyy"
                                    onBlur={() => setFieldTouched('birthDate', true)}
                                    autoComplete="off"

                                />
                                {errors?.birthDate && touched?.birthDate && <div className='error-message'>{errors?.birthDate}</div>}
                            </FormGroup>
                        </Col>

                    </Row>
                    <Col md={6}>
                        <FormGroup>
                            <Label for="gender">
                                Gender
                            </Label>
                            <Row className="w50">
                                <Col>
                                    <Input type="radio" id="gender" name="gender" value={values?.gender} onClick={() => setFieldValue("gender", "male")} />
                                    <Label for="gender">Male</Label>
                                </Col>
                                <Col>
                                    <Input type="radio" id="gender" name="gender" value={values?.gender} onClick={() => setFieldValue("gender", "female")} />
                                    <Label for="gender">Female</Label>
                                </Col>
                                <Col>
                                    <Input type="radio" id="gender" name="gender" value={values?.gender} onClick={() => setFieldValue("gender", "other")} />
                                    <Label for="gender">Other</Label>
                                </Col>
                            </Row>
                            <div className='error-message'><ErrorMessage name='gender' /></div>
                        </FormGroup>
                    </Col>

                    <Col>

                        <Label>Hobbies</Label>
                        <Col>
                            <FormGroup check inline >
                                <Field type="checkbox" checked={values?.hobbies?.includes('reading')} onChange={(e) => {
                                    if (e.target.checked) {
                                        setFieldValue("hobbies", [...values?.hobbies, 'reading']);

                                    } else {

                                        let index = values?.hobbies?.findIndex((item) => item === "reading");
                                        if (index !== -1) {
                                            let updatedDate = [...values?.hobbies]?.splice(index, 1);
                                            console.log("ASdfgffdasd", e.target.checked);
                                            setFieldValue("hobbies", updatedDate)
                                        }
                                    }

                                }} />
                                <Label check> Reading </Label>
                            </FormGroup>
                            <FormGroup check inline >
                                <Field type="checkbox" checked={values?.hobbies?.includes('gaming')} />
                                <Label check>  Gaming </Label>
                            </FormGroup>
                            <FormGroup check inline >
                                <Field type="checkbox" checked={values?.hobbies?.includes('traveling')} />
                                <Label check>  Traveling </Label>
                            </FormGroup>
                            <FormGroup check inline >
                                <Field type="checkbox" checked={values?.hobbies?.includes('drawing')} />
                                <Label check>  Drawing </Label>
                            </FormGroup>
                        </Col>

                    </Col>

                    <FormGroup>
                        <Label for="streetName"> Address</Label>
                        <Field id="streetName" name="streetName" placeholder="Enter Address" className="form-control" />
                        <div className='error-message'> <ErrorMessage name='streetName' /></div>
                    </FormGroup>

                    <Row>
                        <Col md={4}>
                            <FormGroup>
                                <Label for="exampleCity"> City </Label>
                                <Field id="exampleCity" name="city" placeholder="Enter City" className="form-control" />
                                <div className='error-message'>  <ErrorMessage name='city' /></div>
                            </FormGroup>
                        </Col>
                        <Col md={4}>
                            <FormGroup>
                                <Label for="exampleState"> State </Label>
                                <Field id="exampleState" name="state" placeholder="Enter State" className="form-control" />
                                <div className='error-message'> <ErrorMessage name='state' /></div>
                            </FormGroup>
                        </Col>
                        <Col md={3}>
                            <FormGroup>
                                <Label for="exampleZip">  Zip </Label>
                                <Field id="exampleZip" name="zip" placeholder="Enter Zip Code" className="form-control" />
                                <div className='error-message'> <ErrorMessage name='zip' /></div>
                            </FormGroup>
                        </Col>
                    </Row>

                    <Button type='submit'>  Add Student </Button>
                </Form>
            }}

        </Formik>
    )
}

export default Parent
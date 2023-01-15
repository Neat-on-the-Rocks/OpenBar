import { Formik } from 'formik'
import React from 'react'
import Dropzone from 'react-dropzone'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setLogin } from 'state'
import * as yup from "yup"

const registerSchema = yup.object().shape({
    firstName: yup.string().required("required"),
    lastName: yup.string().required("required"),
    email: yup.string().email("Invalid Email").required("required"),
    password: yup.string().required("required"),
    location: yup.string().required("required"),
    occupation: yup.string().required("required"),
    picture: yup.string().required("required"),
})

const loginSchema = yup.object().shape({
    email: yup.string().email("Invalid Email").required("required"),
    password: yup.string().required("required"),
})

const initialValuesRegister = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    location: "",
    occupation: "",
    picture: "",
}

const initialValuesLogin = {
    email: "",
    password: "",
}

export default function Form() {

    const [pageType, setPageType] = React.useState("register");
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const isLogin = pageType === "login";
    const isRegister = pageType === "register"

    const register = async (values, onSubmitProps) => {
        const formData = new FormData();
        for(let value in values){
            formData.append(value, values[value])
        }
        formData.append('picturePath', values.picture.name)

        const savedUserResponse = await fetch(
            "http://localhost:5000/auth/register",
            {
                method: "POST",
                body: formData
            }
        )

        const savedUser = await savedUserResponse.json();
        onSubmitProps.resetForm()

        if(savedUser) {
            setPageType("login")
        }
    }
    const login = async(values, onSubmitProps) => {
        const loggedInResponse = await fetch(
            "http://localhost:5000/auth/login",
            {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(values)
            }
        )
        const loggedIn = await loggedInResponse.json()
        onSubmitProps.resetForm()
        if(loggedIn){
            dispatch(
                setLogin({
                    user: loggedIn.user,
                    token: loggedIn.token
                })
            )
            navigate("/home")
        }
    }

    const handleFormSubmit = async(values, onSubmitProps) => {
        if (isRegister) await register(values, onSubmitProps)
        if (isLogin) await login(values, onSubmitProps)
    }

  return (
    <Formik onSubmit={handleFormSubmit} initialValues={isLogin ? initialValuesLogin: initialValuesRegister} validationSchema={isLogin ? loginSchema : registerSchema}>
        {({
            values, errors, touched, handleBlur, handleChange, handleSubmit, setFieldValue, resetForm
        })=> (
            <form onSubmit={handleSubmit}>
                {!isLogin &&
                <>
                <label htmlFor="firstName">First Name:</label>
                <input label="firstName" type="text" name="firstName" onChange={handleChange} onBlur={handleBlur} value={values.firstName} error={touched.firstName && errors.firstName} />
                <label htmlFor="lastName">Last Name:</label>
                <input label="lastName" type="text" name="lastName" onChange={handleChange} onBlur={handleBlur} value={values.lastName} error={touched.lastName && errors.lastName} />
                <label htmlFor="location">Location:</label>
                <input label="location" type="text" name="location" onChange={handleChange} onBlur={handleBlur} value={values.location} error={touched.location && errors.location} />
                <label htmlFor="occupation">Occupation:</label>
                <input label="occupation" type="text" name="occupation" onChange={handleChange} onBlur={handleBlur} value={values.occupation} error={touched.occupation && errors.occupation} />
                <div className='dropzoneContainer'>
                    <Dropzone onDrop={acceptedFiles => setFieldValue("picture", acceptedFiles[0])}>
                        {({getRootProps, getInputProps}) => (
                        <section>
                        <div {...getRootProps()}>
                            <input {...getInputProps()} />
                            {!values.picture ? <p>Add an image</p> : <p>{values.picture.name}</p>}
                        </div>
                        </section>
                        )}
                    </Dropzone>
                </div>
                </>}
                <label htmlFor="email">Email:</label>
                <input label="email" type="text" name="email" onChange={handleChange} onBlur={handleBlur} value={values.email} error={touched.email && errors.email} />
                <label htmlFor="Password">password:</label>
                <input label="password" type="password" name="password" onChange={handleChange} onBlur={handleBlur} value={values.password} error={touched.password && errors.password} />
                <button type="submit">{isLogin ? "LOGIN" : "REGISTER"}</button>
                {isLogin ? <h4 onClick={() => setPageType("register")}>Dont have an Account? Register</h4> : <h4 onClick={() => setPageType("login")}>Already Have an Account? Login</h4>}
            </form>
        )}

    </Formik>
  )
}

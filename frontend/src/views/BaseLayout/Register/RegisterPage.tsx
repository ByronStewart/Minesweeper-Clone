import { Field, Form, Formik } from "formik"
import { FormEvent, useState } from "react"
import { GoMail, GoPerson } from "react-icons/go"
import { Link, useNavigate } from "react-router-dom"
import { InputField } from "../../../components/Forms/InputField"
import { useAuth } from "../../../hooks/useAuth"
import * as Yup from "yup"

const RegisterPage: React.FC = () => {
  const navigate = useNavigate()
  const { register } = useAuth()
  return (
    <div className="mt-20 mx-8">
      <h2 className="text-3xl font-semibold">Register</h2>
      <div className="mt-8">
        <Formik
          initialValues={{
            username: "",
            email: "",
            password: "",
          }}
          validationSchema={Yup.object({
            username: Yup.string().required(),
            email: Yup.string().email().required(),
            password: Yup.string().required(),
          })}
          onSubmit={({ email, password, username }) => {
            register(username, email, password, (err) => {
              if (err) {
                const message = err.msg
                const status = err.status
                alert(message)
                return
              }
              navigate("/", {
                replace: true,
              })
            })
          }}
        >
          <Form>
            <Field
              name="username"
              as={InputField}
              placeholder="username"
              label="Username"
              icon={<GoPerson color="#555" />}
            />
            <Field
              name="email"
              type="email"
              as={InputField}
              placeholder="email"
              label="Email"
              icon={<GoMail color="#555" />}
            />
            <Field
              name="password"
              type="password"
              as={InputField}
              placeholder="password"
              label="Password"
            />
            <div className="flex justify-between mt-8">
              <button className="btn btn-outline-blue" type="submit">
                Register
              </button>
              <Link className="btn btn-outline-red" to="/login">
                Login
              </Link>
            </div>
          </Form>
        </Formik>
      </div>
      {/* <form onSubmit={handleSubmit}>
        <div>
        <label htmlFor="username">Username</label>
        <input
        type="text"
            name="username"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <button type="submit">Register</button>
        </div>
      </form> */}
    </div>
  )
}

export default RegisterPage

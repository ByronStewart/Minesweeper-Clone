import { Field, Form, Formik } from "formik"
import { GoMail, GoPerson } from "react-icons/go"
import { Link, useNavigate } from "react-router-dom"
import { InputField } from "../Forms/InputField"
import { useAuth } from "../../Auth/useAuth"
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
                alert(`${message}, status: ${status}`)
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
    </div>
  )
}

export default RegisterPage

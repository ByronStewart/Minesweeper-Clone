import { Field, Form, Formik } from "formik"
import { Link, Location, useLocation, useNavigate } from "react-router-dom"
import { useAuth } from "../../Auth/useAuth"
import * as Yup from "yup"
import { InputField } from "../Forms/InputField"
import { GoMail } from "react-icons/go"

const LoginPage: React.FC = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const auth = useAuth()
  const from = (location.state as { from?: Location })?.from?.pathname || "/"
  return (
    <div className="mt-20 mx-8">
      <h2 className="text-3xl font-semibold">Sign In</h2>
      <div className="mt-8">
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          validationSchema={Yup.object({
            email: Yup.string().email().required(),
            password: Yup.string().required(),
          })}
          onSubmit={(values) => {
            auth.signIn(values.email, values.password, (err) => {
              if (err) {
                alert(err.msg)
                return
              }
              navigate(from, { replace: true })
            })
          }}
        >
          <Form>
            <Field
              name="email"
              as={InputField}
              placeholder="email"
              label="Email"
              icon={<GoMail color="#555" />}
            />
            <Field
              name="password"
              as={InputField}
              placeholder="password"
              label="Password"
            />
            <div className="flex justify-between mt-8">
              <button className="btn btn-outline-blue" type="submit">
                Sign in
              </button>
              <button></button>
              <Link to="/register" className="btn btn-outline-red">
                Register
              </Link>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  )
}
export default LoginPage

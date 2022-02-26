import { ErrorMessage, Field, Form, Formik, useField } from "formik"
import { Link, Location, useLocation, useNavigate } from "react-router-dom"
import { useAuth } from "../../../hooks/useAuth"
import * as Yup from "yup"

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
            email: Yup.string()
              .email("Invalid email address")
              .required("Required"),
            password: Yup.string().required("Required"),
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
            <label className="block" htmlFor="email">
              Email Address
            </label>
            <Field
              className="border rounded-sm px-3 py-2 block w-full"
              name="email"
              type="email"
            />
            <ErrorMessage name="email">
              {(msg) => <div className="text-red-400">{msg}</div>}
            </ErrorMessage>
            <label className="block mt-4" htmlFor="password">
              Password
            </label>
            <Field
              className="border rounded-sm px-3 py-2 block w-full"
              name="password"
              type="password"
            />
            <ErrorMessage name="password">
              {(msg) => <div className="text-red-400">{msg}</div>}
            </ErrorMessage>
            <div className="flex justify-between mt-8">
              <button
                className="px-4 mt-4 py-2 border border-blue-700 rounded-sm"
                type="submit"
              >
                Sign in
              </button>
              <Link
                to="/register"
                className="px-4 mt-4 py-2 border border-red-700 rounded-sm"
              >
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

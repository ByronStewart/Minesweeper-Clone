import { Field, Form, Formik } from "formik";
import { Link, Location, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/useAuth";
import * as Yup from "yup";
import { InputField } from "../Forms/InputField";
import { GoMail } from "react-icons/go";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { postGameScore } from "../../features/game-history/gameHistorySlice";

const LoginPage: React.FC = () => {
  const currentGame = useSelector((state: RootState) => state.currentGame);
  const dispatch = useDispatch<AppDispatch>();
  const location = useLocation();
  const navigate = useNavigate();
  const auth = useAuth();
  const from = (location.state as { from?: Location })?.from?.pathname || "/";
  return (
    <div className="pt-20 px-8 h-full bg-white mx-auto max-w-2xl">
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
          onSubmit={(values, helpers) => {
            auth.signIn(values.email, values.password, (user, err) => {
              if (err) {
                console.log(err);
                helpers.setErrors({
                  email: err.detail,
                });
                return;
              }
              // post the game to the server
              if (currentGame.gameState === "finishedsuccess") {
                if (user) {
                  dispatch(
                    postGameScore({
                      created_at: Date.now(),
                      difficulty: currentGame.options.difficulty,
                      owner: user.username,
                      time: currentGame.gameProperties.time,
                    })
                  );
                }
              }
              navigate(from, { replace: true });
            });
          }}
        >
          <Form>
            <Field
              name="email"
              as={InputField}
              placeholder="email"
              label="Email"
              type="email"
              icon={<GoMail color="#555" />}
            />
            <Field
              name="password"
              as={InputField}
              type="password"
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
  );
};
export default LoginPage;

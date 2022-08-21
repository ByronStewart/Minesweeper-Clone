import { Field, Form, Formik } from "formik";
import { GoMail, GoPerson } from "react-icons/go";
import { Link, useNavigate } from "react-router-dom";
import { InputField } from "../Forms/InputField";
import { useAuth } from "../../auth/useAuth";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { postGameScore } from "../../features/game-history/gameHistorySlice";

const RegisterPage: React.FC = () => {
  const currentGame = useSelector((state: RootState) => state.currentGame);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { register } = useAuth();
  return (
    <div className="bg-white mx-auto max-w-2xl pt-20 px-8 h-full">
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
          onSubmit={({ email, password, username }, helpers) => {
            register(username, email, password, (user, err) => {
              if (err) {
                console.log(err);
                if (err.username) {
                  helpers.setErrors({
                    username: err.username,
                    email: err.email,
                    password: err.password,
                  });
                }
                return;
              }
              // post the game score on login
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
              navigate("/", {
                replace: true,
              });
            });
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
  );
};

export default RegisterPage;

import { Location, useLocation, useNavigate } from "react-router-dom";
import { LoginForm } from "../../../components/Forms/LoginForm";
import { useAuth } from "../../../hooks/useAuth";

const LoginPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const auth = useAuth();
  const from = (location.state as { from?: Location })?.from?.pathname || "/";

  const login = (email: string, password: string) => {
    auth.signIn(email, password, (err) => {
      if (err) {
        alert(err.msg);
        return;
      }
      navigate(from, { replace: true });
    });
  };

  return (
    <div>
      <h1>This is the login page</h1>
      <hr />
      <LoginForm onSubmit={login} />
    </div>
  );
};
export default LoginPage;

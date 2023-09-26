import RegisterForm from "../components/RegisterForm";
import { Helmet, HelmetProvider } from "react-helmet-async";

export default function RegisterPage(props) {
  return (
    <HelmetProvider>
      <Helmet>
        <title>Create account</title>
      </Helmet>
      <RegisterForm errMsg={props.errMsg} />
    </HelmetProvider>
  );
}

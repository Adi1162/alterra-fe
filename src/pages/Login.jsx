import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import HeroImage from "../assets/images/hero-img.png";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState(false);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const handleSubmit = (values) => {
    const { email, password } = values;
    const dummyUser = { email: "admin@admin.com", password: "admin123" };
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.email === email && user.password === password) {
      localStorage.setItem("isLoggedIn", true);
      navigate("/");
    } else if (email === dummyUser.email && password === dummyUser.password) {
      localStorage.setItem("user", JSON.stringify(dummyUser));
      localStorage.setItem("isLoggedIn", true);
      navigate("/");
    } else {
      setErrorMessage(true);
    }
    formik.resetForm();
  };
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      email: "",
      password: "",
    },

    validationSchema: Yup.object({
      email: Yup.string().email("Invalid Email").required("Email is required"),
      password: Yup.string().min(8, "Password Min 8 Character").required("Password is required"),
    }),
    onSubmit: handleSubmit,
  });
  return (
    <div style={{ width: "100%", height: "100vh" }} className="d-flex align-items-center">
      <Container>
        <Row>
          <Col className=" p-2 d-flex flex-column justify-content-center">
            <h1>Login Account</h1>
            {errorMessage && <p className="bg-danger rounded text-white text-center">Invalid Username or Password</p>}
            <form action="submit" onSubmit={formik.handleSubmit}>
              <Container>
                <Row className="mb-3">
                  <label htmlFor="inputEmail" className="form-label">
                    Email address
                  </label>
                  <input {...formik.getFieldProps("email")} name="email" type="email" className="form-control" id="inputEmail" aria-describedby="emailHelp" placeholder="johndoe@gmail.com" />
                  {formik.touched.email && formik.errors.email && <div className="error">{formik.errors.email}</div>}
                </Row>
                <Row className="mb-3">
                  <label htmlFor="inputPassword" className="form-label">
                    Password
                  </label>
                  <input {...formik.getFieldProps("password")} name="password" type="password" className="form-control" id="inputPassword" placeholder="*******" />
                  {formik.touched.password && formik.errors.password && <div className="error">{formik.errors.password}</div>}
                </Row>
                <Row className="d-flex justify-content-center" style={{ width: "100%" }}>
                  <button type="submit" className="btn btn-primary" style={{ width: "50%" }}>
                    Submit
                  </button>
                </Row>
                <Row className="text-center my-2" style={{ width: "100%" }}>
                  <a href="/register" className="text-black">
                    Not have account ?<span className="text-primary"> Register Account</span>
                  </a>
                </Row>
              </Container>
            </form>
          </Col>
          <Col>
            <img src={HeroImage} alt="register image" />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Login;

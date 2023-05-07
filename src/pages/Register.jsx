import { Col, Container, Row } from "react-bootstrap";
import HeroImage from "../assets/images/hero-img.png";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Register = () => {
  const navigate = useNavigate();
  const handleSubmit = () => {
    navigate("/login");
    const Toast = Swal.mixin({
      toast: true,
      position: "top",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener("mouseenter", Swal.stopTimer);
        toast.addEventListener("mouseleave", Swal.resumeTimer);
      },
    });

    formik.resetForm();
    return Toast.fire({
      icon: "success",
      title: "Success Register Account",
    });
  };
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },

    validationSchema: Yup.object({
      firstName: Yup.string().min(3, "First Name Min 3 Character").required("First Name is required"),
      lastName: Yup.string().min(3, "Last Name Min 3 Character").required("Last Name is required"),
      username: Yup.string().min(3, "Username Min 3 Character").required("Username is required"),
      email: Yup.string().email("Invalid Email").required("Email is required"),
      password: Yup.string().min(8, "Password Min 8 Character").required("Password is required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password")], "Confrim Password must match")
        .required("Confrim Password is required"),
    }),
    onSubmit: handleSubmit,
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div style={{ width: "100%", height: "100vh" }} className="d-flex align-items-center">
      <Container>
        <Row>
          <Col>
            <img src={HeroImage} alt="register image" />
          </Col>
          <Col className="rounded p-2">
            <h1>Register Account</h1>
            <form action="submit" onSubmit={formik.handleSubmit}>
              <Container>
                <Row className="mb-3">
                  <Col>
                    <label htmlFor="inputFirstName" className="form-label">
                      First Name
                    </label>
                    <input {...formik.getFieldProps("firstName")} name="firstName" type="text" className="form-control" aria-describedby="inputFirstName" placeholder="First Name" />
                    {formik.touched.firstName && formik.errors.firstName && <div className="error">{formik.errors.firstName}</div>}
                  </Col>
                  <Col>
                    <label htmlFor="inputLastName" className="form-label">
                      Last Name
                    </label>
                    <input {...formik.getFieldProps("lastName")} name="lastName" type="text" className="form-control" aria-describedby="inputLastName" placeholder="Last Name" />
                    {formik.touched.lastName && formik.errors.lastName && <div className="error">{formik.errors.lastName}</div>}
                  </Col>
                </Row>
                <Row className="mb-3">
                  <label htmlFor="inputUsername" className="form-label">
                    Username
                  </label>
                  <input {...formik.getFieldProps("username")} name="username" type="text" className="form-control" id="inputUsername" placeholder="Username" />
                  {formik.touched.username && formik.errors.username && <div className="error">{formik.errors.username}</div>}
                </Row>
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
                <Row className="mb-3">
                  <label htmlFor="inputConfrimPaswword" className="form-label">
                    Confrim Password
                  </label>
                  <input {...formik.getFieldProps("confirmPassword")} name="confirmPassword" type="password" className="form-control" id="inputConfrimPaswword" placeholder="*******" />
                  {formik.touched.confirmPassword && formik.errors.confirmPassword && <div className="error">{formik.errors.confirmPassword}</div>}
                </Row>
                <Row className="d-flex justify-content-center" style={{ width: "100%" }}>
                  <button type="submit" className="btn btn-primary" style={{ width: "50%" }}>
                    Submit
                  </button>
                </Row>
                <Row className="text-center my-2" style={{ width: "100%" }}>
                  <a href="/login" className="text-black">
                    Have Account ?<span className="text-primary"> Login</span>
                  </a>
                </Row>
              </Container>
            </form>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Register;

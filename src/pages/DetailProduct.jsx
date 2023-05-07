import { Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import HeroImage from "../assets/images/hero-img.png";
import { useEffect } from "react";
import { addReview, getDetailProduct } from "../config/Redux/Action";
import { useFormik } from "formik";
import * as Yup from "yup";

const DetailProduct = () => {
  const { dataDetailProducts, isUpdate } = useSelector((state) => state.globalReducer);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();
  const { idProduct } = params;

  const handleSubmitReview = (values) => {
    formik.resetForm();
    dispatch(addReview({ idProduct, values, isUpdate, reviewProduct: dataDetailProducts?.reviewProduct }));
  };
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: "",
      review: "",
    },

    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      review: Yup.string().required("Review is required"),
    }),
    onSubmit: handleSubmitReview,
  });
  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(getDetailProduct(idProduct));
  }, [dispatch, idProduct, isUpdate]);

  return (
    <>
      <button className="btn btn-primary mx-4" onClick={() => navigate("/create-product")}>
        {"< Back"}
      </button>
      <Container>
        <Row>
          <Col>
            <img src={HeroImage} alt="" />
          </Col>
          <Col>
            <h2>{dataDetailProducts?.productName}</h2>
            <p className="text-danger fs-5 fw-bold">Rp.{dataDetailProducts?.productPrice}</p>
            <p className="fw-bold">
              Category Product <br />
              <span className="fw-light">{dataDetailProducts?.productCategory}</span>
            </p>
            <p className="fw-bold">
              Product Freshness <br />
              <span className="fw-light">{dataDetailProducts?.productFreshness}</span>
            </p>
            <p className="fw-bold">
              Description Product <br />
              <span className="fw-light">{dataDetailProducts?.descProduct}</span>
            </p>
            <div>
              <p className="fw-bold">Review Product</p>
              <div style={{ width: "100%", height: "10vh", overflowY: "auto" }} className="bg-light">
                <div className="p-2">
                  {dataDetailProducts?.reviewProduct
                    ?.slice(0)
                    .reverse()
                    ?.map((review, id) => (
                      <p key={id} className="fw-light">
                        {review.name} - {review.review}
                      </p>
                    ))}
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
      <Container className="my-5">
        <Row className="d-flex justify-content-center">
          <Col lg={5}>
            <h2>Add Review Product</h2>
            <form action="submit" onSubmit={formik.handleSubmit}>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Your name
                </label>
                <input {...formik.getFieldProps("name")} type="text" id="name" className="form-control" placeholder="your name" aria-label="name" />
                {formik.touched.name && formik.errors.name && <div className="error">{formik.errors.name}</div>}
              </div>
              <div className="mb-3">
                <label htmlFor="review" className="form-label">
                  Your Review
                </label>
                <input {...formik.getFieldProps("review")} type="text" id="review" className="form-control" placeholder="your review" aria-label="review" />
                {formik.touched.review && formik.errors.review && <div className="error">{formik.errors.review}</div>}
              </div>
              <div className="d-flex justify-content-center">
                <button role="button" type="submit" className="btn btn-primary" style={{ width: "50%" }}>
                  Add Review
                </button>
              </div>
            </form>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default DetailProduct;

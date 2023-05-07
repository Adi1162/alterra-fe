import { useEffect } from "react";
import Hero from "../components/molecules/Hero";
import HeroImage from "../assets/images/hero-img.png";
import { Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../config/Redux/Action";

const LandingPage = () => {
  const { dataProducts } = useSelector((state) => state.globalReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProducts());
    window.scrollTo(0, 0);
  }, [dispatch]);

  return (
    <>
      <Hero />
      <Container className="mx-auto my-5">
        <h2>PRODUCT LIST</h2>
        <Row style={{ width: "100%" }} className="mx-auto">
          {dataProducts.slice(0, 4).map((product) => (
            <Col key={product.id} className="my-3">
              <div className="card" style={{ width: "18rem" }}>
                <img src={HeroImage} className="card-img-top" alt="image product" />
                <div className="card-body">
                  <h5 className="card-title">{product.productName}</h5>
                  <p className="card-text">{product.descProduct}</p>
                  <div className="d-flex justify-content-between align-items-center">
                    <a href={`/detail-product/${product.id}`} className="border border-black text-black p-2">
                      Detail View
                    </a>
                    <p>9 Mins</p>
                  </div>
                </div>
              </div>
            </Col>
          ))}
        </Row>
        <div style={{ width: "100%" }} className="d-flex justify-content-end">
          <a href={`/list-product`} className="bg-primary text-white rounded border border-black p-2">
            Load More...
          </a>
        </div>
      </Container>
    </>
  );
};

export default LandingPage;

import { useEffect } from "react";
import HeroImage from "../assets/images/hero-img.png";
import { Col, Container, Row } from "react-bootstrap";
import { getAllProducts } from "../config/Redux/Action";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import ReactPaginate from "react-paginate";
import { useState } from "react";

const ListProducts = () => {
  const { dataProducts } = useSelector((state) => state.globalReducer);
  const dispatch = useDispatch();
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 8;
  const endOffset = itemOffset + itemsPerPage;
  const currentItems = dataProducts?.slice(0).reverse()?.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(dataProducts?.length / itemsPerPage);
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % dataProducts?.length;
    setItemOffset(newOffset);
  };

  useEffect(() => {
    dispatch(getAllProducts());
    window.scrollTo(0, 0);
  }, [dispatch]);

  return (
    <>
      <Container className="mx-auto my-5">
        <h2 className="text-center">Modify Products</h2>
        <div className="d-flex justify-content-center gap-2 my-2">
          <NavLink to={"/create-product"} className="btn btn-primary">
            Modify Products With MockupAPI
          </NavLink>
          <NavLink to={"/create-product-graphql"} className="btn btn-primary">
            Modify Products With GraphQL
          </NavLink>
        </div>
        <h2 className="text-center">Product List</h2>
        <ReactPaginate
          nextLabel="Next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          marginPagesDisplayed={2}
          pageCount={pageCount}
          previousLabel="< Previous"
          pageClassName="page-item"
          pageLinkClassName="page-link"
          previousClassName="page-item"
          previousLinkClassName="page-link"
          nextClassName="page-item"
          nextLinkClassName="page-link"
          breakLabel="..."
          breakClassName="page-item"
          breakLinkClassName="page-link"
          containerClassName="pagination"
          activeClassName="active"
          renderOnZeroPageCount={null}
        />
        <Row style={{ width: "100%" }} className="mx-auto">
          {currentItems?.map((product) => (
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
      </Container>
    </>
  );
};

export default ListProducts;

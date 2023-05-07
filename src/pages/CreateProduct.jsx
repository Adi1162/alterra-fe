/* eslint-disable react-refresh/only-export-components */
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button, Col, Container, Row } from "react-bootstrap";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { connect, useDispatch, useSelector } from "react-redux";
import { addProduct, updateProduct, deleteProduct, getAllProducts, getDetailProduct } from "../config/Redux/Action";
import ReactPaginate from "react-paginate";

const CreateProduct = () => {
  const { dataProducts, isUpdate, dataDetailProducts } = useSelector((state) => state.globalReducer);
  const [isToastShown, setIsToastShown] = useState(true);
  const [language, setLanguage] = useState(false);
  const [searchProduct, setSearchProduct] = useState("");
  const [idProduct, setIdProduct] = useState(0);
  const [isUpdateProduct, setIsUpdateProduct] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 5;
  const endOffset = itemOffset + itemsPerPage;
  const currentItems = dataProducts?.slice(0).reverse().slice(itemOffset, endOffset);
  const pageCount = Math.ceil(dataProducts?.length / itemsPerPage);
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % dataProducts?.length;
    setItemOffset(newOffset);
  };

  const randomNumber = () => {
    console.log((Math.random() * 100).toFixed());
  };

  const article = {
    title: {
      id: "Buat Produk",
      en: "Create Product",
    },
    description: {
      id: "Di bawah ini adalah contoh formulir yang dibuat seluruhnya dengan kontrol formulir Bootstrap. Setiap grup formulir yang diperlukan memiliki status validasi yang dapat dipicu dengan mencoba mengirimkan formulir tanpa menyelesaikannya.",
      en: "Below is an example form built entirely with Bootstrap’s form controls. Each required form group has a validation state that can be triggered by attempting to submit the form without completing it.",
    },
  };

  const handleDelete = (idProduct) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteProduct(idProduct, isUpdate)).then((result) => {
          if (result) {
            return Swal.fire({
              icon: "success",
              title: "Deleted!",
              text: "Product has been deleted.",
              showConfirmButton: false,
              timer: 1000,
            });
          }
          return Swal.fire({
            icon: "error",
            title: "Error!",
            text: "Failed delete Product.",
            showConfirmButton: false,
            timer: 1000,
          });
        });
      }
    });
  };

  const handleChangeLanguage = () => {
    setLanguage(!language);
  };

  const handleUpdateProduct = (values) => {
    dispatch(
      updateProduct({
        isUpdate,
        idProduct,
        product: dataProducts,
        newProduct: values,
      })
    );
    setTimeout(() => {
      formik.resetForm();
      setIsUpdateProduct(false);
      setIdProduct(null);
    }, 500);
  };

  const validateForm = (values) => {
    dispatch(addProduct(isUpdate, dataProducts, values));
    formik.resetForm();
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      productName: isUpdateProduct ? dataDetailProducts.productName || "" : "",
      productPrice: isUpdateProduct ? dataDetailProducts.productPrice || "" : "",
      productCategory: isUpdateProduct ? dataDetailProducts?.productCategory || "" : "",
      productFreshness: isUpdateProduct ? dataDetailProducts?.productFreshness || "" : "Brand New",
      descProduct: isUpdateProduct ? dataDetailProducts?.descProduct || "" : "",
      imageProduct: isUpdateProduct ? dataDetailProducts?.imageProduct || "" : "",
    },

    validationSchema: Yup.object({
      productName: Yup.string()
        .matches(/^[^!<,>?=+@{}_$%]+$/, "Product Name must not contain symbols.")
        .max(25, "Product Name must not exceed 25 characters.")
        .required("Product Name is required"),
      productFreshness: Yup.string().required("Product Freshness is required"),
      productCategory: Yup.string().required("Product Category is required"),
      productPrice: Yup.number().required("Product Price is required"),
      descProduct: Yup.string().required("Addtional Description is required"),
      imageProduct: Yup.mixed()
        .required("Image Product is required")
        .test("fileType", "Unsupported file format", (value) => {
          const fileType = value.split(".");
          return value && ["png", "gif", "jpeg", "webp", "svg"].includes(fileType.pop().toLowerCase());
        }),
    }),
    onSubmit: isUpdateProduct ? handleUpdateProduct : validateForm,
  });
  const handleDetailProduct = (idProduct) => {
    dispatch({ type: "SET_DATA_DETAIL_PRODUCT", payload: dataProducts[idProduct] });
    navigate(`/detail-product/${idProduct}`);
  };

  const handleUpdate = async (idProduct) => {
    setIdProduct(idProduct);
    setIsUpdateProduct(true);
    await dispatch(getDetailProduct(idProduct));
  };

  const handleOnSearch = (event) => {
    setSearchProduct(event.target.value);
  };

  useEffect(() => {
    setTimeout(() => {
      dispatch(getAllProducts(searchProduct));
    }, 1000);

    if (isToastShown) {
      window.scrollTo(0, 0);
      const Toast = Swal.mixin({
        toast: true,
        position: "top",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      });

      Toast.fire({
        icon: "success",
        title: "Welcome",
      });
      setIsToastShown(false);
    }
  }, [dispatch, isUpdate, isToastShown, searchProduct]);
  return (
    <>
      <Container style={{ width: "100%" }} className="d-flex justify-content-center">
        <Row className="d-flex justify-content-center">
          <center>
            <div style={{ width: "100px", color: "#6610f2" }}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" fill="currentColor">
                <path d="M333.5,201.4c0-22.1-15.6-34.3-43-34.3h-50.4v71.2h42.5C315.4,238.2,333.5,225,333.5,201.4z M517,188.6 c-9.5-30.9-10.9-68.8-9.8-98.1c1.1-30.5-22.7-58.5-54.7-58.5H123.7c-32.1,0-55.8,28.1-54.7,58.5c1,29.3-0.3,67.2-9.8,98.1 c-9.6,31-25.7,50.6-52.2,53.1v28.5c26.4,2.5,42.6,22.1,52.2,53.1c9.5,30.9,10.9,68.8,9.8,98.1c-1.1,30.5,22.7,58.5,54.7,58.5h328.7 c32.1,0,55.8-28.1,54.7-58.5c-1-29.3,0.3-67.2,9.8-98.1c9.6-31,25.7-50.6,52.1-53.1v-28.5C542.7,239.2,526.5,219.6,517,188.6z M300.2,375.1h-97.9V136.8h97.4c43.3,0,71.7,23.4,71.7,59.4c0,25.3-19.1,47.9-43.5,51.8v1.3c33.2,3.6,55.5,26.6,55.5,58.3 C383.4,349.7,352.1,375.1,300.2,375.1z M290.2,266.4h-50.1v78.4h52.3c34.2,0,52.3-13.7,52.3-39.5 C344.7,279.6,326.1,266.4,290.2,266.4z" />
              </svg>
            </div>
            <h1 role="sub-title">{language ? article.title.id : article.title.en}</h1>
            <p>{language ? article.description.id : article.description.en}</p>
          </center>
          <div className="d-flex justify-content-center gap-2 my-2">
            <button className="btn btn-primary" type="button" onClick={randomNumber}>
              Random Number
            </button>
            <button className="btn btn-primary" type="button" onClick={handleChangeLanguage}>
              {language ? "Change Language to English" : "Change Language to Indonesia"}
            </button>
          </div>
          <Col lg={5}>
            <form action="submit" onSubmit={formik.handleSubmit}>
              <label htmlFor="productName">Product Name</label>
              <br />
              <input {...formik.getFieldProps("productName")} type="text" id="productName" name="productName" className={`form-control ${formik.touched.productName && formik.errors.productName && "border border-3 border-danger"}`} />
              {formik.touched.productName && formik.errors.productName && <div className="error">{formik.errors.productName}</div>}
              <br />
              <label htmlFor="productCategory">Product Category</label>
              <br />
              <div>
                <select
                  {...formik.getFieldProps("productCategory")}
                  name="productCategory"
                  id="productCategory"
                  className={`form-select ${formik.touched.productCategory && formik.errors.productCategory && "border border-3 border-danger"}`}
                >
                  <option value="" disabled>
                    Select Product Category
                  </option>
                  <option value="Handphone">Handphone</option>
                  <option value="Laptop">Laptop</option>
                  <option value="Earphone">Earphone</option>
                </select>
                {formik.touched.productCategory && formik.errors.productCategory && <div className="error">{formik.errors.productCategory}</div>}
              </div>
              <br />
              <div>
                <label htmlFor="imageProduct" className="form-label">
                  Image of Products
                </label>
                <input
                  onChange={formik.handleChange}
                  // {...formik.getFieldProps("imageProduct")}
                  className={`form-control ${formik.touched.imageProduct && formik.errors.imageProduct && "border border-3 border-danger"}`}
                  name="imageProduct"
                  type="file"
                  id="imageProduct"
                  accept="image/png, image/gif, image/jpeg"
                />
                {formik.touched.imageProduct && formik.errors.imageProduct && (
                  <div role="error-message" className="error">
                    {formik.errors.imageProduct}
                  </div>
                )}
              </div>
              <br />
              <label htmlFor="productFreshness">Product Freshness</label>
              <br />
              <div className="form-check">
                <input {...formik.getFieldProps("productFreshness")} value={"Brand New"} className="form-check-input" type="radio" name="productFreshness" id="productFreshness1" checked={formik.values.productFreshness === "Brand New"} />
                <label className="form-check-label" htmlFor="productFreshness1">
                  Brand New
                </label>
              </div>
              <div className="form-check">
                <input
                  {...formik.getFieldProps("productFreshness")}
                  value={"Second Hand"}
                  className="form-check-input"
                  type="radio"
                  name="productFreshness"
                  id="productFreshness2"
                  checked={formik.values.productFreshness === "Second Hand"}
                />
                <label className="form-check-label" htmlFor="productFreshness2">
                  Second Hand
                </label>
              </div>
              <div className="form-check">
                <input
                  {...formik.getFieldProps("productFreshness")}
                  value={"Refurbished"}
                  className="form-check-input"
                  type="radio"
                  name="productFreshness"
                  id="productFreshness3"
                  checked={formik.values.productFreshness === "Refurbished"}
                />
                <label className="form-check-label" htmlFor="productFreshness3">
                  Refurbished
                </label>
              </div>
              <br />
              <label htmlFor="descProduct">Addtional Description</label>
              <br />
              <div className="mb-3">
                <textarea {...formik.getFieldProps("descProduct")} name="descProduct" className={`form-control ${formik.touched.descProduct && formik.errors.descProduct && "border border-3 border-danger"}`} id="descProduct" rows="3" />
                {formik.touched.descProduct && formik.errors.descProduct && <div className="error">{formik.errors.descProduct}</div>}
              </div>
              <br />
              <label htmlFor="productPrice">Product Price</label>
              <br />
              <div className="mb-3">
                <div className="input-group">
                  <span className="input-group-text">$</span>
                  <input
                    {...formik.getFieldProps("productPrice")}
                    type="number"
                    id="productPrice"
                    name="productPrice"
                    aria-label="Amount (to the nearest dollar)"
                    className={`form-control ${formik.touched.productPrice && formik.errors.productPrice && "border border-3 border-danger"}`}
                  />
                </div>
                {formik.touched.productPrice && formik.errors.productPrice && <div className="error">{formik.errors.productPrice}</div>}
              </div>

              <div className="d-flex justify-content-center">
                <button role="button" type="submit" className="btn btn-primary" style={{ width: "50%" }}>
                  {isUpdateProduct ? "Update" : "Create"} Product
                </button>
              </div>
            </form>
          </Col>
        </Row>
      </Container>

      <div className="table-responsive">
        <h2 className="text-center my-5">List Product</h2>

        <table className="table table-striped mx-auto" style={{ width: "100%" }}>
          <thead>
            <tr>
              <th scope="col">No</th>
              <th scope="col">Product Name</th>
              <th scope="col">Product Category</th>
              <th scope="col">Image Product</th>
              <th scope="col">Product Freshness</th>
              <th scope="col">Addtional Description</th>
              <th scope="col">Product Price</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {currentItems?.map((product, id) => (
              <tr key={id}>
                <th scope="row">
                  <button type="button" onClick={() => handleDetailProduct(product.id)} className="bg-transparent border-0">
                    {id + 1}
                  </button>
                </th>
                <td>
                  <button type="button" onClick={() => handleDetailProduct(product.id)} className="bg-transparent border-0">
                    {product.productName}
                  </button>
                </td>
                <td>
                  <button type="button" onClick={() => handleDetailProduct(product.id)} className="bg-transparent border-0">
                    {product.productCategory}
                  </button>
                </td>
                <td>
                  <button type="button" onClick={() => handleDetailProduct(product.id)} className="bg-transparent border-0">
                    {product.imageProduct}
                  </button>
                </td>
                <td>
                  <button type="button" onClick={() => handleDetailProduct(product.id)} className="bg-transparent border-0">
                    {product.productFreshness}
                  </button>
                </td>
                <td>
                  <button type="button" onClick={() => handleDetailProduct(product.id)} className="bg-transparent border-0">
                    {product.descProduct}
                  </button>
                </td>
                <td>
                  <button type="button" onClick={() => handleDetailProduct(product.id)} className="bg-transparent border-0">
                    {product.productPrice}
                  </button>
                </td>
                <td className="d-flex justify-content-around">
                  <Button
                    type="button"
                    onClick={() => {
                      handleUpdate(product.id);
                    }}
                    className="mr-2"
                  >
                    Edit
                  </Button>
                  <Button type="button" onClick={() => handleDelete(product.id)} className="btn btn-danger">
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div style={{ width: "100%", height: "100%" }} className="d-flex mx-3 flex-column  ">
          <input onChange={(e) => handleOnSearch(e)} style={{ width: "30%" }} className="border border-primary form-control" type="search" name="" placeholder="Search by Product Name" />
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
        </div>
      </div>
    </>
  );
};

export default connect(null, { addProduct, updateProduct, deleteProduct })(CreateProduct);

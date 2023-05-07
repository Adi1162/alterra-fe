/* eslint-disable react-refresh/only-export-components */
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button, Col, Container, Row } from "react-bootstrap";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";
import { gql, useQuery, useMutation, useSubscription } from "@apollo/client";

const SubscriptionProducts = gql`
  subscription MySubscription($_ilike: String!) {
    product(where: { product_name: { _ilike: $_ilike } }) {
      id
      aditional_information
      image_product
      price
      product_category
      product_freshness
      product_name
    }
  }
`;

const AddProduct = gql`
  mutation MyMutation($object: product_insert_input!) {
    insert_product_one(object: $object) {
      id
    }
  }
`;
const DeleteProduct = gql`
  mutation MyMutation($id: uuid!) {
    delete_product_by_pk(id: $id) {
      id
    }
  }
`;
const UpdateProduct = gql`
  mutation MyMutation($id: uuid!, $_set: product_set_input!) {
    update_product_by_pk(pk_columns: { id: $id }, _set: $_set) {
      aditional_information
      image_product
      price
      product_category
      product_freshness
      product_name
    }
  }
`;
const GetDetailProductById = gql`
  query MyQuery($id: uuid!) {
    product_by_pk(id: $id) {
      aditional_information
      id
      image_product
      price
      product_category
      product_freshness
      product_name
    }
  }
`;

const StoreManagement = () => {
  const [searchProduct, setSearchProduct] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const { data: dataAllProducts, loading: loadingAllProducts } = useSubscription(SubscriptionProducts, {
    variables: {
      _ilike: `%${searchProduct}%`,
    },
  });
  const [addProduct] = useMutation(AddProduct);
  const [updateProduct] = useMutation(UpdateProduct);
  const [deleteProduct] = useMutation(DeleteProduct);
  const dataProducts = dataAllProducts?.product;
  const [isToastShown, setIsToastShown] = useState(true);
  const [language, setLanguage] = useState(false);
  const [idProduct, setIdProduct] = useState(0);
  const [isUpdateProduct, setIsUpdateProduct] = useState(false);
  const navigate = useNavigate();
  const { data: dataProduct } = useQuery(GetDetailProductById, {
    variables: {
      id: idProduct,
    },
  });
  const dataDetailProducts = dataProduct?.product_by_pk;

  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 5;
  const endOffset = itemOffset + itemsPerPage;
  const currentItems = dataProducts?.slice(0).reverse().slice(itemOffset, endOffset);
  const pageCount = Math.ceil(dataProducts?.length / itemsPerPage);
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % dataProducts?.length;
    setItemOffset(newOffset);
    setCurrentPage(event.selected);
  };

  const randomNumber = () => {
    console.log((Math.random() * 100).toFixed());
  };

  const article = {
    title: {
      id: "Buat Produk Menggunakan GraphQL",
      en: "Create Product With GraphQL",
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
        deleteProduct({
          variables: {
            id: idProduct,
          },
        }).then((result) => {
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
    console.log(values);
    updateProduct({
      variables: {
        id: idProduct,
        _set: values,
      },
    }).then((res) => {
      if (res) {
        const Toast = Swal.mixin({
          toast: true,
          position: "top",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
        });

        return Toast.fire({
          icon: "success",
          title: "Success Update Product",
        });
      } else {
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

        return Toast.fire({
          icon: "error",
          title: "Failed Update Product",
        });
      }
    });

    setTimeout(() => {
      formik.resetForm();
      setIsUpdateProduct(false);
      setIdProduct(null);
    }, 500);
  };

  const handleAddProduct = (values) => {
    addProduct({
      variables: {
        object: values,
      },
    }).then((res) => {
      if (res) {
        const Toast = Swal.mixin({
          toast: true,
          position: "top",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
        });

        return Toast.fire({
          icon: "success",
          title: "Success Add Product",
        });
      } else {
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

        return Toast.fire({
          icon: "error",
          title: "Failed Add Product",
        });
      }
    });
    formik.resetForm();
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      product_name: isUpdateProduct ? dataDetailProducts?.product_name || "" : "",
      price: isUpdateProduct ? dataDetailProducts?.price || "" : "",
      product_category: isUpdateProduct ? dataDetailProducts?.product_category || "" : "",
      product_freshness: isUpdateProduct ? dataDetailProducts?.product_freshness || "" : "Brand New",
      aditional_information: isUpdateProduct ? dataDetailProducts?.aditional_information || "" : "",
      image_product: isUpdateProduct ? dataDetailProducts?.image_product || "" : "",
    },

    validationSchema: Yup.object({
      product_name: Yup.string()
        .matches(/^[^!<,>?=+@{}_$%]+$/, "Product Name must not contain symbols.")
        .max(25, "Product Name must not exceed 25 characters.")
        .required("Product Name is required"),
      product_freshness: Yup.string().required("Product Freshness is required"),
      product_category: Yup.string().required("Product Category is required"),
      price: Yup.number().required("Product Price is required"),
      aditional_information: Yup.string().required("Addtional Description is required"),
      image_product: Yup.mixed()
        .required("Image Product is required")
        .test("fileType", "Unsupported file format", (value) => {
          const fileType = value.split(".");
          return value && ["png", "gif", "jpeg", "webp", "svg"].includes(fileType.pop().toLowerCase());
        }),
    }),
    onSubmit: isUpdateProduct ? handleUpdateProduct : handleAddProduct,
  });
  const handleDetailProduct = (idProduct) => {
    navigate(`/detail-product-graphql/${idProduct}`);
  };

  const handleUpdate = async (idProduct) => {
    window.scrollTo(0, 0);
    setIdProduct(idProduct);
    setIsUpdateProduct(true);
  };

  const handleOnSearch = (event) => {
    event.preventDefault();
    setSearchProduct(event.target.value);
  };

  useEffect(() => {
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
  }, [isToastShown]);

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
              <label htmlFor="product_name">Product Name</label>
              <br />
              <input {...formik.getFieldProps("product_name")} type="text" id="product_name" name="product_name" className={`form-control ${formik.touched.product_name && formik.errors.product_name && "border border-3 border-danger"}`} />
              {formik.touched.product_name && formik.errors.product_name && <div className="error">{formik.errors.product_name}</div>}
              <br />
              <label htmlFor="product_category">Product Category</label>
              <br />
              <div>
                <select
                  {...formik.getFieldProps("product_category")}
                  name="product_category"
                  id="product_category"
                  className={`form-select ${formik.touched.product_category && formik.errors.product_category && "border border-3 border-danger"}`}
                >
                  <option value="" disabled>
                    Select Product Category
                  </option>
                  <option value="Handphone">Handphone</option>
                  <option value="Laptop">Laptop</option>
                  <option value="Earphone">Earphone</option>
                </select>
                {formik.touched.product_category && formik.errors.product_category && <div className="error">{formik.errors.product_category}</div>}
              </div>
              <br />
              <div>
                <label htmlFor="image_product" className="form-label">
                  Image of Products
                </label>
                <input
                  onChange={formik.handleChange}
                  className={`form-control ${formik.touched.image_product && formik.errors.image_product && "border border-3 border-danger"}`}
                  name="image_product"
                  type="file"
                  id="image_product"
                  accept="image/png, image/gif, image/jpeg"
                />
                {formik.touched.image_product && formik.errors.image_product && (
                  <div role="error-message" className="error">
                    {formik.errors.image_product}
                  </div>
                )}
              </div>
              <br />
              <label htmlFor="product_freshness">Product Freshness</label>
              <br />
              <div className="form-check">
                <input
                  {...formik.getFieldProps("product_freshness")}
                  value={"Brand New"}
                  className="form-check-input"
                  type="radio"
                  name="product_freshness"
                  id="product_freshness1"
                  checked={formik.values.product_freshness === "Brand New"}
                />
                <label className="form-check-label" htmlFor="product_freshness1">
                  Brand New
                </label>
              </div>
              <div className="form-check">
                <input
                  {...formik.getFieldProps("product_freshness")}
                  value={"Second Hand"}
                  className="form-check-input"
                  type="radio"
                  name="product_freshness"
                  id="product_freshness2"
                  checked={formik.values.product_freshness === "Second Hand"}
                />
                <label className="form-check-label" htmlFor="product_freshness2">
                  Second Hand
                </label>
              </div>
              <div className="form-check">
                <input
                  {...formik.getFieldProps("product_freshness")}
                  value={"Refurbished"}
                  className="form-check-input"
                  type="radio"
                  name="product_freshness"
                  id="product_freshness3"
                  checked={formik.values.product_freshness === "Refurbished"}
                />
                <label className="form-check-label" htmlFor="product_freshness3">
                  Refurbished
                </label>
              </div>
              <br />
              <label htmlFor="aditional_information">Addtional Description</label>
              <br />
              <div className="mb-3">
                <textarea
                  {...formik.getFieldProps("aditional_information")}
                  name="aditional_information"
                  className={`form-control ${formik.touched.aditional_information && formik.errors.aditional_information && "border border-3 border-danger"}`}
                  id="aditional_information"
                  rows="3"
                />
                {formik.touched.aditional_information && formik.errors.aditional_information && <div className="error">{formik.errors.aditional_information}</div>}
              </div>
              <br />
              <label htmlFor="price">Product Price</label>
              <br />
              <div className="mb-3">
                <div className="input-group">
                  <span className="input-group-text">$</span>
                  <input
                    {...formik.getFieldProps("price")}
                    type="number"
                    id="price"
                    name="price"
                    aria-label="Amount (to the nearest dollar)"
                    className={`form-control ${formik.touched.price && formik.errors.price && "border border-3 border-danger"}`}
                  />
                </div>
                {formik.touched.price && formik.errors.price && <div className="error">{formik.errors.price}</div>}
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
            {loadingAllProducts ? (
              <tr>
                <td colSpan={8} className="text-center">
                  Loading Search Data
                </td>
              </tr>
            ) : currentItems.length === 0 ? (
              <tr>
                <td colSpan={8} className="text-center">
                  No Data Available
                </td>
              </tr>
            ) : (
              currentItems?.map((product, id) => (
                <tr key={id}>
                  <th scope="row">
                    <button type="button" onClick={() => handleDetailProduct(product.id)} className="bg-transparent border-0">
                      {id + 1 + itemsPerPage * currentPage}
                    </button>
                  </th>
                  <td>
                    <button type="button" onClick={() => handleDetailProduct(product.id)} className="bg-transparent border-0">
                      {product.product_name}
                    </button>
                  </td>
                  <td>
                    <button type="button" onClick={() => handleDetailProduct(product.id)} className="bg-transparent border-0">
                      {product.product_category}
                    </button>
                  </td>
                  <td>
                    <button type="button" onClick={() => handleDetailProduct(product.id)} className="bg-transparent border-0">
                      {product.image_product}
                    </button>
                  </td>
                  <td>
                    <button type="button" onClick={() => handleDetailProduct(product.id)} className="bg-transparent border-0">
                      {product.product_freshness}
                    </button>
                  </td>
                  <td>
                    <button type="button" onClick={() => handleDetailProduct(product.id)} className="bg-transparent border-0">
                      {product.aditional_information}
                    </button>
                  </td>
                  <td>
                    <button type="button" onClick={() => handleDetailProduct(product.id)} className="bg-transparent border-0">
                      {product.price}
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
              ))
            )}
          </tbody>
        </table>
        <div style={{ width: "100%", height: "100%" }} className="d-flex mx-3 flex-column  ">
          <input value={searchProduct} onChange={(e) => handleOnSearch(e)} style={{ width: "30%" }} className="border border-primary form-control" type="search" name="" placeholder="Search by Product Name" />
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

export default StoreManagement;

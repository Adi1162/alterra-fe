import Swal from "sweetalert2";
import Axios from "axios";

export const addProduct = (isUpdate, products, newProduct) => (dispatch) => {
  const productsExist = products?.find((product) => product?.productName === newProduct?.productName);
  if (productsExist) {
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

    Toast.fire({
      icon: "error",
      title: "Product Name already exist",
    });
    return false;
  }
  return Axios.post(`https://64547995f803f3457629a107.mockapi.io/products`, newProduct, {
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(() => {
      const Toast = Swal.mixin({
        toast: true,
        position: "top",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      });

      Toast.fire({
        icon: "success",
        title: "Success Add Product",
      });
      dispatch({ type: "IS_UPDATE_PRODUCT", payload: !isUpdate });
    })
    .catch((error) => {
      console.error(error);
    });
};
export const updateProduct = (updateDataProduct) => (dispatch) => {
  const { isUpdate, idProduct, products, newProduct } = updateDataProduct;
  const productsExist = products?.find((product) => product?.productName === newProduct?.productName);
  if (productsExist) {
    const Toast = Swal.mixin({
      toast: true,
      position: "top",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
    });

    Toast.fire({
      icon: "error",
      title: "Product Name already exist",
    });
    return false;
  }
  return Axios.put(`https://64547995f803f3457629a107.mockapi.io/products/${idProduct}`, newProduct, {
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(() => {
      const Toast = Swal.mixin({
        toast: true,
        position: "top",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      });

      Toast.fire({
        icon: "success",
        title: "Success Update Product",
      });
      dispatch({ type: "IS_UPDATE_PRODUCT", payload: !isUpdate });
    })
    .catch((error) => {
      console.error(error);
    });
};
export const addReview = (addNewReview) => (dispatch) => {
  const { values, reviewProduct, idProduct, isUpdate } = addNewReview;
  return Axios.put(
    `https://64547995f803f3457629a107.mockapi.io/products/${idProduct}`,
    { reviewProduct: [...reviewProduct, values] },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  )
    .then(() => {
      const Toast = Swal.mixin({
        toast: true,
        position: "top",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      });

      Toast.fire({
        icon: "success",
        title: "Success Add Review",
      });
      dispatch({ type: "IS_UPDATE_PRODUCT", payload: !isUpdate });
    })
    .catch((error) => {
      console.error(error);
    });
};
export const deleteProduct = (idProduct, isUpdate) => (dispatch) => {
  return Axios.delete(`https://64547995f803f3457629a107.mockapi.io/products/${idProduct}`)
    .then(() => {
      dispatch({ type: "IS_UPDATE_PRODUCT", payload: !isUpdate });
      return true;
    })
    .catch((error) => {
      const Toast = Swal.mixin({
        toast: true,
        position: "top",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      });

      Toast.fire({
        icon: "error",
        title: "Failed Delete Product",
      });
      console.error(error);
      return false;
    });
};

export const getDetailProduct = (idProduct) => async (dispatch) => {
  return await Axios.get(`https://64547995f803f3457629a107.mockapi.io/products/${idProduct}`)
    .then((response) => {
      dispatch({ type: "SET_DATA_DETAIL_PRODUCT", payload: response.data });
      return response.data;
    })
    .catch((error) => {
      console.error(error);
      return false;
    });
};
export const getAllProducts = (searchProduct) => (dispatch) => {
  Axios.get(`https://64547995f803f3457629a107.mockapi.io/products${searchProduct ? "?productName=" + searchProduct : "/"}`)
    .then((response) => {
      dispatch({ type: "SET_DATA_PRODUCTS", payload: response.data });
    })
    .catch((error) => {
      console.error(error);
    });
};

import { Route, Routes } from "react-router-dom";
import Layout from "../components/molecules/Layout";
import CreateProduct from "./CreateProduct";
import DetailProduct from "./DetailProduct";
import LandingPage from "./LandingPage";
import StoreManagement from "./StoreManagement";
import DetailProductGraphQL from "./DetailProductGraphQL";
import ListProducts from "./ListProducts";

const MainApp = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/create-product" element={<CreateProduct />} />
        <Route path="/create-product-graphql" element={<StoreManagement />} />
        <Route path="/list-product" element={<ListProducts />} />
        <Route path="/detail-product-graphql/:idProduct" element={<DetailProductGraphQL />} />
        <Route path="/detail-product/:idProduct" element={<DetailProduct />} />
      </Routes>
    </Layout>
  );
};

export default MainApp;

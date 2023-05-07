import Footer from "./Footer";
import NavigationBar from "./NavigationBar";
const Layout = ({ children }) => {
  return (
    <>
      <NavigationBar />
      <main>{children}</main>
      <Footer />
    </>
  );
};
export default Layout;

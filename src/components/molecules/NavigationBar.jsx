import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink, useNavigate } from "react-router-dom";

const NavigationBar = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.setItem("isLoggedIn", false);
    navigate("/login");
  };
  return (
    <Navbar bg="light" expand="lg" className="my-2 sticky-top">
      <Container>
        <Navbar.Brand href="/" className="text-black fw-bold fs-4">
          Simple Header
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <li className="nav-item">
              <NavLink
                to={"/"}
                style={({ isActive }) => ({
                  backgroundColor: isActive && "#0d6efd",
                  color: isActive ? "white" : "#0d6efd",
                })}
                className="nav-link rounded mx-2 px-3"
              >
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to={"/list-product"}
                style={({ isActive }) => ({
                  backgroundColor: isActive && "#0d6efd",
                  color: isActive ? "white" : "#0d6efd",
                })}
                className="nav-link rounded mx-2 px-3"
              >
                Products
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to={"/features"}
                style={({ isActive }) => ({
                  backgroundColor: isActive && "#0d6efd",
                  color: isActive ? "white" : "#0d6efd",
                })}
                className="nav-link rounded mx-2 px-3"
              >
                Features
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to={"/pricing"}
                style={({ isActive }) => ({
                  backgroundColor: isActive && "#0d6efd",
                  color: isActive ? "white" : "#0d6efd",
                })}
                className="nav-link rounded mx-2 px-3"
              >
                Pricing
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to={"/faqs"}
                style={({ isActive }) => ({
                  backgroundColor: isActive && "#0d6efd",
                  color: isActive ? "white" : "#0d6efd",
                })}
                className="nav-link rounded mx-2 px-3"
              >
                FAQs
              </NavLink>
            </li>
            <li className="nav-item">
              <button onClick={handleLogout} className="nav-link border-0 bg-primary text-light rounded mx-2 px-3">
                Logout
              </button>
            </li>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;

import React, { useState, useEffect } from "react";
import {
  Routes,
  Route,
  useLocation,
  useNavigate,
  Navigate,
} from "react-router-dom";
import "./App.css";
import logo from "./Assets/CarterOilLogo.svg";
import Leads from "./Pages/Leads/Leads";
import Dashboard from "./Pages/Dashboard/Dashboard";
import Testimonial from "./Pages/Testimonials/Testimonial";
import AddTestimonial from "./Pages/Testimonials/AddTestimonial";
import UserType from "./Pages/Users/UserType";
import Users from "./Pages/Users/Users";
import AddProducts from "./Pages/Products/AddProducts";
import Products from "./Pages/Products/Products";
import { AiFillProduct } from "react-icons/ai";
import { IoMdContacts } from "react-icons/io";
import { MdReviews, MdSpaceDashboard, MdOutlineDoubleArrow } from "react-icons/md";
import { FaUsers } from "react-icons/fa";
import { IoLogOut } from "react-icons/io5";

const App = ({ onLogout }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeitems, setActiveitems] = useState(null);
  const [isOpen, setIsOpen] = useState(true); // ✅ state for sidebar open/close

  const allItems = [
    { id: 1, name: "Dashboard", route: "/dashboard", icon: <MdSpaceDashboard /> },
    { id: 2, name: "Leads", route: "/leads", icon: <IoMdContacts /> },
    { id: 3, name: "Testimonials", route: "/testimonials", icon: <MdReviews /> },
    // { id: 4, name: "Users", route: "/users", icon: <FaUsers /> },
    { id: 5, name: "Products", route: "/Products", icon: <AiFillProduct /> },
  ];

  useEffect(() => {
    const currentItem = allItems.find(
      (item) => item.route === location.pathname
    );
    setActiveitems(currentItem?.id || null);
  }, [location.pathname]);

  const handleitemsClick = (item) => {
    setActiveitems(item.id);
    navigate(item.route);
  };

  // ✅ Toggle function
  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="App">
      <div className={`app-side-bar ${isOpen ? "open" : "closed"}`}>
      <div className="opencloseicon" onClick={toggleMenu}>
  <MdOutlineDoubleArrow className={isOpen ? "rotated" : ""} />
</div>

        <img
          src={logo}
          className="logo"
          alt="digitalaura Logo"
        />
        <ul>
          {allItems.map((item) => (
            <li
              key={item.id}
              className={activeitems === item.id ? "selected-item" : "unselected"}
              onClick={() => handleitemsClick(item)}
            >
              {item.icon}
              {isOpen && <span>{item.name}</span>}
            </li>
          ))}
          <li className="unselected" onClick={onLogout}>
            <IoLogOut />
            {isOpen && <span>Logout</span>}
          </li>
        </ul>
      </div>

      <div className="app-right">
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/leads" element={<Leads />} />
          <Route path="/testimonials" element={<Testimonial />} />
          <Route path="/add-testimonial" element={<AddTestimonial />} />
          <Route path="/edit-testimonial/:id" element={<AddTestimonial />} />
          {/* <Route path="/usertype" element={<UserType />} />
          <Route path="/users" element={<Users />} /> */}
          <Route path="/Products" element={<Products />} />
          <Route path="/add-Products" element={<AddProducts />} />
          <Route path="/edit-Products/:id" element={<AddProducts />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;

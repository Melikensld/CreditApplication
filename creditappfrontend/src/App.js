import React, { useState } from "react";
import "./App.css";
import CreditForm from "./components/CreditForm";
import PaymentForm from "./components/PaymentForm";
import ProductForm from "./components/ProductForm";
import ViewApplications from "./components/ViewApplications";

function App() {
  const [activeForm, setActiveForm] = useState(null);
  const [backgroundStyle, setBackgroundStyle] = useState(null);

  const handleFormSelect = (formType) => {
    setActiveForm(formType);
    if (formType === "creditForm") {
      setBackgroundStyle({
        backgroundImage:
          'url("https://img.freepik.com/premium-photo/defocused-city-night-filtered-bokeh-abstract-background_3249-2050.jpg")',
      });
    } else if (formType === "paymentForm") {
      setBackgroundStyle({
        backgroundImage:
          "url(https://img.freepik.com/free-photo/abstract-blue-extruded-voronoi-blocks-background-minimal-light-clean-corporate-wall-3d-geometric-surface-illustration-polygonal-elements-displacement_1217-2510.jpg?w=900&t=st=1692273098~exp=1692273698~hmac=87bf5004b75fe9ea93e34427df9e1e565ce9ff2b52b464db8eab16de7ccc6dd2)",
      });
    } else if (formType === "productForm") {
      setBackgroundStyle({
        backgroundImage:
          "url(https://images.pexels.com/photos/583848/pexels-photo-583848.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)",
      });
    } else if (formType === "viewApplications") {
      setBackgroundStyle({
        backgroundImage:
          "url(https://images.pexels.com/photos/1323712/pexels-photo-1323712.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)",
      });
    }
  };

  return (
    <div className="app" style={backgroundStyle}>
      <div className="content">
        {activeForm === null && (
          <div className="button-container">
            <img
              className="kocfinans-logo"  style={{ padding: "30px" }}
              src="https://www.teknotalk.com/wp-content/uploads/2022/04/KOC-FINANS-LOGO.png"
              alt="Logo"
            />
            <button
              className="app-button"
              onClick={() => handleFormSelect("creditForm")}
            >
              Kredi Başvurusu
            </button>
            <button
              className="app-button"
              onClick={() => handleFormSelect("paymentForm")}
            >
              Ödeme Bilgileri Ekle
            </button>
            <button
              className="app-button"
              onClick={() => handleFormSelect("productForm")}
            >
              Ürün Bilgisi Ekle
            </button>
            <button
              className="app-button"
              onClick={() => handleFormSelect("viewApplications")}
            >
              Başvuruları Görüntüle
            </button>{" "}
          </div>
        )}
        {activeForm === "creditForm" && <CreditForm />}
        {activeForm === "paymentForm" && <PaymentForm />}
        {activeForm === "productForm" && <ProductForm />}
        {activeForm === "viewApplications" && <ViewApplications />}
      </div>
    </div>
  );
}

export default App;

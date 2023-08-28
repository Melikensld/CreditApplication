import React, { useState } from "react";
import axios from "axios";
import FormInput from "./FormInput";
import Modal from "react-modal"; // react-modal eklendi
import "./ProductForm.css";

axios.defaults.baseURL = "http://localhost:8081";
axios.defaults.headers.common["Content-Type"] = "application/json";

function ProductForm() {
  const [productInfo, setProductInfo] = useState({
    talepNo: "",
    urunAdi: "",
    urunCinsi: "",
  });

  const [modalIsOpen, setModalIsOpen] = useState(false); // Modal durumunu izlemek için

  const inputs = [
    {
      id: "1",
      name: "talepNo",
      type: "text",
      placeholder: "Talep Numarası (6 hane)",
      label: "Talep Numarası",
      required: true,
    },
    {
      id: "2",
      name: "urunAdi",
      type: "text",
      placeholder: "Ürün Adı",
      label: "Ürün Adı",
      required: true,
    },
    {
      id: "3",
      name: "urunCinsi",
      type: "text",
      placeholder: "Ürün Cinsi",
      label: "Ürün Cinsi",
      required: true,
    },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      talepNo: productInfo.talepNo,
      urunAdi: productInfo.urunAdi,
      urunCinsi: productInfo.urunCinsi,
    };

    if (data.talepNo.length !== 6) {
      console.log("Talep numarası 6 hane olmalıdır.");
      return;
    }

    try {
      const response = await axios.post("/product/addProduct", data);

      if (response.status === 200) {
        console.log("Yeni ürün eklendi.");
        setProductInfo({
          talepNo: "",
          urunAdi: "",
          urunCinsi: "",
        });
        setModalIsOpen(true); // Ürün eklenince modalı aç
      } else {
        console.log("Ürün eklenirken hata oluştu.");
      }
    } catch (error) {
      console.error("Hata:", error);
    }
  };

  const handleChange = (e) => {
    setProductInfo({ ...productInfo, [e.target.name]: e.target.value });
  };

  const handleRefresh = () => {
    window.location.reload(); // Sayfayı yenileme işlemi
  };

  return (
    <div className="product-container">
      <form className="product-form" onSubmit={handleSubmit}>
      <img
          className="kocfinans-logo"
          src="https://www.teknotalk.com/wp-content/uploads/2022/04/KOC-FINANS-LOGO.png"
          alt="Logo"
        />
        <h1 className="product-title">Ürün Bilgisi Ekleme</h1>
        {inputs.map((input) => (
          <FormInput
            key={input.id}
            label={input.label}
            type={input.type}
            name={input.name}
            placeholder={input.placeholder}
            value={productInfo[input.name]}
            onChange={handleChange}
            required={input.required}
          />
        ))}
        <button className="product-button" type="submit">
          Ürün Ekle
        </button>
        <div className="home-product-div">
          <button className="home-product" onClick={handleRefresh}>
            Anasayfaya Dön
          </button>
        </div>

        {/* Modal */}
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={() => setModalIsOpen(false)} 
          className="custom-modal"
          overlayClassName="custom-overlay"
        >
          <div className="modal-content">
            <h2>Ürün Başarıyla Eklendi</h2>
            <button style={{ backgroundColor: "#664935" }} className="close-modal" onClick={() => setModalIsOpen(false)}>
              Kapat
            </button>
          </div>
        </Modal>
      </form>
    </div>
  );
}

export default ProductForm;






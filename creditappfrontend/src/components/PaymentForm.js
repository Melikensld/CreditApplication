// PaymentForm.js
import React, { useState } from "react";
import axios from "axios";
import FormInput from "./FormInput"; // FormInput bileşenini dahil ediyoruz
import "./PaymentForm.css";
import Modal from "react-modal"; // react-modal eklendi

axios.defaults.baseURL = "http://localhost:8081";
axios.defaults.headers.common["Content-Type"] = "application/json";

function PaymentForm() {
  const [paymentInfo, setPaymentInfo] = useState({
    talepNo: "",
    taksitTutari: "",
    taksitTarihi: "",
    odemeDurumu: "Ödenmedi",
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
      name: "taksitTutari",
      type: "number",
      placeholder: "Taksit Tutarı",
      label: "Taksit Tutarı",
      required: true,
    },
    {
      id: "3",
      name: "taksitTarihi",
      type: "date",
      placeholder: "Taksit Tarihi",
      label: "Taksit Tarihi",
      required: true,
    },
    {
      id: "4",
      name: "odemeDurumu",
      type: "select",
      label: "Ödeme Durumu",
      required: true,
      options: [
        { value: "Ödenmedi", label: "Ödenmedi" },
        { value: "Ödendi", label: "Ödendi" },
      ],
    },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      talepNo: paymentInfo.talepNo,
      taksitTutari: paymentInfo.taksitTutari,
      taksitTarihi: paymentInfo.taksitTarihi,
      odemeDurumu: paymentInfo.odemeDurumu ,
    };

    if (data.talepNo.length !== 6) {
      console.log("Talep numarası 6 hane olmalıdır.");
      return;
    }

    try {
      const response = await axios.post("/payment/createPaymentRecords", data, {
        withCredentials: true,
      });

      if (response.status === 200) {
        console.log("Yeni ödeme eklendi.");
        setPaymentInfo({
          talepNo: "",
          taksitTutari: "",
          taksitTarihi: "",
          odemeDurumu: "Ödenmedi",
        });
        setModalIsOpen(true); // Ödeme eklenince modalı aç
      } else {
        console.log("Ödeme eklenirken hata oluştu.");
      }
    } catch (error) {
      console.error("Hata:", error);
    }
  };

  const handleChange = (e) => {
    setPaymentInfo({ ...paymentInfo, [e.target.name]: e.target.value });
  };
  
  const handleRefresh = () => {
    window.location.reload(); // Sayfayı yenileme işlemi
  };

  return (
    <form className="payment-form" onSubmit={handleSubmit}>
      <img
        className="kocfinans-logo"
        src="https://www.teknotalk.com/wp-content/uploads/2022/04/KOC-FINANS-LOGO.png"
        alt="Logo"
      />
      <h1 className="payment-title">Ödeme Bilgileri Ekle</h1>
      {inputs.map((input) => (
        <FormInput
          key={input.id}
          label={input.label}
          type={input.type}
          name={input.name}
          placeholder={input.placeholder}
          value={paymentInfo[input.name]}
          options={input.options}
          onChange={handleChange}
          required={input.required}
        />
      ))}
      <button className="payment-button" type="submit">
        Ödeme Ekle
      </button>
      <div className="home-payment-div">
          <button className="home-payment" onClick={handleRefresh}>
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
          <h2>Ödeme Başarıyla Eklendi</h2>
          <button style={{ backgroundColor: "#0E6493" }} className="close-modal" onClick={() => setModalIsOpen(false)}>
            Kapat
          </button>
        </div>
      </Modal>
    </form>
  );
}

export default PaymentForm;










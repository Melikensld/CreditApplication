import React, { useState } from "react";
import FormInput from "./FormInput";
import axios from "axios";
import Modal from "react-modal"; // react-modal eklendi
import "./CreditForm.css";

axios.defaults.baseURL = "http://localhost:8081";
axios.defaults.headers.common["Content-Type"] = "application/json";

function CreditForm() {
  const [values, setValues] = useState({
    faturaTutari: "",
    krediTarihi: "",
    vade: "",
    taksitTutari: "",
  });

  const [modalIsOpen, setModalIsOpen] = useState(false); // Modal durumunu izlemek için

  const inputs = [
    {
      id: "1",
      name: "faturaTutari",
      type: "number",
      placeholder: "Fatura Tutarı",
      label: "Fatura Tutarı",
      required: true,
    },
    {
      id: "2",
      name: "krediTarihi",
      type: "date",
      placeholder: "Kredi Tarihi",
      label: "Kredi Tarihi",
      required: true,
    },
    {
      id: "3",
      name: "vade",
      type: "select",
      label: "Vade",
      required: true,
      options: [
        { value: "3", label: "3 ay" },
        { value: "6", label: "6 ay" },
        { value: "9", label: "9 ay" },
        { value: "12", label: "12 ay" },
        { value: "15", label: "15 ay" },
        { value: "18", label: "18 ay" },
        { value: "24", label: "24 ay" },
        { value: "36", label: "36 ay" },
      ],
    },
    {
      id: "4",
      name: "taksitTutari",
      type: "number",
      placeholder: "Taksit Tutarı",
      label: "Taksit Tutarı",
      required: true,
    },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      faturaTutari: values.faturaTutari,
      krediTarihi: values.krediTarihi,
      vade: values.vade,
      taksitTutari: values.taksitTutari,
    };

    try {
      const response = await axios.post("/credit/create", data, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        console.log("New credit is added.");
        setModalIsOpen(true); // Modalı aç
        setValues({
          faturaTutari: "",
          krediTarihi: "",
          vade: "",
          taksitTutari: "",
        }); // Formu sıfırla
      } else {
        console.log("An error occurred while adding credit.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleChange = (e) => {
    const value =
      e.target.type === "select-one"
        ? parseInt(e.target.value)
        : e.target.value;
    setValues({ ...values, [e.target.name]: value });
  };

  console.log(values);

  const handleRefresh = () => {
    window.location.reload(); // Sayfayı yenileme işlemi
  };

  return (
    <form className="credit-form" onSubmit={handleSubmit}>
      <img
        className="credit-logo"
        src="https://www.teknotalk.com/wp-content/uploads/2022/04/KOC-FINANS-LOGO.png"
        alt="Logo"
      />
      <h1 className="credit-title">Kredi Başvuru Formu</h1>
      {inputs.map((input) => (
        <FormInput
          key={input.id}
          {...input}
          value={values[input.name]}
          onChange={handleChange}
        />
      ))}
      <button className="credit-button" type="submit">
        Başvur
      </button>
      <div className="home-credit-div">
        <button className="home-credit" onClick={handleRefresh}>
          Anasayfaya Dön
        </button>
      </div>

      
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)} 
        className="custom-modal"
        overlayClassName="custom-overlay"
      >
        <div className="modal-content">
          <h2>Kredi Başvurunuz Alınmıştır</h2>
          <button className="close-modal" onClick={() => setModalIsOpen(false)}>
            Kapat
          </button>
        </div>
      </Modal>
    </form>
  );
}

export default CreditForm;

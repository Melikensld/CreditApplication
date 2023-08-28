import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ViewApplications.css";

function ViewApplications() {
  const [applications, setApplications] = useState([]);
  const [editingRow, setEditingRow] = useState(null);
  const [updatedData, setUpdatedData] = useState({}); 

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const response = await axios.get("/credit/getAllApplications");
      setApplications(response.data);
    } catch (error) {
      console.error("Hata:", error);
    }
  };

  const handleRefresh = () => {
    window.location.reload();
  };

  const handleUpdate = (credit) => {
    setEditingRow(credit.talepNo);
    setUpdatedData(credit); 
  };

  const handleSave = async () => {
    try {
      await axios.put(`/credit/updateCredit/${updatedData.talepNo}`, updatedData);
      setEditingRow(null);
      setUpdatedData({});
      fetchApplications();
    } catch (error) {
      console.error("Error updating credit:", error);
    }
  };

  const handleCancel = () => {
    setEditingRow(null);
    setUpdatedData({});
  };

  const handleDelete = async (credit) => {
    try {
      await axios.delete(`/credit/deleteCredit/${credit.talepNo}`);
      fetchApplications();
      console.log("Credit deleted:", credit);
    } catch (error) {
      console.error("Error deleting credit:", error);
    }
  };

  return (
    <div>
      <h1>Tüm Başvurular</h1>
      <table>
        <thead>
          <tr>
            <th>Talep No</th>
            <th>Kredi Durumu</th>
            <th>Fatura Tutarı</th>
            <th>Kredi Tarihi</th>
            <th>Vade</th>
            <th>Taksit Tutarı</th>
            <th>İşlemler</th>
          </tr>
        </thead>
        <tbody>
          {applications.map((application) => (
            <tr key={application.talepNo}>
              <td>
                {editingRow === application.talepNo ? (
                  <input className="basvuru-input"
                    type="text"
                    value={updatedData.talepNo || ""}
                    onChange={(e) =>
                      setUpdatedData({ ...updatedData, talepNo: e.target.value })
                    }
                    disabled
                  />
                ) : (
                  application.talepNo
                )}
              </td>
              <td>
                {editingRow === application.talepNo ? (
                  <input className="basvuru-input"
                    type="number"
                    value={updatedData.krediDurum || ""}
                    onChange={(e) =>
                      setUpdatedData({ ...updatedData, krediDurum: parseInt(e.target.value) })
                    }
                  />
                ) : (
                  application.krediDurum
                )}
              </td>
              {/* Diğer sütunlar */}
              <td>
                {editingRow === application.talepNo ? (
                  <input className="basvuru-input"
                    type="number"
                    value={updatedData.faturaTutari || ""}
                    onChange={(e) =>
                      setUpdatedData({ ...updatedData, faturaTutari: parseFloat(e.target.value) })
                    }
                  />
                ) : (
                  application.faturaTutari
                )}
              </td>
              {/* Diğer sütunlar */}
              <td>
                {editingRow === application.talepNo ? (
                  <input className="basvuru-input"
                    type="date"
                    value={
                      updatedData.krediTarihi
                        ? new Date(updatedData.krediTarihi).toISOString().substr(0, 10)
                        : ""
                    }
                    onChange={(e) =>
                      setUpdatedData({
                        ...updatedData,
                        krediTarihi: new Date(e.target.value),
                      })
                    }
                  />
                ) : (
                  new Date(application.krediTarihi).toLocaleDateString()
                )}
              </td>
              <td>
                {editingRow === application.talepNo ? (
                  <input className="basvuru-input"
                    type="number"
                    value={updatedData.vade || ""}
                    onChange={(e) =>
                      setUpdatedData({ ...updatedData, vade: parseInt(e.target.value) })
                    }
                  />
                ) : (
                  application.vade
                )}
              </td>
              <td>
                {editingRow === application.talepNo ? (
                  <input className="basvuru-input"
                    type="number"
                    value={updatedData.taksitTutari || ""}
                    onChange={(e) =>
                      setUpdatedData({ ...updatedData, taksitTutari: parseFloat(e.target.value) })
                    }
                  />
                ) : (
                  application.taksitTutari
                )}
              </td>
              <td>
                {editingRow === application.talepNo ? (
                  <>
                    <button className="ud-btn" onClick={handleSave}>
                      Kaydet
                    </button>
                    <button className="ud-btn" onClick={handleCancel}>
                      İptal
                    </button>
                  </>
                ) : (
                  <>
                    <button className="ud-btn" onClick={() => handleUpdate(application)}>
                      Güncelle
                    </button>
                    <button className="ud-btn" onClick={() => handleDelete(application)}>
                      Sil
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="homepage-div">
        <button className="homepage-btn" onClick={handleRefresh}>
          Anasayfaya Dön
        </button>
      </div>
    </div>
  );
}

export default ViewApplications;

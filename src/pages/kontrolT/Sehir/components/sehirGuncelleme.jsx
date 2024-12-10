import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAxios } from "../../../../shared/hooks/axios-hook";

const sehirFields = {
  firma_kodu: "",
  sehir_kodu: "",
  sehir_adi: "",
  ulke_kodu: "",
};

const SehirGuncelle = () => {
  const [sehirData, setSehirData] = useState(sehirFields);
  const { firma_kodu, sehir_kodu, sehir_adi, ulke_kodu } = sehirData;

  const axios = useAxios();
  const navigate = useNavigate();

  const getSehir = async () => {
    try {
      const response = await axios.get(`/sehir/${sehir_kodu}`);
      if (response.data.status === "OK") {
        const sehirData = response.data.sehir;

        setSehirData({
          sehir_kodu: sehirData.CITYCODE,
          sehir_adi: sehirData.CITYTEXT,
          ulke_kodu: sehirData.COUNTRYCODE,
          firma_kodu: sehirData.COMCODE,
        });
      }
    } catch (error) {
      console.log("Error", error.message);
    }
  };

  useEffect(() => {
    getSehir();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSehirData({
      ...sehirData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`/sehir/${sehir_kodu}`, sehirData);
      if (response.data.status === "OK") {
        navigate("/sehir");
      } else {
        alert("Güncelleme sırasında bir hata oluştu");
        console.log(response);
      }
    } catch (error) {
      console.error("Submit error: ", error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-start pt-8">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-4xl">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Şehir Bilgilerini Güncelle
        </h1>
        <div className="mb-4">
          <label
            className="block text-gray-700 font-medium mb-2"
            htmlFor="sehir_kodu"
          >
            Şehir Kodu
          </label>
          <input
            type="text"
            id="sehir_kodu"
            name="sehir_kodu"
            value={sehir_kodu}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg"
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 font-medium mb-2"
            htmlFor="sehir_adi"
          >
            Ülke Adı
          </label>
          <input
            type="text"
            id="sehir_adi"
            name="sehir_adi"
            value={sehir_adi}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg"
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 font-medium mb-2"
            htmlFor="ulke_kodu"
          >
            Ülke Kodu
          </label>
          <input
            type="text"
            id="ulke_kodu"
            name="ulke_kodu"
            value={ulke_kodu}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg"
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 font-medium mb-2"
            htmlFor="firma_kodu"
          >
            Firma Kodu
          </label>
          <input
            type="text"
            id="firma_kodu"
            name="firma_kodu"
            value={firma_kodu}
            readOnly
            className="w-full px-3 py-2 border rounded-lg bg-gray-100"
          />
        </div>

        <div className="flex justify-between">
          <button
            onClick={handleSubmit}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-300"
          >
            Güncelle
          </button>
          <button
            onClick={() => navigate("/sehir")}
            className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-300"
          >
            İptal
          </button>
        </div>
      </div>
    </div>
  );
};

export default SehirGuncelle;

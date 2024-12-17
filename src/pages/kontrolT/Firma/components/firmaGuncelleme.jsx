import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAxios } from "../../../../shared/hooks/axios-hook";

const firmaFields = {
  firma_kodu: "",
  firma_adi: "",
  firma_adresi_1: "",
  firma_adresi_2: "",
  sehir_kodu: "",
  ulke_kodu: "",
};

const FirmaGuncelle = () => {
  const { firma_kodu } = useParams();
  const [firmaData, setFirmaData] = useState(firmaFields);
  const { firma_adi, firma_adresi_1, firma_adresi_2, sehir_kodu, ulke_kodu } =
    firmaData;

  const axios = useAxios();
  const navigate = useNavigate();

  const getFirma = async () => {
    try {
      const response = await axios.get(`/firma/${firma_kodu}`);
      if (response.data.status === "OK") {
        const companyData = response.data.firma;

        setFirmaData({
          firma_kodu: companyData.COMCODE,
          firma_adi: companyData.COMTEXT,
          firma_adresi_1: companyData.ADDRESS1,
          firma_adresi_2: companyData.ADDRESS2,
          sehir_kodu: companyData.CITYCODE,
          ulke_kodu: companyData.COUNTRYCODE,
        });
      }
    } catch (error) {
      console.log("Error", error.message);
    }
  };

  useEffect(() => {
    getFirma();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFirmaData({
      ...firmaData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put("/firma", firmaData);
      if (response.data.status === "OK") {
        navigate("/firma");
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
          Firma Bilgilerini Güncelle
        </h1>
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
            maxLength={4}
            className="w-full px-3 py-2 border rounded-lg bg-gray-100"
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 font-medium mb-2"
            htmlFor="firma_adi"
          >
            Firma Adı
          </label>
          <input
            type="text"
            id="firma_adi"
            name="firma_adi"
            value={firma_adi}
            onChange={handleChange}
            maxLength={80}
            className="w-full px-3 py-2 border rounded-lg"
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 font-medium mb-2"
            htmlFor="firma_adresi_1"
          >
            Adres 1
          </label>
          <input
            type="text"
            id="firma_adresi_1"
            name="firma_adresi_1"
            value={firma_adresi_1}
            onChange={handleChange}
            maxLength={80}
            className="w-full px-3 py-2 border rounded-lg"
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 font-medium mb-2"
            htmlFor="firma_adresi_2"
          >
            Adres 2
          </label>
          <input
            type="text"
            id="firma_adresi_2"
            name="firma_adresi_2"
            value={firma_adresi_2}
            onChange={handleChange}
            maxLength={80}
            className="w-full px-3 py-2 border rounded-lg"
          />
        </div>
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
            maxLength={3}
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
            maxLength={3}
            className="w-full px-3 py-2 border rounded-lg"
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
            onClick={() => navigate("/firma")}
            className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-300"
          >
            İptal
          </button>
        </div>
      </div>
    </div>
  );
};

export default FirmaGuncelle;

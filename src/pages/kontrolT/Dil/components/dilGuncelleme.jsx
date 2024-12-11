import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAxios } from "../../../../shared/hooks/axios-hook";

const dilFields = {
  firma_kodu: "",
  dil_kodu: "",
  dil_adi: "",
};

const DilGuncelle = () => {

  const {dil_kodu,firma_kodu} = useParams();

  const [dilData, setDilData] = useState(dilFields);
  const { dil_adi } = dilData;

  const axios = useAxios();
  const navigate = useNavigate();

  const getDil = async () => {
    try {
      const response = await axios.get(`/dil/${dil_kodu}/${firma_kodu}`);
      console.log(response);
      if (response.data.status === "OK") {
        const dilData = response.data.dil;

        setDilData({
          dil_kodu: dilData.LANCODE,
          dil_adi: dilData.LANTEXT,
          firma_kodu: dilData.COMCODE,
        });
      }
    } catch (error) {
      console.log("Error", error.message);
    }
  };

  useEffect(() => {
    getDil();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDilData({
      ...dilData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`/dil`, dilData);
      if (response.data.status === "OK") {
        navigate("/dil");
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
          Dil Bilgilerini Güncelle
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
            className="w-full px-3 py-2 border rounded-lg bg-gray-100"
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
        <div className="mb-4">
          <label
            className="block text-gray-700 font-medium mb-2"
            htmlFor="dil_kodu"
          >
            Dil Kodu
          </label>
          <input
            type="text"
            id="dil_kodu"
            name="dil_kodu"
            value={dil_kodu}
            onChange={handleChange}
            readOnly
            className="w-full px-3 py-2 border rounded-lg bg-gray-100"
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 font-medium mb-2"
            htmlFor="dil_adi"
          >
            Dil Adı
          </label>
          <input
            type="text"
            id="dil_adi"
            name="dil_adi"
            value={dil_adi}
            onChange={handleChange}
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
            onClick={() => navigate("/dil")}
            className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-300"
          >
            İptal
          </button>
        </div>
      </div>
    </div>
  );
};

export default DilGuncelle;

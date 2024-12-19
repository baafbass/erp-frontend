import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAxios } from "../../../../shared/hooks/axios-hook";

const dilFields = {
  firma_kodu: "",
  dil_kodu: "",
  dil_adi: "",
};

const DilOlustur = () => {
  const [dilData, setDilData] = useState(dilFields);
  const { firma_kodu, dil_kodu, dil_adi } = dilData;

  const axios = useAxios();
  const navigate = useNavigate();

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
      const response = await axios.post("/dil", dilData);
      if (response.data.status === "OK") {
        navigate("/dil");
      }
    } catch (error) {
      console.log("message:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-start pt-8">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-4xl">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Yeni Dil Oluştur
        </h1>
        <form onSubmit={handleSubmit}>
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
              onChange={handleChange}
              maxLength={4}
              className="w-full px-3 py-2 border rounded-lg"
              required
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
              maxLength={3}
              className="w-full px-3 py-2 border rounded-lg"
              required
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
              maxLength={80}
              className="w-full px-3 py-2 border rounded-lg"
              required
            />
          </div>
          <div className="flex justify-between">
            <button
              onClick={handleSubmit}
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-300"
            >
              Dil Oluştur
            </button>
            <Link to="/dil">
              <button className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-300">
                Listeye Dön
              </button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DilOlustur;

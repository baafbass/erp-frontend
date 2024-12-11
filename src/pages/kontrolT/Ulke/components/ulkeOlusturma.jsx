import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAxios } from "../../../../shared/hooks/axios-hook";

const ulkeFields = {
  firma_kodu: "",
  ulke_kodu: "",
  ulke_adi: "",
};

const UlkeOlustur = () => {
  const [ulkeData, setUlkeData] = useState(ulkeFields);
  const { firma_kodu, ulke_kodu, ulke_adi } = ulkeData;

  const axios = useAxios();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUlkeData({
      ...ulkeData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/ulke", ulkeData);
      if (response.data.status === "OK") {
        navigate("/ulke");
      }
    } catch (error) {
      console.log("message:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-start pt-8">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-4xl">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Yeni Ülke Oluştur
        </h1>
        <form onSubmit={handleSubmit}>
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
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-medium mb-2"
              htmlFor="ulke_adi"
            >
              Ülke Adı
            </label>
            <input
              type="text"
              id="ulke_adi"
              name="ulke_adi"
              value={ulke_adi}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg"
              required
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
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg"
              required
            />
          </div>
          <div className="flex justify-between">
            <button
              onClick={handleSubmit}
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-300"
            >
              Ülke Oluştur
            </button>
            <Link to="/ulke">
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

export default UlkeOlustur;

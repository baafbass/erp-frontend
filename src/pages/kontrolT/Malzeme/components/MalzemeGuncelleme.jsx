import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAxios } from "../../../../shared/hooks/axios-hook";

const malzemeFields = {
  firma_kodu: "",
  malzeme: "",
  malzeme_aciklamasi: "",
  passif_mi: "",
};

const MalzemeGuncelle = () => {
  const { malzeme, firma_kodu } = useParams();
  const [malzemeData, setMalzemeData] = useState(malzemeFields);
  const { malzeme_aciklamasi, passif_mi } = malzemeData;

  const axios = useAxios();
  const navigate = useNavigate();

  const getMalzeme = async () => {
    try {
      const response = await axios.get(`/malzeme/${malzeme}/${firma_kodu}`);
      console.log(response)
      if (response.data.status === "OK") {
        const malzemeData = response.data.transformedMalzeme;

        setMalzemeData({
          firma_kodu: malzemeData.COMCODE,
          malzeme: malzemeData.DOCTYPE,
          malzeme_aciklamasi: malzemeData.DOCTYPETEXT,
          passif_mi: malzemeData.ISPASSIVE,
        });
      }
    } catch (error) {
      console.log("Error", error);
    }
  };

  useEffect(() => {
    getMalzeme();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMalzemeData({
      ...malzemeData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`/malzeme`, malzemeData);
      if (response.data.status === "OK") {
        navigate("/malzeme");
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
          Malzeme Bilgilerini Güncelle
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
            htmlFor="malzeme"
          >
            Malzeme Tipi
          </label>
          <input
            type="text"
            id="malzeme"
            name="malzeme"
            value={malzeme}
            onChange={handleChange}
            readOnly
            className="w-full px-3 py-2 border rounded-lg bg-gray-100"
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 font-medium mb-2"
            htmlFor="malzeme_aciklamasi"
          >
            Malzeme Tipi Açıklaması
          </label>
          <input
            type="text"
            id="malzeme_aciklamasi"
            name="malzeme_aciklamasi"
            value={malzeme_aciklamasi}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg"
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 font-medium mb-2"
            htmlFor="passif_mi"
          >
            Pasif Mi?
          </label>
          <div className="flex gap-4">
            <label className="flex items-center">
              <input
                type="radio"
                id="passif_mi"
                name="passif_mi"
                value="0"
                checked={malzemeData.passif_mi === "0"}
                onChange={handleChange}
                className="mr-2"
              />
              Hayır
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                id="passif_mi"
                name="passif_mi"
                value="1"
                checked={malzemeData.passif_mi === "1"}
                onChange={handleChange}
                className="mr-2"
              />
              Evet
            </label>
          </div>
        </div>

        <div className="flex justify-between">
          <button
            onClick={handleSubmit}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-300"
          >
            Güncelle
          </button>
          <button
            onClick={() => navigate("/malzeme")}
            className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-300"
          >
            İptal
          </button>
        </div>
      </div>
    </div>
  );
};

export default MalzemeGuncelle;

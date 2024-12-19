import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAxios } from "../../../../shared/hooks/axios-hook";

const maliyetMerkeziFields = {
  firma_kodu: "",
  maliyet_merkezi: "",
  maliyet_merkezi_aciklamasi: "",
  passif_mi: "",
};

const MaliyetMerkeziGuncelle = () => {
  const { maliyet_merkezi, firma_kodu } = useParams();
  const [maliyetMerkeziData, setmaliyetMerkeziData] =
    useState(maliyetMerkeziFields);
  const { maliyet_merkezi_aciklamasi, passif_mi } = maliyetMerkeziData;

  const axios = useAxios();
  const navigate = useNavigate();

  const getMaliyetMerkezi = async () => {
    try {
      const response = await axios.get(
        `/maliyet-merkezi/${maliyet_merkezi}/${firma_kodu}`
      );
      if (response.data.status === "OK") {
        const maliyetMerkeziData = response.data.transformedMaliyetMerkezi;

        setmaliyetMerkeziData({
          firma_kodu: maliyetMerkeziData.COMCODE,
          maliyet_merkezi: maliyetMerkeziData.DOCTYPE,
          maliyet_merkezi_aciklamasi: maliyetMerkeziData.DOCTYPETEXT,
          passif_mi: maliyetMerkeziData.ISPASSIVE,
        });
      }
    } catch (error) {
      console.log("Error", error);
    }
  };

  useEffect(() => {
    getMaliyetMerkezi();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setmaliyetMerkeziData({
      ...maliyetMerkeziData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`/maliyet-merkezi`, maliyetMerkeziData);
      if (response.data.status === "OK") {
        navigate("/maliyet_merkezi");
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
          Maliyet Merkezi Bilgilerini Güncelle
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
            htmlFor="maliyet_merkezi"
          >
            Maliyet Merkezi Tipi
          </label>
          <input
            type="text"
            id="maliyet_merkezi"
            name="maliyet_merkezi"
            value={maliyet_merkezi}
            onChange={handleChange}
            readOnly
            maxLength={4}
            className="w-full px-3 py-2 border rounded-lg bg-gray-100"
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 font-medium mb-2"
            htmlFor="maliyet_merkezi_aciklamasi"
          >
            Maliyet Merkezi Tipi Açıklaması
          </label>
          <textarea
            type="text"
            id="maliyet_merkezi_aciklamasi"
            name="maliyet_merkezi_aciklamasi"
            value={maliyet_merkezi_aciklamasi}
            onChange={handleChange}
            maxLength={80}
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
                checked={maliyetMerkeziData.passif_mi === "0"}
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
                checked={maliyetMerkeziData.passif_mi === "1"}
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
            onClick={() => navigate("/maliyet-merkezi")}
            className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-300"
          >
            İptal
          </button>
        </div>
      </div>
    </div>
  );
};

export default MaliyetMerkeziGuncelle;

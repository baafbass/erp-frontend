import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAxios } from "../../../../shared/hooks/axios-hook";

const maliyetMerkeziFields = {
  firma_kodu: "",
  maliyet_merkezi: "",
  maliyet_merkezi_aciklamasi: "",
  passif_mi: "",
};

const MaliyetMerkeziOlustur = () => {
  const [maliyetMerkeziData, setmaliyetMerkeziData] =
    useState(maliyetMerkeziFields);
  const { firma_kodu, maliyet_merkezi, maliyet_merkezi_aciklamasi, passif_mi } =
    maliyetMerkeziData;

  const axios = useAxios();
  const navigate = useNavigate();

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
      const response = await axios.post("/maliyet_merkezi", maliyetMerkeziData);
      if (response.data.status === "OK") {
        navigate("/maliyet_merkezi");
      }
    } catch (error) {
      console.log("message:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-start pt-8">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-4xl">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Yeni Maliyet Merkezi Oluştur
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
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
              className="w-full px-3 py-2 border rounded-lg"
              required
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
              className="w-full px-3 py-2 border rounded-lg"
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-medium mb-2"
              htmlFor="passif_mi"
            >
              Pasif mi?
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
                  required
                />
                0 (Hayır)
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
                  required
                />
                1 (Evet)
              </label>
            </div>
          </div>
          <div className="flex justify-between">
            <button
              onClick={handleSubmit}
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-300"
            >
              Maliyet Merkezi Oluştur
            </button>
            <Link to="/maliyet_merkezi">
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

export default MaliyetMerkeziOlustur;

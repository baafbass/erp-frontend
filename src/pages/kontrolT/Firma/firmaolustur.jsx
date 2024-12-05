import React, { useState } from "react";
import { Link } from "react-router-dom";

const FirmaOlustur = () => {
  const [formData, setFormData] = useState({
    kod: "",
    ad: "",
    adres1: "",
    adres2: "",
    sehirKodu: "",
    ulkeKodu: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form data submitted:", formData);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-start pt-8">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-4xl">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Yeni Firma Oluştur
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-medium mb-2"
              htmlFor="kod"
            >
              Kod
            </label>
            <input
              type="text"
              id="kod"
              name="kod"
              value={formData.kod}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg"
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-medium mb-2"
              htmlFor="ad"
            >
              Ad
            </label>
            <input
              type="text"
              id="ad"
              name="ad"
              value={formData.ad}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg"
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-medium mb-2"
              htmlFor="adres1"
            >
              Adres 1
            </label>
            <input
              type="text"
              id="adres1"
              name="adres1"
              value={formData.adres1}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg"
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-medium mb-2"
              htmlFor="adres2"
            >
              Adres 2
            </label>
            <input
              type="text"
              id="adres2"
              name="adres2"
              value={formData.adres2}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-medium mb-2"
              htmlFor="sehirKodu"
            >
              Şehir Kodu
            </label>
            <input
              type="text"
              id="sehirKodu"
              name="sehirKodu"
              value={formData.sehirKodu}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg"
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-medium mb-2"
              htmlFor="ulkeKodu"
            >
              Ülke Kodu
            </label>
            <input
              type="text"
              id="ulkeKodu"
              name="ulkeKodu"
              value={formData.ulkeKodu}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg"
              required
            />
          </div>
          <div className="flex justify-between">
            <button
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-300"
            >
              Firma Oluştur
            </button>
            <Link to="/">
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

export default FirmaOlustur;

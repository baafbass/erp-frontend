import React, { useState,useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAxios } from "../../../../shared/hooks/axios-hook";

const urunAgaciFields = {
  firma_kodu: "",
  urun_agaci: "",
  urun_agaci_aciklama: "",
  passif_mi: "",
};

const UrunAgaciOlusturma = () => {
  const [urunAgaciData, setBOMData] = useState(urunAgaciFields);
  const [firmalar,setFirmalar] = useState([]);
  const { firma_kodu, urun_agaci, urun_agaci_aciklama, passif_mi } =
    urunAgaciData;

  const axios = useAxios();
  const navigate = useNavigate();

  useEffect(()=>{
   const fetchFirmalar = async () => {
    const firmalarResponse = await axios.get('/firma')
    setFirmalar(firmalarResponse.data.firmalar);
   }
   fetchFirmalar()
  },[])

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBOMData({
      ...urunAgaciData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/urun-agaci", urunAgaciData);
      if (response.data.status === "OK") {
        navigate("/urun_agaci");
      }
    } catch (error) {
      console.log("message:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-start pt-8">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-4xl">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Yeni Ürün Ağacı Oluştur
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-medium mb-2"
              htmlFor="firma_kodu"
            >
              Firma Kodu
            </label>
            <select
              id="firma_kodu"
              name="firma_kodu"
              value={firma_kodu}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg"
            >
             <option value="">Seçiniz</option>
                {firmalar.map((firma) => (
                  <option key={firma.COMCODE} value={firma.COMCODE}>
                    {firma.COMCODE}
                  </option>
                ))}
            </select>
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-medium mb-2"
              htmlFor="urun_agaci"
            >
              Ürün Ağacı Tipi
            </label>
            <input
              type="text"
              id="urun_agaci"
              name="urun_agaci"
              value={urun_agaci}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg"
              required
              maxLength={4}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-medium mb-2"
              htmlFor="urun_agaci_aciklama"
            >
              Ürün Ağacı Tipi Açıklaması
            </label>
            <textarea
              type="text"
              id="urun_agaci_aciklama"
              name="urun_agaci_aciklama"
              value={urun_agaci_aciklama}
              onChange={handleChange}
              maxLength={80}
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
                  checked={urunAgaciData.passif_mi === "0"}
                  onChange={handleChange}
                  className="mr-2"
                  required
                />
                Hayır
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  id="passif_mi"
                  name="passif_mi"
                  value="1"
                  checked={urunAgaciData.passif_mi === "1"}
                  onChange={handleChange}
                  className="mr-2"
                  required
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
              Ürün Ağacı Tipi Oluştur
            </button>
            <Link to="/urun_agaci">
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

export default UrunAgaciOlusturma;

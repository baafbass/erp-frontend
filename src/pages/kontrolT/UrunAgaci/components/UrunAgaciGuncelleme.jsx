import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAxios } from "../../../../shared/hooks/axios-hook";

const urunAgaciFields = {
  firma_kodu: "",
  urun_agaci: "",
  urun_agaci_aciklama: "",
  passif_mi: "",
};

const UrunAgaciGuncelleme = () => {
  const { urun_agaci, firma_kodu } = useParams();
  const [urunAgaciData, setBOMData] = useState(urunAgaciFields);
  const { urun_agaci_aciklama, passif_mi } = urunAgaciData;

  const axios = useAxios();
  const navigate = useNavigate();

  const getBOM = async () => {
    try {
      const response = await axios.get(
        `/urun-agaci/${urun_agaci}/${firma_kodu}`
      );
      if (response.data.status === "OK") {
        const urunAgaciData = response.data.transformedUrunAgaci;

        setBOMData({
          firma_kodu: urunAgaciData.COMCODE,
          urun_agaci: urunAgaciData.DOCTYPE,
          urun_agaci_aciklama: urunAgaciData.DOCTYPETEXT,
          passif_mi: urunAgaciData.ISPASSIVE,
        });
      }
    } catch (error) {
      console.log("Error", error.message);
    }
  };

  useEffect(() => {
    getBOM();
  }, []);

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
      const response = await axios.put(`/urun-agaci`, urunAgaciData);
      if (response.data.status === "OK") {
        navigate("/urun_agaci");
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
          Ürün Ağacı Bilgilerini Güncelle
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
            readOnly
            maxLength={4}
            className="w-full px-3 py-2 border rounded-lg bg-gray-100"
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
                checked={urunAgaciData.passif_mi === "0"}
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
                checked={urunAgaciData.passif_mi === "1"}
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
            onClick={() => navigate("/urun_agaci")}
            className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-300"
          >
            İptal
          </button>
        </div>
      </div>
    </div>
  );
};

export default UrunAgaciGuncelleme;

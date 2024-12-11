import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAxios } from "../../../../shared/hooks/axios-hook";

const birimFields = {
  firma_kodu: "",
  birim_kodu: "",
  birim_adi: "",
  ana_agirlik_birimi: "",
  ana_birim_kodu: "",
};

const BirimGuncelle = () => {

  const { birim_kodu,firma_kodu } = useParams();
  const [birimData, setBirimData] = useState(birimFields);
  const {birim_adi,ana_agirlik_birimi,ana_birim_kodu} = birimData;


  const axios = useAxios();
  const navigate = useNavigate();

  const getBirim = async () => {
    try {
      const response = await axios.get(`/birim/${birim_kodu}/${firma_kodu}`);
      if (response.data.status === "OK") {
        const birimData = response.data.transformedBirim;

        setBirimData({
          birim_kodu: birimData.UNITCODE,
          birim_adi: birimData.UNITTEXT,
          ana_agirlik_birimi: birimData.ISMAINUNIT,
          ana_birim_kodu: birimData.MAINUNITCODE,
          firma_kodu: birimData.COMCODE,
        });
      }
    } catch (error) {
      console.log("Error", error.message);
    }
  };

  useEffect(() => {
    getBirim();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBirimData({
      ...birimData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put('/birim', birimData);

      if (response.data.status === "OK") {
        navigate("/birim");
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
          Birim Bilgilerini Güncelle
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
            htmlFor="birim_kodu"
          >
            Birim Kodu
          </label>
          <input
            type="text"
            id="birim_kodu"
            name="birim_kodu"
            value={birim_kodu}
            onChange={handleChange}
            readOnly
            className="w-full px-3 py-2 border rounded-lg bg-gray-100"
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 font-medium mb-2"
            htmlFor="birim_adi"
          >
            Birim Adı
          </label>
          <input
            type="text"
            id="birim_adi"
            name="birim_adi"
            value={birim_adi}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg"
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 font-medium mb-2"
            htmlFor="ana_agirlik_birimi"
          >
            Ana Ağırlık Birimi mi?
          </label>
          <div className="flex gap-4">
            <label className="flex items-center">
              <input
                type="radio"
                id="ana_agirlik_birimi"
                name="ana_agirlik_birimi"
                value="0"
                checked={birimData.ana_agirlik_birimi === "0"}
                onChange={handleChange}
                className="mr-2"
              />
              Hayır
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                id="ana_agirlik_birimi"
                name="ana_agirlik_birimi"
                value="1"
                checked={birimData.ana_agirlik_birimi === "1"}
                onChange={handleChange}
                className="mr-2"
              />
              Evet
            </label>
          </div>
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 font-medium mb-2"
            htmlFor="ana_birim_kodu"
          >
            Ana Birim Kodu
          </label>
          <input
            type="text"
            id="ana_birim_kodu"
            name="ana_birim_kodu"
            value={ana_birim_kodu}
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
            onClick={() => navigate("/birim")}
            className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-300"
          >
            İptal
          </button>
        </div>
      </div>
    </div>
  );
};

export default BirimGuncelle;

import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAxios } from "../../../../shared/hooks/axios-hook";
import Alert from "../../../../component/alert";

const birimFields = {
  firma_kodu: "",
  birim_kodu: "",
  birim_adi: "",
  ana_agirlik_birimi: "",
  ana_birim_kodu: "",
};

const BirimOlustur = () => {
  const [birimData, setBirimData] = useState(birimFields);
  const [firmalar, setFirmalar] = useState([]);
  const [alert, setAlert] = useState({
    isVisible: false,
    message: "",
    type: "error",
  });
  const {
    firma_kodu,
    birim_kodu,
    birim_adi,
    ana_agirlik_birimi,
    ana_birim_kodu,
  } = birimData;

  const axios = useAxios();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFirmalar = async () => {
      const firmalarResponse = await axios.get("/firma");
      setFirmalar(firmalarResponse.data.firmalar);
    };
    fetchFirmalar();
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
      const response = await axios.post("/birim", birimData);
      if (response.data.status === "OK") {
        navigate("/birim");
      }
    } catch (error) {
      let errorMessage = "Hata oluştu !!";

      if (error.response.status === 400) {
        errorMessage = "Gerekli alan doldurmamışsınız !!";
      } else {
        errorMessage = "Böyle bir birim bulunmaktadır !!";
      }

      setAlert({
        isVisible: true,
        message: errorMessage,
        type: "error",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-start pt-8">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-4xl">
        <Alert
          isVisible={alert.isVisible}
          message={alert.message}
          type={alert.type}
          onClose={() => setAlert({ ...alert, isVisible: false })}
        />
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Yeni Birim Oluştur
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
              className="w-full px-3 py-2 border rounded-lg"
              maxLength={3}
              required
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
              maxLength={80}
              required
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
                  required
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
                  required
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
              maxLength={3}
              required
            />
          </div>

          <div className="flex justify-between">
            <button
              onClick={handleSubmit}
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-300"
            >
              Birim Oluştur
            </button>
            <Link to="/birim">
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

export default BirimOlustur;

import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAxios } from "../../../../shared/hooks/axios-hook";
import Alert from "../../../../component/alert";

const rotaFields = {
  firma_kodu: "",
  rota: "",
  rota_aciklamasi: "",
  passif_mi: "",
};

const RotaOlusturma = () => {
  const [rotaData, setRotaData] = useState(rotaFields);
  const [firmalar, setFirmalar] = useState([]);
  const [alert, setAlert] = useState({
    isVisible: false,
    message: "",
    type: "error",
  });
  const { firma_kodu, rota, rota_aciklamasi, passif_mi } = rotaData;

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
    setRotaData({
      ...rotaData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/rota", rotaData);
      if (response.data.status === "OK") {
        navigate("/rota");
      }
    } catch (error) {
      let errorMessage = "Hata oluştu !!";

      if (error.response.status === 400) {
        errorMessage = "Gerekli alan doldurmamışsınız !!";
      } else {
        errorMessage = "Böyle bir rota bulunmaktadır !!";
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
          Yeni Rota Oluştur
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
              htmlFor="rota"
            >
              Rota Tipi
            </label>
            <input
              type="text"
              id="rota"
              name="rota"
              value={rota}
              onChange={handleChange}
              maxLength={4}
              className="w-full px-3 py-2 border rounded-lg"
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-medium mb-2"
              htmlFor="rota_aciklamasi"
            >
              Rota Tipi Açıklaması
            </label>
            <textarea
              type="text"
              id="rota_aciklamasi"
              name="rota_aciklamasi"
              value={rota_aciklamasi}
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
                  checked={rotaData.passif_mi === "0"}
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
                  checked={rotaData.passif_mi === "1"}
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
              Rota Tipi Oluştur
            </button>
            <Link to="/rota">
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

export default RotaOlusturma;

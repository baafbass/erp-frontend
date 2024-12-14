import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faTrash,
  faPlus,
  faHome,
} from "@fortawesome/free-solid-svg-icons";
import { useAxios } from "../../../shared/hooks/axios-hook";
import SehirSilme from "./components/sehirSilme";

const SehirPage = () => {
  const [cities, setCities] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedCity, setSelectedCity] = useState();

  const axios = useAxios();
  const navigate = useNavigate();

  const getAllSehir = async () => {
    try {
      const response = await axios.get("/sehir");
      if (response.data.status === "OK") {
        setCities(response.data.sehirler);
      }
    } catch (error) {
      console.log("Error", error.message);
    }
  };

  useEffect(() => {
    getAllSehir();
  }, []);

  const handleEdit = (sehir_kodu, firma_kodu) => {
    navigate(`/sehir-guncelle/${sehir_kodu}/${firma_kodu}`);
  };

  const handleDelete = async () => {
    try {
      const { sehir_kodu, firma_kodu } = selectedCity;
      const response = await axios.delete(`/sehir/${sehir_kodu}/${firma_kodu}`);
      if (response.data.status === "OK") {
        setCities((prevcities) =>
          prevcities.filter((city) => city.CITYCODE !== sehir_kodu || city.COMCODE !== firma_kodu)
        );
      }
    } catch (error) {
      console.error("Error Deleting City", error.message);
    } finally {
      setOpenDialog(false);
    }
  };

  const handleOpenDialog = (sehir_kodu, firma_kodu) => {
    setSelectedCity({ sehir_kodu, firma_kodu });
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedCity(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-start pt-8">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-6xl">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Şehir Bilgileri</h1>
          <div className="flex space-x-4">
            <Link to="/">
              <button className="bg-gray-600 hover:bg-gray-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-300 flex items-center">
                <FontAwesomeIcon icon={faHome} className="mr-2" />
                Ana Sayfa
              </button>
            </Link>
            <Link to="/sehir-olustur">
              <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-300 flex items-center">
                <FontAwesomeIcon icon={faPlus} className="mr-2" />
                Yeni Şehir Oluştur
              </button>
            </Link>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-200">
                <th className="px-4 py-2 text-left">Firma Kodu</th>
                <th className="px-4 py-2 text-left">Şehir Kodu</th>
                <th className="px-4 py-2 text-left">Şehir Adı</th>
                <th className="px-4 py-2 text-left">Ülke Kodu</th>
                <th className="px-4 py-2 text-center">İşlemler</th>
              </tr>
            </thead>
            <tbody>
              {cities.map((city, index) => (
                <tr key={index} className="border-b">
                  <td className="px-4 py-2">{city.COMCODE}</td>
                  <td className="px-4 py-2">{city.CITYCODE}</td>
                  <td className="px-4 py-2">{city.CITYTEXT}</td>
                  <td className="px-4 py-2">{city.COUNTRYCODE}</td>
                  <td className="px-4 py-2 flex justify-center space-x-2">
                    <button
                      onClick={() => handleEdit(city.CITYCODE, city.COMCODE)}
                      className="bg-blue-500 hover:bg-blue-700 text-white font-medium py-1 px-2 rounded-lg transition-colors duration-300 flex items-center"
                    >
                      <FontAwesomeIcon icon={faEdit} className="mr-1" />
                      Düzenle
                    </button>

                    <button
                      onClick={() =>
                        handleOpenDialog(city.CITYCODE, city.COMCODE)
                      }
                      className="bg-red-500 hover:bg-red-700 text-white font-medium py-1 px-2 rounded-lg transition-colors duration-300 flex items-center"
                    >
                      <FontAwesomeIcon icon={faTrash} className="mr-1" />
                      Sil
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <SehirSilme
        openDialog={openDialog}
        handleCloseDialog={handleCloseDialog}
        handleDelete={handleDelete}
      />
    </div>
  );
};

export default SehirPage;

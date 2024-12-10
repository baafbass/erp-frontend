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
import UlkeSilme from "./components/ulkeSilme";

const UlkePage = () => {
  const [countries, setCountries] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(null);

  const axios = useAxios();
  const navigate = useNavigate();

  const getAllUlke = async () => {
    try {
      const response = await axios.get("/ulke");
      if (response.data.status === "OK") {
        setCountries(response.data.ulkeler);
      }
    } catch (error) {
      console.log("Error", error.message);
    }
  };

  useEffect(() => {
    getAllUlke();
  }, []);

  const handleEdit = (ulke_kodu) => {
    navigate(`/ulke-guncelle/${ulke_kodu}`);
  };

  const handleDelete = async () => {
    try {
      const response = await axios.delete(`/ulke/${selectedCountry}`);
      if (response.data.status === "OK") {
        setCountries((prevcountries) =>
          prevcountries.filter(
            (country) => country.COUNTRYCODE !== selectedCountry
          )
        );
      }
    } catch (error) {
      console.error("Error Deleting Country", error.message);
    } finally {
      setOpenDialog(false);
    }
  };

  const handleOpenDialog = (ulke_kodu) => {
    setSelectedCountry(ulke_kodu);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedCountry(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-start pt-8">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-6xl">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Ülke Bilgileri</h1>
          <div className="flex space-x-4">
            <Link to="/">
              <button className="bg-gray-600 hover:bg-gray-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-300 flex items-center">
                <FontAwesomeIcon icon={faHome} className="mr-2" />
                Ana Sayfa
              </button>
            </Link>
            <Link to="/ulke-olustur">
              <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-300 flex items-center">
                <FontAwesomeIcon icon={faPlus} className="mr-2" />
                Yeni Ülke Oluştur
              </button>
            </Link>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-200">
                <th className="px-4 py-2 text-left">Ülke Kodu</th>
                <th className="px-4 py-2 text-left">Ülke Adı</th>
                <th className="px-4 py-2 text-left">Firma Kodu</th>
                <th className="px-4 py-2 text-center">İşlemler</th>
              </tr>
            </thead>
            <tbody>
              {countries.map((country, index) => (
                <tr key={index} className="border-b">
                  <td className="px-4 py-2">{country.COUNTRYCODE}</td>
                  <td className="px-4 py-2">{country.COUNTRYTEXT}</td>
                  <td className="px-4 py-2">{country.COMCODE}</td>
                  <td className="px-4 py-2 flex justify-center space-x-2">
                    <button
                      onClick={() => handleEdit(country.COUNTRYCODE)}
                      className="bg-blue-500 hover:bg-blue-700 text-white font-medium py-1 px-2 rounded-lg transition-colors duration-300 flex items-center"
                    >
                      <FontAwesomeIcon icon={faEdit} className="mr-1" />
                      Düzenle
                    </button>

                    <button
                      onClick={() => handleOpenDialog(country.COUNTRYCODE)}
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
      <UlkeSilme
        openDialog={openDialog}
        handleCloseDialog={handleCloseDialog}
        handleDelete={handleDelete}
      />
    </div>
  );
};

export default UlkePage;

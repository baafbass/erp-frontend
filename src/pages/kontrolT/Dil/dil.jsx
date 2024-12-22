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
import DilSilme from "./components/dilSilme";

const DilPage = () => {
  const [languages, setLanguages] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState({});

  const axios = useAxios();
  const navigate = useNavigate();

  const getAllDil = async () => {
    try {
      const response = await axios.get("/dil");
      console.log(response);
      if (response.data.status === "OK") {
        setLanguages(response.data.diller);
      }
    } catch (error) {
      console.log("Error", error.message);
    }
  };

  useEffect(() => {
    getAllDil();
  }, []);

  const handleEdit = (dil_kodu, firma_kodu) => {
    navigate(`/dil-guncelle/${dil_kodu}/${firma_kodu}`);
  };

  const handleDelete = async () => {
    try {
      const { dil_kodu, firma_kodu } = selectedLanguage;

      const response = await axios.delete(`/dil/${dil_kodu}/${firma_kodu}`);
      if (response.data.status === "OK") {
        setLanguages((prevlanguages) =>
          prevlanguages.filter(
            (language) =>
              language.LANCODE !== dil_kodu || language.COMCODE !== firma_kodu
          )
        );
      }
    } catch (error) {
      console.error("Error Deleting Langauge", error.message);
    } finally {
      setOpenDialog(false);
    }
  };

  const handleOpenDialog = (dil_kodu, firma_kodu) => {
    setSelectedLanguage({ dil_kodu, firma_kodu });
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedLanguage(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-start pt-8">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-6xl">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Dil Bilgileri</h1>
          <div className="flex space-x-4">
            <Link to="/">
              <button className="bg-gray-600 hover:bg-gray-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-300 flex items-center">
                <FontAwesomeIcon icon={faHome} className="mr-2" />
                Ana Sayfa
              </button>
            </Link>
            <Link to="/dil-olustur">
              <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-300 flex items-center">
                <FontAwesomeIcon icon={faPlus} className="mr-2" />
                Yeni Dil Oluştur
              </button>
            </Link>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-200">
                <th className="px-4 py-2 text-left">Firma Kodu</th>
                <th className="px-4 py-2 text-left">Dil Kodu</th>
                <th className="px-4 py-2 text-left">Dil Adı</th>
                <th className="px-4 py-2 text-center">İşlemler</th>
              </tr>
            </thead>
            <tbody>
              {languages.map((language, index) => (
                <tr key={index} className="border-b">
                  <td className="px-4 py-2">{language.COMCODE}</td>
                  <td className="px-4 py-2">{language.LANCODE}</td>
                  <td className="px-4 py-2">{language.LANTEXT}</td>
                  <td className="px-4 py-2 flex justify-center space-x-2">
                    <button
                      onClick={() =>
                        handleEdit(language.LANCODE, language.COMCODE)
                      }
                      className="bg-blue-500 hover:bg-blue-700 text-white font-medium py-1 px-2 rounded-lg transition-colors duration-300 flex items-center"
                    >
                      <FontAwesomeIcon icon={faEdit} className="mr-1" />
                      Düzenle
                    </button>

                    <button
                      onClick={() =>
                        handleOpenDialog(language.LANCODE, language.COMCODE)
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
      <DilSilme
        openDialog={openDialog}
        handleCloseDialog={handleCloseDialog}
        handleDelete={handleDelete}
      />
    </div>
  );
};

export default DilPage;

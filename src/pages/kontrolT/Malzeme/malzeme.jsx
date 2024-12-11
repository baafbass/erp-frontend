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
import MalzemeSilme from "./components/MalzemeSilme";

const MalzemePage = () => {
  const [materials, setMaterials] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedMaterial, setSelectedMaterial] = useState();

  const axios = useAxios();
  const navigate = useNavigate();

  const getAllMalzeme = async () => {
    try {
      const response = await axios.get("/malzeme");
      if (response.data.status === "OK") {
        setMaterials(response.data.malzemeler);
      }
    } catch (error) {
      console.log("Error", error.message);
    }
  };

  useEffect(() => {
    getAllMalzeme();
  }, []);

  const handleEdit = (malzeme, firma_kodu) => {
    navigate(`/malzeme-guncelle/${malzeme}/${firma_kodu}`);
  };

  const handleDelete = async () => {
    try {
      const { malzeme, firma_kodu } = selectedMaterial;
      const response = await axios.delete(`/malzeme/${malzeme}/${firma_kodu}`);
      console.log(response)
      if (response.data.status === "OK") {
        setMaterials((prevmaterials) =>
          prevmaterials.filter(
            (material) =>
              material.DOCTYPE !== malzeme || material.COMCODE !== firma_kodu
          )
        );
      }
    } catch (error) {
      console.error("Error Deleting Material", error.message);
    } finally {
      setOpenDialog(false);
    }
  };

  const handleOpenDialog = (malzeme, firma_kodu) => {
    setSelectedMaterial({ malzeme, firma_kodu });
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedMaterial(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-start pt-8">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-6xl">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">
            Malzeme Bilgileri
          </h1>
          <div className="flex space-x-4">
            <Link to="/">
              <button className="bg-gray-600 hover:bg-gray-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-300 flex items-center">
                <FontAwesomeIcon icon={faHome} className="mr-2" />
                Ana Sayfa
              </button>
            </Link>
            <Link to="/malzeme-olustur">
              <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-300 flex items-center">
                <FontAwesomeIcon icon={faPlus} className="mr-2" />
                Yeni Malzeme Tipi Oluştur
              </button>
            </Link>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-200">
                <th className="px-4 py-2 text-left">Firma Kodu</th>
                <th className="px-4 py-2 text-left">Malzeme Tipi</th>
                <th className="px-4 py-2 text-left">Malzeme Tipi Açıklaması</th>
                <th className="px-4 py-2 text-left">Pasif Mi?</th>
                <th className="px-4 py-2 text-center">İşlemler</th>
              </tr>
            </thead>
            <tbody>
              {materials.map((material, index) => (
                <tr key={index} className="border-b">
                  <td className="px-4 py-2">{material.COMCODE}</td>
                  <td className="px-4 py-2">{material.DOCTYPE}</td>
                  <td className="px-4 py-2">{material.DOCTYPETEXT}</td>
                  <td className="px-4 py-2">{material.ISPASSIVE}</td>
                  <td className="px-4 py-2 flex justify-center space-x-2">
                    <button
                      onClick={() =>
                        handleEdit(material.DOCTYPE, material.COMCODE)
                      }
                      className="bg-blue-500 hover:bg-blue-700 text-white font-medium py-1 px-2 rounded-lg transition-colors duration-300 flex items-center"
                    >
                      <FontAwesomeIcon icon={faEdit} className="mr-1" />
                      Düzenle
                    </button>

                    <button
                      onClick={() =>
                        handleOpenDialog(material.DOCTYPE, material.COMCODE)
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
      <MalzemeSilme
        openDialog={openDialog}
        handleCloseDialog={handleCloseDialog}
        handleDelete={handleDelete}
      />
    </div>
  );
};

export default MalzemePage;

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
import MaliyetMerkeziSilme from "./components/MaliyetMerkeziSilme";

const MaliyetMerkeziPage = () => {
  const [costcenters, setCostCenters] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedCostCenter, setSelectedCostCenter] = useState();

  const axios = useAxios();
  const navigate = useNavigate();

  const getAllMaliyetMerkezi = async () => {
    try {
      const response = await axios.get("/maliyet_merkezi");
      if (response.data.status === "OK") {
        setCostCenters(response.data.maliyetmerkezleri);
      }
    } catch (error) {
      console.log("Error", error.message);
    }
  };

  useEffect(() => {
    getAllMaliyetMerkezi();
  }, []);

  const handleEdit = (maliyet_merkezi, firma_kodu) => {
    navigate(`/maliyet_merkezi-guncelle/${maliyet_merkezi}/${firma_kodu}`);
  };

  const handleDelete = async () => {
    try {
      const { maliyet_merkezi, firma_kodu } = selectedCostCenter;
      const response = await axios.delete(
        `/maliyet_merkezi/${maliyet_merkezi}/${firma_kodu}`
      );
      if (response.data.status === "OK") {
        setCostCenters((prevcostcenters) =>
          prevcostcenters.filter(
            (costcenter) =>
              costcenter.DOCTYPE !== maliyet_merkezi ||
              costcenter.COMCODE !== firma_kodu
          )
        );
      }
    } catch (error) {
      console.error("Error Deleting costcenter", error.message);
    } finally {
      setOpenDialog(false);
    }
  };

  const handleOpenDialog = (maliyet_merkezi, firma_kodu) => {
    setSelectedCostCenter({ maliyet_merkezi, firma_kodu });
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedCostCenter(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-start pt-8">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-6xl">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">
            Maliyet Merkezi Bilgileri
          </h1>
          <div className="flex space-x-4">
            <Link to="/">
              <button className="bg-gray-600 hover:bg-gray-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-300 flex items-center">
                <FontAwesomeIcon icon={faHome} className="mr-2" />
                Ana Sayfa
              </button>
            </Link>
            <Link to="/maliyet_merkezi-olustur">
              <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-300 flex items-center">
                <FontAwesomeIcon icon={faPlus} className="mr-2" />
                Yeni Maliyet Merkezi Tipi Oluştur
              </button>
            </Link>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-200">
                <th className="px-4 py-2 text-left">Firma Kodu</th>
                <th className="px-4 py-2 text-left">maliyet_merkezi Tipi</th>
                <th className="px-4 py-2 text-left">
                  Maliyet Merkezi Tipi Açıklaması
                </th>
                <th className="px-4 py-2 text-left">Pasif Mi?</th>
                <th className="px-4 py-2 text-center">İşlemler</th>
              </tr>
            </thead>
            <tbody>
              {costcenters.map((costcenter, index) => (
                <tr key={index} className="border-b">
                  <td className="px-4 py-2">{costcenter.COMCODE}</td>
                  <td className="px-4 py-2">{costcenter.DOCTYPE}</td>
                  <td className="px-4 py-2">{costcenter.DOCTYPETEXT}</td>
                  <td className="px-4 py-2">{costcenter.ISPASSIVE}</td>
                  <td className="px-4 py-2 flex justify-center space-x-2">
                    <button
                      onClick={() =>
                        handleEdit(costcenter.DOCTYPE, costcenter.COMCODE)
                      }
                      className="bg-blue-500 hover:bg-blue-700 text-white font-medium py-1 px-2 rounded-lg transition-colors duration-300 flex items-center"
                    >
                      <FontAwesomeIcon icon={faEdit} className="mr-1" />
                      Düzenle
                    </button>

                    <button
                      onClick={() =>
                        handleOpenDialog(costcenter.DOCTYPE, costcenter.COMCODE)
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
      <MaliyetMerkeziSilme
        openDialog={openDialog}
        handleCloseDialog={handleCloseDialog}
        handleDelete={handleDelete}
      />
    </div>
  );
};

export default MaliyetMerkeziPage;

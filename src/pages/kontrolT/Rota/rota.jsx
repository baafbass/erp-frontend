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
import RotaSilme from "./components/RotaSilme";

const RotaPage = () => {
  const [rotas, setRotas] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [SelectedRota, setSelectedRota] = useState();

  const axios = useAxios();
  const navigate = useNavigate();

  const getAllRota = async () => {
    try {
      const response = await axios.get("/rota");
      if (response.data.status === "OK") {
        setRotas(response.data.rotaler);
      }
    } catch (error) {
      console.log("Error", error.message);
    }
  };

  useEffect(() => {
    getAllRota();
  }, []);

  const handleEdit = (rota, firma_kodu) => {
    navigate(`/rota-guncelle/${rota}/${firma_kodu}`);
  };

  const handleDelete = async () => {
    try {
      const { rota, firma_kodu } = SelectedRota;
      const response = await axios.delete(`/rota/${rota}/${firma_kodu}`);
      if (response.data.status === "OK") {
        setRotas((prevrotas) =>
          prevrotas.filter(
            (rota) => rota.DOCTYPE !== rota || rota.COMCODE !== firma_kodu
          )
        );
      }
    } catch (error) {
      console.error("Error Deleting Rota", error.message);
    } finally {
      setOpenDialog(false);
    }
  };

  const handleOpenDialog = (rota, firma_kodu) => {
    setSelectedRota({ rota, firma_kodu });
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedRota(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-start pt-8">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-6xl">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Rota Bilgileri</h1>
          <div className="flex space-x-4">
            <Link to="/">
              <button className="bg-gray-600 hover:bg-gray-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-300 flex items-center">
                <FontAwesomeIcon icon={faHome} className="mr-2" />
                Ana Sayfa
              </button>
            </Link>
            <Link to="/rota-olustur">
              <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-300 flex items-center">
                <FontAwesomeIcon icon={faPlus} className="mr-2" />
                Yeni Rota Tipi Oluştur
              </button>
            </Link>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-200">
                <th className="px-4 py-2 text-left">Firma Kodu</th>
                <th className="px-4 py-2 text-left">Rota Tipi</th>
                <th className="px-4 py-2 text-left">Rota Tipi Açıklaması</th>
                <th className="px-4 py-2 text-left">Pasif Mi?</th>
                <th className="px-4 py-2 text-center">İşlemler</th>
              </tr>
            </thead>
            <tbody>
              {rotas.map((rota, index) => (
                <tr key={index} className="border-b">
                  <td className="px-4 py-2">{rota.COMCODE}</td>
                  <td className="px-4 py-2">{rota.DOCTYPE}</td>
                  <td className="px-4 py-2">{rota.DOCTYPETEXT}</td>
                  <td className="px-4 py-2">{rota.ISPASSIVE}</td>
                  <td className="px-4 py-2 flex justify-center space-x-2">
                    <button
                      onClick={() => handleEdit(rota.DOCTYPE, rota.COMCODE)}
                      className="bg-blue-500 hover:bg-blue-700 text-white font-medium py-1 px-2 rounded-lg transition-colors duration-300 flex items-center"
                    >
                      <FontAwesomeIcon icon={faEdit} className="mr-1" />
                      Düzenle
                    </button>

                    <button
                      onClick={() =>
                        handleOpenDialog(rota.DOCTYPE, rota.COMCODE)
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
      <RotaSilme
        openDialog={openDialog}
        handleCloseDialog={handleCloseDialog}
        handleDelete={handleDelete}
      />
    </div>
  );
};

export default RotaPage;

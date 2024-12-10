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
import BirimSilme from "./components/birimSilme";

const BirimPage = () => {
  const [units, setUnits] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedUnit, setSelectedUnit] = useState();

  const axios = useAxios();
  const navigate = useNavigate();

  const getAllBirim = async () => {
    try {
      const response = await axios.get("/birim");
      if (response.data.status === "OK") {
        setUnits(response.data.birimler);
      }
    } catch (error) {
      console.log("Error", error.message);
    }
  };

  useEffect(() => {
    getAllBirim();
  }, []);

  const handleEdit = (birim_kodu, firma_kodu) => {
    navigate(`/birim-guncelle/${birim_kodu}/${firma_kodu}`);
  };

  const handleDelete = async () => {
    try {
      const { birim_kodu, firma_kodu } = selectedUnit;

      const response = await axios.delete(`/birim/${birim_kodu}/${firma_kodu}`);
      if (response.data.status === "OK") {
        setUnits((prevunits) =>
          prevunits.filter(
            (unit) =>
              unit.UNITCODE !== birim_kodu || unit.COMCODE !== firma_kodu
          )
        );
      }
    } catch (error) {
      console.error("Error Deleting Unit", error.message);
    } finally {
      setOpenDialog(false);
    }
  };

  const handleOpenDialog = (birim_kodu, firma_kodu) => {
    setSelectedUnit({ birim_kodu, firma_kodu });
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedUnit(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-start pt-8">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-6xl">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Birim Bilgileri</h1>
          <div className="flex space-x-4">
            <Link to="/">
              <button className="bg-gray-600 hover:bg-gray-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-300 flex items-center">
                <FontAwesomeIcon icon={faHome} className="mr-2" />
                Ana Sayfa
              </button>
            </Link>
            <Link to="/birim-olustur">
              <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-300 flex items-center">
                <FontAwesomeIcon icon={faPlus} className="mr-2" />
                Yeni Birim Oluştur
              </button>
            </Link>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-200">
                <th className="px-4 py-2 text-left">Firma Kodu</th>
                <th className="px-4 py-2 text-left">Birim Kodu</th>
                <th className="px-4 py-2 text-left">Birim Adı</th>
                <th className="px-4 py-2 text-left">Ana Ağırlık Birimi?</th>
                <th className="px-4 py-2 text-left">Ana Birim Kodu</th>
                <th className="px-4 py-2 text-center">İşlemler</th>
              </tr>
            </thead>
            <tbody>
              {units.map((unit, index) => (
                <tr key={index} className="border-b">
                  <td className="px-4 py-2">{unit.COMCODE}</td>
                  <td className="px-4 py-2">{unit.UNITCODE}</td>
                  <td className="px-4 py-2">{unit.UNITTEXT}</td>
                  <td className="px-4 py-2">{unit.ISMAINUNIT}</td>
                  <td className="px-4 py-2">{unit.MAINUNITCODE}</td>
                  <td className="px-4 py-2 flex justify-center space-x-2">
                    <button
                      onClick={() => handleEdit(unit.UNITCODE, unit.COMCODE)}
                      className="bg-blue-500 hover:bg-blue-700 text-white font-medium py-1 px-2 rounded-lg transition-colors duration-300 flex items-center"
                    >
                      <FontAwesomeIcon icon={faEdit} className="mr-1" />
                      Düzenle
                    </button>

                    <button
                      onClick={() =>
                        handleOpenDialog(unit.UNITCODE, unit.COMCODE)
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
      <BirimSilme
        openDialog={openDialog}
        handleCloseDialog={handleCloseDialog}
        handleDelete={handleDelete}
      />
    </div>
  );
};

export default BirimPage;

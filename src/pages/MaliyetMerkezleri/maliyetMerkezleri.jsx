import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faTrash,
  faPlus,
  faHome,
} from "@fortawesome/free-solid-svg-icons";
import { useAxios } from "../../shared/hooks/axios-hook";
import MaliyetMerkezleriSilme from './components/maliyetMerkezleriSilme'

const MaliyetMerkezleri = () => {

   const [costCenters,setCostCenters] = useState([]);
   const [openDialog, setOpenDialog] = useState(false);
   const [selectedCostCenter, setSelectedCostCenter] = useState();

   const axios = useAxios();
   const navigate = useNavigate();

  const getAllMaliyetMerkezleri = async () => {
    try {
      const response = await axios.get("/maliyet-merkezleri");
      if (response.data.status === "OK") {
        setCostCenters(response.data.maliyetMerkezleri);
      }
    } catch (error) {
      console.log("Error", error.message);
    }
  };
   
   useEffect(() => {
    getAllMaliyetMerkezleri();
  }, []);


   const handleEdit = (
    firma_kodu,
    maliyet_merk_tipi,
    maliyet_merk_kodu,
    gecerlilik_bas,
    gecerlilik_bit,
    dil_kodu
  ) => {
    navigate(
      `/maliyet-merkezleri-guncelleme/${firma_kodu}/${maliyet_merk_tipi}/${maliyet_merk_kodu}/${gecerlilik_bas}/${gecerlilik_bit}/${dil_kodu}`
    );
  };

  const handleDelete = async () => {
    try {
      const {
        firma_kodu,
        maliyet_merk_tipi,
        maliyet_merk_kodu,
        gecerlilik_bas,
        gecerlilik_bit,
        dil_kodu,
      } = selectedCostCenter;

      const response = await axios.delete(
        `/maliyet_merkezleri/${firma_kodu}/${maliyet_merk_tipi}/${maliyet_merk_kodu}/${gecerlilik_bas}/${gecerlilik_bit}/${dil_kodu}`
      );

      if (response.data.status === "OK") {
        setCostCenters((prevcostcenters) =>
          prevcostcenters.filter(
            (costCenter) =>
              costCenter.COMCODE !== firma_kodu ||
              costCenter.CCMDOCTYPE !== maliyet_merk_tipi ||
              costCenter.CCMDOCNUM !== maliyet_merk_kodu ||
              costCenter.CCMDOCFROM !== gecerlilik_bas ||
              costCenter.CCMDOCUNTIL !== gecerlilik_bit ||
              costCenter.LANCODE !== dil_kodu
          )
        );
      }
    } catch (error) {
      console.error("Error Deleting Material", error.message);
    } finally {
      setOpenDialog(false);
    }
  };

  const handleOpenDialog = (
    firma_kodu,
    maliyet_merk_tipi,
    maliyet_merk_kodu,
    gecerlilik_bas,
    gecerlilik_bit,
    dil_kodu
  ) => {
    setSelectedCostCenter({
      firma_kodu,
      maliyet_merk_tipi,
      maliyet_merk_kodu,
      gecerlilik_bas,
      gecerlilik_bit,
      dil_kodu,
    });
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
            Maliyet Merkezleri
          </h1>
          <div className="flex space-x-4">
            <Link to="/">
              <button className="bg-gray-600 hover:bg-gray-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-300 flex items-center">
                <FontAwesomeIcon icon={faHome} className="mr-2" />
                Ana Sayfa
              </button>
            </Link>
            <Link to="/maliyet-merkezleri-olusturma">
              <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-300 flex items-center">
                <FontAwesomeIcon icon={faPlus} className="mr-2" />
                Yeni Maliyet Merkezi Oluştur
              </button>
            </Link>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-200">
                <th className="px-4 py-2 text-left">Firma Kodu</th>
                <th className="px-4 py-2 text-left">Maliyet Merkezi tipi</th>
                <th className="px-4 py-2 text-left">Maliyet Merkezi Kodu</th>
                <th className="px-4 py-2 text-left">Geçerlilik Başlangıç</th>
                <th className="px-4 py-2 text-left">Geçerlilik Bitiş</th>
                <th className="px-4 py-2 text-left">Dil Kodu</th>
                <th className="px-4 py-2 text-left">Kısa açıklama</th>
                <th className="px-4 py-2 text-left">Uzun açıklama</th>
              </tr>
            </thead>
            <tbody>
              {costCenters.map((costCenter, index) => (
                <tr key={index} className="border-b">
                  <td className="px-4 py-2">{costCenter.COMCODE}</td>
                  <td className="px-4 py-2">{costCenter.CCMDOCTYPE}</td>
                  <td className="px-4 py-2">{costCenter.CCMDOCNUM}</td>
                  <td className="px-4 py-2">{costCenter.CCMDOCFROM}</td>
                  <td className="px-4 py-2">{costCenter.CCMDOCUNTIL}</td>
                  <td className="px-4 py-2">{costCenter.LANCODE}</td>
                  <td className="px-4 py-2">{costCenter.CCMSTEXT}</td>
                  <td className="px-4 py-2">{costCenter.CCMLTEXT}</td>
                  <td className="px-4 py-2 flex justify-center space-x-2">
                    <button
                      onClick={() =>
                        handleEdit(
                          costCenter.COMCODE,
                          costCenter.CCMDOCTYPE,
                          costCenter.CCMDOCNUM,
                          costCenter.CCMDOCFROM,
                          costCenter.CCMDOCUNTIL,
                          costCenter.LANCODE
                        )
                      }
                      className="bg-blue-500 hover:bg-blue-700 text-white font-medium py-1 px-2 rounded-lg transition-colors duration-300 flex items-center"
                    >
                      <FontAwesomeIcon icon={faEdit} className="mr-1" />
                    </button>

                    <button
                      onClick={() =>
                        handleOpenDialog(
                          costCenter.COMCODE,
                          costCenter.CCMDOCTYPE,
                          costCenter.CCMDOCNUM,
                          costCenter.CCMDOCFROM,
                          costCenter.CCMDOCUNTIL,
                          costCenter.LANCODE
                        )
                      }
                      className="bg-red-500 hover:bg-red-700 text-white font-medium py-1 px-2 rounded-lg transition-colors duration-300 flex items-center"
                    >
                      <FontAwesomeIcon icon={faTrash} className="mr-1" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <MaliyetMerkezleriSilme
        openDialog={openDialog}
        handleCloseDialog={handleCloseDialog}
        handleDelete={handleDelete}
      />
    </div>

    )
}


export default MaliyetMerkezleri;
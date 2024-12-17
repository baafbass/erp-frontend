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
import MalzemeBilgileriSilme from "./components/MalzemeBilgileriSilme";

const MalzemeBilgileriPage = () => {
  const [materials, setMaterials] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedMaterial, setselectedMaterial] = useState();

  const axios = useAxios();
  const navigate = useNavigate();

  const getAllMalzemeBilgileri = async () => {
    try {
      const response = await axios.get("/MalzemeBilgileri");
      if (response.data.status === "OK") {
        setMaterials(response.data.malzemeBilgileri);
      }
    } catch (error) {
      console.log("Error", error.message);
    }
  };

  useEffect(() => {
    getAllMalzemeBilgileri();
  }, []);

  const handleEdit = (
    malzeme_tipi,
    firma_kodu,
    malzeme_kodu,
    gecerlilik_bas,
    gecerlilik_bit,
    dil_kodu
  ) => {
    navigate(
      `/MalzemeBilgileri-guncelle/${malzeme_tipi}/${firma_kodu}/${malzeme_kodu}/${gecerlilik_bas}/${gecerlilik_bit}/${dil_kodu}`
    );
  };

  const handleDelete = async () => {
    try {
      const {
        malzeme_tipi,
        firma_kodu,
        malzeme_kodu,
        gecerlilik_bas,
        gecerlilik_bit,
        dil_kodu,
      } = selectedMaterial;

      const response = await axios.delete(
        `/MalzemeBilgileri/${malzeme_tipi}/${firma_kodu}/${malzeme_kodu}/${gecerlilik_bas}/${gecerlilik_bit}/${dil_kodu}`
      );
      if (response.data.status === "OK") {
        setMaterials((prevmaterials) =>
          prevmaterials.filter(
            (material) =>
              material.MATDOCTYPE !== malzeme_tipi ||
              material.COMCODE !== firma_kodu ||
              material.MATDOCNUM !== malzeme_kodu ||
              material.MATDOCFROM !== gecerlilik_bas ||
              material.MATDOCUNTIL !== gecerlilik_bit ||
              material.LANCODE !== dil_kodu
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
    malzeme_tipi,
    firma_kodu,
    malzeme_kodu,
    gecerlilik_bas,
    gecerlilik_bit,
    dil_kodu
  ) => {
    setselectedMaterial({
      malzeme_tipi,
      firma_kodu,
      malzeme_kodu,
      gecerlilik_bas,
      gecerlilik_bit,
      dil_kodu,
    });
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setselectedMaterial(null);
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
            <Link to="/MalzemeBilgileri-olustur">
              <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-300 flex items-center">
                <FontAwesomeIcon icon={faPlus} className="mr-2" />
                Yeni Malzeme Oluştur
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
                <th className="px-4 py-2 text-left">Malzeme Kodu</th>
                <th className="px-4 py-2 text-left">Geçerlilik Başlangıç</th>
                <th className="px-4 py-2 text-left">Geçerlilik Bitiş</th>
                <th className="px-4 py-2 text-left">Tedarik Tipi</th>
                <th className="px-4 py-2 text-left">Malzeme Stok Birimi</th>
                <th className="px-4 py-2 text-left">Net Ağırlık</th>
                <th className="px-4 py-2 text-left">Net Ağırlık Birimi</th>
                <th className="px-4 py-2 text-left">Brüt Ağırlık</th>
                <th className="px-4 py-2 text-left">Brüt Ağırlık Birimi</th>
                <th className="px-4 py-2 text-left">Ürün Ağacı Var Mı?</th>
                <th className="px-4 py-2 text-left">Ürün Ağacı Tipi</th>
                <th className="px-4 py-2 text-left">Ürün Ağacı Kodu</th>
                <th className="px-4 py-2 text-left">Rota Var Mı?</th>
                <th className="px-4 py-2 text-left">Silindi?</th>
                <th className="px-4 py-2 text-left">Pasif mi?</th>
                <th className="px-4 py-2 text-left">Dil Kodu</th>
                <th className="px-4 py-2 text-left">Malzeme Kısa Açıklaması</th>
                <th className="px-4 py-2 text-left">Malzeme Uzun Açıklaması</th>
                <th className="px-4 py-2 text-center">İşlemler</th>
              </tr>
            </thead>
            <tbody>
              {materials.map((material, index) => (
                <tr key={index} className="border-b">
                  <td className="px-4 py-2">{material.COMCODE}</td>
                  <td className="px-4 py-2">{material.MATDOCTYPE}</td>
                  <td className="px-4 py-2">{material.MATDOCNUM}</td>
                  <td className="px-4 py-2">{material.MATDOCFROM}</td>
                  <td className="px-4 py-2">{material.MATDOCUNTIL}</td>
                  <td className="px-4 py-2">{material.SUPPLYTYPE}</td>
                  <td className="px-4 py-2">{material.STUNIT}</td>
                  <td className="px-4 py-2">{material.NETWEIGHT}</td>
                  <td className="px-4 py-2">{material.NWUNIT}</td>
                  <td className="px-4 py-2">{material.BRUTWEIGHT}</td>
                  <td className="px-4 py-2">{material.BWUNIT}</td>
                  <td className="px-4 py-2">{material.ISBOM}</td>
                  <td className="px-4 py-2">{material.BOMDOCTYPE}</td>
                  <td className="px-4 py-2">{material.BOMDOCNUM}</td>
                  <td className="px-4 py-2">{material.ISROUTE}</td>
                  <td className="px-4 py-2">{material.ROTDOCTYPE}</td>
                  <td className="px-4 py-2">{material.ROTDOCNUM}</td>
                  <td className="px-4 py-2">{material.ISDELETED}</td>
                  <td className="px-4 py-2">{material.ISPASSIVE}</td>
                  <td className="px-4 py-2">{material.LANCODE}</td>
                  <td className="px-4 py-2">{material.MATSTEXT}</td>
                  <td className="px-4 py-2">{material.MATLTEXT}</td>
                  <td className="px-4 py-2 flex justify-center space-x-2">
                    <button
                      onClick={() =>
                        handleEdit(
                          material.COMCODE,
                          material.MATDOCTYPE,
                          material.MATDOCNUM,
                          material.MATDOCFROM,
                          material.MATDOCUNTIL,
                          material.LANCODE
                        )
                      }
                      className="bg-blue-500 hover:bg-blue-700 text-white font-medium py-1 px-2 rounded-lg transition-colors duration-300 flex items-center"
                    >
                      <FontAwesomeIcon icon={faEdit} className="mr-1" />
                      Düzenle
                    </button>

                    <button
                      onClick={() =>
                        handleOpenDialog(
                          material.COMCODE,
                          material.MATDOCTYPE,
                          material.MATDOCNUM,
                          material.MATDOCFROM,
                          material.MATDOCUNTIL,
                          material.LANCODE
                        )
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
      <MalzemeBilgileriSilme
        openDialog={openDialog}
        handleCloseDialog={handleCloseDialog}
        handleDelete={handleDelete}
      />
    </div>
  );
};

export default MalzemeBilgileriPage;
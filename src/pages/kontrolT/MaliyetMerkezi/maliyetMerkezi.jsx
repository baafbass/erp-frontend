import React, { useState, useEffect, useRef } from "react";
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
import Alert from "../../../component/alert";

const MaliyetMerkeziPage = () => {
  const [costcenters, setCostCenters] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedCostCenter, setSelectedCostCenter] = useState();
  const tableRef = useRef(null);
  const dataTableRef = useRef(null);
  const [alert, setAlert] = useState({
    isVisible: false,
    message: "",
    type: "error",
  });

  const axios = useAxios();
  const navigate = useNavigate();

  const getAllMaliyetMerkezi = async () => {
    try {
      const response = await axios.get("/maliyet-merkezi");
      if (response.data.status === "OK") {
        setCostCenters(response.data.maliyetMerkezleri);
      }
    } catch (error) {
      console.log("Error", error.message);
    }
  };

  useEffect(() => {
    getAllMaliyetMerkezi();
  }, []);

  useEffect(() => {
    const initializeDataTable = () => {
      if (
        tableRef.current &&
        !dataTableRef.current &&
        costcenters.length >= 0
      ) {
        try {
          dataTableRef.current = window.$(tableRef.current).DataTable({
            language: {
              url: "//cdn.datatables.net/plug-ins/1.13.3/i18n/tr.json",
            },
            responsive: true,
            pageLength: 10,
            lengthMenu: [
              [5, 10, 25, 50, -1],
              [5, 10, 25, 50, "Tümü"],
            ],
            dom: "Blfrtip",
            buttons: [
              {
                extend: "copy",
                text: "Kopyala",
                className:
                  "bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mx-1",
              },
              {
                extend: "excel",
                text: "Excel",
                title: "Firma Listesi",
                className:
                  "bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mx-1",
              },
              {
                extend: "pdf",
                text: "PDF",
                title: "Firma Listesi",
                className:
                  "bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mx-1",
              },
              {
                extend: "print",
                text: "Yazdır",
                title: "Firma Listesi",
                className:
                  "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-1",
              },
            ],
          });
        } catch (error) {
          console.error("DataTable başlatma hatası:", error);
        }
      }
    };

    const timeoutId = setTimeout(initializeDataTable, 100);

    return () => {
      clearTimeout(timeoutId);
      if (dataTableRef.current) {
        try {
          dataTableRef.current.destroy();
          dataTableRef.current = null;
        } catch (error) {
          console.error("DataTable silme hatası:", error);
        }
      }
    };
  }, [costcenters]);

  const handleEdit = (maliyet_merkezi, firma_kodu) => {
    navigate(`/maliyet-merkezi-guncelle/${maliyet_merkezi}/${firma_kodu}`);
  };

  const handleDelete = async () => {
    try {
      const { maliyet_merkezi, firma_kodu } = selectedCostCenter;
      const response = await axios.delete(
        `/maliyet-merkezi/${maliyet_merkezi}/${firma_kodu}`
      );
      if (response.data.status === "OK") {
        if (dataTableRef.current) {
          dataTableRef.current.destroy();
          dataTableRef.current = null;
        }
        setCostCenters((prevcostcenters) =>
          prevcostcenters.filter(
            (costcenter) =>
              costcenter.DOCTYPE !== maliyet_merkezi ||
              costcenter.COMCODE !== firma_kodu
          )
        );
      }
    } catch (error) {
      let errorMessage =
        "Maliyet Merkezine bağlı veriler var, önce onları kaldırın !!";

      setAlert({
        isVisible: true,
        message: errorMessage,
        type: "error",
      });
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
        <Alert
          isVisible={alert.isVisible}
          message={alert.message}
          type={alert.type}
          onClose={() => setAlert({ ...alert, isVisible: false })}
        />
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">
            Maliyet Merkezi Bilgileri
          </h1>
          <div className="flex space-x-4">
            <Link to="/HomePage">
              <button className="bg-gray-600 hover:bg-gray-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-300 flex items-center">
                <FontAwesomeIcon icon={faHome} className="mr-2" />
                Ana Sayfa
              </button>
            </Link>
            <Link to="/maliyet-merkezi-olustur">
              <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-300 flex items-center">
                <FontAwesomeIcon icon={faPlus} className="mr-2" />
                Yeni Maliyet Merkezi Oluştur
              </button>
            </Link>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table ref={tableRef} className="w-full border-collapse">
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

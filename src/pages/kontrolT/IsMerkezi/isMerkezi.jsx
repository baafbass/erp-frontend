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
import IsMerkeziSilme from "./components/isMerkeziSilme";
import Alert from "../../../component/alert";

const IsMerkeziPage = () => {
  const [centers, setCenters] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedCenter, setSelectedCenter] = useState({});
  const tableRef = useRef(null);
  const dataTableRef = useRef(null);
  const [alert, setAlert] = useState({
    isVisible: false,
    message: "",
    type: "error",
  });

  const axios = useAxios();
  const navigate = useNavigate();

  const getAllIsMerkezi = async () => {
    try {
      const response = await axios.get("/is-merkezi");
      console.log(response);
      if (response.data.status === "OK") {
        setCenters(response.data.isMerkezleri);
      }
    } catch (error) {
      console.log("Error", error.message);
    }
  };

  useEffect(() => {
    getAllIsMerkezi();
  }, []);

  useEffect(() => {
    const initializeDataTable = () => {
      if (tableRef.current && !dataTableRef.current && centers.length >= 0) {
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
  }, [centers]);

  const handleEdit = (is_merkezi, firma_kodu) => {
    navigate(`/isMerkezi-guncelle/${is_merkezi}/${firma_kodu}`);
  };

  const handleDelete = async () => {
    try {
      const { is_merkezi, firma_kodu } = selectedCenter;
      const response = await axios.delete(
        `/is-merkezi/${is_merkezi}/${firma_kodu}`
      );
      if (response.data.status === "OK") {
        if (dataTableRef.current) {
          dataTableRef.current.destroy();
          dataTableRef.current = null;
        }
        setCenters((prevcenters) =>
          prevcenters.filter(
            (center) =>
              center.DOCTYPE !== is_merkezi || center.COMCODE !== firma_kodu
          )
        );
      }
    } catch (error) {
      let errorMessage =
        "İş Merkezine bağlı veriler var, önce onları kaldırın !!";

      setAlert({
        isVisible: true,
        message: errorMessage,
        type: "error",
      });
    } finally {
      setOpenDialog(false);
    }
  };

  const handleOpenDialog = (is_merkezi, firma_kodu) => {
    setSelectedCenter({ is_merkezi, firma_kodu });
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedCenter(null);
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
            İş Merkezi Bilgileri
          </h1>
          <div className="flex space-x-4">
            <Link to="/HomePage">
              <button className="bg-gray-600 hover:bg-gray-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-300 flex items-center">
                <FontAwesomeIcon icon={faHome} className="mr-2" />
                Ana Sayfa
              </button>
            </Link>
            <Link to="/isMerkezi-olustur">
              <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-300 flex items-center">
                <FontAwesomeIcon icon={faPlus} className="mr-2" />
                Yeni İş Merkezi Oluştur
              </button>
            </Link>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table ref={tableRef} className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-200">
                <th className="px-4 py-2 text-left">Firma Kodu</th>
                <th className="px-4 py-2 text-left">İş Merkezi Tipi</th>
                <th className="px-4 py-2 text-left">
                  İş Merkezi Tipi Açıklaması
                </th>
                <th className="px-4 py-2 text-left">Pasif Mi?</th>
                <th className="px-4 py-2 text-center">İşlemler</th>
              </tr>
            </thead>
            <tbody>
              {centers.map((center, index) => (
                <tr key={index} className="border-b">
                  <td className="px-4 py-2">{center.COMCODE}</td>
                  <td className="px-4 py-2">{center.DOCTYPE}</td>
                  <td className="px-4 py-2">{center.DOCTYPETEXT}</td>
                  <td className="px-4 py-2">{center.ISPASSIVE}</td>
                  <td className="px-4 py-2 flex justify-center space-x-2">
                    <button
                      onClick={() => handleEdit(center.DOCTYPE, center.COMCODE)}
                      className="bg-blue-500 hover:bg-blue-700 text-white font-medium py-1 px-2 rounded-lg transition-colors duration-300 flex items-center"
                    >
                      <FontAwesomeIcon icon={faEdit} className="mr-1" />
                      Düzenle
                    </button>

                    <button
                      onClick={() =>
                        handleOpenDialog(center.DOCTYPE, center.COMCODE)
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
      <IsMerkeziSilme
        openDialog={openDialog}
        handleCloseDialog={handleCloseDialog}
        handleDelete={handleDelete}
      />
    </div>
  );
};

export default IsMerkeziPage;

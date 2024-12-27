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
import DilSilme from "./components/dilSilme";

const DilPage = () => {
  const [languages, setLanguages] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState({});
  const tableRef = useRef(null);
  const dataTableRef = useRef(null);

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

  useEffect(() => {
    const initializeDataTable = () => {
      if (tableRef.current && !dataTableRef.current && languages.length >= 0) {
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
  }, [languages]);

  const handleEdit = (dil_kodu, firma_kodu) => {
    navigate(`/dil-guncelle/${dil_kodu}/${firma_kodu}`);
  };

  const handleDelete = async () => {
    try {
      const { dil_kodu, firma_kodu } = selectedLanguage;

      const response = await axios.delete(`/dil/${dil_kodu}/${firma_kodu}`);
      if (response.data.status === "OK") {
        if (dataTableRef.current) {
          dataTableRef.current.destroy();
          dataTableRef.current = null;
        }
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
            <Link to="/HomePage">
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
          <table ref={tableRef} className="w-full border-collapse">
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

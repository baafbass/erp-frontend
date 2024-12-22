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
import firmaSilme from "./components/firmaSilme";

const FirmaPage = () => {
  const [companies, setCompanies] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState({});
  const tableRef = useRef(null);
  const dataTableRef = useRef(null);

  const axios = useAxios();
  const navigate = useNavigate();

  const getAllFirma = async () => {
    try {
      const response = await axios.get("/firmalar");
      if (response.data.status === "OK") {
        setCompanies(response.data.firmalar);
      }
    } catch (error) {
      console.log("Error", error.message);
    }
  };

  useEffect(() => {
    getAllFirma();
  }, []);

  const handleEdit = (firma_kodu) => {
    navigate(`/firma-guncelle/${firma_kodu}`);
  };

  const handleDelete = async () => {
    try {
      const { firma_kodu } = selectedCompany;

      const response = await axios.delete(`/firmalar/${firma_kodu}`);
      if (response.data.status === "OK") {
        setCompanies((prevCompanies) =>
          prevCompanies.filter((company) => company.COMCODE !== firma_kodu)
        );
      }
    } catch (error) {
      console.error("Error Deleting Company", error.message);
    } finally {
      setOpenDialog(false);
    }
  };

  const handleOpenDialog = (firma_kodu) => {
    setSelectedCompany({ firma_kodu });
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedCompany(null);
  };

  useEffect(() => {
    const initializeDataTable = () => {
      if (tableRef.current && !dataTableRef.current && companies.length > 0) {
        try {
          dataTableRef.current = window.$(tableRef.current).DataTable({
            language: {
              url: "//cdn.datatables.net/plug-ins/1.13.3/i18n/tr.json",
            },
            responsive: true,
            pageLength: 10,
            dom: "Bfrtip",
            buttons: ["copy", "excel", "pdf", "print"],
          });
        } catch (error) {
          console.error("Error initializing DataTable:", error);
        }
      }
    };

    const timeoutId = setTimeout(initializeDataTable, 100);

    return () => {
      clearTimeout(timeoutId);
      if (dataTableRef.current) {
        try {
          const table = dataTableRef.current;
          if (table.destroy && typeof table.destroy === "function") {
            table.destroy();
          }
          dataTableRef.current = null;
        } catch (error) {
          console.error("Error destroying DataTable:", error);
        }
      }
    };
  }, [companies]);

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-start pt-8">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-6xl">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Firma Bilgileri</h1>
          <div className="flex space-x-4">
            <Link to="/">
              <button className="bg-gray-600 hover:bg-gray-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-300 flex items-center">
                <FontAwesomeIcon icon={faHome} className="mr-2" />
                Ana Sayfa
              </button>
            </Link>
            <Link to="/firma-olustur">
              <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-300 flex items-center">
                <FontAwesomeIcon icon={faPlus} className="mr-2" />
                Yeni Firma Oluştur
              </button>
            </Link>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table ref={tableRef} className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-200">
                <th className="px-4 py-2 text-left">Firma Kodu</th>
                <th className="px-4 py-2 text-left">Firma Adı</th>
                <th className="px-4 py-2 text-left">Adres 1</th>
                <th className="px-4 py-2 text-left">Adres 2</th>
                <th className="px-4 py-2 text-left">Şehir</th>
                <th className="px-4 py-2 text-left">Ülke</th>
                <th className="px-4 py-2 text-center">İşlemler</th>
              </tr>
            </thead>
            <tbody>
              {companies.map((company) => (
                <tr key={company.COMCODE} className="border-b">
                  <td className="px-4 py-2">{company.COMCODE}</td>
                  <td className="px-4 py-2 font-medium">{company.COMTEXT}</td>
                  <td className="px-4 py-2">{company.ADDRESS1}</td>
                  <td className="px-4 py-2">{company.ADDRESS2}</td>
                  <td className="px-4 py-2">{company.CITYCODE}</td>
                  <td className="px-4 py-2">{company.COUNTRYCODE}</td>
                  <td className="px-4 py-2 flex justify-center space-x-2">
                    <button
                      className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
                      onClick={() => handleEdit(company.COMCODE)}
                    >
                      <FontAwesomeIcon icon={faEdit} className="mr-1" />
                      Düzenle
                    </button>
                    <button
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                      onClick={() => handleOpenDialog(company.COMCODE)}
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
      <firmaSilme
        openDialog={openDialog}
        handleCloseDialog={handleCloseDialog}
        handleDelete={handleDelete}
      />
    </div>
  );
};

export default FirmaPage;

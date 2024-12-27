import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faTrash,
  faPlus,
  faHome,
  faInfoCircle,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { useAxios } from "../../shared/hooks/axios-hook";
import IsMerkezleriSilme from "./components/IsMerkezleriSilme";

const IsMerkezleriPage = () => {

  const [costcenters, setCostCenters] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedCostCenter, setselectedCostCenter] = useState();
  const tableRef = useRef(null);
  const dataTableRef = useRef(null);

  const axios = useAxios();
  const navigate = useNavigate();

  const getAllIsMerkezleri = async () => {
    try {
      const response = await axios.get("/is-merkezleri");
      if (response.data.status === "OK") {
        setCostCenters(response.data.isMerkezleri);
      }
    } catch (error) {
      console.log("Error", error.message);
    }
  };

  useEffect(() => {
    getAllIsMerkezleri();
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
                title: "Rota Listesi",
                className:
                  "bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mx-1",
              },
              {
                extend: "pdf",
                text: "PDF",
                title: "Rota Listesi",
                className:
                  "bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mx-1",
              },
              {
                extend: "print",
                text: "Yazdır",
                title: "Rota Listesi",
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

  const handleEdit = (
    firma_kodu,
    is_merk_tipi,
    is_merk_kodu,
    gecerlilik_bas,
    gecerlilik_bit,
    dil_kodu,
    opr_kodu
  ) => {
    navigate(
      `/IsMerkezleri-guncelle/${is_merk_tipi}/${firma_kodu}/${is_merk_kodu}/${gecerlilik_bas}/${gecerlilik_bit}/${dil_kodu}/${opr_kodu}`
    );
  };

  const handleDelete = async () => {
    try {
      const {
        is_merk_tipi,
        firma_kodu,
        is_merk_kodu,
        gecerlilik_bas,
        gecerlilik_bit,
        dil_kodu,
        opr_kodu,
      } = selectedCostCenter;

      const response = await axios.delete(
        `/is-merkezleri/${is_merk_tipi}/${firma_kodu}/${is_merk_kodu}/${gecerlilik_bas}/${gecerlilik_bit}/${dil_kodu}/${opr_kodu}`
      );
      if (response.data.status === "OK") {
        if (dataTableRef.current) {
          dataTableRef.current.destroy();
          dataTableRef.current = null;
        }
        setCostCenters((prevcostcenters) =>
          prevcostcenters.filter(
            (costcenter) =>
              costcenter.WCMDOCTYPE !== is_merk_tipi ||
              costcenter.COMCODE !== firma_kodu ||
              costcenter.WCMDOCNUM !== is_merk_kodu ||
              costcenter.WCMDOCFROM !== gecerlilik_bas ||
              costcenter.WCMDOCUNTIL !== gecerlilik_bit ||
              costcenter.LANCODE !== dil_kodu ||
              costcenter.OPRDOCTYPE !== opr_kodu
          )
        );
      }
    } catch (error) {
      console.error("Error Deleting Cost Center", error.message);
    } finally {
      setOpenDialog(false);
    }
  };

  const handleOpenDialog = (
    is_merk_tipi,
    firma_kodu,
    is_merk_kodu,
    gecerlilik_bas,
    gecerlilik_bit,
    dil_kodu,
    opr_kodu
  ) => {
    setselectedCostCenter({
      is_merk_tipi,
      firma_kodu,
      is_merk_kodu,
      gecerlilik_bas,
      gecerlilik_bit,
      dil_kodu,
      opr_kodu,
    });
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setselectedCostCenter(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-start pt-8">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-6xl">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">İş Merkezleri</h1>
          <div className="flex space-x-4">
            <Link to="/HomePage">
              <button className="bg-gray-600 hover:bg-gray-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-300 flex items-center">
                <FontAwesomeIcon icon={faHome} className="mr-2" />
                Ana Sayfa
              </button>
            </Link>
            <Link to="/IsMerkezleri-olustur">
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
                <th className="px-4 py-2 text-left">İş Merkezi Kodu</th>
                <th className="px-4 py-2 text-left">Geçerlilik Başlangıç</th>
                <th className="px-4 py-2 text-left">Geçerlilik Bitiş</th>
                <th className="px-4 py-2 text-left">Dil Kodu</th>
                <th className="px-4 py-2 text-left">Silindi mi?</th>
                <th className="px-4 py-2 text-left">Passif mi?</th>
                <th className="px-4 py-2 text-left">Operasyon Kodu</th>
                <th className="px-4 py-2 text-center">İşlemler</th>
              </tr>
            </thead>
            <tbody>
              {costcenters.map((costcenter, index) => (
                <tr key={index} className="border-b">
                  <td className="px-4 py-2">{costcenter.COMCODE}</td>
                  <td className="px-4 py-2">{costcenter.WCMDOCTYPE}</td>
                  <td className="px-4 py-2">{costcenter.WCMDOCNUM}</td>
                  <td className="px-4 py-2">{costcenter.WCMDOCFROM}</td>
                  <td className="px-4 py-2">{costcenter.WCMDOCUNTIL}</td>
                  <td className="px-4 py-2">{costcenter.LANCODE}</td>
                  <td className="px-4 py-2">{costcenter.ISDELETED}</td>
                  <td className="px-4 py-2">{costcenter.ISPASSIVE}</td>
                  <td className="px-4 py-2">{costcenter.OPRDOCTYPE}</td>
                  <td className="px-4 py-2 flex justify-center items-center space-x-2">
                    <button
                      onClick={() =>
                        handleEdit(
                          costcenter.COMCODE,
                          costcenter.WCMDOCTYPE,
                          costcenter.WCMDOCNUM,
                          costcenter.WCMDOCFROM,
                          costcenter.WCMDOCUNTIL,
                          costcenter.LANCODE,
                          costcenter.OPRDOCTYPE
                        )
                      }
                      className="bg-blue-500 hover:bg-blue-700 text-white font-medium py-1 px-2 rounded-lg transition-colors duration-300 flex items-center"
                    >
                      <FontAwesomeIcon icon={faEdit} className="mr-1" />
                    </button>

                    <button
                      onClick={() =>
                        handleOpenDialog(
                          costcenter.COMCODE,
                          costcenter.WCMDOCTYPE,
                          costcenter.WCMDOCNUM,
                          costcenter.WCMDOCFROM,
                          costcenter.WCMDOCUNTIL,
                          costcenter.LANCODE,
                          costcenter.OPRDOCTYPE
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
      <IsMerkezleriSilme
        openDialog={openDialog}
        handleCloseDialog={handleCloseDialog}
        handleDelete={handleDelete}
      />
    </div>
  );
};

export default IsMerkezleriPage;

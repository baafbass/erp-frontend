import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faTrash,
  faPlus,
  faHome,
} from "@fortawesome/free-solid-svg-icons";
import { useAxios } from "../../shared/hooks/axios-hook";
import RotalarSilme from "./components/RotalarSilme";

const RotalarPage = () => {
  const [routes, setRoutes] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedRoute, setSelectedRoute] = useState();
  const tableRef = useRef(null);
  const dataTableRef = useRef(null);

  const axios = useAxios();
  const navigate = useNavigate();

  const getAllRotalar = async () => {
    try {
      const response = await axios.get("/rotalar");
      if (response.data.status === "OK") {
        setRoutes(response.data.rotalar);
      }
    } catch (error) {
      console.log("Error", error.message);
    }
  };

  useEffect(() => {
    getAllRotalar();
  }, []);

  useEffect(() => {
    const initializeDataTable = () => {
      if (tableRef.current && !dataTableRef.current && routes.length >= 0) {
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
  }, [routes]);

  const handleEdit = (
    firma_kodu,
    urun_agaci_tipi,
    urun_agaci_kodu,
    gecerlilik_bas,
    gecerlilik_bit,
    malzeme_tipi,
    malzeme_kodu,
    rota_tipi,
    rota_numarasi,
    opr_numarasi,
    icerik_numarasi
  ) => {
    navigate(
      `/Rotalar-guncelle/${firma_kodu}/${urun_agaci_tipi}/${urun_agaci_kodu}/${gecerlilik_bas}/${gecerlilik_bit}/${malzeme_tipi}/${malzeme_kodu}/${rota_tipi}/${rota_numarasi}/${opr_numarasi}/${icerik_numarasi}`
    );
  };

  const handleDelete = async () => {
    try {
      const {
        firma_kodu,
        urun_agaci_tipi,
        urun_agaci_kodu,
        gecerlilik_bas,
        gecerlilik_bit,
        malzeme_tipi,
        malzeme_kodu,
        rota_tipi,
        rota_numarasi,
        opr_numarasi,
        icerik_numarasi
      } = selectedRoute;

      const response = await axios.delete(
        `/rotalar/${firma_kodu}/${urun_agaci_tipi}/${urun_agaci_kodu}/${gecerlilik_bas}/${gecerlilik_bit}/${malzeme_tipi}/${malzeme_kodu}/${rota_tipi}/${rota_numarasi}/${opr_numarasi}/${icerik_numarasi}`
      );

      if (response.data.status === "OK") {
        if (dataTableRef.current) {
          dataTableRef.current.destroy();
          dataTableRef.current = null;
        }

        setRoutes((prevRoutes) =>
          prevRoutes.filter(
            (route) =>
              route.COMCODE !== firma_kodu ||
              route.BOMDOCTYPE !== urun_agaci_tipi ||
              route.BOMDOCNUM !== urun_agaci_kodu ||
              route.ROTDOCFROM !== gecerlilik_bas ||
              route.ROTDOCUNTIL !== gecerlilik_bit ||
              route.MATDOCTYPE !== malzeme_tipi ||
              route.MATDOCNUM !== malzeme_kodu ||
              route.ROTDOCTYPE !== rota_tipi ||
              route.ROTDOCNUM !== rota_numarasi ||
              route.OPRNUM !== opr_numarasi ||
              route.CONTENTNUM !== icerik_numarasi
          )
        );
      }
    } catch (error) {
      console.error("Error Deleting Route", error.message);
    } finally {
      setOpenDialog(false);
    }
  };

  const handleOpenDialog = (
    firma_kodu,
    urun_agaci_tipi,
    urun_agaci_kodu,
    gecerlilik_bas,
    gecerlilik_bit,
    malzeme_tipi,
    malzeme_kodu,
    rota_tipi,
    rota_numarasi,
    opr_numarasi,
    icerik_numarasi
  ) => {
    setSelectedRoute({
      firma_kodu,
      urun_agaci_tipi,
      urun_agaci_kodu,
      gecerlilik_bas,
      gecerlilik_bit,
      malzeme_tipi,
      malzeme_kodu,
      rota_tipi,
      rota_numarasi,
      opr_numarasi,
      icerik_numarasi
    });
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedRoute(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-start pt-8">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-6xl">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Rotalar</h1>
          <div className="flex space-x-4">
            <Link to="/HomePage">
              <button className="bg-gray-600 hover:bg-gray-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-300 flex items-center">
                <FontAwesomeIcon icon={faHome} className="mr-2" />
                Ana Sayfa
              </button>
            </Link>
            <Link to="/Rotalar-olustur">
              <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-300 flex items-center">
                <FontAwesomeIcon icon={faPlus} className="mr-2" />
                Yeni Rota Oluştur
              </button>
            </Link>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table ref={tableRef} className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-200">
                <th className="px-4 py-2 text-left">Firma Kodu</th>
                <th className="px-4 py-2 text-left">Rota Tipi</th>
                <th className="px-4 py-2 text-left">Rota Numarası</th>
                <th className="px-4 py-2 text-left">Geçerlilik Başlangıç</th>
                <th className="px-4 py-2 text-left">Geçerlilik Bitiş</th>
                <th className="px-4 py-2 text-left">Malzeme Tipi</th>
                <th className="px-4 py-2 text-left">Malzeme Kodu</th>
                <th className="px-4 py-2 text-left">Operasyon Numarası</th>
                <th className="px-4 py-2 text-left">Bileşen Kodu</th>
                <th className="px-4 py-2 text-left">İş Merkezi Kodu</th>
                <th className="px-4 py-2 center">İşlemler</th>
              </tr>
            </thead>
            <tbody>
              {routes.map((route, index) => (
                <tr key={index} className="border-b">
                  <td className="px-4 py-2">{route.COMCODE}</td>
                  <td className="px-4 py-2">{route.ROTDOCTYPE}</td>
                  <td className="px-4 py-2">{route.BOMDOCNUM}</td>
                  <td className="px-4 py-2">{route.ROTDOCFROM}</td>
                  <td className="px-4 py-2">{route.ROTDOCUNTIL}</td>
                  <td className="px-4 py-2">{route.MATDOCTYPE}</td>
                  <td className="px-4 py-2">{route.MATDOCNUM}</td>
                  <td className="px-4 py-2">{route.OPRNUM}</td>
                  <td className="px-4 py-2">{route.COMPONENT}</td>
                  <td className="px-4 py-2">{route.WCMDOCNUM}</td>
                  <td className="px-4 py-2 flex justify-center space-x-2">
                    <button
                      onClick={() =>
                        handleEdit(
                          route.COMCODE,
                          route.BOMDOCTYPE,
                          route.BOMDOCNUM,
                          route.ROTDOCFROM,
                          route.ROTDOCUNTIL,
                          route.MATDOCTYPE,
                          route.MATDOCNUM,
                          route.ROTDOCTYPE,
                          route.ROTDOCNUM,
                          route.OPRNUM,
                          route.CONTENTNUM
                        )
                      }
                      className="bg-blue-500 hover:bg-blue-700 text-white font-medium py-1 px-2 rounded-lg transition-colors duration-300 flex items-center"
                    >
                      <FontAwesomeIcon icon={faEdit} className="mr-1" />
                    </button>
                    <button
                      onClick={() =>
                        handleOpenDialog(
                          route.COMCODE,
                          route.BOMDOCTYPE,
                          route.BOMDOCNUM,
                          route.ROTDOCFROM,
                          route.ROTDOCUNTIL,
                          route.MATDOCTYPE,
                          route.MATDOCNUM,
                          route.ROTDOCTYPE,
                          route.ROTDOCNUM,
                          route.OPRNUM,
                          route.CONTENTNUM
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
      <RotalarSilme
        openDialog={openDialog}
        handleCloseDialog={handleCloseDialog}
        handleDelete={handleDelete}
      />
    </div>
  );
};

export default RotalarPage;

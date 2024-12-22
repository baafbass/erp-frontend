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
import UrunAgaclariSilme from "./components/UrunAgaclariSilme";

const UrunAgaclariPage = () => {
  const [productTrees, setProductTrees] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedProductTree, setSelectedProductTree] = useState();
  const tableRef = useRef(null);
  const dataTableRef = useRef(null);

  const axios = useAxios();
  const navigate = useNavigate();

  const getAllUrunAgaclari = async () => {
    try {
      const response = await axios.get("/UrunAgaclari");
      if (response.data.status === "OK") {
        setProductTrees(response.data.urunAgaclari);
      }
    } catch (error) {
      console.log("Error", error.message);
    }
  };

  useEffect(() => {
    getAllUrunAgaclari();
  }, []);

  useEffect(() => {
    const initializeDataTable = () => {
      if (
        tableRef.current &&
        !dataTableRef.current &&
        productTrees.length >= 0
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
  }, [productTrees]);

  const handleEdit = (
    firma_kodu,
    urun_agaci_tipi,
    urun_agaci_kodu,
    gecerlilik_bas,
    gecerlilik_bit,
    malzeme_tipi,
    malzeme_kodu,
    icerik_numarasi
  ) => {
    navigate(
      `/UrunAgaclari-guncelle/${firma_kodu}/${urun_agaci_tipi}/${urun_agaci_kodu}/${gecerlilik_bas}/${gecerlilik_bit}/${malzeme_tipi}/${malzeme_kodu}/${icerik_numarasi}`
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
        icerik_numarasi,
      } = selectedProductTree;

      const response = await axios.delete(
        `/UrunAgaclari/${firma_kodu}/${urun_agaci_tipi}/${urun_agaci_kodu}/${gecerlilik_bas}/${gecerlilik_bit}/${malzeme_tipi}/${malzeme_kodu}/${icerik_numarasi}`
      );

      if (response.data.status === "OK") {
        if (dataTableRef.current) {
          dataTableRef.current.destroy();
          dataTableRef.current = null;
        }

        setProductTrees((prevProductTrees) =>
          prevProductTrees.filter(
            (tree) =>
              tree.COMCODE !== firma_kodu ||
              tree.BOMDOCTYPE !== urun_agaci_tipi ||
              tree.BOMDOCNUM !== urun_agaci_kodu ||
              tree.BOMDOCFROM !== gecerlilik_bas ||
              tree.BOMDOCUNTIL !== gecerlilik_bit ||
              tree.MATDOCTYPE !== malzeme_tipi ||
              tree.MATDOCNUM !== malzeme_kodu ||
              tree.QUANTITY !== icerik_numarasi
          )
        );
      }
    } catch (error) {
      console.error("Error Deleting Product Tree", error.message);
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
    icerik_numarasi
  ) => {
    setSelectedProductTree({
      firma_kodu,
      urun_agaci_tipi,
      urun_agaci_kodu,
      gecerlilik_bas,
      gecerlilik_bit,
      malzeme_tipi,
      malzeme_kodu,
      icerik_numarasi,
    });
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedProductTree(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-start pt-8">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-6xl">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Ürün Ağaçları</h1>
          <div className="flex space-x-4">
            <Link to="/">
              <button className="bg-gray-600 hover:bg-gray-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-300 flex items-center">
                <FontAwesomeIcon icon={faHome} className="mr-2" />
                Ana Sayfa
              </button>
            </Link>
            <Link to="/UrunAgaclari-olustur">
              <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-300 flex items-center">
                <FontAwesomeIcon icon={faPlus} className="mr-2" />
                Yeni Ürün Ağacı Oluştur
              </button>
            </Link>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table ref={tableRef} className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-200">
                <th className="px-4 py-2 text-left">Firma Kodu</th>
                <th className="px-4 py-2 text-left">Ürün Ağacı Tipi</th>
                <th className="px-4 py-2 text-left">Ürün Ağacı Kodu</th>
                <th className="px-4 py-2 text-left">Geçerlilik Başlangıç</th>
                <th className="px-4 py-2 text-left">Geçerlilik Bitiş</th>
                <th className="px-4 py-2 text-left">Malzeme Tipi</th>
                <th className="px-4 py-2 text-left">Malzeme Kodu</th>
                <th className="px-4 py-2 text-left">Temel Miktar</th>
                <th className="px-4 py-2 text-left">Silindi?</th>
                <th className="px-4 py-2 text-left">Pasif mi?</th>
                {/* <th className="px-4 py-2 text-left">Çizim Numarası</th>
                <th className="px-4 py-2 text-left">İçerik Numarası</th>
                <th className="px-4 py-2 text-left">Bileşen Kodu</th>
                <th className="px-4 py-2 text-left">Kalem Ürün Ağacı Tipi</th>
                <th className="px-4 py-2 text-left">Kalem Ürün Ağacı Kodu</th>
                <th className="px-4 py-2 text-left">Bileşen Miktarı</th> */}
                <th className="px-4 py-2 text-center">İşlemler</th>
              </tr>
            </thead>
            <tbody>
              {productTrees.map((tree, index) => (
                <tr key={index} className="border-b">
                  <td className="px-4 py-2">{tree.COMCODE}</td>
                  <td className="px-4 py-2">{tree.BOMDOCTYPE}</td>
                  <td className="px-4 py-2">{tree.BOMDOCNUM}</td>
                  <td className="px-4 py-2">{tree.BOMDOCFROM}</td>
                  <td className="px-4 py-2">{tree.BOMDOCUNTIL}</td>
                  <td className="px-4 py-2">{tree.MATDOCTYPE}</td>
                  <td className="px-4 py-2">{tree.MATDOCNUM}</td>
                  <td className="px-4 py-2">{tree.QUANTITY}</td>
                  <td className="px-4 py-2">{tree.ISDELETED}</td>
                  <td className="px-4 py-2">{tree.ISPASSIVE}</td>
                  {/* <td className="px-4 py-2">{tree.DRAWNUM}</td>
                  <td className="px-4 py-2">{tree.CONTENTNUM}</td>
                  <td className="px-4 py-2">{tree.COMPONENT}</td>
                  <td className="px-4 py-2">{tree.COMPBOMDOCTYPE}</td>
                  <td className="px-4 py-2">{tree.COMPBOMDOCNUM}</td>
                  <td className="px-4 py-2">{tree.QUANTITY}</td> */}
                  <td className="px-4 py-2 flex justify-center space-x-2">
                    <button
                      onClick={() =>
                        handleEdit(
                          tree.COMCODE,
                          tree.BOMDOCTYPE,
                          tree.BOMDOCNUM,
                          tree.BOMDOCFROM,
                          tree.BOMDOCUNTIL,
                          tree.MATDOCTYPE,
                          tree.MATDOCNUM,
                          tree.QUANTITY
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
                          tree.COMCODE,
                          tree.BOMDOCTYPE,
                          tree.BOMDOCNUM,
                          tree.BOMDOCFROM,
                          tree.BOMDOCUNTIL,
                          tree.MATDOCTYPE,
                          tree.MATDOCNUM,
                          tree.QUANTITY
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
      <UrunAgaclariSilme
        openDialog={openDialog}
        handleCloseDialog={handleCloseDialog}
        handleDelete={handleDelete}
      />
    </div>
  );
};

export default UrunAgaclariPage;

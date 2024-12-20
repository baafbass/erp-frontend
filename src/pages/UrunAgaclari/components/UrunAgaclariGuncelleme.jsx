import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useAxios } from "../../../shared/hooks/axios-hook";
import { Card, CardHeader, CardContent } from "@mui/material";
import "../../FormStyles.css";

const urunAgaciFields = {
  firma_kodu: "",
  urun_agaci_tipi: "",
  urun_agaci_kodu: "",
  gecerlilik_bas: "",
  gecerlilik_bit: "",
  malzeme_tipi: "",
  malzeme_kodu: "",
  temel_miktar: "",
  silindi_mi: "0",
  passif_mi: "0",
  cizim_numarasi: "",
  icerik_numarasi: "",
  bilesen_kodu: "",
  kalem_urun_agaci_tipi: "",
  kalem_urun_agaci_kodu: "",
  bilesen_miktari: "",
};

const UrunAgacilariGuncelle = () => {
  const {
    firma_kodu,
    urun_agaci_tipi,
    urun_agaci_kodu,
    gecerlilik_bas,
    gecerlilik_bit,
    malzeme_tipi,
    malzeme_kodu,
    icerik_numarasi,
  } = useParams();

  const [productTreeData, setProductTrees] = useState(urunAgaciFields);
  const {
    temel_miktar,
    silindi_mi,
    passif_mi,
    cizim_numarasi,
    bilesen_kodu,
    kalem_urun_agaci_tipi,
    kalem_urun_agaci_kodu,
    bilesen_miktari,
  } = productTreeData;

  const axios = useAxios();
  const navigate = useNavigate();

  const getAllUrunAgaclari = async () => {
    try {
      const response = await axios.get(
        `/urun_agaci/${firma_kodu}/${urun_agaci_tipi}/${urun_agaci_kodu}/${gecerlilik_bas}/${gecerlilik_bit}/${malzeme_tipi}/${malzeme_kodu}/${icerik_numarasi}`
      );
      if (response.data.status === "OK") {
        const urunInfo = response.data.urunAgaclari;
        setProductTrees({
          firma_kodu: urunInfo.COMCODE,
          urun_agaci_tipi: urunInfo.BOMDOCTYPE,
          urun_agaci_kodu: urunInfo.BOMDOCNUM,
          gecerlilik_bas: urunInfo.MATDOCFROM,
          gecerlilik_bit: urunInfo.MATDOCUNTIL,
          malzeme_tipi: urunInfo.MATDOCTYPE,
          malzeme_kodu: urunInfo.MATDOCNUM,
          temel_miktar: urunInfo.QUANTITY,
          silindi_mi: urunInfo.ISDELETED,
          passif_mi: urunInfo.ISPASSIVE,
          cizim_numarasi: urunInfo.DRAWNUM,
          icerik_numarasi: urunInfo.CONTENTNUM,
          bilesen_kodu: urunInfo.COMPONENT,
          kalem_urun_agaci_tipi: urunInfo.COMPBOMDOCTYPE,
          kalem_urun_agaci_kodu: urunInfo.COMPBOMDOCNUM,
          bilesen_miktari: urunInfo.QUANTITY,
        });
      }
    } catch (error) {
      console.log("Error", error.message);
    }
  };

  useEffect(() => {
    getAllUrunAgaclari();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProductTrees((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? (checked ? "1" : "0") : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put("/urun_agaci", productTreeData);
      if (response.data.status === "OK") {
        navigate("/UrunAgaclari");
      }
    } catch (error) {
      console.log("message:", error);
    }
  };

  return (
    <Card sx={{ boxShadow: 3, borderRadius: 2, padding: 2 }}>
      <CardHeader
        title="BOM Formu"
        titleTypographyProps={{
          fontSize: "1.5rem",
          fontWeight: "bold",
          sx: { textAlign: "center" },
        }}
      />
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-3 gap-6">
            {/* Firma Kodu */}
            <div className="form-group">
              <label htmlFor="firma_kodu" className="form-label">
                Firma Kodu
              </label>
              <input
                type="text"
                id="firma_kodu"
                name="firma_kodu"
                value={firma_kodu}
                onChange={handleChange}
                className="form-input bg-gray-100"
                readOnly
                required
                maxLength={4}
                placeholder="Firma kodunu girin"
              />
            </div>

            {/* Ürün Ağacı Tipi */}
            <div className="form-group">
              <label htmlFor="urun_agaci_tipi" className="form-label">
                Ürün Ağacı Tipi
              </label>
              <input
                type="text"
                id="urun_agaci_tipi"
                name="urun_agaci_tipi"
                value={urun_agaci_tipi}
                onChange={handleChange}
                className="form-input"
                maxLength={4}
                placeholder="BOM Tipi girin"
              />
            </div>

            {/* Ürün Ağacı Kodu */}
            <div className="form-group">
              <label htmlFor="urun_agaci_kodu" className="form-label">
                Ürün Ağacı Kodu
              </label>
              <input
                type="text"
                id="urun_agaci_kodu"
                name="urun_agaci_kodu"
                value={urun_agaci_kodu}
                onChange={handleChange}
                className="form-input"
                maxLength={25}
                placeholder="BOM Kodu girin"
              />
            </div>

            {/* Geçerlilik Başlangıç */}
            <div className="form-group">
              <label htmlFor="gecerlilik_bas" className="form-label">
                Geçerlilik Başlangıç
              </label>
              <input
                type="date"
                id="gecerlilik_bas"
                name="gecerlilik_bas"
                value={gecerlilik_bas}
                onChange={handleChange}
                className="form-input bg-gray-100"
                readOnly
                required
              />
            </div>
            {/* Geçerlilik Bitiş */}
            <div className="form-group">
              <label htmlFor="gecerlilik_bit" className="form-label">
                Geçerlilik Bitiş
              </label>
              <input
                type="date"
                id="gecerlilik_bit"
                name="gecerlilik_bit"
                value={gecerlilik_bit}
                onChange={handleChange}
                className="form-input bg-gray-100"
                readOnly
                required
              />
            </div>

            {/* Malzeme Tipi */}
            <div className="form-group">
              <label htmlFor="malzeme_tipi" className="form-label">
                Malzeme Tipi
              </label>
              <input
                type="text"
                id="malzeme_tipi"
                name="malzeme_tipi"
                value={malzeme_tipi}
                onChange={handleChange}
                className="form-input bg-gray-100"
                readOnly
                required
                maxLength={4}
                placeholder="Malzeme tipini girin"
              />
            </div>

            {/* Malzeme Kodu */}
            <div className="form-group">
              <label htmlFor="malzeme_kodu" className="form-label">
                Malzeme Kodu
              </label>
              <input
                type="text"
                id="malzeme_kodu"
                name="malzeme_kodu"
                value={malzeme_kodu}
                onChange={handleChange}
                className="form-input bg-gray-100"
                readOnly
                required
                maxLength={25}
                placeholder="Malzeme kodu girin"
              />
            </div>

            {/* Temel Miktar */}
            <div className="form-group">
              <label htmlFor="temel_miktar" className="form-label">
                Temel Miktar
              </label>
              <input
                type="number"
                id="temel_miktar"
                name="temel_miktar"
                value={temel_miktar}
                onChange={handleChange}
                className="form-input"
                step="0.001"
                required
                placeholder="Temel miktarı girin"
              />
            </div>

            {/* Silindi Mi */}
            <div className="form-group">
              <label className="form-label">Silindi Mi?</label>
              <div className="flex items-center space-x-4">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="silindi_mi"
                    value="0"
                    checked={silindi_mi === "0"}
                    onChange={handleChange}
                    className="form-radio"
                  />
                  <span className="ml-2">Hayır</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="silindi_mi"
                    value="1"
                    checked={silindi_mi === "1"}
                    onChange={handleChange}
                    className="form-radio"
                  />
                  <span className="ml-2">Evet</span>
                </label>
              </div>
            </div>

            {/* Passif Mi */}
            <div className="form-group">
              <label className="form-label">Passif Mi?</label>
              <div className="flex items-center space-x-4">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="passif_mi"
                    value="0"
                    checked={passif_mi === "0"}
                    onChange={handleChange}
                    className="form-radio"
                  />
                  <span className="ml-2">Hayır</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="passif_mi"
                    value="1"
                    checked={passif_mi === "1"}
                    onChange={handleChange}
                    className="form-radio"
                  />
                  <span className="ml-2">Evet</span>
                </label>
              </div>
            </div>

            {/* Çizim Numarası */}
            <div className="form-group">
              <label htmlFor="cizim_numarasi" className="form-label">
                Çizim Numarası
              </label>
              <input
                type="text"
                id="cizim_numarasi"
                name="cizim_numarasi"
                value={cizim_numarasi}
                onChange={handleChange}
                className="form-input"
                maxLength={25}
                placeholder="Çizim numarasını girin"
              />
            </div>

            {/* İçerik Numarası */}
            <div className="form-group">
              <label htmlFor="icerik_numarasi" className="form-label">
                İçerik Numarası
              </label>
              <input
                type="text"
                id="icerik_numarasi"
                name="icerik_numarasi"
                value={icerik_numarasi}
                onChange={handleChange}
                className="form-input"
                maxLength={25}
                placeholder="İçerik numarasını girin"
              />
            </div>

            {/* Bileşen Kodu */}
            <div className="form-group">
              <label htmlFor="bilesen_kodu" className="form-label">
                Bileşen Kodu
              </label>
              <input
                type="text"
                id="bilesen_kodu"
                name="bilesen_kodu"
                value={bilesen_kodu}
                onChange={handleChange}
                className="form-input"
                maxLength={25}
                placeholder="Bileşen kodunu girin"
              />
            </div>

            {/* Kalem Ürün Ağacı Tipi */}
            <div className="form-group">
              <label htmlFor="kalem_urun_agaci_tipi" className="form-label">
                Kalem Ürün Ağacı Tipi
              </label>
              <input
                type="text"
                id="kalem_urun_agaci_tipi"
                name="kalem_urun_agaci_tipi"
                value={kalem_urun_agaci_tipi}
                onChange={handleChange}
                className="form-input"
                maxLength={4}
                placeholder="Kalem ürün ağacı tipini girin"
              />
            </div>

            {/* Kalem Ürün Ağacı Kodu */}
            <div className="form-group">
              <label htmlFor="kalem_urun_agaci_kodu" className="form-label">
                Kalem Ürün Ağacı Kodu
              </label>
              <input
                type="text"
                id="kalem_urun_agaci_kodu"
                name="kalem_urun_agaci_kodu"
                value={kalem_urun_agaci_kodu}
                onChange={handleChange}
                className="form-input"
                maxLength={25}
                placeholder="Kalem ürün ağacı kodunu girin"
              />
            </div>

            {/* Bileşen Miktarı */}
            <div className="form-group">
              <label htmlFor="bilesen_miktari" className="form-label">
                Bileşen Miktarı
              </label>
              <input
                type="number"
                id="bilesen_miktari"
                name="bilesen_miktari"
                value={bilesen_miktari}
                onChange={handleChange}
                className="form-input"
                step="0.001"
                placeholder="Bileşen miktarını girin"
              />
            </div>
            <div className="flex justify-between md:col-span-3">
              <button
                onClick={handleSubmit}
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-300"
              >
                Güncelle
              </button>
              <Link to="/UrunAgaclari">
                <button
                  type="button"
                  className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-300"
                >
                  Listeye Dön
                </button>
              </Link>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default UrunAgacilariGuncelle;

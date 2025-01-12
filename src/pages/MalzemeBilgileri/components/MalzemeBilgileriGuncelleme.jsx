import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useAxios } from "../../../shared/hooks/axios-hook";
import { Card, CardHeader, CardContent } from "@mui/material";
import "../../FormStyles.css";

const malzemeFields = {
  firma_kodu: "",
  malzeme_tipi: "",
  malzeme_kodu: "",
  gecerlilik_bas: "",
  gecerlilik_bit: "",
  tedarik_tipi: "",
  malzeme_stok_birimi: "",
  net_agirlik: "",
  net_agirlik_birimi: "",
  brut_agirlik: "",
  brut_agirlik_birimi: "",
  urun_agaci_var_mi: "",
  urun_agaci_tipi: "",
  urun_agaci_kodu: "",
  rota_var_mi: "",
  rota_tipi: "",
  rota_numarasi: "",
  silindi_mi: "",
  passif_mi: "",
  dil_kodu: "",
  malzeme_kisa_aciklamasi: "",
  malzeme_uzun_aciklamasi: "",
};

const MalzemeBilgileriGuncelle = () => {
  const {
    firma_kodu,
    malzeme_tipi,
    malzeme_kodu,
    gecerlilik_bas,
    gecerlilik_bit,
    dil_kodu,
  } = useParams();

  const [materialData, setMaterialData] = useState(malzemeFields);

  const {
    tedarik_tipi,
    malzeme_stok_birimi,
    net_agirlik,
    net_agirlik_birimi,
    brut_agirlik,
    brut_agirlik_birimi,
    urun_agaci_var_mi,
    urun_agaci_tipi,
    urun_agaci_kodu,
    rota_var_mi,
    rota_tipi,
    rota_numarasi,
    silindi_mi,
    passif_mi,
    malzeme_kisa_aciklamasi,
    malzeme_uzun_aciklamasi,
  } = materialData;

  const axios = useAxios();
  const navigate = useNavigate();

  const getMalzemeBilgileri = async () => {
    try {
      const response = await axios.get(
        `/malzeme-bilgileri/${firma_kodu}/${malzeme_tipi}/${malzeme_kodu}/${gecerlilik_bas}/${gecerlilik_bit}/${dil_kodu}`
      );
      if (response.data.status === "OK") {
        const malzemeInfo = response.data.malzemeBilgileri;
        setMaterialData({
          firma_kodu: malzemeInfo.COMCODE,
          malzeme_tipi: malzemeInfo.MATDOCTYPE,
          malzeme_kodu: malzemeInfo.MATDOCNUM,
          gecerlilik_bas: malzemeInfo.MATDOCFROM,
          gecerlilik_bit: malzemeInfo.MATDOCUNTIL,
          tedarik_tipi: malzemeInfo.SUPPLYTYPE,
          malzeme_stok_birimi: malzemeInfo.STUNIT,
          net_agirlik: malzemeInfo.NETWEIGHT,
          net_agirlik_birimi: malzemeInfo.NWUNIT,
          brut_agirlik: malzemeInfo.BRUTWEIGHT,
          brut_agirlik_birimi: malzemeInfo.BWUNIT,
          urun_agaci_var_mi: malzemeInfo.ISBOM,
          urun_agaci_tipi: malzemeInfo.BOMDOCTYPE,
          urun_agaci_kodu: malzemeInfo.BOMDOCNUM,
          rota_var_mi: malzemeInfo.ISROUTE,
          rota_tipi: malzemeInfo.ROTDOCTYPE,
          rota_numarasi: malzemeInfo.ROTDOCNUM,
          silindi_mi: malzemeInfo.ISDELETED,
          passif_mi: malzemeInfo.ISPASSIVE,
          dil_kodu: malzemeInfo.LANCODE,
          malzeme_kisa_aciklamasi: malzemeInfo.MATSTEXT,
          malzeme_uzun_aciklamasi: malzemeInfo.MATLTEXT,
        });
      }
    } catch (error) {
      console.log("Error", error.message);
    }
  };

  useEffect(() => {
    getMalzemeBilgileri();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setMaterialData((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? (checked ? "1" : "0") : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put("/malzeme-bilgileri", materialData);
      if (response.data.status === "OK") {
        navigate("/MalzemeBilgileri");
      }
    } catch (error) {
      console.log("message:", error);
    }
  };

  return (
    <Card sx={{ boxShadow: 3, borderRadius: 2, padding: 2 }}>
      <CardHeader
        title="Malzeme Bilgileri Formu"
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

            {/* Tedarik Tipi */}
            <div className="form-group">
              <label className="form-label">Tedarik Tipi</label>
              <div className="flex items-center space-x-4">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    id="tedarik_tipi"
                    name="tedarik_tipi"
                    value="0"
                    checked={`${tedarik_tipi}` === "0"}
                    onChange={handleChange}
                    className="form-radio"
                  />
                  <span className="ml-2">Satınalınan</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    id="tedarik_tipi"
                    name="tedarik_tipi"
                    value="1"
                    checked={`${tedarik_tipi}` === "1"}
                    onChange={handleChange}
                    className="form-radio"
                  />
                  <span className="ml-2">Üretilen</span>
                </label>
              </div>
            </div>

            {/* Malzeme Stok Birimi */}
            <div className="form-group">
              <label htmlFor="malzeme_stok_birimi" className="form-label">
                Malzeme Stok Birimi
              </label>
              <input
                type="text"
                id="malzeme_stok_birimi"
                name="malzeme_stok_birimi"
                value={malzeme_stok_birimi}
                onChange={handleChange}
                className="form-input"
                maxLength={3}
                placeholder="br"
              />
            </div>

            {/* Net Ağırlık */}
            <div className="form-group flex space-x-4">
              <div className="flex-grow">
                <label htmlFor="net_agirlik" className="form-label">
                  Net Ağırlık
                </label>
                <input
                  type="number"
                  id="net_agirlik"
                  name="net_agirlik"
                  value={net_agirlik}
                  onChange={handleChange}
                  className="form-input"
                  step="0.001"
                  placeholder="Net ağırlık"
                />
              </div>
            </div>
            {/* Net Ağırlık Birimi*/}
            <div className="form-group flex space-x-4">
              <div className="flex-grow">
                <label htmlFor="net_agirlik_birimi" className="form-label">
                  Net Ağırlık Birim
                </label>
                <input
                  type="text"
                  id="net_agirlik_birimi"
                  name="net_agirlik_birimi"
                  value={net_agirlik_birimi}
                  onChange={handleChange}
                  className="form-input"
                  maxLength={3}
                  placeholder="Br"
                />
              </div>
            </div>

            {/* Brüt Ağırlık */}
            <div className="form-group flex space-x-4">
              <div className="flex-grow">
                <label htmlFor="brut_agirlik" className="form-label">
                  Brüt Ağırlık
                </label>
                <input
                  type="number"
                  id="brut_agirlik"
                  name="brut_agirlik"
                  value={brut_agirlik}
                  onChange={handleChange}
                  className="form-input"
                  step="0.001"
                  placeholder="Brüt ağırlık"
                />
              </div>
            </div>
            {/* Brüt Ağırlık Birimi*/}
            <div className="form-group flex space-x-4">
              <div className="flex-grow">
                <label htmlFor="brut_agirlik_birimi" className="form-label">
                  Brüt Ağırlık Birim
                </label>
                <input
                  type="text"
                  id="brut_agirlik_birimi"
                  name="brut_agirlik_birimi"
                  value={brut_agirlik_birimi}
                  onChange={handleChange}
                  className="form-input"
                  maxLength={3}
                  placeholder="Br"
                />
              </div>
            </div>

            {/* Ürün Ağacı Var Mı */}
            <div className="form-group">
              <label className="form-label">Ürün Ağacı Var Mı?</label>
              <div className="flex items-center space-x-4">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="urun_agaci_var_mi"
                    value="0"
                    checked={`${urun_agaci_var_mi}` === "0"}
                    onChange={handleChange}
                    className="form-radio"
                  />
                  <span className="ml-2">Hayır</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="urun_agaci_var_mi"
                    value="1"
                    checked={`${urun_agaci_var_mi}` === "1"}
                    onChange={handleChange}
                    className="form-radio"
                  />
                  <span className="ml-2">Evet</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="urun_agaci_var_mi"
                    value="2"
                    checked={`${urun_agaci_var_mi}` === "2"}
                    onChange={handleChange}
                    className="form-radio"
                  />
                  <span className="ml-2">Olmayacak</span>
                </label>
              </div>
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

            {/* Rota Var Mı */}
            <div className="form-group">
              <label className="form-label">Rota Var Mı?</label>
              <div className="flex gap-4">
                <div className="flex items-center space-x-4">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="rota_var_mi"
                      value="0"
                      checked={`${rota_var_mi}` === "0"}
                      onChange={handleChange}
                      className="form-radio"
                    />
                    <span className="ml-2">Hayır</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="rota_var_mi"
                      value="1"
                      checked={`${rota_var_mi}` === "1"}
                      onChange={handleChange}
                      className="form-radio"
                    />
                    <span className="ml-2">Evet</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="rota_var_mi"
                      value="2"
                      checked={`${rota_var_mi}` === "2"}
                      onChange={handleChange}
                      className="form-radio"
                    />
                    <span className="ml-2">Olmayacak</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Rota Tipi */}
            <div className="form-group">
              <label htmlFor="rota_tipi" className="form-label">
                Rota Tipi
              </label>
              <input
                type="text"
                id="rota_tipi"
                name="rota_tipi"
                value={rota_tipi}
                onChange={handleChange}
                className="form-input"
                maxLength={4}
                placeholder="Rota Tipi girin"
              />
            </div>

            {/* Rota Numarası */}
            <div className="form-group">
              <label htmlFor="rota_numarasi" className="form-label">
                Rota Kodu
              </label>
              <input
                type="text"
                id="rota_numarasi"
                name="rota_numarasi"
                value={rota_numarasi}
                onChange={handleChange}
                className="form-input"
                maxLength={25}
                placeholder="Rota Kodu girin"
              />
            </div>

            {/* Silindi Mi */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Silindi Mi?
              </label>
              <div className="flex gap-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="silindi_mi"
                    value="0"
                    checked={`${silindi_mi}` === "0"}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  Hayır
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="silindi_mi"
                    value="1"
                    checked={`${silindi_mi}` === "1"}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  Evet
                </label>
              </div>
            </div>

            {/* Passif Mi */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Passif Mi?
              </label>
              <div className="flex gap-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="passif_mi"
                    value="0"
                    checked={`${passif_mi}` === "0"}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  Hayır
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="passif_mi"
                    value="1"
                    checked={`${passif_mi}` === "1"}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  Evet
                </label>
              </div>
            </div>

            {/* Dil Kodu */}
            <div className="form-group">
              <label htmlFor="dil_kodu" className="form-label">
                Dil Kodu
              </label>
              <input
                type="text"
                id="dil_kodu"
                name="dil_kodu"
                value={dil_kodu}
                onChange={handleChange}
                className="form-input bg-gray-100"
                readOnly
                maxLength={2}
                placeholder="TR"
              />
            </div>

            {/* Malzeme Kısa Açıklaması */}
            <div className="form-group">
              <label htmlFor="malzeme_kisa_aciklamasi" className="form-label">
                Malzeme Kısa Açıklaması
              </label>
              <input
                type="text"
                id="malzeme_kisa_aciklamasi"
                name="malzeme_kisa_aciklamasi"
                value={malzeme_kisa_aciklamasi}
                onChange={handleChange}
                className="form-input"
                maxLength={50}
                placeholder="Kısa açıklama"
              />
            </div>

            {/* Malzeme Uzun Açıklaması */}
            <div className="form-group md:col-span-3">
              <label htmlFor="malzeme_uzun_aciklamasi" className="form-label">
                Malzeme Uzun Açıklaması
              </label>
              <textarea
                id="malzeme_uzun_aciklamasi"
                name="malzeme_uzun_aciklamasi"
                value={malzeme_uzun_aciklamasi}
                onChange={handleChange}
                className="form-input"
                maxLength={250}
                rows={4}
                placeholder="Detaylı açıklama"
              />
            </div>
            <div className="flex justify-between md:col-span-3">
              <button
                onClick={handleSubmit}
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-300"
              >
                Güncelle
              </button>
              <Link to="/MalzemeBilgileri">
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

export default MalzemeBilgileriGuncelle;

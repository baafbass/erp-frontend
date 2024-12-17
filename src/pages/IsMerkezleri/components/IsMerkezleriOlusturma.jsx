import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAxios } from "../../../shared/hooks/axios-hook";
import { Card, CardHeader, CardContent } from "@mui/material";
import "../../FormStyles.css";

const isMerkezleriFields = {
  firma_kodu: "",
  is_merk_tipi: "",
  is_merk_kodu: "",
  gecerlilik_bas: "",
  gecerlilik_bit: "",
  ana_is_merk_tipi: "",
  ana_is_merk_kodu: "",
  maliyet_merk_tipi: "",
  maliyet_merk_kodu: "",
  gunluk_calisma_suresi: "",
  silindi_mi: "0",
  passif_mi: "0",
  dil_kodu: "",
  is_merk_kisa_aciklamasi: "",
  is_merk_uzun_aciklamasi: "",
  opr_kodu: "",
};

const IsMerkezleriOlustur = () => {
  const [isMerkezleriData, setIsMerkezleriData] = useState(isMerkezleriFields);
  const {
    firma_kodu,
    is_merk_tipi,
    is_merk_kodu,
    gecerlilik_bas,
    gecerlilik_bit,
    ana_is_merk_tipi,
    ana_is_merk_kodu,
    maliyet_merk_tipi,
    maliyet_merk_kodu,
    gunluk_calisma_suresi,
    silindi_mi,
    passif_mi,
    dil_kodu,
    is_merk_kisa_aciklamasi,
    is_merk_uzun_aciklamasi,
    opr_kodu,
  } = isMerkezleriData;

  const axios = useAxios();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setIsMerkezleriData((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? (checked ? "1" : "0") : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/IsMerkezleri", isMerkezleriData);
      if (response.data.status === "OK") {
        navigate("/IsMerkezleri");
      }
    } catch (error) {
      console.log("message:", error);
    }
  };

  return (
    <Card sx={{ boxShadow: 3, borderRadius: 2, padding: 2 }}>
      <CardHeader
        title="İş Merkezleri Formu"
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
                className="form-input"
                required
                maxLength={4}
                placeholder="Firma kodunu girin"
              />
            </div>

            {/* İş Merkezi Tipi */}
            <div className="form-group">
              <label htmlFor="is_merk_tipi" className="form-label">
                İş Merkezi Tipi
              </label>
              <input
                type="text"
                id="is_merk_tipi"
                name="is_merk_tipi"
                value={is_merk_tipi}
                onChange={handleChange}
                className="form-input"
                required
                maxLength={4}
                placeholder="İş Merkezi tipini girin"
              />
            </div>

            {/* İş Merkezi Kodu */}
            <div className="form-group">
              <label htmlFor="is_merk_kodu" className="form-label">
                İş Merkezi Kodu
              </label>
              <input
                type="text"
                id="is_merk_kodu"
                name="is_merk_kodu"
                value={is_merk_kodu}
                onChange={handleChange}
                className="form-input"
                required
                maxLength={25}
                placeholder="İş Merkezi kodu girin"
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
                className="form-input"
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
                className="form-input"
                required
              />
            </div>

            {/* Ana İş Merkezi Tipi */}
            <div className="form-group">
              <label htmlFor="ana_is_merk_tipi" className="form-label">
                Ana İş Merkezi Tipi
              </label>
              <input
                type="text"
                id="ana_is_merk_tipi"
                name="ana_is_merk_tipi"
                value={ana_is_merk_tipi}
                onChange={handleChange}
                className="form-input"
                maxLength={4}
                placeholder="Ana iş merkezi Tipini girin"
              />
            </div>

            {/* Ana İş Merkezi Kodu*/}
            <div className="form-group flex space-x-4">
              <div className="flex-grow">
                <label htmlFor="ana_is_merk_kodu" className="form-label">
                  Ana İş Merkezi Kodu
                </label>
                <input
                  type="text"
                  id="ana_is_merk_kodu"
                  name="ana_is_merk_kodu"
                  value={ana_is_merk_kodu}
                  onChange={handleChange}
                  className="form-input"
                  maxLength={25}
                  placeholder="Ana iş merkezi kodu girin"
                />
              </div>
            </div>

            {/* Maliyet Merkezi Tipi */}
            <div className="form-group flex space-x-4">
              <div className="flex-grow">
                <label htmlFor="maliyet_merk_tipi" className="form-label">
                  Maliyet Merkezi Tipi
                </label>
                <input
                  type="number"
                  id="maliyet_merk_tipi"
                  name="maliyet_merk_tipi"
                  value={maliyet_merk_tipi}
                  onChange={handleChange}
                  className="form-input"
                  maxLength={4}
                  placeholder="Maliyet Merkezi Tipi"
                />
              </div>
            </div>

            {/* Maliyet Merkezi Kodu*/}
            <div className="form-group flex space-x-4">
              <div className="flex-grow">
                <label htmlFor="maliyet_merk_kodu" className="form-label">
                  Maliyet Merkezi Kodu
                </label>
                <input
                  type="text"
                  id="maliyet_merk_kodu"
                  name="maliyet_merk_kodu"
                  value={maliyet_merk_kodu}
                  onChange={handleChange}
                  className="form-input"
                  maxLength={25}
                  placeholder="Maliyet merkezi Kodu"
                />
              </div>
            </div>

            {/* Günlük Çalışma Süresi */}
            <div className="form-group flex space-x-4">
              <div className="flex-grow">
                <label htmlFor="gunluk_calisma_suresi" className="form-label">
                  Günlük Çalışma Süresi
                </label>
                <input
                  type="number"
                  id="gunluk_calisma_suresi"
                  name="gunluk_calisma_suresi"
                  value={gunluk_calisma_suresi}
                  onChange={handleChange}
                  className="form-input"
                  maxLength={2}
                  step="0.01"
                  placeholder="Saat"
                />
              </div>
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
                    checked={silindi_mi === "0"}
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
                    checked={silindi_mi === "1"}
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
                    checked={passif_mi === "0"}
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
                    checked={passif_mi === "1"}
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
                className="form-input"
                maxLength={2}
                placeholder="TR"
              />
            </div>

            {/* İş Merkezi Kısa Açıklaması */}
            <div className="form-group">
              <label htmlFor="is_merk_kisa_aciklamasi" className="form-label">
                İş Merkezi Kısa Açıklaması
              </label>
              <input
                type="text"
                id="is_merk_kisa_aciklamasi"
                name="is_merk_kisa_aciklamasi"
                value={is_merk_kisa_aciklamasi}
                onChange={handleChange}
                className="form-input"
                maxLength={50}
                placeholder="Kısa açıklama"
              />
            </div>

            {/* Operasyon Kodu */}
            <div className="form-group">
              <label htmlFor="opr_kodu" className="form-label">
                Operasyon Kodu
              </label>
              <input
                type="text"
                id="opr_kodu"
                name="opr_kodu"
                value={opr_kodu}
                onChange={handleChange}
                className="form-input"
                maxLength={4}
                placeholder="Operasyon Kodu"
              />
            </div>

            {/* İş Merkezi Uzun Açıklaması */}
            <div className="form-group md:col-span-3">
              <label htmlFor="is_merk_uzun_aciklamasi" className="form-label">
                İş Merkezi Uzun Açıklaması
              </label>
              <textarea
                id="is_merk_uzun_aciklamasi"
                name="is_merk_uzun_aciklamasi"
                value={is_merk_uzun_aciklamasi}
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
                İş Merkezi Oluştur
              </button>
              <Link to="/IsMerkezleri">
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
export default IsMerkezleriOlustur;
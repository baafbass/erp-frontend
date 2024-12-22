import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAxios } from "../../../shared/hooks/axios-hook";
import { Card, CardHeader, CardContent } from "@mui/material";
import "../../FormStyles.css";

const initialRotaState = {
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
  rota_tipi: "",
  rota_numarasi: "",
  operasyon_num: "",
  is_merk_tipi: "",
  is_merk_kodu: "",
  operasyon_kodu: "",
  opr_hazirlik_suresi: "",
  opr_makine_suresi: "",
  opr_iscilik_suresi: "",
  icerik_numarasi: "",
  bilesen_kodu: "",
  bilesen_miktari: "",
};

const RotaOlustur = () => {
  const [rotaData, setRotaData] = useState(initialRotaState);
  const {
    firma_kodu,
    urun_agaci_tipi,
    urun_agaci_kodu,
    gecerlilik_bas,
    gecerlilik_bit,
    malzeme_tipi,
    malzeme_kodu,
    temel_miktar,
    silindi_mi,
    passif_mi,
    cizim_numarasi,
    rota_tipi,
    rota_numarasi,
    operasyon_num,
    is_merk_tipi,
    is_merk_kodu,
    operasyon_kodu,
    opr_hazirlik_suresi,
    opr_makine_suresi,
    opr_iscilik_suresi,
    icerik_numarasi,
    bilesen_kodu,
    bilesen_miktari,
  } = rotaData;

  const [firmalar, setFirmalar] = useState([]);
  const [urunAgaciTipleri, setUrunAgaciTipleri] = useState([]);
  const [malzemeTipleri, setMalzemeTipleri] = useState([]);
  const [rotaTipleri, setRotaTipleri] = useState([]);
  const [operaTipleri, setOperaTipleri] = useState([]);

  const axios = useAxios();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSupportInfos = async () => {
      try {
        const [
          firmalarResponse,
          urunAgaciTipleriResponse,
          malzemeTipleriResponse,
          rotaTipleriResponse,
          operaTiplerResponse,
        ] = await Promise.all([
          await axios.get("/firma"),
          await axios.get("/urun-agaci-tipi"),
          await axios.get("/malzeme-tipi"),
          await axios.get("/rota-tipi"),
          await axios.get("/operasyon"),
        ]);
        setFirmalar(firmalarResponse.data.firmalar);
        setUrunAgaciTipleri(urunAgaciTipleriResponse.data.tipler);
        setMalzemeTipleri(malzemeTipleriResponse.data.tipler);
        setRotaTipleri(rotaTipleriResponse.data.tipler);
        setOperaTipleri(operaTiplerResponse.data.operasyonlar);
      } catch (error) {
        console.log("error", error.message);
      }
    };
    fetchSupportInfos();
  }, [axios]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setRotaData((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? (checked ? "1" : "0") : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/Rotalar", rotaData);
      if (response.data.status === "OK") {
        navigate("/Rotalar");
      }
    } catch (error) {
      console.log("message:", error);
    }
  };

  return (
    <Card sx={{ boxShadow: 3, borderRadius: 2, padding: 2 }}>
      <CardHeader
        title="Yeni Rota Oluştur"
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
              <select
                id="firma_kodu"
                name="firma_kodu"
                value={firma_kodu}
                onChange={handleChange}
                className="form-input"
                required
              >
                <option value="">Seçiniz</option>
                {firmalar.map((firma) => (
                  <option key={firma.COMCODE} value={firma.COMCODE}>
                    {firma.COMCODE}
                  </option>
                ))}
              </select>
            </div>

            {/* Ürün Ağacı Tipi */}
            <div className="form-group">
              <label htmlFor="urun_agaci_tipi" className="form-label">
                Ürün Ağacı Tipi
              </label>
              <select
                id="urun_agaci_tipi"
                name="urun_agaci_tipi"
                value={urun_agaci_tipi}
                onChange={handleChange}
                className="form-input"
                required
              >
                <option value="">Seçiniz</option>
                {urunAgaciTipleri.map((urunAgaci) => (
                  <option key={urunAgaci.DOCTYPE} value={urunAgaci.DOCTYPE}>
                    {urunAgaci.COMCODE} {urunAgaci.DOCTYPE}
                  </option>
                ))}
              </select>
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
                value={rotaData.urun_agaci_kodu}
                onChange={handleChange}
                className="form-input"
                required
                maxLength={25}
                placeholder="Ürün ağacı kodu girin"
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
                value={rotaData.gecerlilik_bas}
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
                value={rotaData.gecerlilik_bit}
                onChange={handleChange}
                className="form-input"
                required
              />
            </div>

            {/* Malzeme Tipi */}
            <div className="form-group">
              <label htmlFor="malzeme_tipi" className="form-label">
                Malzeme Tipi
              </label>
              <select
                id="malzeme_tipi"
                name="malzeme_tipi"
                value={malzeme_tipi}
                onChange={handleChange}
                className="form-input"
                required
              >
                <option value="">Seçiniz</option>
                {malzemeTipleri.map((malzeme) => (
                  <option key={malzeme.DOCTYPE} value={malzeme.DOCTYPE}>
                    {malzeme.COMCODE} {malzeme.DOCTYPE}
                  </option>
                ))}
              </select>
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
                value={rotaData.malzeme_kodu}
                onChange={handleChange}
                className="form-input"
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
                value={rotaData.temel_miktar}
                onChange={handleChange}
                className="form-input"
                required
                placeholder="Temel miktar girin"
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

            {/* Çizim Numarası */}
            <div className="form-group">
              <label htmlFor="cizim_numarasi" className="form-label">
                Çizim Numarası
              </label>
              <input
                type="text"
                id="cizim_numarasi"
                name="cizim_numarasi"
                value={rotaData.cizim_numarasi}
                onChange={handleChange}
                className="form-input"
                placeholder="Çizim numarası girin"
              />
            </div>

            {/* Rota Tipi */}
            <div className="form-group">
              <label htmlFor="rota_tipi" className="form-label">
                Rota Tipi
              </label>
              <select
                id="rota_tipi"
                name="rota_tipi"
                value={rota_tipi}
                onChange={handleChange}
                className="form-input"
                required
              >
                <option value="">Seçiniz</option>
                {rotaTipleri.map((rota) => (
                  <option key={rota.DOCTYPE} value={rota.DOCTYPE}>
                    {rota.COMCODE} {rota.DOCTYPE}
                  </option>
                ))}
              </select>
            </div>

            {/* Rota Numarası */}
            <div className="form-group">
              <label htmlFor="rota_numarasi" className="form-label">
                Rota Numarası
              </label>
              <input
                type="text"
                id="rota_numarasi"
                name="rota_numarasi"
                value={rotaData.rota_numarasi}
                onChange={handleChange}
                className="form-input"
                required
                maxLength={25}
                placeholder="Rota numarası girin"
              />
            </div>

            {/* Operasyon Numarası */}
            <div className="form-group">
              <label htmlFor="operasyon_num" className="form-label">
                Operasyon Numarası
              </label>
              <input
                type="text"
                id="operasyon_num"
                name="operasyon_num"
                value={rotaData.operasyon_num}
                onChange={handleChange}
                className="form-input"
                required
                placeholder="Operasyon numarası girin"
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
                value={rotaData.is_merk_tipi}
                onChange={handleChange}
                className="form-input"
                required
                placeholder="İş merkezi tipi girin"
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
                value={rotaData.is_merk_kodu}
                onChange={handleChange}
                className="form-input"
                required
                placeholder="İş merkezi kodu girin"
              />
            </div>

            {/* Operasyon Kodu */}
            <div className="form-group">
              <label htmlFor="operasyon_kodu" className="form-label">
                Operasyon Kodu
              </label>
              <select
                id="operasyon_kodu"
                name="operasyon_kodu"
                value={operasyon_kodu}
                onChange={handleChange}
                className="form-input"
              >
                <option value="">Seçiniz</option>
                {operaTipleri.map((operasyon) => (
                  <option key={operasyon.DOCTYPE} value={operasyon.DOCTYPE}>
                    {operasyon.COMCODE} {operasyon.DOCTYPE}
                  </option>
                ))}
              </select>
            </div>

            {/* Hazırlık Süresi */}
            <div className="form-group">
              <label htmlFor="opr_hazirlik_suresi" className="form-label">
                Hazırlık Süresi (Saat)
              </label>
              <input
                type="number"
                id="opr_hazirlik_suresi"
                name="opr_hazirlik_suresi"
                value={rotaData.opr_hazirlik_suresi}
                onChange={handleChange}
                className="form-input"
                required
                step="0.01"
                placeholder="Saat"
              />
            </div>

            {/* Makine Süresi */}
            <div className="form-group">
              <label htmlFor="opr_makine_suresi" className="form-label">
                Makine Süresi (Saat)
              </label>
              <input
                type="number"
                id="opr_makine_suresi"
                name="opr_makine_suresi"
                value={rotaData.opr_makine_suresi}
                onChange={handleChange}
                className="form-input"
                required
                step="0.01"
                placeholder="Saat"
              />
            </div>

            {/* İşçilik Süresi */}
            <div className="form-group">
              <label htmlFor="opr_iscilik_suresi" className="form-label">
                İşçilik Süresi (Saat)
              </label>
              <input
                type="number"
                id="opr_iscilik_suresi"
                name="opr_iscilik_suresi"
                value={rotaData.opr_iscilik_suresi}
                onChange={handleChange}
                className="form-input"
                required
                step="0.01"
                placeholder="Saat"
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
                value={rotaData.icerik_numarasi}
                onChange={handleChange}
                className="form-input"
                placeholder="İçerik numarası girin"
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
                value={rotaData.bilesen_kodu}
                onChange={handleChange}
                className="form-input"
                placeholder="Bileşen kodu girin"
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
                value={rotaData.bilesen_miktari}
                onChange={handleChange}
                className="form-input"
                placeholder="Miktar"
              />
            </div>
          </div>

          <div className="flex justify-between md:col-span-2">
            <button
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-300"
            >
              Rota Oluştur
            </button>
            <Link to="/Rotalar">
              <button
                type="button"
                className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-300"
              >
                Listeye Dön
              </button>
            </Link>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default RotaOlustur;

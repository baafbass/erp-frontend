import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
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

const UrunAgacilariOlustur = () => {
  const [productTreeData, setProductTreeData] = useState(urunAgaciFields);
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
    icerik_numarasi,
    bilesen_kodu,
    kalem_urun_agaci_tipi,
    kalem_urun_agaci_kodu,
    bilesen_miktari,
  } = productTreeData;

  const [firmalar, setFirmalar] = useState([]);
  const [malzemeTipleri, setMalzemeTipiler] = useState([]);
  const [urunAgaciTipleri, setUrunAgaciTipleri] = useState([]);

  const axios = useAxios();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSupportInfos = async () => {
      try {
        const [
          firmalarResponse,
          malzemeTiplerResponse,
          urunAgaciTiplerResponse,
        ] = await Promise.all([
          await axios.get("/firma"),
          await axios.get("/malzeme"),
          await axios.get("/urun-agaci"),
        ]);

        setFirmalar(firmalarResponse.data.firmalar);
        setMalzemeTipiler(malzemeTiplerResponse.data.malzemeler);
        setUrunAgaciTipleri(urunAgaciTiplerResponse.data.urunAgacilari);
      } catch (error) {
        console.log("error", error.message);
      }
    };
    fetchSupportInfos();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProductTreeData((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? (checked ? "1" : "0") : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/urun-agacilari", productTreeData);
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
        title="Ürün Ağacı Oluşturma Formu"
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
              >
                <option value="">Seçiniz</option>
                {urunAgaciTipleri.map((urunAgacilari) => (
                  <option
                    key={urunAgacilari.DOCTYPE}
                    value={urunAgacilari.DOCTYPE}
                  >
                    {urunAgacilari.COMCODE} {urunAgacilari.DOCTYPE}
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
                value={urun_agaci_kodu}
                onChange={handleChange}
                className="form-input"
                required
                maxLength={25}
                placeholder="Ürün ağacı kodunu girin"
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
                value={malzeme_kodu}
                onChange={handleChange}
                className="form-input"
                required
                maxLength={25}
                placeholder="Malzeme kodunu girin"
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
              <select
                id="kalem_urun_agaci_tipi"
                name="kalem_urun_agaci_tipi"
                value={kalem_urun_agaci_tipi}
                onChange={handleChange}
                className="form-input"
              >
                <option value="">Seçiniz</option>
                {urunAgaciTipleri.map((urunAgacilari) => (
                  <option
                    key={urunAgacilari.DOCTYPE}
                    value={urunAgacilari.DOCTYPE}
                  >
                    {urunAgacilari.COMCODE} {urunAgacilari.DOCTYPE}
                  </option>
                ))}
              </select>
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
                Ürün Ağacı Oluştur
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

export default UrunAgacilariOlustur;

import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAxios } from "../../../shared/hooks/axios-hook";
import { Card, CardHeader, CardContent } from "@mui/material";
import "../../FormStyles.css";
import Alert from "../../../component/alert";

const malzemeFields = {
  firma_kodu: "",
  malzeme_tipi: "",
  malzeme_kodu: "",
  gecerlilik_bas: "",
  gecerlilik_bit: "",
  tedarik_tipi: "0",
  malzeme_stok_birimi: "",
  net_agirlik: "",
  net_agirlik_birimi: "",
  brut_agirlik: "",
  brut_agirlik_birimi: "",
  urun_agaci_var_mi: "0",
  urun_agaci_tipi: "",
  urun_agaci_kodu: "",
  rota_var_mi: "0",
  rota_tipi: "",
  rota_numarasi: "",
  silindi_mi: "0",
  passif_mi: "0",
  dil_kodu: "",
  malzeme_kisa_aciklamasi: "",
  malzeme_uzun_aciklamasi: "",
};

const MalzemeBilgileriOlustur = () => {
  const [materialData, setMaterialData] = useState(malzemeFields);
  const {
    firma_kodu,
    malzeme_tipi,
    malzeme_kodu,
    gecerlilik_bas,
    gecerlilik_bit,
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
    dil_kodu,
    malzeme_kisa_aciklamasi,
    malzeme_uzun_aciklamasi,
  } = materialData;

  const [firmalar, setFirmalar] = useState([]);
  const [malzemeTipleri, setMalzemeTipiler] = useState([]);
  const [birimler, setBirimler] = useState([]);
  const [urunAgaciTipleri, setUrunAgaciTipleri] = useState([]);
  const [rotaTipleri, setRotaTipleri] = useState([]);
  const [diller, setDiller] = useState([]);
  const [alert, setAlert] = useState({
    isVisible: false,
    message: "",
    type: "error",
  });

  const axios = useAxios();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSupportInfos = async () => {
      try {
        const [
          firmalarResponse,
          malzemeTiplerResponse,
          birimlerResponse,
          urunAgaciTiplerResponse,
          rotaTiplerResponse,
          dillerResponse,
        ] = await Promise.all([
          await axios.get("/firma"),
          await axios.get("/malzeme"),
          await axios.get("/birim"),
          await axios.get("/urun-agaci"),
          await axios.get("/rota"),
          await axios.get("/dil"),
        ]);
        setFirmalar(firmalarResponse.data.firmalar);
        setMalzemeTipiler(malzemeTiplerResponse.data.malzemeler);
        setBirimler(birimlerResponse.data.transformedBirimler);
        setUrunAgaciTipleri(urunAgaciTiplerResponse.data.urunAgacilari);
        setRotaTipleri(rotaTiplerResponse.data.rotalar);
        setDiller(dillerResponse.data.diller);
      } catch (error) {
        console.log("error", error.message);
      }
    };
    fetchSupportInfos();
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
      const response = await axios.post("/malzeme-bilgileri", materialData);
      if (response.data.status === "OK") {
        navigate("/MalzemeBilgileri");
      }
    } catch (error) {
      let errorMessage = "Hata oluştu !!";

      if (error.response.status === 400) {
        errorMessage = "Gerekli alan doldurmamışsınız !!";
      } else {
        errorMessage = "Böyle bir malzeme bulunmaktadır !!";
      }

      setAlert({
        isVisible: true,
        message: errorMessage,
        type: "error",
      });
    }
  };

  return (
    <Card sx={{ boxShadow: 3, borderRadius: 2, padding: 2 }}>
      <Alert
        isVisible={alert.isVisible}
        message={alert.message}
        type={alert.type}
        onClose={() => setAlert({ ...alert, isVisible: false })}
      />
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

            {/* Tedarik Tipi */}
            <div className="form-group">
              <label className="form-label">Tedarik Tipi</label>
              <div className="flex items-center space-x-4">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="tedarik_tipi"
                    value="0"
                    checked={tedarik_tipi === "0"}
                    onChange={handleChange}
                    className="form-radio"
                  />
                  <span className="ml-2">Satınalınan</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="tedarik_tipi"
                    value="1"
                    checked={tedarik_tipi === "1"}
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
              <select
                id="malzeme_stok_birimi"
                name="malzeme_stok_birimi"
                value={malzeme_stok_birimi}
                onChange={handleChange}
                className="form-input"
              >
                <option value="">Seçiniz</option>
                {birimler.map((birim) => (
                  <option key={birim.DOCTYPE} value={birim.UNITCODE}>
                    {birim.COMCODE} {birim.UNITCODE}
                  </option>
                ))}
              </select>
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
                <select
                  id="net_agirlik_birimi"
                  name="net_agirlik_birimi"
                  value={net_agirlik_birimi}
                  onChange={handleChange}
                  className="form-input"
                >
                  <option value="">Seçiniz</option>
                  {birimler.map((birim) => (
                    <option key={birim.DOCTYPE} value={birim.UNITCODE}>
                      {birim.COMCODE} {birim.UNITCODE}
                    </option>
                  ))}
                </select>
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
                <select
                  id="brut_agirlik_birimi"
                  name="brut_agirlik_birimi"
                  value={brut_agirlik_birimi}
                  onChange={handleChange}
                  className="form-input"
                >
                  <option value="">Seçiniz</option>
                  {birimler.map((birim) => (
                    <option key={birim.DOCTYPE} value={birim.UNITCODE}>
                      {birim.COMCODE} {birim.UNITCODE}
                    </option>
                  ))}
                </select>
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
                    checked={urun_agaci_var_mi === "0"}
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
                    checked={urun_agaci_var_mi === "1"}
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
                    checked={urun_agaci_var_mi === "2"}
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
              <select
                id="urun_agaci_tipi"
                name="urun_agaci_tipi"
                value={urun_agaci_tipi}
                onChange={handleChange}
                className="form-input"
                disabled={urun_agaci_var_mi !== "1"}
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
                value={urun_agaci_kodu}
                onChange={handleChange}
                className="form-input"
                maxLength={25}
                placeholder="BOM Kodu girin"
                disabled={urun_agaci_var_mi !== "1"}
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
                      checked={rota_var_mi === "0"}
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
                      checked={rota_var_mi === "1"}
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
                      checked={rota_var_mi === "2"}
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
              <select
                id="rota_tipi"
                name="rota_tipi"
                value={rota_tipi}
                onChange={handleChange}
                className="form-input"
                disabled={rota_var_mi !== "1"}
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
                disabled={rota_var_mi !== "1"}
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

            {/* Dil Kodu */}
            <div className="form-group">
              <label htmlFor="dil_kodu" className="form-label">
                Dil Kodu
              </label>
              <select
                id="dil_kodu"
                name="dil_kodu"
                value={dil_kodu}
                onChange={handleChange}
                className="form-input"
              >
                <option value="">Seçiniz</option>
                {diller.map((dil) => (
                  <option key={dil.DOCTYPE} value={dil.LANCODE}>
                    {dil.COMCODE} {dil.LANCODE}
                  </option>
                ))}
              </select>
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
                Malzeme Oluştur
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
export default MalzemeBilgileriOlustur;

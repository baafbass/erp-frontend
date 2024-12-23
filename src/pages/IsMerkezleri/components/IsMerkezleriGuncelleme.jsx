import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useAxios } from "../../../shared/hooks/axios-hook";
import { Card, CardHeader, CardContent } from "@mui/material";
import "../../FormStyles.css";

const IsMerkezleriFields = {
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
  silindi_mi: "",
  passif_mi: "",
  dil_kodu: "",
  is_merk_kisa_aciklamasi: "",
  is_merk_uzun_aciklamasi: "",
  opr_kodu: "",
};

const IsMerkezleriGuncelle = () => {
  const {
    firma_kodu,
    is_merk_tipi,
    is_merk_kodu,
    gecerlilik_bas,
    gecerlilik_bit,
    dil_kodu,
    opr_kodu,
  } = useParams();

  console.log(
    firma_kodu,
    is_merk_tipi,
    is_merk_kodu,
    gecerlilik_bas,
    gecerlilik_bit,
    dil_kodu,
    opr_kodu
  );

  const [isMerkezleriData, setIsMerkezleriData] = useState(IsMerkezleriFields);

  const {
    ana_is_merk_tipi,
    ana_is_merk_kodu,
    maliyet_merk_tipi,
    maliyet_merk_kodu,
    gunluk_calisma_suresi,
    silindi_mi,
    passif_mi,
    is_merk_kisa_aciklamasi,
    is_merk_uzun_aciklamasi,
  } = isMerkezleriData;

  const axios = useAxios();
  const navigate = useNavigate();

  const getIsMerkezleriBilgileri = async () => {
    try {
      const response = await axios.get(
        `/is-merkezleri/${firma_kodu}/${is_merk_tipi}/${is_merk_kodu}/${gecerlilik_bas}/${gecerlilik_bit}/${dil_kodu}/${opr_kodu}`
      );
      if (response.data.status === "OK") {
        const data = response.data.isMerkezi;

        setIsMerkezleriData({
          firma_kodu: data.COMCODE,
          is_merk_tipi: data.WCMDOCTYPE,
          is_merk_kodu: data.WCMDOCNUM,
          gecerlilik_bas: data.WCMDOCFROM,
          gecerlilik_bit: data.WCMDOCUNTIL,
          ana_is_merk_tipi: data.MAINWCMDOCTYPE,
          ana_is_merk_kodu: data.MAINWCMDOCNUM,
          maliyet_merk_tipi: data.CCMDOCTYPE,
          maliyet_merk_kodu: data.CCMDOCNUM,
          gunluk_calisma_suresi: data.WORKTIME,
          silindi_mi: data.ISDELETED,
          passif_mi: data.ISPASSIVE,
          dil_kodu: data.LANCODE,
          is_merk_kisa_aciklamasi: data.WCMSTEXT,
          is_merk_uzun_aciklamasi: data.WCMLTEXT,
          opr_kodu: data.OPRDOCTYPE,
        });
      }
    } catch (error) {
      console.log("Error", error);
    }
  };

  useEffect(() => {
    getIsMerkezleriBilgileri();
  }, []);

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
      const response = await axios.put("/is-merkezleri", isMerkezleriData);
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
        title="İş Merkezleri Güncelleme"
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
                readOnly
                className="form-input bg-gray-100"
                required
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
                readOnly
                className="form-input bg-gray-100"
                required
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
              />
            </div>

            {/* Ana İş Merkezi Kodu */}
            <div className="form-group">
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
              />
            </div>

            {/* Maliyet Merkezi Tipi */}
            <div className="form-group">
              <label htmlFor="maliyet_merk_tipi" className="form-label">
                Maliyet Merkezi Tipi
              </label>
              <input
                type="text"
                id="maliyet_merk_tipi"
                name="maliyet_merk_tipi"
                value={maliyet_merk_tipi}
                onChange={handleChange}
                className="form-input"
              />
            </div>

            {/* Maliyet Merkezi Kodu */}
            <div className="form-group">
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
              />
            </div>

            {/* Günlük Çalışma Süresi */}
            <div className="form-group">
              <label htmlFor="gunluk_calisma_suresi" className="form-label">
                Günlük Çalışma Süresi (Saat)
              </label>
              <input
                type="number"
                id="gunluk_calisma_suresi"
                name="gunluk_calisma_suresi"
                value={gunluk_calisma_suresi}
                onChange={handleChange}
                className="form-input"
                step="0.01"
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
                required
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
                className="form-input bg-gray-100"
                readOnly
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
                value={isMerkezleriData.is_merk_uzun_aciklamasi}
                onChange={handleChange}
                className="form-input"
                rows={4}
              />
            </div>

            <div className="flex justify-between md:col-span-3">
              <button
                type="submit"
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-300"
              >
                Güncelle
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

export default IsMerkezleriGuncelle;

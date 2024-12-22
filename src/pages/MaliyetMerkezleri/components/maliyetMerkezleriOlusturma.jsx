import React, { useState,useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAxios } from "../../../shared/hooks/axios-hook";
import { Card, CardHeader, CardContent } from "@mui/material";
import "../../FormStyles.css";

const maliyetMerkezFields = {
	firma_kodu:"",
    maliyet_merk_tipi:"",
    maliyet_merk_kodu:"",
    gecerlilik_bas:"",
    gecerlilik_bit:"",
    ana_maliyet_merk_tipi:"",
    ana_maliyet_merk_kodu:"",
    silindi_mi:"0",
    passif_mi:"0",
    dil_kodu:"",
    maliyet_merk_kisa_aciklamasi:"",
    maliyet_merk_uzun_aciklamasi:""
}

const MaliyetMerkezleriOlusturma = () => {

	const [maliyetMerkData,setMaliyetMerkData] = useState(maliyetMerkezFields);
	const {
	firma_kodu,
    maliyet_merk_tipi,
    maliyet_merk_kodu,
    gecerlilik_bas,
    gecerlilik_bit,
    ana_maliyet_merk_tipi,
    ana_maliyet_merk_kodu,
    silindi_mi,
    passif_mi,
    dil_kodu,
    maliyet_merk_kisa_aciklamasi,
    maliyet_merk_uzun_aciklamasi
         } = maliyetMerkData;

    const [firmalar,setFirmalar] = useState([])
    const [maliyetMerkTipleri,setMaliyetMerkTipiler] = useState([])
    const [diller,setDiller] = useState([])

  const axios = useAxios();
  const navigate = useNavigate();

  useEffect(()=>{
    const fetchSupportInfos = async () =>{
       try{
         const [firmalarResponse,maliyetMerkTiplerResponse,dillerResponse] = await Promise.all([
          await axios.get('/firma'),
          await axios.get('/maliyet-merkezi'),
          await axios.get('/dil')
          ])
         
         setFirmalar(firmalarResponse.data.firmalar)
         setMaliyetMerkTipiler(maliyetMerkTiplerResponse.data.maliyetMerkezleri)
         setDiller(dillerResponse.data.diller)
       } catch(error){
        console.log('error',error.message);
       }
    } 
    fetchSupportInfos();
  },[])


  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setMaliyetMerkData((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? (checked ? "1" : "0") : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/maliyet-merkezleri", maliyetMerkData);
      if (response.data.status === "OK") {
        navigate("/maliyet-merkezleri");
      }
    } catch (error) {
      console.log("message:", error.response.data.message);
    }
  };

  return (
    <Card sx={{ boxShadow: 3, borderRadius: 2, padding: 2 }}>
      <CardHeader
        title="Maliyet Merkezleri Formu"
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

            <div className="form-group">
              <label htmlFor="maliyet_merk_tipi" className="form-label">
                Maliyet Merkezi Tipi
              </label>
              <select
                id="maliyet_merk_tipi"
                name="maliyet_merk_tipi"
                value={maliyet_merk_tipi}
                onChange={handleChange}
                className="form-input"
                required
              >
              <option value="">Seçiniz</option>
                {maliyetMerkTipleri.map((maliyetMerk) => (
                  <option key={maliyetMerk.DOCTYPE} value={maliyetMerk.DOCTYPE}>
                    {maliyetMerk.COMCODE}  {maliyetMerk.DOCTYPE}
                  </option>
                ))}
              </select>
            </div>

           
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
                required
                maxLength={25}
                placeholder="Maliyet merkezi kodu girin"
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





             <div className="form-group">
              <label htmlFor="ana_maliyet_merk_tipi" className="form-label">
                Ana Maliyet Merkezi Tipi
              </label>
              <input
                type="text"
                id="ana_maliyet_merk_tipi"
                name="ana_maliyet_merk_tipi"
                value={ana_maliyet_merk_tipi}
                onChange={handleChange}
                className="form-input"
                required
                maxLength={25}
                placeholder="Ana maliyet merkezi tipi girin"
              />
            </div>

           
            <div className="form-group">
              <label htmlFor="ana_maliyet_merk_kodu" className="form-label">
                Ana Maliyet Merkezi Kodu
              </label>
              <input
                type="text"
                id="ana_maliyet_merk_kodu"
                name="ana_maliyet_merk_kodu"
                value={ana_maliyet_merk_kodu}
                onChange={handleChange}
                className="form-input"
                required
                maxLength={25}
                placeholder="Ana maliyet merkezi kodu girin"
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
                    {dil.COMCODE}  {dil.LANCODE}
                  </option>
                ))}
              </select>
            </div>

            {/* Malzeme Kısa Açıklaması */}
            <div className="form-group">
              <label htmlFor="maliyet_merk_kisa_aciklamasi" className="form-label">
                Maliyet Merkezi Kısa Açıklaması
              </label>
              <input
                type="text"
                id="maliyet_merk_kisa_aciklamasi"
                name="maliyet_merk_kisa_aciklamasi"
                value={maliyet_merk_kisa_aciklamasi}
                onChange={handleChange}
                className="form-input"
                maxLength={50}
                placeholder="Kısa açıklama"
              />
            </div>

            {/* Malzeme Uzun Açıklaması */}
            <div className="form-group md:col-span-3">
              <label htmlFor="maliyet_merk_uzun_aciklamasi" className="form-label">
                Maliyet Merkezi Uzun Açıklaması
              </label>
              <textarea
                id="maliyet_merk_uzun_aciklamasi"
                name="maliyet_merk_uzun_aciklamasi"
                value={maliyet_merk_uzun_aciklamasi}
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
                Maliyet Merkezi Oluştur
              </button>
              <Link to="/maliyet-merkezleri">
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
}

export default MaliyetMerkezleriOlusturma;
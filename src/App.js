import { Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";
import Birim from "./pages/kontrolT/Birim/birim";
import Dil from "./pages/kontrolT/Dil/dil";
import Firma from "./pages/kontrolT/Firma/firma";
import IsMerkezi from "./pages/kontrolT/IsMerkezi/isMerkezi";
import MaliyetMerkezi from "./pages/kontrolT/MaliyetMerkezi/maliyetMerkezi";
import Malzeme from "./pages/kontrolT/Malzeme/malzeme";
import Operasyon from "./pages/kontrolT/Operasyon/operasyon";
import Rota from "./pages/kontrolT/Rota/rota";
import Sehir from "./pages/kontrolT/Sehir/sehir";
import Ulke from "./pages/kontrolT/Ulke/ulke";
import UrunAgaci from "./pages/kontrolT/UrunAgaci/urunAgaci";

import FirmaOlustur from "./pages/kontrolT/Firma/components/firmaOlusturma";
import FirmaGuncelle from "./pages/kontrolT/Firma/components/firmaGuncelleme";

import DilOluştur from "./pages/kontrolT/Dil/components/dilOlusturma";
import DilGuncelle from "./pages/kontrolT/Dil/components/dilGuncelleme";

import BirimOluştur from "./pages/kontrolT/Birim/components/birimOlusturma";
import BirimGuncelle from "./pages/kontrolT/Birim/components/birimGuncelleme";

import UlkeOluştur from "./pages/kontrolT/Ulke/components/ulkeOlusturma";
import UlkeGuncelle from "./pages/kontrolT/Ulke/components/ulkeGuncelleme";

import SehirOluştur from "./pages/kontrolT/Sehir/components/sehirOlusturma";
import SehirGuncelle from "./pages/kontrolT/Sehir/components/sehirGuncelleme";

import UrunAgaciOlustur from "./pages/kontrolT/UrunAgaci/urunAgaciolustur";
import RotaOlustur from "./pages/kontrolT/Rota/rotaolustur";
import IsMerkeziOlustur from "./pages/kontrolT/IsMerkezi/isMerkeziolustur";
import OperasyonOlustur from "./pages/kontrolT/Operasyon/operasyonolustur";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />

      <Route path="/birim" element={<Birim />} />
      <Route path="/dil" element={<Dil />} />
      <Route path="/firma" element={<Firma />} />
      <Route path="/is-merkezi" element={<IsMerkezi />} />
      <Route path="/maliyet-merkezi" element={<MaliyetMerkezi />} />
      <Route path="/malzeme" element={<Malzeme />} />
      <Route path="/operasyon" element={<Operasyon />} />
      <Route path="/rota" element={<Rota />} />
      <Route path="/sehir" element={<Sehir />} />
      <Route path="/ulke" element={<Ulke />} />

      <Route path="/urun-agaci" element={<UrunAgaci />} />
      <Route path="/firma-olustur" element={<FirmaOlustur />} />
      <Route path="/firma-guncelle/:firma_kodu" element={<FirmaGuncelle />} />

      <Route path="/dil-olustur" element={<DilOluştur />} />
      <Route path="/dil-guncelle/:dil_kodu" element={<DilGuncelle />} />

      <Route path="/birim-olustur" element={<BirimOluştur />} />
      <Route path="/birim-guncelle/:birim_kodu" element={<BirimGuncelle />} />

      <Route path="/ulke-olustur" element={<UlkeOluştur />} />
      <Route path="/ulke-guncelle/:ulke_kodu" element={<UlkeGuncelle />} />

      <Route path="/sehir-olustur" element={<SehirOluştur />} />
      <Route path="/sehir-guncelle/:sehir_kodu" element={<SehirGuncelle />} />

      <Route path="/urunAgaciolustur" element={<UrunAgaciOlustur />} />
      <Route path="/rotaolustur" element={<RotaOlustur />} />
      <Route path="/isMerkeziolustur" element={<IsMerkeziOlustur />} />
      <Route path="/operasyonolustur" element={<OperasyonOlustur />} />
    </Routes>
  );
}

export default App;

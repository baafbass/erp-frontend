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
import FirmaOlustur from "./pages/kontrolT/Firma/firmaolustur";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />

      <Route path="/birim" element={<Birim />} />
      <Route path="/dil" element={<Dil />} />
      <Route path="/firma" element={<Firma />} />
      <Route path="/ismerkezi" element={<IsMerkezi />} />
      <Route path="/maliyetmerkezi" element={<MaliyetMerkezi />} />
      <Route path="/malzeme" element={<Malzeme />} />
      <Route path="/operasyon" element={<Operasyon />} />
      <Route path="/rota" element={<Rota />} />
      <Route path="/sehir" element={<Sehir />} />
      <Route path="/ulke" element={<Ulke />} />
      <Route path="/urunagaci" element={<UrunAgaci />} />
      <Route path="/firmaolustur" element={<FirmaOlustur />} />
    </Routes>
  );
}

export default App;

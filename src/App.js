import { Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";

//KontrolIT
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

import DilOlustur from "./pages/kontrolT/Dil/components/dilOlusturma";
import DilGuncelle from "./pages/kontrolT/Dil/components/dilGuncelleme";

import BirimOlustur from "./pages/kontrolT/Birim/components/birimOlusturma";
import BirimGuncelle from "./pages/kontrolT/Birim/components/birimGuncelleme";

import UlkeOlustur from "./pages/kontrolT/Ulke/components/ulkeOlusturma";
import UlkeGuncelle from "./pages/kontrolT/Ulke/components/ulkeGuncelleme";

import SehirOlustur from "./pages/kontrolT/Sehir/components/sehirOlusturma";
import SehirGuncelle from "./pages/kontrolT/Sehir/components/sehirGuncelleme";

import IsMerkeziOlustur from "./pages/kontrolT/IsMerkezi/components/isMerkeziOlusturma";
import IsMerkeziGuncelle from "./pages/kontrolT/IsMerkezi/components/isMerkeziGuncelleme";

import MalzemeOlustur from "./pages/kontrolT/Malzeme/components/MalzemeOlusturma";
import MalzemeGuncelle from "./pages/kontrolT/Malzeme/components/MalzemeGuncelleme";

import RotaOlustur from "./pages/kontrolT/Rota/components/RotaOlusturma";
import RotaGuncelle from "./pages/kontrolT/Rota/components/RotaGuncelleme";

import OperasyonOlustur from "./pages/kontrolT/Operasyon/components/OperasyonOlusturma";
import OperasyonGuncelle from "./pages/kontrolT/Operasyon/components/OperasyonGuncelleme";

import UrunAgaciOlustur from "./pages/kontrolT/UrunAgaci/components/UrunAgaciOlusturma";
import UrunAgaciGuncelle from "./pages/kontrolT/UrunAgaci/components/UrunAgaciGuncelleme";

import MaliyetMerkeziOlustur from "./pages/kontrolT/MaliyetMerkezi/components/MaliyetMerkeziOlusturma";
import MaliyetMerkeziGuncelle from "./pages/kontrolT/MaliyetMerkezi/components/MaliyetMerkeziGuncelleme";

//Malzeme Bilgileri
import MalzemeBilgileri from "./pages/MalzemeBilgileri/MalzemeBilgileri";
import MalzemeBilgileriOlustur from "./pages/MalzemeBilgileri/components/MalzemeBilgileriOlusturma";
import MalzemeBilgileriGuncelle from "./pages/MalzemeBilgileri/components/MalzemeBilgileriGuncelleme";

import MaliyetMerkezleri from "./pages/MaliyetMerkezleri/maliyetMerkezleri"
import MaliyetMerkezleriOlusturma from "./pages/MaliyetMerkezleri/components/maliyetMerkezleriOlusturma"
import MaliyetMerkezleriGuncelleme from "./pages/MaliyetMerkezleri/components/maliyetMerkezleriGuncelleme"

//IsMerkezleri
import IsMerkezleri from "./pages/IsMerkezleri/IsMerkezleri";
import IsMerkezleriOlustur from "./pages/IsMerkezleri/components/IsMerkezleriOlusturma";
import IsMerkezleriGuncelle from "./pages/IsMerkezleri/components/IsMerkezleriGuncelleme";

//UrunAgaclari
import UrunAgaclari from "./pages/UrunAgaclari/UrunAgaclari";
import UrunAgaclariOlustur from "./pages/UrunAgaclari/components/UrunAgaclariOlusturma";
import UrunAgaclariGuncelle from "./pages/UrunAgaclari/components/UrunAgaclariGuncelleme";

//Rotalar
import Rotalar from "./pages/Rotalar/Rotalar";
import RotalarOlustur from "./pages/Rotalar/components/RotalarOlusturma";
import RotalarGuncelle from "./pages/Rotalar/components/RotalarGuncelleme";

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
      <Route path="/urun_agaci" element={<UrunAgaci />} />

      <Route path="/firma-olustur" element={<FirmaOlustur />} />
      <Route path="/firma-guncelle/:firma_kodu" element={<FirmaGuncelle />} />

      <Route path="/dil-olustur" element={<DilOlustur />} />
      <Route
        path="/dil-guncelle/:dil_kodu/:firma_kodu"
        element={<DilGuncelle />}
      />

      <Route path="/birim-olustur" element={<BirimOlustur />} />
      <Route
        path="/birim-guncelle/:birim_kodu/:firma_kodu"
        element={<BirimGuncelle />}
      />

      <Route path="/ulke-olustur" element={<UlkeOlustur />} />
      <Route
        path="/ulke-guncelle/:ulke_kodu/:firma_kodu"
        element={<UlkeGuncelle />}
      />

      <Route path="/sehir-olustur" element={<SehirOlustur />} />
      <Route
        path="/sehir-guncelle/:sehir_kodu/:firma_kodu"
        element={<SehirGuncelle />}
      />

      <Route path="/isMerkezi-olustur" element={<IsMerkeziOlustur />} />
      <Route
        path="/isMerkezi-guncelle/:is_merkezi/:firma_kodu"
        element={<IsMerkeziGuncelle />}
      />

      <Route path="/malzeme-olustur" element={<MalzemeOlustur />} />
      <Route
        path="/malzeme-guncelle/:malzeme/:firma_kodu"
        element={<MalzemeGuncelle />}
      />

      <Route path="/rota-olustur" element={<RotaOlustur />} />
      <Route
        path="/rota-guncelle/:rota/:firma_kodu"
        element={<RotaGuncelle />}
      />

      <Route path="/operasyon-olustur" element={<OperasyonOlustur />} />
      <Route
        path="/operasyon-guncelle/:operasyon/:firma_kodu"
        element={<OperasyonGuncelle />}
      />

      <Route path="/urunagaci-olustur" element={<UrunAgaciOlustur />} />
      <Route
        path="/urunagaci-guncelle/:urun_agaci/:firma_kodu"
        element={<UrunAgaciGuncelle />}
      />

      <Route
        path="/maliyet-merkezi-olustur"
        element={<MaliyetMerkeziOlustur />}
      />
      <Route
        path="/maliyet-merkezi-guncelle/:maliyet_merkezi/:firma_kodu"
        element={<MaliyetMerkeziGuncelle />}
      />

      <Route path="/MalzemeBilgileri" element={<MalzemeBilgileri />} />
      <Route
        path="/MalzemeBilgileri-olustur"
        element={<MalzemeBilgileriOlustur />}
      />
      <Route
        path="/MalzemeBilgileri-guncelle/:firma_kodu/:malzeme_tipi/:malzeme_kodu/:gecerlilik_bas/:gecerlilik_bit/:dil_kodu"
        element={<MalzemeBilgileriGuncelle />}
      />
      

      <Route path="/maliyet-merkezleri" element={<MaliyetMerkezleri/>}/>
      <Route path="/maliyet-merkezleri-olusturma" element={<MaliyetMerkezleriOlusturma/>}/>
      <Route path="/maliyet-merkezleri-guncelleme/:firma_kodu/:maliyet_merk_tipi/:maliyet_merk_kodu/:gecerlilik_bas/:gecerlilik_bit/:dil_kodu" element={<MaliyetMerkezleriGuncelleme/>}/>

      <Route path="/IsMerkezleri" element={<IsMerkezleri />} />
      <Route path="/IsMerkezleri-olustur" element={<IsMerkezleriOlustur />} />
      <Route
        path="/IsMerkezleri-guncelle/:is_merk_tipi/:firma_kodu/:is_merk_kodu/:gecer_bas/:gecer_bit/:dil_kodu/:opr_kodu"
        element={<IsMerkezleriGuncelle />}
      />

      <Route path="/UrunAgaclari" element={<UrunAgaclari />} />
      <Route path="/UrunAgaclari-olustur" element={<UrunAgaclariOlustur />} />
      <Route
        path="/UrunAgaclari-guncelle/:firma_kodu/:urun_agaci_tipi/:urun_agaci_kodu/:gecerlilik_bas/:gecerlilik_bit/:malzeme_tipi/:malzeme_kodu/:icerik_numarasi"
        element={<UrunAgaclariGuncelle />}
      />

      <Route path="/Rotalar" element={<Rotalar />} />
      <Route path="/Rotalar-olustur" element={<RotalarOlustur />} />
      <Route
        path="/Rotalar-guncelle/:firma_kodu/:urun_agaci_tipi/:urun_agaci_kodu/:gecerlilik_bas/:gecerlilik_bit/:malzeme_tipi/:malzeme_kodu/:rota_tipi/:rota_numarasi/:opr_numarasi/:icerik_numarasi"
        element={<RotalarGuncelle />}
      />
    </Routes>
  );
}

export default App;

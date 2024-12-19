import React from "react";
import "./HomePage.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const HomePage = () => {
  const kontrolTabloItems = [
    { href: "/firma", label: "Firma" },
    { href: "/birim", label: "Birim" },
    { href: "/dil", label: "Dil" },
    { href: "/malzeme", label: "Malzeme Tipi" },
    { href: "/ulke", label: "Ülke" },
    { href: "/maliyet-merkezi", label: "Maliyet Merkezi" },
    { href: "/sehir", label: "Şehir" },
    { href: "/urun_agaci", label: "Ürün Ağacı" },
    { href: "/rota", label: "Rota Tipi" },
    { href: "/is-merkezi", label: "İş Merkezi Tipi" },
    { href: "/operasyon", label: "Operasyon Tipi" },
  ];

  const anaTabloItems = [
    { href: "/MalzemeBilgileri", label: "Malzeme Bilgileri" },
    { href: "/maliyet-merkezleri", label: "Maliyet Merkez" },
    { href: "/IsMerkezleri", label: "İş Merkezi" },
    { href: "/Urunagaci", label: "Ürün Ağacı" },
    { href: "/rotayonetimi", label: "Rota Yönetimi" },
  ];

  const closePage = () => {
    window.close();
  };

  return (
    <div className="homepage">
      <div className="navbar">
        <h1 className="title">Ana Ekran</h1>
        <button className="close-button" onClick={closePage}>
          <FontAwesomeIcon icon={faTimes} />
        </button>
      </div>
      <div className="container">
        <div className="grid">
          <div className="section">
            <h2 className="section-title">Kontrol Tabloları</h2>
            <div className="button-grid">
              {kontrolTabloItems.map((item, index) => (
                <a key={index} href={item.href} className="button">
                  {item.label}
                </a>
              ))}
            </div>
          </div>
          <div className="section">
            <h2 className="section-title">Ana Tablolar</h2>
            <div className="button-grid">
              {anaTabloItems.map((item, index) => (
                <a key={index} href={item.href} className="button">
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;

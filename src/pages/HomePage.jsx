import React from "react";
import userImage from "./img/user.png";
import { Link } from "react-router-dom";
import {
  Home,
  Bell,
  ArrowRight,
  Building,
  Grid,
  Languages,
  Package,
  Globe,
  DollarSign,
  Building2,
  TreePine,
  Router,
  Settings,
  ClipboardList,
  Power,
} from "lucide-react";

const iconMap = {
  "/firma": Building,
  "/birim": Grid,
  "/dil": Languages,
  "/malzeme": Package,
  "/ulke": Globe,
  "/maliyet-merkezi": DollarSign,
  "/sehir": Building2,
  "/urun_agaci": TreePine,
  "/rota": Router,
  "/is-merkezi": Settings,
  "/operasyon": ClipboardList,
  "/MalzemeBilgileri": Package,
  "/maliyet-merkezleri": DollarSign,
  "/IsMerkezleri": Settings,
  "/UrunAgaclari": TreePine,
  "/Rotalar": Router,
};

const DashboardCard = ({ href, label, description }) => {
  const IconComponent = iconMap[href] || Package;

  return (
    <Link
      to={href}
      className="flex items-center bg-gray-50 rounded-xl p-4 text-gray-800 no-underline hover:transform hover:-translate-y-1 transition-all hover:border hover:border-blue-500 hover:shadow-lg"
    >
      <div className="bg-blue-500 w-12 h-12 rounded-xl flex items-center justify-center mr-4">
        <IconComponent className="text-white" size={24} />
      </div>
      <div className="flex-grow">
        <h3 className="text-base font-semibold mb-1">{label}</h3>
        <p className="text-sm text-gray-500">Manage {label} data</p>
      </div>
      <ArrowRight className="text-blue-500" size={20} />
    </Link>
  );
};

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
    { href: "/UrunAgaclari", label: "Ürün Ağacı" },
    { href: "/Rotalar", label: "Rota Yönetimi" },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      <div className="w-64 bg-white border-r border-gray-200 p-5 flex flex-col">
        <div className="text-xl font-bold mb-8">
          <span>NYS</span>ERP
        </div>

        <nav className="flex-grow">
          <div className="mb-4">
            <h3 className="uppercase text-xs text-gray-500 mb-2">Main Menu</h3>
            <Link
              to="/"
              className="flex items-center px-4 py-2 rounded-lg bg-blue-500 text-white"
            >
              <Home size={18} className="mr-2" />
              <span>Dashboard</span>
            </Link>
          </div>
        </nav>

        <div className="pt-5 border-t border-gray-200">
          <button
            onClick={() => window.close()}
            className="w-full flex items-center justify-center bg-red-500 text-white p-2 rounded-lg hover:bg-red-600 transition-colors"
          >
            <Power size={18} className="mr-2" />
            <span>Close App</span>
          </button>
        </div>
      </div>

      <main className="flex-grow p-5">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">Ana Ekran</h1>

          <div className="flex items-center">
            <button className="relative mr-5">
              <Bell size={20} />
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                3
              </span>
            </button>

            <div className="flex items-center">
              <img
                src={userImage}
                alt="User"
                className="w-10 h-10 rounded-full mr-2"
              />

              <span className="font-medium">Admin</span>
            </div>
          </div>
        </header>

        <div className="space-y-8">
          <section className="bg-white rounded-xl p-6 shadow-lg">
            <div className="mb-6">
              <h2 className="text-xl font-bold text-blue-500">
                Kontrol Tabloları
              </h2>
              <p className="text-gray-500 text-sm">
                Manage your core system configurations
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {kontrolTabloItems.map((item) => (
                <DashboardCard key={item.href} {...item} />
              ))}
            </div>
          </section>

          <section className="bg-white rounded-xl p-6 shadow-lg">
            <div className="mb-6">
              <h2 className="text-xl font-bold text-blue-500">Ana Tablolar</h2>
              <p className="text-gray-500 text-sm">
                Access your primary data tables
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {anaTabloItems.map((item) => (
                <DashboardCard key={item.href} {...item} />
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default HomePage;

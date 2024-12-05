import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash, faPlus } from "@fortawesome/free-solid-svg-icons";

const FirmaPage = () => {
  const [companies, setCompanies] = useState([
    {
      kod: "COM001",
      ad: "Acme Inc.",
      adres1: "123 Main St.",
      adres2: "Suite 456",
      sehirKodu: "NYC",
      ulkeKodu: "USA",
    },
    {
      kod: "COM002",
      ad: "Globex Corporation",
      adres1: "789 Park Ave.",
      adres2: "Floor 10",
      sehirKodu: "LON",
      ulkeKodu: "UK",
    },
    {
      kod: "COM003",
      ad: "Stark Industries",
      adres1: "555 Technology Dr.",
      adres2: "Building A",
      sehirKodu: "SFO",
      ulkeKodu: "USA",
    },
  ]);

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-start pt-8">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-6xl">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Firma Bilgileri</h1>
          <Link to="/firmaolustur">
            <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-300 flex items-center">
              <FontAwesomeIcon icon={faPlus} className="mr-2" />
              Yeni Firma Oluştur
            </button>
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-200">
                <th className="px-4 py-2 text-left">Kod</th>
                <th className="px-4 py-2 text-left">Ad</th>
                <th className="px-4 py-2 text-left">Adres 1</th>
                <th className="px-4 py-2 text-left">Adres 2</th>
                <th className="px-4 py-2 text-left">Şehir</th>
                <th className="px-4 py-2 text-left">Ülke</th>
                <th className="px-4 py-2 text-center">İşlemler</th>
              </tr>
            </thead>
            <tbody>
              {companies.map((company, index) => (
                <tr key={index} className="border-b">
                  <td className="px-4 py-2">{company.kod}</td>
                  <td className="px-4 py-2">{company.ad}</td>
                  <td className="px-4 py-2">{company.adres1}</td>
                  <td className="px-4 py-2">{company.adres2}</td>
                  <td className="px-4 py-2">{company.sehirKodu}</td>
                  <td className="px-4 py-2">{company.ulkeKodu}</td>
                  <td className="px-4 py-2 flex justify-center space-x-2">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-medium py-1 px-2 rounded-lg transition-colors duration-300 flex items-center">
                      <FontAwesomeIcon icon={faEdit} className="mr-1" />
                      Düzenle
                    </button>
                    <button className="bg-red-500 hover:bg-red-700 text-white font-medium py-1 px-2 rounded-lg transition-colors duration-300 flex items-center">
                      <FontAwesomeIcon icon={faTrash} className="mr-1" />
                      Sil
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default FirmaPage;

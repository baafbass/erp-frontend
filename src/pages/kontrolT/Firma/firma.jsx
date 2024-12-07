import React, { useState,useEffect } from "react";
import { Link,useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash, faPlus } from "@fortawesome/free-solid-svg-icons";
import {useAxios} from '../../../shared/hooks/axios-hook';
import FirmaSilme from './components/firmaSilme'

const FirmaPage = () => {
  const [companies, setCompanies] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState(null);

  const axios = useAxios();
  const navigate = useNavigate();

  const getAllFirma = async () =>{
    try{
      const response = await axios.get('/firma');
      if(response.data.status==="OK"){
        setCompanies(response.data.firmalar);
      }
    } catch(error){
      console.log("Error",error.message);
    }
  }

  useEffect(()=>{
    getAllFirma();
  },[])

  const handleEdit = (firma_kodu) => {
   navigate(`/firma-guncelle/${firma_kodu}`)
  }

  const handleDelete = async () => {
   try{
     const response = await axios.delete(`/firma/${selectedCompany}`);
     if(response.data.status === "OK"){
      setCompanies((prevCompanies)=>prevCompanies.filter((company)=> company.COMCODE !== selectedCompany));
     }
   } catch(error){
    console.error("Error Deleting company",error.message);
   } finally {
      setOpenDialog(false);
    }
  }
  

  const handleOpenDialog = (firma_kodu) => {
    setSelectedCompany(firma_kodu);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedCompany(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-start pt-8">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-6xl">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Firma Bilgileri</h1>
          <Link to="/firma-olustur">
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
                  <td className="px-4 py-2">{company.COMCODE}</td>
                  <td className="px-4 py-2">{company.COMTEXT}</td>
                  <td className="px-4 py-2">{company.ADDRESS1}</td>
                  <td className="px-4 py-2">{company.ADDRESS2}</td>
                  <td className="px-4 py-2">{company.CITYCODE}</td>
                  <td className="px-4 py-2">{company.COUNTRYCODE}</td>
                  <td className="px-4 py-2 flex justify-center space-x-2">
                
                    <button onClick={()=>handleEdit(company.COMCODE)} className="bg-blue-500 hover:bg-blue-700 text-white font-medium py-1 px-2 rounded-lg transition-colors duration-300 flex items-center">
                      <FontAwesomeIcon icon={faEdit} className="mr-1" />
                      Düzenle
                    </button>
                  
                    <button onClick={() => handleOpenDialog(company.COMCODE)} className="bg-red-500 hover:bg-red-700 text-white font-medium py-1 px-2 rounded-lg transition-colors duration-300 flex items-center">
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
      <FirmaSilme openDialog={openDialog} handleCloseDialog={handleCloseDialog} handleDelete={handleDelete}/>
    </div>
  );
};

export default FirmaPage;

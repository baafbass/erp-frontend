import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash, faPlus } from "@fortawesome/free-solid-svg-icons";

const SehirPage = () => {
	const [companies, setCompanies] = useState([
		{
			kod: "COM001",
			sehirKodu: "NYC",
			sehirAdi: "NewYork",
			ulkeKodu: "USA",
		},
		{
			kod: "COM002",
			sehirKodu: "LON",
			sehirAdi: "London",
			ulkeKodu: "UK",

		},
		{
			kod: "COM003",
			sehirKodu: "SFO",
			sehirAdi: "SanFrancisco",
			ulkeKodu: "USA",
		},
	]);

	return (
		<div className="min-h-screen bg-gray-100 flex justify-center items-start pt-8">
			<div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-6xl">
				<div className="flex justify-between items-center mb-6">
					<h1 className="text-3xl font-bold text-gray-800">Şehir Bilgileri</h1>
					<Link to="/sehirolustur">
						<button className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-300 flex items-center">
							<FontAwesomeIcon icon={faPlus} className="mr-2" />
							Yeni Şehir Oluştur
						</button>
					</Link>
				</div>
				<div className="overflow-x-auto">



					<table className="w-full border-collapse">
						<thead>
							<tr className="bg-gray-200">
								<th className="px-4 py-2 text-left">Kod</th>
								<th className="px-4 py-2 text-left">Şehir Kodu</th>
								<th className="px-4 py-2 text-left">Şehir Adı</th>
								<th className="px-4 py-2 text-left">Ülke</th>
								<th className="px-4 py-2 text-center">İşlemler</th>
							</tr>
						</thead>









						<tbody>
							{companies.map((company, index) => (
								<tr key={index} className="border-b">
									<td className="px-4 py-2">{company.kod}</td>


									<td className="px-4 py-2">{company.sehirKodu}</td>
									<td className="px-4 py-2">{company.sehirAdi}</td>
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

export default SehirPage;


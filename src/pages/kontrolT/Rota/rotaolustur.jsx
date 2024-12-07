import React, { useState } from "react";
import { Link } from "react-router-dom";

const RotaOlustur = () => {
    const [formData, setFormData] = useState({
        kod: "",
        rotaTipi: "",
        rotaTipiAciklamasi: "",
        pasifMi: "",



    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form data submitted:", formData);
    };

    return (
        <div className="min-h-screen bg-gray-100 flex justify-center items-start pt-8">
            <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-4xl">
                <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
                    Yeni Rota Oluştur
                </h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label
                            className="block text-gray-700 font-medium mb-2"
                            htmlFor="kod"
                        >
                            Kod
                        </label>
                        <input
                            type="text"
                            id="kod"
                            name="kod"
                            value={formData.kod}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded-lg"
                            required
                        />
                    </div>





                    <div className="mb-4">
                        <label
                            className="block text-gray-700 font-medium mb-2"
                            htmlFor="rotaTipi"
                        >
                            Rota Tipi
                        </label>
                        <input
                            type="text"
                            id="rotaTipi"
                            name="rotaTipi"
                            value={formData.rotaTipi}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded-lg"
                            required
                        />
                    </div>




                    <div className="mb-4">
                        <label
                            className="block text-gray-700 font-medium mb-2"
                            htmlFor="rotaTipiAciklamasi"
                        >
                            Rota Tipi Açıklaması
                        </label>
                        <input
                            type="text"
                            id="rotaTipiAciklamasi"
                            name="rotaTipiAciklamasi"
                            value={formData.rotaTipiAciklamasi}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded-lg"
                            required
                        />
                    </div>


                    <div className="mb-4">
                        <label className="block text-gray-700 font-medium mb-2">Pasif mi?</label>
                        <div className="flex gap-4">
                            <label className="flex items-center">
                                <input
                                    type="radio"
                                    name="pasifMi"
                                    value="0"
                                    checked={formData.pasifMi === "0"}
                                    onChange={handleChange}
                                    className="mr-2"
                                />
                                0 (Hayır)
                            </label>
                            <label className="flex items-center">
                                <input
                                    type="radio"
                                    name="pasifMi"
                                    value="1"
                                    checked={formData.pasifMi === "1"}
                                    onChange={handleChange}
                                    className="mr-2"
                                />
                                1 (Evet)
                            </label>
                        </div>
                    </div>




                    <div className="flex justify-between">
                        <button
                            type="submit"
                            className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-300"
                        >
                            Rota Oluştur
                        </button>
                        <Link to="/">
                            <button className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-300">
                                Listeye Dön
                            </button>
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default RotaOlustur;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Lock, User, AlertCircle, LogIn, RefreshCcw } from "lucide-react";

const defaultUser = {
  username: "ERP",
  password: "erp123",
};

const Login = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
    setError("");
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (
      credentials.username === defaultUser.username &&
      credentials.password === defaultUser.password
    ) {
      navigate("/HomePage");
    } else {
      setError("Geçersiz kullanıcı adı veya şifre");
    }
  };

  const handleReset = () => {
    setCredentials({
      username: "",
      password: "",
    });
    setError("");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-sky-300 relative overflow-hidden">
      <div className="w-full max-w-md relative z-10">
        <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-8 border border-white/20">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold mb-2">
              <span className="text-gray-800">NYS</span>
              <span className="text-blue-500">ERP</span>
            </h1>
            <p className="text-gray-600">Sisteme Giriş</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Kullanıcı Adı
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400 group-hover:text-blue-500 transition-colors" />
                  </div>
                  <input
                    type="text"
                    name="username"
                    value={credentials.username}
                    onChange={handleInputChange}
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 backdrop-blur-sm bg-white/50"
                    placeholder="Kullanıcı adınızı giriniz"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Şifre
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400 group-hover:text-blue-500 transition-colors" />
                  </div>
                  <input
                    type="password"
                    name="password"
                    value={credentials.password}
                    onChange={handleInputChange}
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 backdrop-blur-sm bg-white/50"
                    placeholder="Şifrenizi giriniz"
                  />
                </div>
              </div>
            </div>

            {error && (
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-red-500 text-sm bg-red-50 p-2 rounded-lg">
                  <AlertCircle className="h-4 w-4" />
                  <span>{error}</span>
                </div>
                <button
                  type="button"
                  onClick={handleReset}
                  className="flex items-center justify-center w-full bg-gray-200 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-300 transition-all transform hover:scale-105 focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
                >
                  <RefreshCcw className="h-5 w-5 mr-2" />
                  Yinele
                </button>
              </div>
            )}

            <button
              type="submit"
              className="flex items-center justify-center w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-2 px-4 rounded-lg hover:from-blue-600 hover:to-indigo-700 transition-all transform hover:scale-105 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              <LogIn className="h-5 w-5 mr-2" />
              Giriş Yap
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;

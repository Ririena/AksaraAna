import React, { useState } from "react";
import { supabase } from "../../config/supabase";
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();
  const [getUser, setGetUser] = useState({
    email: "",
    password: "",
  });

  const [isSubmit, setIsSubmit] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmit(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: getUser.email,
        password: getUser.password,
      });

      if (error) {
        alert("Login Gagal: " + error.message);
      } else {
        alert("Login Berhasil");
        navigate("/home");
      }
    } catch (error) {
      console.error(error.message);
    } finally {
      setIsSubmit(false);
    }
  };

  return (
    <>
      <nav className="flex h-screen justify-center items-center ">
        <div className="shadow-lg">
          <div className="card w-96 bg-white shadow-xl rounded-lg overflow-hidden">
            <div className="card-body p-6">
              <h2 className="card-title text-3xl font-bold mb-4 text-purple-800">
                Login for an Account
              </h2>
              <hr className="mb-4 border-purple-400" />
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label
                    htmlFor="email"
                    className="text-lg font-medium text-purple-800"
                  >
                    Email:
                  </label>
                  <input
                    value={getUser.email}
                    onChange={(e) =>
                      setGetUser({ ...getUser, email: e.target.value })
                    }
                    type="text"
                    id="email"
                    name="email"
                    placeholder="Arienesu@gmail.com"
                    className="input input-bordered w-full mt-1 text-purple-800"
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="password"
                    className="text-lg font-medium text-purple-800"
                  >
                    Password:
                  </label>
                  <input
                    value={getUser.password}
                    onChange={(e) =>
                      setGetUser({ ...getUser, password: e.target.value })
                    }
                    type="password"
                    id="password"
                    name="password"
                    placeholder="ArienaKawaii"
                    className="input input-bordered w-full mt-1 text-purple-800"
                  />
                </div>

                <div className="text-center mt-8">
                  <button
                    type="submit"
                    className="btn btn-primary w-full bg-purple-600 hover:bg-purple-700 focus:ring-purple-500 text-white"
                    disabled={isSubmit}
                  >
                    {isSubmit ? "Logging in..." : "Login"}
                  </button>
                </div>
              </form>
              <div className="mt-3 text-center">
                <button className=" link font-medium text-indigo-600">
                  Didn't have an Account?..
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

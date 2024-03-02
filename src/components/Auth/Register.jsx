import React from "react";
import { useState } from "react";
import { supabase } from "../../config/supabase.js";
import { useNavigate } from "react-router-dom";
export default function Register() {
  const navigate = useNavigate();

  const [tambahUser, setTambahUser] = useState({
    email: "",
    password: "",
    password2: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setTambahUser({ ...tambahUser, [e.target.name]: e.target.value });
  };

  const handleSubmit = async(e){
    e.preventDefault();

    if(isSubmitting) {
      return
    }

    setIsSubmitting(true)

    if(tambahUser.password !== tambahUser.password2){
      alert("Password Tidak Sama")
      setIsSubmitting(false)
      return;
    } 

    try {
      const { data, error } = await supabase.auth.signUp({
        email: tambahUser.email,
        password: tambahUser.password,
      })

      if(error){
        alert("Gagal Membuat Akun")
      } else {
        navigate("/login")
      }

      catch(error) {
        console.error("Gagal Signup ada kesalahan dari server")
      } finally {
        setIsSubmitting(false)
      }
    }
  }

  return (
    <>
    <div></div>
    </>
  )
}

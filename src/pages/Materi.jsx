import React, { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Button,
} from "@chakra-ui/react";
import { supabase } from "../config/supabase.js";
import { useLocation } from "react-router-dom";
export default function Materi() {
  const [getData, setGetData] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  useEffect(() => {
    async function init() {
      try {
        const { data, error } = await supabase.from("postingan").select("*");

        if (error) {
          console.error(error.message);
        }
        setGetData(data);

        for (const gambars of data) {
          const res = await supabase.storage
            .from("gambar/images")
            .getPublicUrl(gambars.gambar);

          if (res.error) {
            console.error(res.error.message);
          } else {
            console.log(res.data.publicUrl);
            gambars.gambar = res.data.publicUrl;
            console.log(res.data.publicUrl);
          }
        }
        setLoading(false);
      } catch (error) {
        console.error(error.message);
        setLoading(false);
      }
    }
    init();
  }, []);

  if (loading) {
    return <div>Loading</div>;
  }
  return (
    <>
      <main>
        <div>
          {getData.map((post) => (
            <div
              key={post.id}
              className="max-w-xs rounded overflow-hidden shadow-lg mx-2 my-4 bg-white border border-gray-300"
            >
              <img
                className="w-full h-48 object-cover"
                src="bahasa-sunda_169.jpeg"
                alt={post.Judul}
              />
              <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2 text-gray-800">
                  {post.Judul}
                </div>
                <div>
                  <Button className="text-sm text-slate font-sans">
                    <a href={`detail/${post.id}`}>Detail nya</a>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}

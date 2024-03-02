import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardBody, CardFooter } from "@chakra-ui/react";
import { supabase } from "../config/supabase.js";
export default function Materi() {
  const [getData, setGetData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function init() {
      try {
        const { data, error } = await supabase.from("postingan").select("*");

        if (error) {
          console.error(error.message);
        }
        setGetData(data);

        for(const gambars of data ) {
          const res = await supabase.storage.from("gambar/images").getPublicUrl(gambars.gambar)

          if(res.error) {
            console.error(res.error.message)
          } else {
            console.log(res.data.publicUrl)
            gambars.gambar = res.data.publicUrl
            console.log(res.data.publicUrl)
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
            <div key={post.id}>
              <Card>
                <CardHeader>{post.Judul}</CardHeader>
                <CardBody>
                  <h1>{post.Deskripsi}</h1>
                  <img src={post.gambar} />
                </CardBody>
                <CardFooter></CardFooter>
              </Card>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
export default function DetailMateri() {
  const [data, getData] = useState(null);
  const { materiId } = useParams();

  useEffect(() => {
    async function init() {
        try {
            const {data: materiData, error} = await supabase.from("postingan").select("*").eq("id", materiId).single()

            if(error) {
                console.error(error.message)
                return
            }
            getData(materiData)
        }
    }
  });
  return (
    <>
      <main>
        <section></section>
      </main>
    </>
  );
}

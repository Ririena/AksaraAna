import React, { useState, useEffect } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  Card,
  Input,
  Stack,
} from "@chakra-ui/react";
import { supabase } from "../../config/supabase";
import { Textarea, Input as NInput } from "@nextui-org/react";
import { v4 as uuidv4 } from "uuid";

export default function FAB() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [user, setUser] = useState(null);
  const [judul, setJudul] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [gambar, setGambar] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();

        const { data, error } = await supabase
          .from("user")
          .select("*")
          .eq("email", user.email)
          .single();

        if (error) {
          throw new Error(error.message);
        }
        setUser(data);
        console.log(data);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchUser();
  }, []);

  const handleSave = async () => {
    // Pastikan pengguna telah login sebelum menyimpan
    if (!user) {
      console.error("Pengguna belum login.");
      return;
    }

    const imageName = `${uuidv4()}.${gambar.name.split(".").pop()}`;

    // Simpan gambar ke penyimpanan
    const { data: fileData, error: fileError } = await supabase.storage
      .from("gambar")
      .upload(`images/${imageName}`, gambar);
    if (fileError) {
      console.error("Error uploading file:", fileError.message);
      return;
    }

    // Lakukan pengolahan data, misalnya simpan ke database
    const newData = {
      id_user: user.id,
      Judul: judul,
      Deskripsi: deskripsi,
      gambar: imageName, // Simpan referensi ke gambar dari penyimpanan
    };

    // Simpan data ke database menggunakan Supabase
    const { data, error } = await supabase.from("postingan").insert([newData]);
    if (error) {
      console.error("Error saving data:", error.message);
    } else {
      console.log("Data saved successfully:", data);
      onClose();
    }
  };

  return (
    <>
      {user ? (
        <div className="fixed bottom-4 right-4">
          <button
            onClick={onOpen}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full shadow-lg"
          >
            +
          </button>
        </div>
      ) : (
        <div></div>
      )}

      {/* MODAL*/}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Buat Postingan</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Card className="p-4 bg-gray-100 rounded-lg">
              <form>
                <Stack spacing={6}>
                  <div>
                    <h1 className="ml-4 font-bold text-xl">Judul</h1>
                    <Input
                      type="text"
                      label="Judul"
                      placeholder="Masukkan judul postingan"
                      variant="bordered"
                      color="primary"
                      borderRadius="lg"
                      borderBottomWidth="2px" // Tambahkan garis bawah
                      value={judul}
                      onChange={(e) => setJudul(e.target.value)}
                    />
                  </div>
                  <Textarea
                    label="Deskripsi"
                    placeholder="Masukkan deskripsi postingan"
                    variant="bordered"
                    color="primary"
                    borderRadius="lg"
                    value={deskripsi}
                    onChange={(e) => setDeskripsi(e.target.value)}
                  />
                  <Stack direction="row" spacing={4} alignItems="center">
                    <Input
                      type="file"
                      display="none"
                      id="fileInput"
                      onChange={(e) => setGambar(e.target.files[0])}
                    />
                    <label htmlFor="fileInput">
                      <Button
                        as="span"
                        colorScheme="blue"
                        cursor="pointer"
                        _hover={{ bg: "blue.600" }}
                        borderRadius="lg"
                        py={2}
                        px={4}
                      >
                        Unggah Gambar
                      </Button>
                    </label>
                  </Stack>
                </Stack>
              </form>
            </Card>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Batal
            </Button>
            <Button colorScheme="blue" onClick={handleSave}>
              Simpan
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

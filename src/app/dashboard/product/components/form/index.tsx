"use client";
import { UploadCloud } from "lucide-react";
import styles from "./styles.module.scss";
import { ChangeEvent, useState } from "react";
import Image from "next/image";
import { Button } from "@/app/dashboard/components/button";

export function Form() {

    const [image,setImage] = useState<File>();
    const [previewImage,setpreviewImage] = useState("");

    const handleFile = (e:ChangeEvent<HTMLInputElement>) =>{
        if(e.target.files && e.target.files[0]){
            const image = e.target.files[0]

            if(image.type !== "image/jpeg" && image.type !== "image/png"){
                console.log("formato Proibido")
                return
            }

            setImage(image);
            setpreviewImage(URL.createObjectURL(image));

            console.log(image)

        }

    }
  return (
    <main className={styles.container}>
      <h1>Novo Produto</h1>

      <form className={styles.form}>
        <label className={styles.labelImage}>
          <span>
            <UploadCloud size={24} color="#fff" />
          </span>
          <input type="file" accept="image/png,image/jpeg" required onChange={handleFile} />

          {previewImage &&(
            <Image alt="imagem de preview" src={previewImage} className={styles.preview} fill={true} quality={100} priority={true} />

          )}
        </label>

        <select name="category" >
            <option value="1" key={1}>Pizza</option>
            <option value="2" key={2}>Pizza</option>
        </select>

        <input type="text" name="name" placeholder="Digite o nome do produto" required className={styles.input} />
        <input type="text" name="price" placeholder="Digite o nome do preco" required className={styles.input} />

        <textarea className={styles.input} placeholder="digite a descricao do produto.." required name="description" ></textarea>
     
     <Button name="Cadastrar Produto"  />
     
      </form>
    </main>
  );
}

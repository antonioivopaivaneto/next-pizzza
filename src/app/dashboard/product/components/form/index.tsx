"use client";
import { UploadCloud } from "lucide-react";
import styles from "./styles.module.scss";
import { ChangeEvent, useState } from "react";
import Image from "next/image";
import { Button } from "@/app/dashboard/components/button";
import { api } from "@/services/api";
import { headers } from "next/headers";
import getCookieClient from "@/lib/cookieClient";
import { error } from "console";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface CategoryProps{
  id:string;
  name:string
}

interface Props{
  categories:CategoryProps[]
}

export function Form({categories}:Props) {

  const router = useRouter()

    const [image,setImage] = useState<File>();
    const [previewImage,setpreviewImage] = useState("");

    async function handleRegisterProduct(formData:FormData){
      const category = formData.get("category")
      const name = formData.get("name")
      const price = formData.get("price")
      const description = formData.get("description")

      if(!name || !price || !description || !image) {
        toast.warning("preecha os campos");
 
        return false;

      }

      console.log(name,price,description,category)

      const data = new FormData();

      data.append("name",name);
      data.append("price",price);
      data.append("description",description);
      data.append("category_id",categories[Number(category)].id);
      data.append("file",image);

      const token = getCookieClient();

      await api.post("/product",data,{
        headers:{
          Authorization:`Bearer ${token}`
        }
      }).catch((err) =>{
        toast.warning("falha");
      })

      toast.success("Produto Registrado com sucesso");
      router.push("/dashboard")
    
    }



    const handleFile = (e:ChangeEvent<HTMLInputElement>) =>{
        if(e.target.files && e.target.files[0]){
            const image = e.target.files[0]

            if(image.type !== "image/jpeg" && image.type !== "image/png"){
                console.log("formato Proibido")
                toast.warning("formato nao permitido")
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

      <form className={styles.form} action={handleRegisterProduct}>
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
          {categories.map((category,index) =>(
          
          <option value={index} key={category.id}>{category.name}</option>

          ))}
            
        </select>

        <input type="text" name="name" placeholder="Digite o nome do produto" required className={styles.input} />
        <input type="text" name="price" placeholder="Digite o nome do preco" required className={styles.input} />

        <textarea className={styles.input} placeholder="digite a descricao do produto.." required name="description" ></textarea>
     
     <Button name="Cadastrar Produto"  />
     
      </form>
    </main>
  );
}

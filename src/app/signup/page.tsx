import Link from "next/link";
import styles from "./../page.module.scss";
import logo from '/public/logo.svg';
import Image from 'next/image';
import {api} from '@/services/api';
import { redirect } from "next/navigation";

export default function Signup() {

   async function handleRegister( formData:FormData){
        "use server"


        const name = formData.get("nome")
        const email = formData.get("email")
        const password = formData.get("password")

        if(name === "" || email === "" || password ===""){
            console.log("Prenmcher todos os campos")
            return false
        }

        try{
            await api.post("/users",{
                name,email,password
            })


        }catch(err){
            console.error("Error", err)
        }
        redirect("/")

    }



  return (
    <>
     <div className={styles.containerCenter}>
      <Image 
        src={logo}
        alt="Logo do Site" />


        <section className={styles.login}>
            <h1>Criando seu Acesso</h1>
          <form action={handleRegister}>
            <input type="text"
            required
            name="nome"
            placeholder="Digite seu Nome"
            className={styles.input} />

            <input type="email"
            required
            name="email"
            placeholder="Digite seu Email"
            className={styles.input} />

            <input type="password"
            required
            name="password"
            placeholder="Digite seu Passowrd"
            className={styles.input} />
      

          <button className={styles.button} type="submit">Acessar</button>

          </form>
          <Link className={styles.text} href="/">Já possui uma conta. Entrar</Link>
        </section>
    </div>
    </>
  );
}

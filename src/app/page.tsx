import Link from "next/link";
import styles from "./page.module.scss";
import logo from '/public/logo.svg';
import Image from 'next/image';
import { api } from "@/services/api";
import Form from 'next/form'
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export default function Home() {

  async function handleLogin(formData: FormData){
    "use server"


    const email = formData.get("email");
    const password = formData.get("password");

    if(email === "" || password === "") return false

    try{

      const response = await api.post("/session",{
        email,password
      })

      if(!response.data.token) return false

      console.log(response.data)

      const expressTime = 60 * 60 *24 *30 *1000;

      const cookieStore = await cookies();
      cookieStore.set("session",response.data.token,{
        maxAge:expressTime,
        path:"/",
        httpOnly:false,
        secure: process.env.NODE_ENV==="production"
      })

    }catch(err){
      console.log(err)
      return

    }

    redirect("/dashboard")


  }
  return (
    <>
    <div className={styles.containerCenter}>
      <Image 
        src={logo}
        alt="Logo do Site" />


        <section className={styles.login}>
          <form action={handleLogin}>
            <input type="email"
            required
            name="email"
            placeholder="Digite seu Email"
            className={styles.input} />

            <input type="password"
            required
            name="password"
            placeholder="Digite seu password"
            className={styles.input} />

          <button className={styles.button} type="submit">Acessar</button>
          </form>


          <Link className={styles.text} href="/signup">Nao possui uma conta. cadastre-se</Link>
        </section>
    </div>
    </>
    
  );
}

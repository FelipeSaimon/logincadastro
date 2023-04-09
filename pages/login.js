// Componente que renderiza a tela de login

import LoginCard from "@/src/components/Login/LoginCard"
import styles from "../styles/login.module.css"
import Input from "@/src/components/input/input"
import Button from "@/src/components/button/button"
import Link from "next/link"
import { useState } from "react"
import router from "next/router"
import { setCookie } from "cookies-next"

export default function LoginPage() {
    const [formLogin, setFormLogin] = useState({
        email: '',
        password: ''
    })

    const handlerLogin = (event, name) =>{
        setFormLogin({
            ...formLogin,
            [name]: event.target.value
        })
    }
    
    const handlerFormSubmit = async (event) => {
        try {
            event.preventDefault
            const response = await fetch(`api/user/login`, {
                method: 'POST',
                body: JSON.stringify(formLogin)
            })

            const json = await response.json()
            console.log(response.status)
            
            if(response.status !== 200) throw new Error(json)

            setCookie('authorization', json)
            router.push('/')

        } catch (error) {
            
        }
    }

    return (
        <div className={styles.background}>
            <LoginCard title={"Entre com sua conta"}>
                {/* Login Page */}
                <form onSubmit={handlerFormSubmit} className={styles.form}>
                    <Input type="email" placeholder="Seu email aqui..."
                        value={formLogin.email}
                        onChange={(e) => {handlerLogin(e, 'email')}}
                    />
                    <Input type="password" placeholder="Sua senha"
                        value={formLogin.password}
                        onChange={(e) => {handlerLogin(e, 'password')}}
                    />
                    <Button>Entrar</Button>
                    <Link href="/cadastro">Ainda não possui conta?</Link>
                </form>
            </LoginCard>
        </div>
    )
}
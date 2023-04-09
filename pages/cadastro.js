import LoginCard from "@/src/components/Login/LoginCard"
import styles from "../styles/login.module.css"
import Input from "@/src/components/input/input"
import Button from "@/src/components/button/button"
import Link from "next/link"
import { useState } from "react"
import { setCookie } from "cookies-next"
import { useRouter } from "next/router"

export default function CadastroPage() {
    const [formData, setFormData] = useState({
        nome: '',
        email: '',
        password: ''
    })

    //Caso queira exibi no frontend algum erro
    const [error, setError] = useState('')
    //Para trabalhar com as rotas
    const router = useRouter()

    // Pega o evento de digitação do teclado
    const handlerFormEdit = (event, name) => {
        setFormData({
            ...formData,
            [name]: event.target.value
        })
        // console.log(formData)
    }
    
    const handlerForm = async (event) =>{
        
        // console.log(formData)

        try {
            event.preventDefault();
            // Envia os dados do formData para o backend
            const response = await fetch(`api/user/cadastro`, {
                method: 'POST',
                body: JSON.stringify(formData)
            })

            //Lendo os dados do formData
            const json = await response.json()
            // console.log(response.status)
            // console.log(json)

            //Tratando erros
            if(response.status !== 201) throw new Error(json)

            setCookie('authorization', json)
            router.push('/')

        } catch (error) {
            setError(error.message)
        }
    }

    return (
        <div className={styles.background}>
            <LoginCard title={"Crie sua conta"}>

                <form onSubmit={handlerForm} className={styles.form}>
                    <Input type="text" placeholder="Seu nome aqui..."
                    required
                    value={formData.nome}
                    onChange={(e) => {handlerFormEdit(e, 'nome')}}
                    />
                    <Input type="email" placeholder="Seu email aqui..." 
                    required
                    value={formData.email}
                    onChange={(e) => {handlerFormEdit(e, 'email')}}
                    />
                    <Input type="password" placeholder="Sua senha..." 
                    required
                    value={formData.password}
                    onChange={(e) => {handlerFormEdit(e, 'password')}}
                    />
                    <Button>Cadastrar</Button>
                    {error && <p>{error}</p>}
                    <Link href="/login">Já possui conta?</Link>
                </form>
            </LoginCard>
        </div>
    )

}
import { getCookie } from 'cookies-next'
import { verificarToken } from '@/services/users'

export default function Home() {
  return (
    <>
      <div>
        perfil do usuario
      </div>
    </>
  )
}

  export const getServerSideProps =  async ({req, res}) =>{
  try {
    const token = getCookie('authorization', {req, res})

    // console.log(token)
    if(!token) throw new Error('Token inválido')
    verificarToken(token)

    return{
      props:{}
    }
  } catch (error) {
    //Caso o token for inválido redirecionar para pagina de login com redirect
    return{
      redirect:{
        permanent: false,
        destination: '/login'
      },
      props:{}
    }
  }
}
import jwt from 'jsonwebtoken'

let users = [] // Essa variavel cria um array de usuarios (array de objetos?)

//busca a chave secreta em env 
// const SECRET = process.env.JWT_SECRET
const SECRET = process.env.TOKEN_SECRET

//Passando as infos do usuario, a funcao irá gerar um token para esse usuario
function createToken(user){
    return jwt.sign({ email: user.email, nome: user.nome }, SECRET) 
}

// Ler o token criado e verifica se é válido
function readToken(token){
    try {
        return jwt.verify(token, SECRET)
    } catch (error) {
        throw new Error('token invalido')
    }
}

//Funcao especifica para verificar se o token é válido, caso válido permite o acesso a página
export function verificarToken(token){
    return readToken(token)
}

export function cadastrar(body){
    //Verificando ser existe usuario cadastrado
    const user = users.find(({ email }) => email === body.email)
    //Se tiver cadastrado, retorna um erro
    if(user){ throw new Error('Usuario já cadastrado') }

    //Caso nao tenha o user cadastrado, cadastra e carrega no array (banco de dados)
    users.push(body)

    // return body
    const token = createToken(body)
    return token
}
 
export function logar(body){
    //Verificando ser existe usuario cadastrado
    const user = users.find(({ email }) => email === body.email)
    //Se o usuario pesquisado não tiver cadastrado retorna um erro
    if(!user) { throw new Error('Usuario não encontrado') }

    //Verificando se a senha digitada é igual a cadastrada, caso não, retorna um erro
    if(user.password !== body.password){ throw new Error("Senha incorreta!")}

    
    // return body
    const token = createToken(user)
    return token
}
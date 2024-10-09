import { useState } from "react";
import { useNavigate } from 'react-router-dom';

export function HoorsUsuario() {
    const navigate = useNavigate();
    const [dados,setUsuario] = useState(
        {
        cpf: '',nome: '',sexo: '',dtNascimento:'',
        eMail: '',senha: '', cep: '',
        logradouro: '', complemento: '',
        bairro: '', cidade: '', estado:'',
        altitude:'',latitude:'',longitude:'',
        codIBGE:''
        }
    )

    async function handleBuscaCep() {
        //verifico se o cep foi digitado corretamente
        if (dados.cep?.length !== 8) {return}

        await fetch(`https://cep.awesomeapi.com.br/json/${dados.cep}`).then(res => 
            res.json()).then(data => {
                dados.logradouro = data.address
                dados.bairro = data.district 
                dados.cidade = data.city
                dados.estado = data.state
                dados.longitude = data.lng
                dados.latitude = data.lat
                dados.codIBGE = data.city_ibge
                setUsuario(dados)  
        })  
    }
 
    //*********************************************************/
    //********** consulta usuario no localStorage ****************/
    //*********************************************************/
    
    function handleConsultaUsuario() {
        const usuarioStorage = localStorage.getItem('Usuarios')

        JSON.parse(usuarioStorage).forEach(usuario => {
            if(usuario.cpf === dados.cpf){
                alert("CPF já cadastrado!!")
                return
            } 
        })
    }

    //*********************************************************/
    //********** grava usuario no localStorage ****************/
    //*********************************************************/
 
    function handleCadastrar(){
        if(dados.cpf===''){
            alert('Favor informar CPF')
            return
        }
        else if(dados.nome===''){
            alert('Favor informar Nome')
            return
        } 
        else if(dados.eMail===''){
            alert('Favor informar Email')
            return
        } 
        else if(dados.senha===''){
            alert('Favor informar Senha')
            return
        } 
        else if(dados.cep===''){
            alert('Favor informar CEP')
            return
        } 
 
        const usuarioStorage = localStorage.getItem('Usuarios')

        if(usuarioStorage) {
            let usuarios = JSON.parse(usuarioStorage)
            //verifica se o cpf ja foi digitado
            let usuarioNovo = true
            JSON.parse(usuarioStorage).forEach(function (usuario, i) {
                if(usuario.cpf === dados.cpf) {
                    usuarios[i] = dados
                    usuarioNovo = false
                }
            })  
            
            if(usuarioNovo) {
                usuarios.push(dados)
                localStorage.setItem('Usuarios', JSON.stringify(usuarios))
            }else{
                alert('Usuário já cadastrado')
                return
            }            
        } else {
            let usuarios =[dados]
            localStorage.setItem('Usuarios', JSON.stringify(usuarios))
        }
        //return window.location.reload(false)
        navigate("/dashboard")
    } 

    return {
        dados,
        setUsuario,
        handleBuscaCep,
        handleCadastrar,
        handleConsultaUsuario        
    }
}
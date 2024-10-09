import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function HoorsLocalidade() {
    const navigate = useNavigate()
    const [localidade,setLocalidade] = useState({
        local:'',pratica:'',descri:'',cep:'',rua:'',bairro:'',
        complemento:'',cidade:'',codIbge:'',altitude:'',
        estado:'',latitude:'',longitude:'',cpf:'',nome:''        
    })

    function usuarioIn() {
        navigate("/usuario")
    } 

    function dashboardIn() {
        navigate("/dashboard")
    }  

    function locaisIn() {
        navigate("/locais")
    } 

    async function handleBuscaCep() {
        //verifico se o cep foi digitado corretamente
        if (localidade.cep?.length !== 8) {return}

        await fetch(`https://cep.awesomeapi.com.br/json/${localidade.cep}`).then(res => 
            res.json()).then(data => {
                localidade.rua = data.address
                localidade.bairro = data.district 
                localidade.cidade = data.city
                localidade.estado = data.state
                localidade.longitude = data.lng
                localidade.latitude = data.lat
                localidade.codIbge = data.city_ibge
                setLocalidade(localidade)  
        })  
    } 
    
    //*********************************************************/
    //********** grava usuario no localStorage ****************/
    //*********************************************************/
 
    function handleCadastrar(){
        if(localidade.local===''){
            alert('Favor informar local do Exercícios')
            return
        } else if(localidade.pratica===''){
            alert('Favor informar práticas esportivas')
            return
        } else if(localidade.cep===''){
            alert('Favor informar CEP')
            return
        }

        const localidadeStorage = localStorage.getItem('Localidades')
        const user = JSON.parse(localStorage.getItem('UserLog'))
        let listalocalidade = []
        
        console.log(user.cpf)

        localidade.cpf = user.cpf
        localidade.nome = user.nome

        if(localidadeStorage) {
            listalocalidade = JSON.parse(localidadeStorage)
            listalocalidade.push(localidade)
            localStorage.setItem('Localidades', JSON.stringify(listalocalidade))
        } else {
            listalocalidade = [localidade]
            localStorage.setItem('Localidades', JSON.stringify(listalocalidade))
        }

        return window.location.reload(false)
    }     

    return {
        localidade,
        setLocalidade,
        usuarioIn,
        dashboardIn,
        locaisIn,
        handleBuscaCep,
        handleCadastrar
    }
}
import { createContext, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types'
import dataUsuario from '../UsuariosJson.json'
import dataLocalidade from '../LocalidadeJson.json'

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user,setUser] = useState(null);

  //*********************************************************/
  //********** verifica usuario esta logado  ****************/
  //*********************************************************/
  useEffect(() => {
    const loadingStoreData = () => {
      const storageUser = localStorage.getItem("@Auth:user");
      const storageToken = localStorage.getItem("@Auth:token");

      if (storageUser && storageToken) {
        setUser(storageUser);
      }
    };
    loadingStoreData();
  }, []);
  
  //*********************************************************/
  //********** carrega usuario no localStorage ****************/
  //*********************************************************/
  useEffect(() => {
    const carregaData = () => {
      const usuarioStorage = localStorage.getItem('Usuarios');
      if (!usuarioStorage) {
          localStorage.setItem('Usuarios', JSON.stringify(dataUsuario))
      }

      const localidadeStorage = localStorage.getItem('Localidades');
      if (!localidadeStorage) {
          localStorage.setItem('Localidades', JSON.stringify(dataLocalidade))
      }     
    };
    carregaData()
  }, [])

  const signIn = async (data) => {
    const usuarioStorage = localStorage.getItem('Usuarios');
    let isAcesso = false;
    setUser(null)

    console.log("AA")

    JSON.parse(usuarioStorage).forEach(usuario => {
      if ((usuario.eMail === data.email) && (usuario.senha === data.password)) {
        localStorage.setItem("@Auth:user", JSON.stringify(usuario));
        localStorage.setItem("@Auth:token", JSON.stringify(data.password));
        setUser(localStorage.getItem("@Auth:user"));
        isAcesso = true;
      }
    });

    if (!isAcesso) { alert('E-mail ou senha incorreta!!'); }
};

  const singOut = () => {
    localStorage.clear();
    setUser(null);
    return <Navigate to="/" />;
  };

  return (
    <AuthContext.Provider 
      value={{
        user,
        signIn,
        singOut,
        signed: !!user
      }}
      >
        {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
}
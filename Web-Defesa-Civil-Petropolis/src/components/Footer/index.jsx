import { Link, useNavigate } from 'react-router-dom';
import TamanhoFont from '../TamanhoFont';
import './styles.css';

export default function Footer() {
    const navi = useNavigate()

    const deslogar = () => {
        localStorage.removeItem("user")
        localStorage.removeItem("authToken")
        navi("/login")
    }

    return (
        <footer className='footer'>
            <TamanhoFont />

            {localStorage.getItem("user") && <div style={{ display: 'flex' }}>
                <Link to="/EditarQuemSomos">
                    <p>QUEM SOMOS</p>
                </Link>

                <Link to="/UsuarioInfo">
                    <p>PAINEL DE USUARIO</p>
                </Link>

                <div style={{ cursor: 'pointer' }} tabIndex={0} onKeyDown={() => { (event.key === "Enter") && (deslogar()) }}>
                    <p onClick={deslogar}>SAIR</p>
                </div>
            </div>}
        </footer>
    )
}
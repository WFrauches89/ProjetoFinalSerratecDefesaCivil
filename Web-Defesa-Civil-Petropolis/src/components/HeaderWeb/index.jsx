import { useState } from "react";
import logo2 from "../../assets/logo.png"
import icon from "../../assets/Trailing-Icon.png"
import './styles.css'
import { Link, useNavigate } from "react-router-dom";


export const HeaderWeb = () => {
    const [boxInformativo, setBoxInformativo] = useState(false);
    const [boxApoio, setBoxApoio] = useState(false);
    const [boxQuemSomos, setBoxQuemSomos] = useState(false);
    const navi = useNavigate();

    const openBoxInformativo = () => {
        setBoxInformativo(!boxInformativo);
    };

    const openBoxApoio = () => {
        setBoxApoio(!boxApoio);
    };

    const openBoxQuemSomos = () => {
        setBoxQuemSomos(!boxQuemSomos);
    };

    const closeDropdowns = () => {
        setBoxInformativo(false);
        setBoxApoio(false);
    };

    const preventClose = (e) => {
        e.stopPropagation();
    };

    const handleEnterKey = (e, callback) => {
        if (e.key === "Enter") {
            callback();
        }
    };

    const navigateTo = (route) => {
        navi(route);
    };

    return (
        <div id="containerNavBar">
            <div id="containerLogoeNome" onClick={() => navi('/')} style={{ cursor: 'pointer' }}>
                <div style={{ width: "73px", height: "73px", marginLeft: "20px", marginRight: "20px" }}>
                    <img src={logo2} style={{ width: "100%", height: "100%", objectFit: "contain" }} />
                </div>
                <p id="tituloDefsaCivil">DEFESA CIVIL DE PETRÓPOLIS</p>
            </div>

            {localStorage.getItem("user") && <nav style={{ display: "flex", alignItems: "center" }}>
                <div className="opcaoNav" onMouseEnter={openBoxInformativo} onMouseLeave={closeDropdowns} tabIndex={0} onKeyDown={(e) => handleEnterKey(e, openBoxInformativo, localStorage.setItem("ediçao", 0))}>

                    <p>INFORMATIVOS</p>
                    <img src={icon} />

                    {boxInformativo && (
                        <div className="dropdown-container" onMouseEnter={preventClose}>
                            <div className="dropdown-content">
                                <Link to="/CadastroInformeReleases" tabIndex={0} onClick={() => { openBoxInformativo; localStorage.setItem("ediçao", 0) }} onKeyDown={(e) => handleEnterKey(e, () => navigateTo("/CadastroInformeReleases", localStorage.setItem("ediçao", 0)))} className="linkNav">Cadastrar</Link>
                                <Link to="/ListarInformesReleazes" tabIndex={0} onKeyDown={(e) => handleEnterKey(e, () => navigateTo("/ListarInformesReleazes"))} className="linkNav">Visualizar</Link>
                            </div>
                        </div>
                    )}
                </div>

                <div className="opcaoNav" onMouseEnter={openBoxApoio} onMouseLeave={closeDropdowns} tabIndex={0} onKeyDown={(e) => handleEnterKey(e, openBoxApoio)}>
                    <p>PONTOS DE APOIO</p>
                    <img src={icon} />

                    {boxApoio && (
                        <div className="dropdown-container" onMouseEnter={preventClose}>
                            <div className="dropdown-content" style={{ transform: "translateX(-120%)" }}>
                                <Link to="/CadastroPontoDeApoio" tabIndex={0} onKeyDown={(e) => handleEnterKey(e, () => navigateTo("/CadastroPontoDeApoio"))} className="linkNav">Cadastrar</Link>
                                <Link to="/VisualizarPontoDeApoio" tabIndex={0} onKeyDown={(e) => handleEnterKey(e, () => navigateTo("/VisualizarPontoDeApoio"))} className="linkNav">Visualizar</Link>
                            </div>
                        </div>
                    )}
                </div>



            </nav>}
        </div>
    )
}
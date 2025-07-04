import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { GoHome } from "react-icons/go"
import { RiSearchLine } from "react-icons/ri"
import { BiArchive } from "react-icons/bi"
import { MdOutlineDownloading, MdMenu } from "react-icons/md"
import { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import spotifyLogo from '../img/Spotify_Logo.png';

export default function Menu() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [usuarioActivo, setUsuarioActivo] = useState(null);

    useEffect(() => {
        const user = sessionStorage.getItem('usuario');

        setUsuarioActivo(user);
    }, []); 

    return (
        <ContainerMenu>
            <ContainerLogo>
                <Img src={spotifyLogo} />
            </ContainerLogo>

            <AlwaysVisibleItems>
                <ContainerHome>
                    <IconHome />
                </ContainerHome>

                <ContainerSearch>
                    <IconRiSearchLine />
                    <InputSearch type='text' placeholder='¿Qué quieres reproducir?' />
                    <IconBiArchive />
                </ContainerSearch>
            </AlwaysVisibleItems>

            <HamburgerButton onClick={() => setIsMenuOpen(!isMenuOpen)}>
                <MdMenu size={24} />
            </HamburgerButton>

            <ContainerOptions $isMenuOpen={isMenuOpen}>
                <NavGroup>
                    <NavList>
                        <ItemNav><Link to="/Premium" style={{ color: "#fff", textDecoration: "none" }}>Premium</Link></ItemNav>
                        <ItemNav><Link to="/Suport" style={{ color: "#fff", textDecoration: "none" }}>Asistencia</Link></ItemNav>
                        <ItemNav><Link to="/Download" style={{ color: "#fff", textDecoration: "none" }}>Descargar</Link></ItemNav>
                    </NavList>
                </NavGroup>

                    {usuarioActivo ? (
                        <>
                            <ContainerMenuItems>
                            <NavList>
                                <ItemNav>
                                <MdOutlineDownloading size={20} />
                                Instalar app
                                </ItemNav>
                            </NavList>
                            </ContainerMenuItems>
                            <StyledLinkButton to="/" onClick={() => {
                                
                                let timerInterval;
                                Swal.fire({
                                title: "Cerrado sesión...",
                                html: "Esperamos que vuelvas pronto",
                                timer: 2000,
                                timerProgressBar: true,
                                willClose: () => {
                                    clearInterval(timerInterval);
                                }
                                }).then((result) => {
                                if (result.dismiss === Swal.DismissReason.timer) {
                                    console.log("I was closed by the timer");
                                }
                                });

                                sessionStorage.removeItem('usuario');
                                setUsuarioActivo(null);
                                }}>
                                Cerrar sesión
                            </StyledLinkButton>
                        </>
                        ) : (
                        <>
                            <ContainerMenuItems>
                            <NavList>
                                <ItemNav>
                                <MdOutlineDownloading size={20} />
                                Instalar app
                                </ItemNav>
                                <ItemNav>
                                <Link to="/register" style={{ color: "#fff", textDecoration: "none" }}>
                                    Registrarte
                                </Link>
                                </ItemNav>
                            </NavList>
                            </ContainerMenuItems>
                            <StyledLinkButton to="/login">Iniciar sesión</StyledLinkButton>
                        </>
                        )}
            </ContainerOptions>
        </ContainerMenu>
    )
}

const ContainerMenu = styled.header`
    display: flex;
    width: 100%;
    min-height: 7vh;
    flex-direction: row;
    align-items: center;
    position: relative;
    flex-wrap: wrap;
    
    @media (max-width: 1300px) {
        padding: 0.5rem 0;
    }
`

const ContainerLogo = styled.section`
    width: 25%;
    min-width: 50px;
    
    @media (max-width: 1300px) {
        width: auto;
        flex-grow: 1;
    }
`

const Img = styled.img`
    width: 2.5rem;
    margin: 1.1rem;
    
    @media (max-width: 1300px) {
        padding-right: 1rem;
    }
`

const AlwaysVisibleItems = styled.div`
    display: flex;
    align-items: center;
    flex-grow: 1;
    justify-content: end;
    @media (max-width: 1300px) {
        max-width: 65%;
    }
`

const ContainerHome = styled.section`
    background-color: #1f1f1f;
    border-radius: 100%;
    margin-left: 10px;
    padding: 0.3rem;
    flex-shrink: 0;
`

const ContainerOptions = styled.div`
    display: flex;
    align-items: center;
    margin-left: auto;
    
    @media (max-width: 1300px) {
        width: 100%;
        order: 1;
        display: ${props => props.$isMenuOpen ? 'flex' : 'none'};
        flex-direction: column;
        align-items: stretch;
        padding: 0.5rem;
        background-color: #121212;
        margin-top: 1rem;
    }
`

const ContainerSearch = styled.section`
    width: 60%;
    height: 48px;
    background-color: #1f1f1f;
    border: 1px solid #1f1f1f;
    border-radius: 5rem;
    display: flex;
    margin-left: 5px;
    margin-right: 5px;
    padding: 0rem 0.8rem 0.3rem 0.3rem;
    flex-shrink: 1;
    min-width: 200px;
    
    @media (max-width: 1300px) {
        width: 100%;
        max-width: 400px;
    }
`

const InputSearch = styled.input`
    background-color: #1f1f1f;
    color: #a3a3a3;
    font-weight: bold;
    font-size: 1rem;
    border: 0px;
    border-right: 1px solid #aca99f;
    padding: 0.3rem;
    margin: 0.5rem 0.5rem 0.5rem 0rem;
    flex: 1;
    min-width: 120px;
    
    &::placeholder {
        color: #aca99f;
    }
`

const ItemNav = styled.li`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-weight: bold;
    list-style: none;
    cursor: pointer;
    white-space: nowrap;
    padding: 0.5rem;
    
    @media (max-width: 1300px) {
        justify-content: center;
    }
`

const StyledLinkButton = styled(Link)`
    padding: 0.5rem 1.5rem;
    border: 0px;
    border-radius: 50px;
    font-weight: 900;
    margin-left: auto;
    background-color: #ffffff;
    color: #000000;
    text-decoration: none;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 38px;
    cursor: pointer;
    width: fit-content;
    max-width: 25%;
    white-space: nowrap;
    
    @media (max-width: 1300px) {
        margin: 0.5rem auto;
        width: 80%;
    }
`

const ContainerMenuItems = styled.div`
    display: flex;
    align-items: center;
    gap: 1rem;
    
    @media (max-width: 1300px) {
        width: 100%;
        justify-content: center;
        margin: 0.5rem 0;
    }
`

const NavGroup = styled.div`
    display: flex;
    align-items: center;
    border-right: 2px solid #a3a3a3;
    padding-right: 0.5rem;
    margin-right: 0.5rem;
    
    @media (max-width: 1300px) {
        border-right: none;
        padding-right: 0;
        margin-right: 0;
        width: 100%;
        justify-content: center;
        border-bottom: 1px solid #a3a3a3;
        padding-bottom: 0.5rem;
        margin-bottom: 0.5rem;
    }
`

const NavList = styled.ul`
    display: flex;
    align-items: center;
    gap: 1rem;
    list-style: none;
    padding: 0;
    margin: 0;
    
    @media (max-width: 1300px) {
        flex-direction: column;
        width: 100%;
        gap: 0.5rem;
    }
`

const IconHome = styled(GoHome)`
    width: 40px;
    height: 38px;
    padding: 0.3rem;
`

const IconRiSearchLine = styled(RiSearchLine)`
    width: 2rem;
    height: auto;
    padding: 0.3rem;
    flex-shrink: 0;
`

const IconBiArchive = styled(BiArchive)`
    width: 2rem;
    height: 48px;
    padding: 0.3rem;
    flex-shrink: 0;
`

const HamburgerButton = styled.button`
    display: none;
    background: none;
    border: none;
    color: white;
    cursor: pointer;
    padding: 0.5rem;
    margin-left: auto;
    
    @media (max-width: 1300px) {
        display: block;
    }
`
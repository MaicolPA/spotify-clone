import { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { FaPlus } from "react-icons/fa";
import { TbWorld } from "react-icons/tb";
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { dbStore } from '../firebase/appConfig';
import { onSnapshot, collection } from "firebase/firestore";

// Nuevo componente Carousel reutilizable
function Carousel({ title, isArtist = false, collectionName }) {
    const scrollRef = useRef(null)
    const [isDragging, setIsDragging] = useState(false)
    const [startX, setStartX] = useState(0)
    const [scrollLeft, setScrollLeft] = useState(0)

    const handleMouseDown = (e) => {
        setIsDragging(true)
        setStartX(e.pageX - scrollRef.current.offsetLeft)
        setScrollLeft(scrollRef.current.scrollLeft)
    }
    
    const handleMouseMove = (e) => {
        if (!isDragging) return
        e.preventDefault()
        const x = e.pageX - scrollRef.current.offsetLeft
        const walk = (x - startX) * 1.5
        scrollRef.current.scrollLeft = scrollLeft - walk
    }
    
    const handleMouseUp = () => setIsDragging(false)
    const handleMouseLeave = () => setIsDragging(false)
    
    const scrollBy = (offset) => {
        scrollRef.current.scrollBy({ left: offset, behavior: 'smooth' })
    }

    const ItemComponent = isArtist ? CarouselItemArtist : CarouselItem

    const [songs, setSongs] = useState([])

    useEffect(() => {
        const unsubscribe = onSnapshot(
            collection(dbStore, collectionName),
            (snapshot) => {
                const array_songs = snapshot.docs.map((doc) => ({
                    ...doc.data(),
                    id: doc.id
                }))
                setSongs(array_songs)
            }
        );
        return () => unsubscribe(); // Cleanup
    }, [collectionName]);


    console.log(songs);

    return (
        <CarouselWrapper>
        <Arrow className="arrow-button left" onClick={() => scrollBy(-400)}>
            <FaChevronLeft />
        </Arrow>
        <Arrow className="arrow-button right" onClick={() => scrollBy(400)}>
            <FaChevronRight />
        </Arrow>

        <CarouselHeader>
            <h4>{title}</h4>
        </CarouselHeader>

        <CarouselContent
            ref={scrollRef}
            onMouseDown={handleMouseDown}
            onMouseLeave={handleMouseLeave}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
            className={isDragging ? 'dragging' : ''}
        >
            {songs.map((song, i) => (
                <ItemComponent key={song.id}>
                    <a href="#">
                        <img src={song.coverUrl} />
                        <div className="carousel__description">
                            <h3>{song.title}</h3>
                            <span>{song.subtitle || "Artista desconocido"}</span>
                        </div>
                    </a>
                </ItemComponent>
            ))}
        </CarouselContent>
        </CarouselWrapper>
    )
}

export default function Welcome() {
    const items = Array.from({ length: 20 }).map((_, i) => i)

    return (
        <ContentMain>
            <ContentMenu>
                <ContentLibrary>
                <p>Tu biblioteca</p>
                <IconFaPlus />
                </ContentLibrary>
                
                <ContentOption>
                <p>Crea tu primera lista</p>
                <SubTitle>Es muy fácil, y te echaremos una mano</SubTitle>
                <Button type="button" value='Crear lista'/>
                </ContentOption>

                <ContentOption>
                <p>Encuentra pódcasts que quieras seguir</p>
                <SubTitle>Te avisaremos cuando salgan nuevos episodios</SubTitle>
                <Button type="button" value='Explorar pódcasts'/>
                </ContentOption>

                <ContentNoticesWrapper>
                <ContentNotices>
                    <Notices>Legal</Notices>
                    <Notices>Centro de seguridad y privacidad</Notices>
                    <Notices>Políca de Privacidad</Notices>
                </ContentNotices>
                <ContentNotices>
                    <Notices>Cookies</Notices>
                    <Notices>Información sobre los anuncios</Notices>
                    <Notices>Accesibilidad</Notices>
                </ContentNotices>
                <ContentNotices>
                    <Notices>Cookies</Notices>
                </ContentNotices>
                <BottomLang>
                    <TbWorld size={20} />
                    Español de España
                </BottomLang>
                </ContentNoticesWrapper>
            </ContentMenu>
        
            <ScrollContainer>
                <ContentAlbumWrapper>
                    <Carousel title="Canciones en tendencia" collectionName="music" />
                    <Carousel title="Artistas Populares" collectionName="artists" isArtist={true} />
                    <Carousel title="Álbumes y sencillos populares" collectionName="albums" />
                </ContentAlbumWrapper>
            </ScrollContainer>
        </ContentMain>
    )
}

const ContentMain = styled.main`
    display: grid;
    grid-template-columns: 1fr 3fr;
    height: 91vh;
    overflow: hidden; // Contiene el scroll interno
    max-width: 100vw;
`
const ContentMenu = styled.section`
    background-color: #121212;
    border: 0px;
    border-radius: 0.5rem;
    width: 96%;
    height: 100%;
    margin: 0.5rem;
    margin-top: 0rem;    
    padding: 0.8rem;
    font-weight: 900;
    color: #fff;
    display: flex;
    flex-direction: column;
`
const ContentLibrary = styled.section `
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 8vh; 
`
const SubTitle = styled.p `
    font-weight: 100;

`
const IconFaPlus = styled(FaPlus)`
    margin-left: auto;
    cursor: pointer;
`
const ContentOption = styled.section`
    background-color: #1f1f1f;
    width: 100%;
    border: 0px;
    border-radius: 0.5rem;
    padding: 1rem;
    font-size: 0.9rem;
    margin-bottom: 1.5rem;
    display: flex;
    flex-direction: column;
`
const Button = styled.input`
    padding: 0.4rem 1rem;
    border: none;
    border-radius: 50px;
    font-weight: 900;
    width: fit-content;
    max-width: 100%;
    white-space: nowrap;
    cursor: pointer;
`;

const ContentNoticesWrapper = styled.div`
    margin-top: auto;
`
const ContentNotices = styled.section `
    display: flex;
    flex-direction: row;
    margin-right: auto;
`
const Notices = styled.p `
    font-size: 0.7rem;
    margin-left: 1rem;
    margin-bottom: 1rem;
`
const BottomLang = styled.section`
    display: flex;
    gap: 0.1rem;
    font-weight: bold;
    border: 1px solid #fff;
    border-radius: 5rem;
    box-sizing: border-box;
    width: fit-content;
    max-width: 100%;
    margin-left: 1rem;
    margin-bottom: 1rem;
    font-size: 0.9rem;
    padding: 0.3rem;
    cursor: pointer;
`
const ContentAlbumWrapper = styled.section`
    background: linear-gradient(0deg, #121212 0%, #1e1e1e 100%);
    border-radius: 0.5rem;
    padding: 1.5rem 0 1.5rem 2rem;
    display: flex;
    flex-direction: column;
    gap: 3rem;
    min-height: min-content; // Ajuste clave
`
const CarouselWrapper = styled.section`
    position: relative;
    min-height: 250px; // Altura mínima para cada carrusel
    padding-bottom: 1rem; // Espacio adicional

    &:hover .arrow-button {
        opacity: 1;
    }
`
const ScrollContainer = styled.div`
    overflow-y: auto;
    height: 100%;
    scrollbar-width: none; /* Para Firefox */
    -ms-overflow-style: none; /* Para IE y Edge */

    &::-webkit-scrollbar {
        display: none; /* Para Chrome, Safari y Opera */
    }
`
const CarouselHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
    color: #fff;
`
const Arrow = styled.button`
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    z-index: 2;
    background-color: #1f1f1f;
    border: none;
    color: #a7a7a7;
    cursor: pointer;
    font-size: 1rem;
    height: 35px;
    width: 35px;
    border-radius: 100%;
    opacity: 0; /* 👈 oculto por defecto */
    transition: opacity 0.3s ease;
    box-sizing: border-box;

    &.left {
        left: 0.5rem;
    }

    &.right {
        right: 0.5rem;
    }

    &:hover {
        background: rgba(0, 0, 0, 0.8);
    }
`

const CarouselContent = styled.ul`
    display: grid;
    grid-auto-flow: column;
    gap: 24px;
    overflow-x: auto;
    overflow-y: hidden;
    padding: 0;
    margin: 0;
    list-style: none;
    scrollbar-width: none;
    -ms-overflow-style: none;
    cursor: grab;
    height: auto;

    &::-webkit-scrollbar {
        display: none;
    }

    &.dragging {
        cursor: grabbing;
        a {
        pointer-events: none;
        }
    }
`

const CarouselItem = styled.li`
    a {
        display: flex;
        flex-direction: column;
        border-radius: 8px;
        text-decoration: none;
        color: white;
        transition: transform 0.3s ease;
        width: 175px;

        &:hover {
        background: #282828;
        }

    img {
    width: 100%;
    height: 175px;
    object-fit: cover;
    border-radius: 8px;
    margin-bottom: 1rem;
    }

    h3 {
    font-size: 1rem;
    margin: 0 0 0.25rem;
    }

    span {
    font-size: 0.85rem;
    color: #a7a7a7;
    }
    }
`

const CarouselItemArtist = styled.li`
    a {
        display: flex;
        flex-direction: column;
        border-radius: 8px;
        text-decoration: none;
        color: white;
        transition: transform 0.3s ease;
        width: 175px;

        &:hover {
        background: #282828;
        }

    img {
    width: 100%;
    height: 175px;
    object-fit: cover;
    border-radius: 100%;
    margin-bottom: 1rem;
    }

    h3 {
    font-size: 1rem;
    margin: 0 0 0.25rem;
    }

    span {
    font-size: 0.85rem;
    color: #a7a7a7;
    }
    }
`
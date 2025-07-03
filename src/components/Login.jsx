import { dbStore } from '../firebase/appConfig';
import { onSnapshot, collection } from "firebase/firestore";
import { useEffect, useRef, useState } from 'react'
import styled from "styled-components";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook, FaApple } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { auth } from '../firebase/appConfig';
import { signInWithEmailAndPassword } from "firebase/auth";
import Swal from 'sweetalert2'

export default function Login() {
    const [user, setUser] = useState([]);
    const { register, handleSubmit } = useForm();
    const Navigate = useNavigate()
    
    const onSubmit = async (data) => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, data.email, data.pass);
            console.log("Sesión iniciada:", userCredential.user);
            Swal.fire("Bienvenido", userCredential.user.email, "success");
            Navigate('/');
        } catch (error) {
            Swal.fire("Error", error.message, "error");
        }
    }; 

    return (
        <LoginContainer>
            <LoginBox>
                <Logo src="./src/img/Spotify_Logo.png" alt="Spotify Logo" />
                <Title>Inicia sesión en Spotify</Title>

                <SocialButtons>
                    <ButtonOutline><FcGoogle size={20} /> Continuar con Google</ButtonOutline>
                    <ButtonOutline><FaFacebook size={20} color="#1877F2" /> Continuar con Facebook</ButtonOutline>
                    <ButtonOutline><FaApple size={20} /> Continuar con Apple</ButtonOutline>
                </SocialButtons>

                <Divider />

                <InputGroup>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Label>Correo electrónico o nombre de usuario</Label>
                        <Input {...register('email')} type="text" placeholder="Correo electrónico o nombre de usuario" />
                        <Label>Contraseña</Label>
                        <Input {...register('pass')} type="password" placeholder="Contraseña" />
                        <ButtonGreen type="submit">Continuar</ButtonGreen>
                    </form> 
                </InputGroup>
                
                <SignupText>
                    ¿No tienes cuenta? <SignupLink href="#">Suscríbete a Spotify</SignupLink>
                </SignupText>
            </LoginBox>
        </LoginContainer>
    );
}

const LoginContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    padding: 1rem;
    background: linear-gradient(#121212, #000);
`;

const LoginBox = styled.div`
    background-color: #121212;
    padding: 2rem;
    border-radius: 10px;
    width: 100%;
    max-width: 600px;
    text-align: center;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);

    @media (max-width: 480px) {
        padding: 1.5rem;
    }
`;

const Logo = styled.img`
    width: 40px;
    margin-bottom: 1.5rem;

    @media (max-width: 480px) {
        width: 35px;
        margin-bottom: 1rem;
    }
`;

const Title = styled.h2`
    color: white;
    margin: 0 auto 1.5rem;
    font-weight: 900;
    font-size: 1.8rem;

    @media (max-width: 480px) {
        font-size: 1.5rem;
        margin-bottom: 1.2rem;
    }
`;

const SocialButtons = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    margin-bottom: 0.5rem;
`;

const InputGroup = styled.div`
    width: 100%;
    margin: 0 auto;
    text-align: left;
    justify-content: center;
    text-align: center;
`;

const ButtonOutline = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    width: 60%;
    margin: auto;
    background-color: transparent;
    border: 1px solid #a7a7a7;
    color: white;
    padding: 0.8rem;
    border-radius: 25px;
    font-weight: bold;
    cursor: pointer;
    transition: all 0.2s ease;
    font-size: 0.95rem;

    &:hover {
        background-color: #2a2a2a;
        border-color: white;
    }

    @media (max-width: 480px) {
        padding: 0.7rem;
        font-size: 0.9rem;
    }
`;

const Divider = styled.div`
    display: flex;
    align-items: center;
    margin: 1.5rem 0;
    color: #a7a7a7;
    font-size: 0.9rem;

    &::before, &::after {
        content: "";
        flex: 1;
        border-bottom: 1px solid #333;
        margin: 0 10px;
    }
`;

const Label = styled.label`
    color: white;
    font-weight: bold;
    display: block;
    margin-bottom: 0.5rem;
    font-size: 0.95rem;
`;

const Input = styled.input`
    width: 60%;
    padding: 0.9rem;
    border-radius: 5px;
    border: 1px solid #333;
    background-color: #1a1a1a;
    color: white;
    margin-bottom: 1.2rem;
    font-size: 0.95rem;
    transition: border-color 0.2s ease;

    &:focus {
        outline: none;
        border-color: #1ed760;
    }

    &::placeholder {
        color: #999;
    }

    @media (max-width: 480px) {
        padding: 0.8rem;
        margin-bottom: 1rem;
    }
`;

const ButtonGreen = styled.button`
    width: 50%;
    background-color: #1ed760;
    border: none;
    padding: 0.9rem;
    border-radius: 25px;
    color: black;
    font-weight: bold;
    cursor: pointer;
    margin: 1.5rem 0;
    font-size: 1rem;
    transition: background-color 0.2s ease;

    &:hover {
        background-color: #1fdf64;
        transform: scale(1.02);
    }

    &:active {
        transform: scale(0.98);
    }

    @media (max-width: 480px) {
        padding: 0.85rem;
        margin: 1.2rem 0;
    }
`;

const SignupText = styled.p`
    color: #a7a7a7;
    font-size: 0.95rem;
    margin-top: 1.5rem;
`;

const SignupLink = styled.a`
    color: white;
    font-weight: bold;
    text-decoration: underline;
    transition: color 0.2s ease;

    &:hover {
        color: #1ed760;
    }
`;
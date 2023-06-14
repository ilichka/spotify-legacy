import styled from "styled-components";
import {useState} from "react";
import axios from "axios";
import {toast} from "react-toastify";
import {useStore} from "../store/useStore";


const InputLabel = styled.div`
  font-weight: 400;
  font-size: 24px;
  line-height: 38px;
  margin: 30px 0 15px 0;
  color: #FFFFFF;
`

const ModalTitle = styled.div`
  font-weight: 500;
  font-size: 40px;
  line-height: 49px;
`

const ModalRow = styled.div`
  display: flex;
  flex-direction: column;
`

const ModalInput = styled.input`
  background: #313131;
  border: 0;
  color: white;
  font-weight: 400;
  font-size: 20px;
  line-height: 32px;
  padding: 4px 10px;
  width: 100%;
  border-radius: 5px;
  :focus-visible {
    outline: 0;
  }
`

const ModalFooter = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin-top: auto;
`

const SecondaryButton = styled.div`
  font-weight: 400;
  font-size: 24px;
  line-height: 38px;
  margin-bottom: 25px;
  color: #FFFFFF;
`

const ModalButton = styled.button`
  background: transparent;
  font-weight: 600;
  font-size: 28px;
  line-height: 45px;
  color: #7DFF5D;
  border: 2.5px solid #7DFF5D;
  border-radius: 30px;
  min-height: 80px;
  width: 100%;
`

export const LoginModal = ({signCb, closeModal}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const {auth} = useStore();

    const login = async () => {
        await auth.login(email,password)
        if(auth.loggedIn) {
            toast.success("Вы успешно авторизованы!");
            closeModal()
        } else {
            toast.error("Неправильная почна или пароль!");
        }
    }

    return <><ModalTitle>Вход</ModalTitle>
    <ModalRow>
        <InputLabel>Электронная почта</InputLabel>
        <ModalInput onChange={(e)=>setEmail(e.target.value)} />
    </ModalRow>
    <ModalRow>
        <InputLabel>Пароль</InputLabel>
        <ModalInput onChange={(e)=>setPassword(e.target.value)} />
    </ModalRow>
    <ModalFooter>
        <SecondaryButton onClick={signCb}>Зарегистрироваться</SecondaryButton>
        <ModalButton onClick={login}>Войти</ModalButton>
    </ModalFooter></>
}
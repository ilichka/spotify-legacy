import styled from "styled-components";
import {ReactComponent as Search} from '../assets/search.svg'
import {ReactComponent as Person} from '../assets/Person.svg'
import {useState} from "react";
import Modal from 'react-modal'
import {LoginModal} from "./loginModal";
import {SignInModal} from "./signinModal";
import {useStore} from "../store/useStore";
import {useNavigate} from "react-router";
import {observer} from "mobx-react-lite";

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 50px 32px 50px 0;
  margin-bottom: 30px;
  margin-left: 32px;
`

const InputWrapper = styled.div`
    display: flex;
  gap: 30px;
  border-radius: 10px;
  padding: 15px 20px;
  background: #313131;
  min-width: 584px;
  align-items: center;
`

const StyledInput = styled.input`
  background: #313131;
  border: 0;
  color: white;
  font-weight: 400;
  font-size: 20px;
  line-height: 32px;
  width: 100%;
  border-radius: 5px;
    :focus-visible {
      outline: 0;
    }
`


const ButtonWrapper = styled.div`
    display: flex;
  gap: 20px;
  align-items: center;
  border: 2.5px solid #7DFF5D;
  border-radius: 30px;
  padding: 10px 20px;
`

const StyledButton = styled.button`
  background: transparent;
  font-weight: 600;
  font-size: 28px;
  line-height: 45px;
  color: #7DFF5D;
  
    border: 0;
`

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: '#252222',
        padding: '50px 90px',
        minWidth: '670px',
        height: '90%',
        display: 'flex',
        flexDirection: 'column'
    },
};

Modal.setAppElement('#root');

export const Header = observer(() => {
    const [modalIsOpen, setIsOpen] = useState(false);
    const [status, setStatus] = useState('login')
    const {auth, track} = useStore()
    const navigate = useNavigate()
    const [query, setQuery] = useState('')
    const [timer, setTimer] = useState(null)

    const search = (e) => {
        setQuery(e.target.value)
        if(timer) {
            clearTimeout(timer)
        }
        setTimer(()=>setTimeout(()=>{
            track.searchTracks(e.target.value)
        },500))
    }

    console.log(auth.loggedIn)

    function openModal() {
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
    }
    return <HeaderWrapper>
        <InputWrapper>
            <Search />
            <StyledInput
                value={query}
                onChange={search}
            />
        </InputWrapper>
        {!auth.loggedIn ? <ButtonWrapper onClick={openModal}>
            <Person />
            <StyledButton>Войти</StyledButton>
        </ButtonWrapper> : <ButtonWrapper onClick={()=>navigate('/profile')}>
            <Person />
            <StyledButton>Мой аккаунт</StyledButton>
        </ButtonWrapper>}
        <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Login modal"
        >
            {status === 'login' ? <LoginModal closeModal={()=>setIsOpen(false)} signCb={()=>setStatus('signin')}/> : <SignInModal closeModal={()=>setIsOpen(false)} loginCb={()=>setStatus('login')}/>}
        </Modal>
    </HeaderWrapper>
})
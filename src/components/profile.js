import styled from "styled-components";
import {ReactComponent as ProfileSvg} from '../assets/pro.svg'
import {useNavigate} from "react-router";
import {useStore} from "../store/useStore";

const ProfileWrapper = styled.div`
    display: flex;
  flex-direction: column;
`

const ProfileHeader = styled.div`
    display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 50px 32px;
  background: linear-gradient(360deg, #424242 -45%, #2F2B2B 15.41%);
`

const HeaderButton = styled.div`
  font-weight: 500;
  font-size: 28px;
  line-height: 45px;
  color: #7DFF5D
`

const ProfileBody = styled.div`
    padding: 55px 120px;
`

const ProfileTitle = styled.div`
  font-weight: 500;
  font-size: 36px;
  line-height: 44px;
  color: #FFFFFF;
  margin-bottom: 32px;
`

const ProfileRow =styled.div`
    display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 10px 20px;
  background: #313131;
  border-radius: 5px;
  margin-bottom: 10px;
  align-items: center;
`

const ChangeButton = styled.div`
  border: 2.5px solid #7DFF5D;
  border-radius: 30px;
  color: #7DFF5D;
  padding: 10px 42px;
`

const rows = [
    {
        name: 'Имя пользователя',
        value: 'email'
    },
    {
        name: 'Электронная почта',
        value: 'email'
    },
    {
        name: 'Дата рождения',
        value: 'date'
    },
    {
        name: 'Пол',
        value: 'sex'
    },
]

export const Profile = () => {
    const navigate = useNavigate()

    const {user,auth} = useStore();

    const logout = async () => {
        await auth.logout()
        navigate('/')
    }

    console.log(user.user)

    return <ProfileWrapper>
        <ProfileHeader>
            <ProfileSvg />
            <HeaderButton onClick={()=>navigate('/')}>На главную</HeaderButton>
        </ProfileHeader>
        <ProfileBody>
            <ProfileTitle>Профиль</ProfileTitle>
            {rows.map(row=><ProfileRow>
                <span>{row.name}</span>
                <span>{user.user[row.value]}</span>
            </ProfileRow>)}
            <ProfileTitle>Мой тариф</ProfileTitle>
            <ProfileRow>
                <span>Бесплатный тариф</span>
                <ChangeButton>Сменить тариф</ChangeButton>
            </ProfileRow>
            <ChangeButton style={{display: 'inline-flex'}} onClick={logout}>Выйти</ChangeButton>
        </ProfileBody>
    </ProfileWrapper>
}
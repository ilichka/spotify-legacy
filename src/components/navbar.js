import styled from "styled-components";
import {ReactComponent as Logo} from '../assets/logo.svg'
import {ReactComponent as Home} from '../assets/Home.svg'
import {ReactComponent as Like} from '../assets/Like.svg'
import {ReactComponent as Plus} from '../assets/Plus.svg'
import {ReactComponent as Categories} from '../assets/Categories.svg'

const NavbarWrapper = styled.div`
    display: flex;
  flex-direction: column;
  min-width: 352px;
  min-height: 100vh;
  padding: 52px 32px;
  background: linear-gradient(270deg, #2C4925 -3.85%, rgba(45, 62, 40, 0.518359) 8.45%, rgba(48, 47, 47, 0) 39.17%);
`

const NavbarHeader = styled.div`
  display: flex;
  font-weight: 500;
  font-size: 40px;
  line-height: 49px;
  gap: 30px;
  margin-bottom: 90px;
`

const NavbarItem = styled.div`
  display: flex;
  align-items: center;
  font-weight: 400;
  font-size: 24px;
  line-height: 38px;
  margin-bottom: 40px;
  gap: 15px;
`

const routes = [
    {
        label: 'Главная',
        icon: <Home/>
    },
    {
        label: 'Категории',
        icon: <Categories/>
    },
    {
        label: 'Любимые треки',
        icon: <Like/>
    },
    {
        label: 'Создать плейлист',
        icon: <Plus/>
    }
]

export const Navbar = () => {
    return <NavbarWrapper>
        <NavbarHeader>
            <Logo />
            Tuneup
        </NavbarHeader>
        {routes.map((item)=><NavbarItem>
            {item.icon}
            {item.label}
        </NavbarItem>)}
    </NavbarWrapper>
}
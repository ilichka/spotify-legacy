import styled from "styled-components";
import {GlobalStyles} from "./components/globalStyles";
import {Navbar} from "./components/navbar";
import {Header} from "./components/Header";
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import {Profile} from "./components/profile";
import {Player} from "./components/player";
import {ToastContainer} from "react-toastify";
import {StoreProvider} from "./store/context";
import {useStore} from "./store/useStore";
import {useEffect} from "react";
import {observer} from "mobx-react-lite";
import {TracksGrid} from "./components/tracksGrid";

const AppWrapper = styled.div`
  display: flex;
`

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`

const router = createBrowserRouter([{
    path: '/',
    element: <>
        <Header/>
        <TracksGrid />
    </>
}, {path: '/profile', element: <Profile/>}])

const App = observer(() => {
    const store = useStore()
    useEffect(() => {
        store.init()
    }, [])

    if(store.loading) {
        return <div>LOADING...</div>
    }

    return (
        <AppWrapper>
                <Navbar/>
                <ToastContainer/>
                <GlobalStyles/>
                <ContentWrapper>
                    <Player/>
                    <RouterProvider router={router}/>
                </ContentWrapper>
        </AppWrapper>
    );
})

export default App;

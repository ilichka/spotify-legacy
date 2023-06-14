import styled from "styled-components";
import {useStore} from "../store/useStore";
import {useEffect, useState} from "react";
import {observer} from "mobx-react-lite";
import {Track} from "./track";

const TracksGridWrapper = styled.div`
    display: grid;
  grid-template-columns: repeat(3,1fr);
  margin-left: 32px;
`

export const TracksGrid = observer(() => {
    const {track} = useStore()

    console.log(track.tracks)

    useEffect(()=>{
        track.fetchTracks();
    }, [])

    return <TracksGridWrapper>
        {track.tracks && track.tracks.map((trackItem)=><Track track={trackItem}/>)}
    </TracksGridWrapper>
})
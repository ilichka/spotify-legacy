import styled from "styled-components";
import {useStore} from "../store/useStore";

const TrackWrapper = styled.div`
    ${({$img})=>`background-image: url(${$img})`};
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  width: 200px;
  height: 200px;
  padding: 20px;
`

const TrackName = styled.div`
    padding: 5px;
  color:#7DFF5D;
  font-weight: 600;
  font-size: 18px;
  background: #252222;
  
  display: inline-block;
  border-radius: 8px;
`

export const Track = ({track}) => {
    const {player} = useStore()

    const play = (e) => {
        e.stopPropagation()
        player.setActive(track)
    }

    return <TrackWrapper $img={'http://localhost:5000/' + track?.picture} onClick={play}>
        <TrackName>{track.name}</TrackName>
    </TrackWrapper>
}
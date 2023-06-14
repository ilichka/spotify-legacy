import styled from "styled-components";
import {ReactComponent as PlayerArrow} from '../assets/PlayerArrow.svg'
import {ReactComponent as Pause} from '../assets/Pause.svg'
import {ReactComponent as Like} from '../assets/Like.svg'
import {useEffect} from "react";
import {useStore} from "../store/useStore";
import {observer} from "mobx-react-lite";

const PlayerWrapper = styled.div`
    position: fixed;
  display: flex;
  gap: 50px;
  justify-content: space-between;
  bottom: 0;
  padding: 30px 90px;
  background: rgba(37, 34, 34, 0.7);
  backdrop-filter: blur(7px);
  width: 100%;
  left: 0;
`

const ControlsBlock = styled.div`
    display: flex;
  flex-direction: column;
  gap: 10px;
  flex-grow: 1;
`

const UpControls = styled.div`
    display: flex;
  justify-content: space-around;
`

const BottomControls = styled.div`
    display: flex;
  align-items: center;
  gap: 10px;
`

const Time = styled.div`
  font-weight: 400;
  font-size: 20px;
  line-height: 24px;

  color: #FFFFFF;
`

const Progress = styled.input`
  accent-color: #7DFF5D;
  flex-grow: 1;
  height: 8px;
`

const InfoBlock = styled.div`
    display: flex;
  align-items: center;
  gap: 30px;
`

const StyledImg = styled.img`
  object-fit: cover;
  width: 100%;
  height: auto;
  object-position: center;
    max-height: 80px;
    max-width: 120px;
  background: #D9D9D9;
  border-radius: 3px;
`

const TextInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`

const Name = styled.div`
  font-weight: 400;
  font-size: 34px;
  line-height: 41px;
  color: #FFFFFF;
`

const Author = styled.div`
  font-weight: 400;
  font-size: 20px;
  line-height: 32px;
  color: #FFFFFF;
`

const CloseButton = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
`

export const Player = observer(() => {
    const {player, track} = useStore()
    useEffect(() => {
        console.log(player.audio)
        if (!player.audio) {
            player.audio = new Audio()
        } else {
            setAudio()
            handlePlay()
        }
    }, [player.active])

    useEffect(()=>{console.log(player.currentTime)},[player.currentTime])

    const setAudio = () => {
        if (player.active) {
            player.audio.src = 'http://localhost:5000/' + player.active.audio
            player.audio.volume = player.volume / 100
            player.audio.id = player.active.audio
            player.audio.onloadedmetadata = () => {
                player.setDuration(Math.ceil(player.audio.duration))
            }
            player.audio.ontimeupdate = () => {
                if(Math.ceil(player.audio.currentTime) === player.duration) {
                    player.pauseTrack();
                }
                player.setCurrentTime(Math.ceil(player.audio.currentTime))
            }
        }
    }

    const handlePlay = () => {
        if (player.pause) {
            player.playTrack()
            player.audio.play()
        } else {
            player.pauseTrack()
            player.audio.pause()
        }
    }

    const changeCurrentTime = (e) => {
        player.audio.currentTime = Number(e.target.value)
        player.setCurrentTime(Number(e.target.value))
    }

    const next = () => {
        const item = track.tracks.findIndex((item)=>player.audio.id===item.audio)
        if(track.tracks.length-1===item) {
            player.setActive(track.tracks[0])
        } else {
            player.setActive(track.tracks[item+1])
        }
    }

    const prev = () => {
        const item = track.tracks.findIndex((item)=>player.audio.id===item.audio)
        if(item===0) {
            player.setActive(track.tracks[track.tracks.length-1])
        } else {
            player.setActive(track.tracks[item-1])
        }
    }

    if (!player.active) {
        return null
    }

    return <PlayerWrapper>
        <CloseButton onClick={()=>player.setActive(null)}>Close</CloseButton>
        <InfoBlock>
            <StyledImg src={'http://localhost:5000/' + player.active.picture}/>
            <TextInfo>
                <Name>{player.active.name}</Name>
                <Author>{player.active.artist}</Author>
            </TextInfo>
            <Like />
        </InfoBlock>
        <ControlsBlock>
            <UpControls>
                <PlayerArrow onClick={prev} />
                {player.pause ? <Pause onClick={handlePlay}/> : <div onClick={handlePlay}>Pause</div>}
                <PlayerArrow onClick={next} style={{transform: 'rotate(180deg)'}}/>
            </UpControls>
            <BottomControls>
                <Time>00:00</Time>
                <Progress type="range"
                          min={0}
                          max={player.duration}
                          value={player.currentTime}
                          onChange={changeCurrentTime}></Progress>
                <Time>00:00</Time>
            </BottomControls>
        </ControlsBlock>
    </PlayerWrapper>
})
import { useContext } from "react"
import { useNavigate } from "react-router-dom"
import styled from "styled-components"
import { TCharCard } from "../types/apitypes"
import { IDivElementProps, ImgClickable } from "../types/stylestypes"
import { GlobalContext } from "../contexts/GlobalContext"

interface IDivImg {
    $imgurl: string
}

export function CharacterCard({ name, id, thumbnail }: TCharCard) {
    const { globalfavs, setGlobalfavs } = useContext(GlobalContext)
    const navigate = useNavigate()

    const handleFavClick = (event: React.MouseEvent<HTMLImageElement>, id: number) => {
        event.stopPropagation()
        //console.log(id);
        var updatedFavs: number[] = [...globalfavs]
        globalfavs.includes(id)
            ? updatedFavs.splice(globalfavs.indexOf(id), 1)
            : (updatedFavs = [...globalfavs, id])
        setGlobalfavs(updatedFavs)
    }

    return (
        <Div id={id.toString()} onClick={() => navigate(`/character/${id}`)}>
            <Div2 $imgurl={`${thumbnail.path}.${thumbnail.extension}`} />
            <DivRed />
            <Div3>
                <Div4>
                    <Div5>{name}</Div5>
                    <Img
                        loading="lazy"
                        src={globalfavs.includes(id) ? "/img/heart-fav.svg" : "/img/heart.svg"}
                        onClick={(e) => handleFavClick(e, id)}
                    />
                </Div4>
                <Img2 loading="lazy" src="/img/card-corner.svg" />
            </Div3>
        </Div>
    )
}

const Img = styled.img<ImgClickable>`
    aspect-ratio: 1.2;
    object-fit: auto;
    object-position: center;
    width: 12px;
    margin: auto 7px;
`

const Div = styled.div<IDivElementProps>`
    background-color: #000;
    min-height: 246px;
    display: flex;
    width: 172.5px;
    flex-direction: column;
    font-size: 14px;
    color: #fff;
    font-weight: 400;
    text-transform: uppercase;
    cursor: pointer;
    &:hover {
        background-color: var(--marvel-red);
        ${Img} {
            fill: white;
        }
    }
`

const Div2 = styled.div<IDivImg>`
    background-color: #d9d9d9;
    background-image: url(${(props) => props.$imgurl});
    background-size: cover;
    height: 80%;
    width: 100%;
`

const Div3 = styled.div`
    justify-content: space-between;
    display: flex;
    flex-direction: column;
    padding: 16px 0 0 16px;
`

const DivRed = styled.div`
    background-color: var(--marvel-red);
    display: flex;
    flex-direction: column;
    padding: 4px 0 0 0;
`

const Div4 = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 0 1px;
`

const Div5 = styled.div`
    font-family: Roboto Condensed, sans-serif;
    flex-grow: 1;
    flex-basis: auto;
    overflow: clip;
`

const Img2 = styled.img`
    /* aspect-ratio: 1.09; */
    width: 13px;
    fill: #fff;
    align-self: flex-end;
`

import { useState, useEffect, useContext } from "react"
import styled from "styled-components"
import { TCharDetail } from "../types/apitypes"
import { ImgClickable } from "../types/stylestypes"
import { GlobalContext } from "../contexts/GlobalContext"

interface IBasicChar {
    id: string
}

export function CharacterDetail({ id }: IBasicChar) {
    const { globalfavs, setGlobalfavs } = useContext(GlobalContext)

    const [characterdata, setCharacterdata] = useState<TCharDetail | null>(null)

    const handleFavClick = (event: React.MouseEvent<HTMLImageElement>, id: number) => {
        var updatedFavs: number[] = [...globalfavs]
        globalfavs.includes(id)
            ? updatedFavs.splice(globalfavs.indexOf(id), 1)
            : (updatedFavs = [...globalfavs, id])
        setGlobalfavs(updatedFavs)
    }

    const getCharacterDetail = async () => {
        try {
            const res = await fetch(
                `https://gateway.marvel.com:443/v1/public/characters/${id}?apikey=${process.env.REACT_APP_MARVEL_API_PUB_KEY}`
            )
            const data = await res.json()

            //console.log(data.data.results[0]);

            setCharacterdata({ ...data.data.results[0] } as TCharDetail)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getCharacterDetail()
    }, [])

    return (
        <Div>
            <Div2>
                <Div3>
                    <Column>
                        <Img
                            loading="lazy"
                            srcSet={`${characterdata?.thumbnail.path}.${characterdata?.thumbnail.extension}`}
                        />
                    </Column>
                    <Column2>
                        <Div4>
                            <Div5>
                                <Div6>{characterdata?.name}</Div6>
                                <Img2
                                    loading="lazy"
                                    src={
                                        globalfavs.includes(parseInt(id!))
                                            ? "/img/heart-fav.svg"
                                            : "/img/heart.svg"
                                    }
                                    onClick={(e) => handleFavClick(e, parseInt(id!))}
                                />
                            </Div5>
                            <Div7>{characterdata?.description}</Div7>
                        </Div4>
                    </Column2>
                </Div3>
            </Div2>
            <Img3
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/5d9bd4eab7889dde505f00423804c3aebe61a4c386d106f555eded7d7ab48f5e?"
            />
        </Div>
    )
}

const Div = styled.div`
    justify-content: space-between;
    height: 320px;
    background-color: #000;
    display: flex;

    @media (max-width: 991px) {
        flex-wrap: wrap;
        padding-left: 20px;
    }
`

const Div2 = styled.div`
    width: 960px;
    padding-left: 22%;
    @media (max-width: 991px) {
        max-width: 100%;
    }
`

const Div3 = styled.div`
    display: flex;
    height: 320px;

    @media (max-width: 991px) {
        flex-direction: column;
        align-items: stretch;
        gap: 0px;
    }
`

const Column = styled.div`
    display: flex;
    flex-direction: column;
    line-height: normal;
    width: 33%;
    margin-left: 0px;
    align-self: flex-end;
    @media (max-width: 991px) {
        width: 100%;
    }
`

const Img = styled.img`
    aspect-ratio: 1;
    object-fit: auto;
    object-position: center;
    width: 320px;
`

const Column2 = styled.div`
    display: flex;
    flex-direction: column;
    line-height: normal;
    width: 67%;
    margin-left: 20px;
    height: 320px;
    @media (max-width: 991px) {
        width: 100%;
    }
`

const Div4 = styled.div`
    background-color: #000;
    display: flex;
    flex-grow: 1;
    flex-direction: column;
    color: #fff;
    padding: 0 0 20px 50px;
    @media (max-width: 991px) {
        max-width: 100%;
    }
`

const Div5 = styled.div`
    justify-content: space-between;
    display: flex;
    margin-top: 46px;
    gap: 20px;
    font-size: 40px;
    font-weight: 700;
    text-transform: uppercase;
    @media (max-width: 991px) {
        max-width: 100%;
        flex-wrap: wrap;
        margin-top: 40px;
    }
`

const Div6 = styled.div`
    font-family: Roboto Condensed, sans-serif;
`

const Img2 = styled.img<ImgClickable>`
    aspect-ratio: 1.14;
    object-fit: auto;
    object-position: center;
    width: 24px;
    margin: auto 0;
    cursor: pointer;
`

const Div7 = styled.div`
    margin-top: 24px;
    font: 400 16px Roboto Condensed, sans-serif;
    @media (max-width: 991px) {
        max-width: 100%;
    }
`

const Img3 = styled.img`
    aspect-ratio: 1;
    justify-self: flex-end;
    width: 24px;
    fill: #fff;
    align-self: flex-end;
    @media (max-width: 991px) {
        margin-top: 40px;
    }
`

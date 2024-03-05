import React, { useEffect, useState, useRef } from "react";
import { TCharIdParam, TComicInfo } from "../types/apitypes";
import styled from "styled-components";

interface IComicData {
  title: string;
}

export function ComicSlider({ id }: TCharIdParam) {
  const [comicsInfo, setComicsInfo] = useState<TComicInfo[]>([]);

  const refSliderScrollbar = useRef<HTMLDivElement | null>(null);
  const refSScrollbarThumb = useRef<HTMLDivElement | null>(null);
  const refImageList = useRef<HTMLUListElement | null>(null);

  //const [isMouseDown, setIsMouseDown] = useState(false);
  const isMouseDown = useRef(false);
  const maxScrollLeft = useRef(0);
  //const [maxScrollLeft, setMaxScrollLeft] = useState(0);

  const mouseCoords = useRef({
    startX: 0,
    scrollLeft: 0,
  });

  const maxThumbPosition = useRef(0);
  const thumbPosition = useRef(0);

  const handleScrollbarMouseUp = (e: React.MouseEvent<HTMLDivElement>) => {
    isMouseDown.current = false;
  };

  const handleScrollbarMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    isMouseDown.current = true;

    const scrollbarThumb = e.currentTarget;
    const sliderScrollbar: HTMLDivElement = refSliderScrollbar.current!;
    const imageList: HTMLUListElement = refImageList.current!;
    const startX = e.clientX;
    const scrollLeft = scrollbarThumb.scrollLeft;
    mouseCoords.current = { startX, scrollLeft };
    thumbPosition.current = scrollbarThumb.offsetLeft;
    maxThumbPosition.current =
      sliderScrollbar.getBoundingClientRect().width -
      scrollbarThumb.offsetWidth;

    maxScrollLeft.current = imageList.scrollWidth - imageList.clientWidth;
  };

  // Update thumb position on mouse move
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isMouseDown.current) return;
    //e.preventDefault();

    const scrollbarThumb: HTMLDivElement = e.currentTarget;
    const imageList: HTMLUListElement = refImageList.current!;

    const deltaX = e.clientX - mouseCoords.current.startX;
    const newThumbPosition = thumbPosition.current + deltaX;
    // Ensure the scrollbar thumb stays within bounds
    const boundedPosition = Math.max(
      0,
      Math.min(maxThumbPosition.current, newThumbPosition)
    );
    const scrollPosition =
      (boundedPosition / maxThumbPosition.current) * maxScrollLeft.current;

    imageList.scrollLeft = scrollPosition;
    scrollbarThumb.style.left = `${boundedPosition}px`;
  };

  const updateScrollThumbPosition = () => {
    const imageList: HTMLUListElement = refImageList.current!;
    const sliderScrollbar: HTMLDivElement = refSliderScrollbar.current!;
    const scrollbarThumb: HTMLDivElement = refSScrollbarThumb.current!;
    const scrollPosition = imageList.scrollLeft;
    const thumbPosition =
      (scrollPosition / maxScrollLeft.current) *
      (sliderScrollbar.clientWidth - scrollbarThumb.offsetWidth);
    scrollbarThumb.style.left = `${thumbPosition}px`;
  };

  const getComicsData = async () => {
    const comicsList: TComicInfo[] = [];

    try {
      const res = await fetch(
        `https://gateway.marvel.com:443/v1/public/characters/${id}/comics?apikey=${process.env.REACT_APP_MARVEL_API_PUB_KEY}&orderBy=onsaleDate&limit=20`
      );
      const data = await res.json();

      //console.log(data.data);

      data.data.results.map((comic: any) => {
        var onsaleDate: Date | null = null;
        comic.dates.map((ditem: any) => {
          if (ditem.type === "onsaleDate") {
            onsaleDate = new Date(ditem.date);
          }
        });
        let year: number = onsaleDate!.getFullYear();
        comicsList.push({
          id: comic.id,
          title: comic.title,
          year: year!,
          thumbnail: {
            path: comic.thumbnail.path,
            extension: comic.thumbnail.extension,
          },
        });
      });

      setComicsInfo(comicsList);

      //console.log(comicsList);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getComicsData();
  }, []);

  return (
    <div>
      <DivContainer>
        <ComicTitle>COMICS</ComicTitle>
        <DivSliderWrapper>
          <UlImageList
            ref={refImageList}
            onScroll={(e) => {
              updateScrollThumbPosition();
            }}
          >
            {comicsInfo.map((comic) => (
              <DivImgItem key={comic.id}>
                <Img
                  loading="lazy"
                  srcSet={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
                />
                <Div2>{comic.title}</Div2>
                <Div3>{comic.year}</Div3>
              </DivImgItem>
            ))}
          </UlImageList>
        </DivSliderWrapper>
        <DivSliderScrollbar ref={refSliderScrollbar}>
          <DivScrollbarTrack>
            <DivScrollbarThumb
              ref={refSScrollbarThumb}
              onMouseDown={(e) => handleScrollbarMouseDown(e)}
              onMouseUp={(e) => handleScrollbarMouseUp(e)}
              onMouseMove={(e) => handleMouseMove(e)}
            ></DivScrollbarThumb>
          </DivScrollbarTrack>
        </DivSliderScrollbar>
      </DivContainer>
    </div>
  );
}

const ComicTitle = styled.p`
  font-family: Roboto Condensed;
  font-weight: 700;
  font-size: 32px;
`;

const DivContainer = styled.div`
  width: 960px;
  margin-left: auto;
  margin-right: auto;
`;

const DivSliderWrapper = styled.div`
  position: relative;
`;

const UlImageList = styled.ul`
  display: grid;
  grid-template-columns: repeat(20, 1fr);
  gap: 20px;
  font-size: 0;
  list-style: none;
  margin-bottom: 15px;
  padding-left: 0px;
  overflow-x: auto;
  scrollbar-width: none;
  &:--webkit-scrollbar {
    display: none;
  }
  @media (max-width: 991px) {
    gap: 10px;
    margin-bottom: 15px;
    scroll-snap-type: x mandatory;
  }
`;

const DivScrollbarTrack = styled.div`
  background: #ccc;
  width: 100%;
  height: 2px;
  display: flex;
  align-items: center;
  border-radius: 4px;
  position: relative;
`;

const DivSliderScrollbar = styled.div`
  height: 24px;
  width: 100%;
  display: flex;
  align-items: center;
  &:hover {
    ${DivScrollbarTrack} {
      height: 4px;
    }
  }
`;

const DivScrollbarThumb = styled.div`
  position: absolute;
  background: var(--marvel-red);
  top: 0;
  bottom: 0;
  width: 239px;
  height: 4px;
  cursor: grab;
  border-radius: inherit;
  &:active {
    cursor: grabbing;
    height: 8px;
    top: -2px;
  }
  &:after {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    top: -10px;
    bottom: -10px;
  }
  @media (max-width: 991px) {
    width: 20%;
  }
`;

const DivImgItem = styled.div`
  display: flex;
  max-width: 179.2px;
  flex-direction: column;
  object-fit: cover;
  color: #000;
`;

const Img = styled.img`
  aspect-ratio: 0.67;
  object-fit: auto;
  object-position: center;
  width: 179.2px;
`;

const Div2 = styled.div`
  margin-top: 12px;
  width: 100%;
  font: 500 16px Roboto Condensed, sans-serif;
`;

const Div3 = styled.div`
  margin-top: 8px;
  width: 100%;
  font: 400 12px Roboto Condensed, sans-serif;
`;

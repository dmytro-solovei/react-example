import React, { useRef, useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import styled from 'styled-components';

import ReactInlineSvg from 'react-inlinesvg';
import GameCard from '../GameCard/GameCard';
import { ButtonTypes } from '../../../elements';
import { setActiveGameList } from '../../../store/actions';

const Error = styled.div`
  color: #fff;
  font-size: 24px;
  line-height: 26px;
  font-weight: 500;
  text-align: center;
`;

const ErrorBlock = styled.div`
  min-height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
  @include font(14, 14, 500, #fff);
`;

const Title = styled.h2`
  margin: 0;
  font-size: 24px;
  line-height: normal;
  font-weight: 500;
  color: var(--games-title-color);
  text-transform: capitalize;
`;

const GridBlock = styled.div`
  display: grid;
  grid-gap: 20px;
  align-content: flex-start;
`;

const ShowMore = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin: 1.25em 0;
`;

export const Grid = () => {
  const dispatch = useDispatch();

  const allGames = useSelector((state) => state.api.gamesList?.games);
  const gamesList = useSelector((state) => state.api.gamesList);
  const activeProvider = useSelector((state) => state.handling.activeGameList);
  const refGrid = useRef(null);
  const size = useSelector((state) => state.handling.size);

  const inViewGames = () => {
    if (size.width < 992 && size.landscape) return 5;
    if (size.width >= 1920) return 9;
    if (size.width >= 1440) return 8;
    if (size.width >= 1390) return 7;
    if (size.width >= 1210) return 6;
    if (size.width >= 1032) return 5;
    if (size.width >= 992) return 4;
    if (size.width >= 768) return 5;
    if (size.width >= 425) return 3;
    if (size.width < 375) return 2;
    return 3;
  };

  const scrollToSection = useCallback((section) => {
    let match = document.querySelector(section);
    setTimeout(() => {
      window.scrollTo({
        top: match?.offsetTop - 80,
        behavior: 'smooth',
      });
    }, 200);
  }, []);

  const [loadedGames, setLoadedGames] = useState(inViewGames() * 2);

  useEffect(() => {
    // Сбросите количество загруженных игр при изменении activeProvider
    setLoadedGames(inViewGames() * 2);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeProvider]);

  useEffect(() => {
    // Retrieve previously saved values from localStorage
    const savedActiveProviders = JSON.parse(localStorage.getItem('activeProviders')) || activeProvider;

    // Create a new array by combining previous values with the current activeProvider value
    const updatedActiveProviders =
      activeProvider === 'providers' || activeProvider === 'sport' || activeProvider === 'sport-betting' ? savedActiveProviders : [...savedActiveProviders, activeProvider];

    // Remove duplicate elements, keeping only the latest occurrences
    const uniqueActiveProviders = [...new Set(updatedActiveProviders.reverse())].reverse();

    // Limit the array to the last 10 elements
    const finalActiveProviders = uniqueActiveProviders.slice(-10);

    // Save the updated array to localStorage
    localStorage.setItem('activeProviders', JSON.stringify(finalActiveProviders));

    // Log the saved data to the console
  }, [activeProvider, dispatch]);

  const grid = (list, searchAll) => {
    if (list) {
      return list
        .filter((game) => game.id) // Exclude games without id and name
        .slice(0, loadedGames)
        .map((game, index) => (
          <GameCard
            key={game.id + index}
            id={game.id}
            name={game.name}
            image={game.image}
            provider={game.provider}
            img={game.img}
            lazy
            demo
            fs={game.tags?.includes('freespins') ? true : false}
          />
        ));
    } else if (searchAll) {
      const matchingGames = searchAll.filter((game) => game.provider === activeProvider || game.type === activeProvider);
      return matchingGames
        .slice(0, loadedGames)
        .filter((game) => game.id) // Exclude games without id and name
        .map((game, index) => (
          <GameCard
            key={game.id + index}
            id={game.id}
            name={game.name}
            image={game.image}
            provider={game.provider}
            img={game.img}
            lazy="grid"
            demo
            fs={game.tags?.includes('freespins') ? true : false}
          />
        ));
    }
  };

  const handleBackProvider = () => {
    const savedActiveProviders = JSON.parse(localStorage.getItem('activeProviders'));
    if (savedActiveProviders.length > 1) {
      savedActiveProviders.splice(-1, 1); // Remove the last element from the array
      const prevActiveProvider = savedActiveProviders[savedActiveProviders.length - 1]; // Get the second-to-last element
      dispatch(setActiveGameList(prevActiveProvider)); // Change the activeProvider value using dispatch
      localStorage.setItem('activeProviders', JSON.stringify(savedActiveProviders)); // Save the updated array to localStorage
    } else if (savedActiveProviders.length === 1) {
      dispatch(setActiveGameList('home')); // Invoke dispatch with "home" as the activeProvider value
      localStorage.setItem('activeProviders', JSON.stringify(savedActiveProviders)); // Save the updated array to localStorage (contains only one element - "home")
    }
    setTimeout(() => scrollToSection('.games'), 200);
  };

  let errorMessage = null;
  switch (activeProvider) {
    case 'all':
      return null;
    case 'home':
      return null;
    case 'providers':
      return null;
    case 'last_games':
      errorMessage = (
        <Error>
          Нет последних игр.
          <br />
          Требуется авторизация.
        </Error>
      );
      break;
    case 'favorite_games':
      errorMessage = <Error>Нет избранных игр.&nbsp;Добавьте их</Error>;
      break;
    default:
      errorMessage = <Error>Нет игр</Error>;
  }

  const gameCards = grid(gamesList[activeProvider], allGames);

  if (gameCards.length === 0) {
    return (
      <div className="container">
        <div className="grid-heading">
          <Title className="grid-title">{activeProvider.replace(/_/g, ' ')}</Title>

          <ButtonTypes styled="rounded" location={'grid-back'} onClick={handleBackProvider}>
            <ReactInlineSvg className="image" src="/images/icons/arrow__left.svg" desciption="arrow" />
            <span>back</span>
          </ButtonTypes>
        </div>
        <ErrorBlock>{errorMessage}</ErrorBlock>
      </div>
    );
  }

  const handleLoadMore = () => {
    setLoadedGames((prevLoadedGames) => prevLoadedGames + inViewGames() * 5);
  };

  const allGamesLoaded = gameCards.length === gamesList[activeProvider]?.length || gameCards.length === allGames?.length;

  if (activeProvider === 'home' || activeProvider === 'providers') return null;

  return (
    <div className="grid">
      <div className="container" ref={refGrid}>
        <div className="grid-heading">
          <Title className="grid-title">{activeProvider}</Title>
          <ButtonTypes styled="rounded" location={'grid-back'} onClick={handleBackProvider}>
            <ReactInlineSvg className="image" src="/images/icons/arrow__left.svg" desciption="arrow" />
            <span>back</span>
          </ButtonTypes>
        </div>
        <GridBlock className="grid-list" style={{ gridTemplateColumns: `repeat(${inViewGames()}, 1fr)`, gap: '20px 10px' }}>
          {gameCards}
        </GridBlock>
        {!allGamesLoaded && (
          <ShowMore>
            <ButtonTypes styled="background" location={'show-more'} onClick={handleLoadMore}>
              <span>Load More</span>
            </ButtonTypes>
          </ShowMore>
        )}
      </div>
    </div>
  );
};

Grid.propTypes = {};

Grid.defaultProps = {};

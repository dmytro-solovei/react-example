import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import styled from 'styled-components';
import classNames from 'classnames';
import { get } from 'lodash';
import ReactInlineSvg from 'react-inlinesvg';
import { setActiveGameList } from '../../../store/actions';
import { ButtonTypes } from '../../../elements';

const Title = styled.h2`
  margin: 0;
  font-size: 24px;
  line-height: normal;
  font-weight: 500;
  color: var(--games-title-color);
  text-transform: capitalize;
`;

export const ProvidersList = () => {
  const providers = useSelector((state) => state.api.gamesList.providers);
  const dispatch = useDispatch();
  const words = useSelector((state) => state.words);
  const activeProvider = useSelector((state) => state.handling.activeGameList);
  const games = useSelector((state) => state.api.gamesList);

  const scrollToSection = useCallback((section) => {
    let match = document.querySelector(section);
    setTimeout(() => {
      window.scrollTo({
        top: match?.offsetTop - 80,
        behavior: 'smooth',
      });
    }, 200);
  }, []);

  const replaceNameProvider = useCallback(
    (name) => {
      const nameMappings = {
        all: words.server?.all,
        live_betting: 'live games',
        INBET: 'fast_games',
        fishing: words.server?.fish_games,
      };

      return nameMappings[name] || words.server?.[name] || name;
    },
    [words.server]
  );

  const handleProviderClick = useCallback(
    (label) => {
      dispatch(setActiveGameList(label));
      setTimeout(() => scrollToSection('.games'), 200);
    },
    [dispatch]
  );

  const renderProviders = useCallback(() => {
    const imagesSources = 'https://bitokcasino.com/resources/sitepics/lobby/providers_casino/';

    return providers.map((provider) => {
      const label = provider;
      const searchAllGames = games.games.filter((game) => game.providers === label); // ! Need fix
      const gameCount = get(games[provider], searchAllGames, label, []).length;

      return (
        <div className="item" key={label} onClick={() => handleProviderClick(label)}>
          <div className="item__img">
            <img
              src={`${imagesSources}${label}.png`}
              alt={label}
              onError={(e) => {
                e.target.onerror = null;
                e.target.style.display = 'none';
              }}
            />
          </div>
          <div className="item__info">
            <div
              className={classNames('item__name', {
                'item__name--line': label?.length > 10,
              })}
            >
              {replaceNameProvider(label)?.replace(/_/g, ' ')}
            </div>
            <div className="item__count">
              {gameCount}
              {words.local.games}
            </div>
          </div>
        </div>
      );
    });
  }, [providers, handleProviderClick, games, replaceNameProvider, words.local.games]);

  return (
    <div
      className="providers container"
      style={{
        minHeight: providers?.length === 0 ? 'auto' : '',
      }}
    >
      <div className="grid-heading">
        <Title className="grid-title">{activeProvider}</Title>
        <ButtonTypes
          styled="rounded"
          location={'grid-back'}
          onClick={() => dispatch(setActiveGameList(localStorage.getItem('lastProviderToggle'))) && setTimeout(() => scrollToSection('.games'), 200)}
        >
          <ReactInlineSvg className="image" src="/images/icons/arrow__left.svg" desciption="arrow" />
          <span>back</span>
        </ButtonTypes>
      </div>

      <div className="providers-list">{renderProviders()}</div>
    </div>
  );
};

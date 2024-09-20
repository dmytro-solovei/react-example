import React, { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import ReactInlineSvg from 'react-inlinesvg';
import { LazyLoadComponent, trackWindowScroll } from 'react-lazy-load-image-component';
import { ButtonTypes } from '../../../elements';
import 'react-lazy-load-image-component/src/effects/opacity.css';

// ! Added to redux
// import { setFavoritGames } from '../../../store/actions/';
const GameCard = ({ id, name, provider, img, demo, fs, lazy, className = '', scrollPosition }) => {
  const dispatch = useDispatch();

  const renderImage = useCallback((img, name, lazy) => {
    switch (lazy) {
      case 'swiper-slider--not-image':
        return (
          <>
            <img
              className="image"
              src={img}
              alt={name}
              loading="lazy"
              onLoad={(e) => {
                e.target.parentNode.classList.add('loaded');
                e.target.parentNode.classList.add('image-complete');
              }}
              onError={(e) => {
                e.target.parentNode.classList.add('loaded');
                e.target.style.opacity = 0;
                e.target.style.opacity = 1;
                e.target.src = '/images/img/card__alternative-image.png';
              }}
            />
          </>
        );
      default:
        return (
          <>
            <img
              className="image"
              src={img}
              alt={name}
              loading="lazy"
              onLoad={(e) => {
                e.target.parentNode.classList.add('loaded');
                e.target.parentNode.classList.add('image-complete');
              }}
              onError={(e) => {
                e.target.parentNode.classList.add('loaded');
                e.target.style.opacity = 0;
                e.target.style.opacity = 1;
                e.target.src = '/images/img/card__alternative-image.png';
              }}
            />
          </>
        );
    }
  }, []);

  const setFavorite = useCallback(
    (e) => {
      const gameID = e.target.id;
      const favoriteList = localStorage.getItem('Favorite')?.split(',') || [];

      if (e.target && e.target.classList.contains('favorite') && e.target.classList.contains('disabled')) {
        e.target.classList.remove('disabled');

        favoriteList.push(gameID);
        const newFavoriteList = favoriteList.join();
        localStorage.setItem('Favorite', newFavoriteList);

        // ! Added to redux
        // dispatch(setFavoritGames({ storage: newFavoriteList.split(','), gameList: allGames }));
      } else if (e.target && e.target.classList.contains('favorite') && !e.target.classList.contains('disabled')) {
        e.target.classList.add('disabled');

        const newFavoriteList = favoriteList.filter((item) => item !== gameID).join();
        localStorage.setItem('Favorite', newFavoriteList);
        // ! Added to redux
        // dispatch(setFavoritGames({ storage: newFavoriteList.split(','), gameList: allGames }));
      }
    },
    [
      dispatch,
      // allGames
    ]
  );

  const getFavorite = useCallback((id) => {
    const favoriteList = localStorage.getItem('Favorite')?.split(',') || [];
    return favoriteList.includes(id);
  }, []);

  const renderButtons = useCallback(() => {
    return (
      <div className="game-card__play-button">
        <ButtonTypes styled="background" location={'game-card'} className="real">
          Play real
        </ButtonTypes>
        <ButtonTypes styled="background" location={'game-card'} className="demo">
          Play demo
        </ButtonTypes>
      </div>
    );
  }, []);

  const favorite = true;
  const favoriteActive = false;

  return (
    <div id={id} className={`game-card ${className}`}>
      {fs && <div className="game-card__fs">FS</div>}
      <div className="game-card__img">
        {renderImage(img, name, lazy)}
        {renderButtons()}
      </div>
      <div className="game-card__info">
        <div className="game-card__name">{name}</div>
        <div className="game-card__provider">
          <span>{provider?.replace('live betting', 'live')}</span>
          <div onClick={setFavorite} id={id} className={getFavorite(id) ? 'ButtonFavorite' : 'ButtonFavorite disabled'}>
            {favorite && <ReactInlineSvg className="favorite" src="/images/icons/favorite.svg" />}
            {favoriteActive && <ReactInlineSvg className="favorite active" src="/images/icons/favorite-active.svg" />}
          </div>
        </div>
      </div>
    </div>
  );
};

GameCard.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  provider: PropTypes.string,
  img: PropTypes.string.isRequired,
  demo: PropTypes.bool,
  fs: PropTypes.bool,
  lazy: PropTypes.string,
  className: PropTypes.string,
};

export default trackWindowScroll(GameCard);

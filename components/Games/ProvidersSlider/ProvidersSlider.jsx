import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import styled from 'styled-components';

import { setActiveGameList } from '../../../store/actions';

import 'swiper/css';

import GameCard from '../GameCard/GameCard';
import { JackpotInLobby } from '../../JackpotInLobby/JackpotInLobby';
import { ButtonTypes } from '../../../elements';

const Title = styled.h2`
  margin: 0;
  font-size: 24px;
  line-height: normal;
  font-weight: 500;
  color: var(--games-title-color);
  text-transform: capitalize;
  margin-bottom: 20px;
`;

export const ProvidersSlider = ({ providers }) => {
  const dispatch = useDispatch();
  const activeProvider = useSelector((state) => state.handling.activeGameList);

  const allGames = useSelector((state) => state.api.gamesList.games);
  const size = useSelector((state) => state.handling.size);

  const scrollToSection = useCallback((section) => {
    let match = document.querySelector(section);
    setTimeout(() => {
      window.scrollTo({
        top: match?.offsetTop - 80,
        behavior: 'smooth',
      });
    }, 200);
  }, []);

  const handleProvider = useCallback((label) => {
    dispatch(setActiveGameList(label));
    setTimeout(() => scrollToSection('.games'), 200);
  }, []);

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

  const swiperSettings = (provider) => {
    return {
      slidesPerView: inViewGames(), // Количество видимых слайдов (1 на мобильных, 3 на остальных устройствах)
      speed: 500, // Скорость переключения слайдов
      spaceBetween: !size.mobile ? 15 : 10, // Отступ между слайдами
      modules: [Navigation], // Подключение модуля навигации
      navigation: {
        // Настройки навигации
        disabledClass: 'disable',
        nextEl: `.providers-slider__next--${provider}`,
        prevEl: `.providers-slider__prev--${provider}`,
      },
    };
  };

  const swiperField = (provider) => {
    const filteredGames = allGames.filter((game) => {
      const { type, provider: gameProvider, tags, id, img } = game;

      const isTypeMatch = type === provider;
      const isProviderMatch = gameProvider === provider;
      const isTagMatch = tags.some((tag) => providers.includes(tag));

      const hasId = !!id;
      const hasImg = !!img;
      // const hasProvider = !!provider;

      return (isTypeMatch || isProviderMatch || isTagMatch) && hasImg && hasId;
    });

    return (
      <>
        <Swiper className="providers-slider__item" {...swiperSettings(provider)}>
          {filteredGames.slice(0, 20).map(
            (game, index) => (
              // isNotImageInCard !== null && (
              <SwiperSlide key={game.id}>
                <GameCard
                  key={game.id + index}
                  id={game.id}
                  name={game.name}
                  image={game.image}
                  provider={game.provider}
                  img={game.img}
                  lazy="swiper-slider--not-image"
                  demo
                  fs={game.tags?.includes('freespins') ? true : false}
                />
              </SwiperSlide>
            )
            // )
          )}
        </Swiper>
      </>
    );
  };

  const swiperSlider = (providers) => {
    let isSecondBlock = false;
    let sliderComponents = [];

    providers.forEach((provider, index) => {
      const filteredGames = allGames.filter((game) => {
        const { type, provider: gameProvider, tags, id, img } = game;

        const isTypeMatch = type === provider;
        const isProviderMatch = gameProvider === provider;
        const isTagMatch = tags.some((tag) => providers.includes(tag));

        const hasId = !!id;
        const hasImg = !!img;

        return (isTypeMatch || isProviderMatch || isTagMatch) && hasImg && hasId;
      });

      if (filteredGames.length > 0) {
        sliderComponents.push(
          <div className="providers-slider" key={provider}>
            <div className="providers-slider__category">
              <div className="providers-slider__title">
                <Title>{provider}</Title>
                <div className="nav">
                  <ButtonTypes styled="background" location={'lobby-slider'} className="show-more" onClick={() => handleProvider(provider)}>
                    <span>Show more</span>
                  </ButtonTypes>
                  {size.mobile && (
                    <>
                      <img className={`providers-slider__prev--${provider}`} src="/images/icons/arrow.svg" style={{ width: '20px', height: '20px' }} alt="prev" />
                      <img
                        className={`providers-slider__next--${provider}`}
                        src="/images/icons/arrow.svg"
                        style={{ width: '20px', height: '20px', transform: 'rotate(180deg)' }}
                        alt="next"
                      />
                    </>
                  )}
                </div>
              </div>
              <div className="swiper-block">
                <Swiper className="providers-slider__item" {...swiperSettings(provider)}>
                  {swiperField(provider)}
                  {inViewGames() < filteredGames.length && (
                    <SwiperSlide>
                      <div className="last-slide" data-provider={provider} onClick={() => handleProvider(provider)}>
                        <span>
                          Show All Games{' '}
                          {provider
                            .split('')
                            .map((letter, index) => {
                              return index === 0 ? letter.toUpperCase() : letter;
                            })
                            .join('')}
                        </span>
                      </div>
                    </SwiperSlide>
                  )}
                </Swiper>
                {!size.mobile && (
                  <>
                    <div className={`arrow arrow--prev providers-slider__prev--${provider}`}>
                      <img className="image" src="/images/icons/arrow.svg" style={{ width: '20px', height: '20px' }} alt="prev" />
                    </div>
                    <div className={`arrow arrow--next providers-slider__next--${provider}`}>
                      <img className="image" src="/images/icons/arrow.svg" style={{ width: '20px', height: '20px', transform: 'rotate(180deg)' }} alt="next" />
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        );

        if (!isSecondBlock && index === 1) {
          isSecondBlock = true;
          sliderComponents.push(<JackpotInLobby key="jackpot" />);
        }
      }
    });

    return sliderComponents;
  };

  const hasGames = providers.some((provider) => {
    const filteredGames = allGames.filter((game) => {
      const { type, provider: gameProvider, tags, id, img } = game;

      const isTypeMatch = type === provider;
      const isProviderMatch = gameProvider === provider;
      const isTagMatch = tags.some((tag) => providers.includes(tag));

      const hasId = !!id;
      const hasImg = !!img;

      return (isTypeMatch || isProviderMatch || isTagMatch) && hasImg && hasId;
    });

    return filteredGames.length > 0;
  });

  return (
    <>
      {hasGames && (
        <div className="providers-slider">
          <div className="container">{swiperSlider(providers)}</div>
        </div>
      )}
    </>
  );
};

ProvidersSlider.propTypes = {
  providers: PropTypes.arrayOf(PropTypes.string).isRequired,
};

ProvidersSlider.defaultProps = {
  providers: ['aristocrat', 'apollo', 'pragmatic', 'amatic', 'egt'],
};

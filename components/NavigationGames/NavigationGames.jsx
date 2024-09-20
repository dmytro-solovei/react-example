import React, { useCallback, useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useSelector, useDispatch } from 'react-redux';
import classNames from 'classnames';
import { Search, ButtonTypes } from '../../elements/';

import { setActiveGameList } from '../../store/actions';

import 'swiper/css';

export const NavigationGames = ({ list }) => {
  const dispatch = useDispatch();

  const allGames = useSelector((state) => state.api.gamesList?.games);
  const gamesList = useSelector((state) => state.api.gamesList);
  const providersFilter = useSelector((state) => state.settings.providersFilter);
  const size = useSelector((state) => state.handling.size);
  const refContainer = useRef(null);
  const activeProvider = useSelector((state) => state.handling.activeGameList);

  const scrollToSection = useCallback((section) => {
    let match = document.querySelector(section);
    setTimeout(() => {
      window.scrollTo({
        top: match?.offsetTop - 80,
        behavior: 'smooth',
      });
    }, 200);
  }, []);

  // * определение количества слайдов
  const [countSlides, setCountSlides] = useState(0);

  const [selectedItem, setSelectedItem] = useState(null);

  // * клик на элементе навигации

  const handleClick = useCallback(
    (item) => {
      setSelectedItem(item);
      dispatch(setActiveGameList(item));
      setTimeout(() => scrollToSection('.games'), 200);
    },
    [dispatch, scrollToSection]
  );

  const items = (item) => {
    const excludedItems = ['home', 'last_games', 'favorite_games'];

    // * фильтрация элементов в зависимости от наличия в списке игр
    const existingItems = item?.filter((item) => {
      if (excludedItems.includes(item)) {
        return true;
      }

      // Проверка, есть ли такой элемент в списке игр по type, provider или tags
      return (
        (allGames &&
          allGames.some((game) => {
            return game.type === item || game.provider === item || game.tags.includes(item);
          })) ||
        (gamesList && gamesList.hasOwnProperty(item) && gamesList[item]?.length !== 0 && gamesList[item] !== undefined)
      );
    });

    const renderedItems = existingItems?.map((item, i) => {
      // const renderedItems = list.map((item, i) => {
      let name = item;
      switch (name) {
        case 'live_betting':
          name = 'Live Sport';
          break;
        case 'favorite_games':
          name = 'favorites';
          break;
        default:
          name = item.replace(/_/g, ' ').toUpperCase();
          break;
      }

      return (
        <SwiperSlide
          className={classNames('item', {
            'item--active': selectedItem === item && activeProvider === item,
          })}
          key={item + i}
          onClick={() => handleClick(item)}
        >
          <div className="item__icon">
            <img
              src={`/images/icons/navigation-games/${item}.svg`}
              alt={item}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = '/images/icons/navigation-games/home.svg';
              }}
            />
          </div>
          <div className="item__title">{name}</div>
        </SwiperSlide>
      );
    });

    return renderedItems;
  };

  // Todo: need fix, change items(list) or list (list - 1), items(list) - rendering times is not correct
  // Inside the component
  const getSlidesCount = useCallback(() => {
    const containerWidth = refContainer.current?.clientWidth || 0;
    const slideWidth = 110; // Width of each slide

    if (size.width < 768 && !size.landscape && items(list).length >= 4) {
      return 4;
    }

    const slidesToFit = Math.floor(containerWidth / slideWidth);
    return Math.min(slidesToFit, items(list).length);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [size, list?.length, refContainer]);

  useEffect(() => {
    setCountSlides(getSlidesCount());
  }, [size, refContainer, getSlidesCount]);

  // * настройка слайдера
  const swiperSettings = {
    slidesPerView: countSlides, // Количество видимых слайдов (1 на мобильных, 3 на остальных устройствах)
    speed: 500, // Скорость переключения слайдов
  };

  // * клик на кнопку "Providers"
  const [toggleState, setToggleState] = useState(false);
  const [initialProvider, setInitialProvider] = useState('');
  const [lastProvider, setLastProvider] = useState('');

  const handleClickToggle = () => {
    localStorage.setItem('lastProviderToggle', localStorage.getItem('lastProvider'));
    setTimeout(() => scrollToSection('.games'), 200);
    setToggleState(!toggleState);
    if (toggleState) {
      dispatch(setActiveGameList(lastProvider));
    } else {
      dispatch(setActiveGameList('providers'));
      setInitialProvider(localStorage.getItem('lastProvider') || '');
      setLastProvider(localStorage.getItem('lastProvider') || '');
    }
    scrollToSection('.games');
  };

  useEffect(() => {
    setInitialProvider(localStorage.getItem('lastProvider') || '');
    setLastProvider(localStorage.getItem('lastProvider') || '');
  }, []);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      const navGameElement = document.querySelector('.nav-game');
      if (navGameElement && !navGameElement.contains(event.target)) {
        setToggleState(false);
      }
    };

    document.addEventListener('click', handleOutsideClick);

    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, []);

  useEffect(() => {
    if (initialProvider && toggleState) {
      localStorage.setItem('lastProviderNew', initialProvider);
      setLastProvider(initialProvider);
    }
  }, [initialProvider, toggleState]);

  // * если нет списка игр, то берем из settings
  if (!list) {
    list = providersFilter;
  }

  return (
    <div className="navigation-games">
      <div className="navigation-games__container" ref={refContainer}>
        <div className="navigation-games__action" style={{ maxWidth: `${Math.min(countSlides, getSlidesCount()) * 110}px` }}>
          <Search />
          <ButtonTypes styled="rounded" location="navigation-games" onClick={handleClickToggle}>
            <span>Providers</span>
          </ButtonTypes>
        </div>
        {!(list?.length === 0 || list === undefined) && (
          <div className="swiper-block">
            <Swiper className="navigation-games__swiper" {...swiperSettings} style={{ maxWidth: `${Math.min(countSlides, getSlidesCount()) * 110}px` }}>
              {items(list)}
            </Swiper>
          </div>
        )}
      </div>
    </div>
  );
};

NavigationGames.propTypes = {
  list: PropTypes.array,
};

NavigationGames.defaultProps = {
  list: undefined,
};

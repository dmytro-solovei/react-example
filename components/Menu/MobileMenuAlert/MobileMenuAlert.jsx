import React, { useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import { connect, useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setPopup, setActiveGameList, setAuthForm } from '../../../store/actions';

export const MobileMenu = React.memo(({ enable, visible }) => {
  const bottomMenu = useSelector((state) => state.settings.bottomMenu);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authorized = useSelector((state) => state.profile.authorized);
  const words = useSelector((state) => state.words);
  const provider = bottomMenu?.providers;
  const games = useSelector((state) => state.games);
  const activeProvider = useSelector((state) => state.handling.activeGameList);
  const popup = useSelector((state) => state.handling.activePopup);
  const locationPath = window.location.pathname;

  const scrollToSection = useCallback((section) => {
    let match = document.querySelector(section);
    setTimeout(() => {
      window.scrollTo({
        top: match?.offsetTop - 80,
        behavior: 'smooth',
      });
    }, 200);
  }, []);

  const handleProfile = useCallback(() => {
    if (authorized) {
      dispatch(setPopup({ active: true, name: 'deposit' }));
    } else {
      navigate('/auth');
      setTimeout(() => {
        dispatch(setAuthForm('signin'));
      });
    }
  }, [authorized, dispatch, navigate]);

  const handleMenu = useCallback(() => {
    dispatch(setPopup({ active: true, name: 'open-menu' }));
  }, [dispatch]);

  const handleSportGame = useCallback(() => {
    dispatch(setActiveGameList('home'));
    localStorage.setItem('lastProvider', 'home');

    if (locationPath !== '/') {
      navigate('/');
    }

    if (!authorized) {
      localStorage.setItem('SportGame', 'active');
      dispatch(setPopup({ active: false, name: '' }));
    } else {
      window.core.openGame('1537', 'live_betting', 1, 1);
      dispatch(setPopup({ active: false, name: '' }));
    }
  }, [authorized, dispatch, navigate, locationPath]);

  const handlePokerGame = useCallback(() => {
    if (locationPath !== '/') {
      navigate('/');
    }

    window.core.openGame('6908', 'live betting', 1, 0);
    if (!authorized) {
      dispatch(setActiveGameList('poker'));
      setTimeout(() => {
        scrollToSection('#nav-scroll-section');
      }, 400);
    }
  }, [authorized, dispatch, navigate, scrollToSection, locationPath]);

  const menuList = useMemo(() => {
    const list = [];
    let firstProviders = [];
    let firstProvider = [];

    if (bottomMenu.menu) {
      list.push(
        <div className="item menu" onClick={handleMenu} data-active={popup.name === 'open-menu' ? true : false} key="menu">
          <img src="./images/icons/toggle-btn--mobile.svg" alt="menu" />
          <span>Menu</span>
        </div>
      );
    }

    if (!bottomMenu.menu) {
      const eligibleProviders = [];
      for (let i = 0; i < provider.length; i++) {
        const currentProvider = provider[i];
        const gameViews = games.views[currentProvider];
        if (
          currentProvider !== 'sport' &&
          currentProvider !== 'poker' &&
          gameViews &&
          gameViews.length > 0 &&
          !list.some((item) => item.key === currentProvider) &&
          !gameViews.includes(undefined)
        ) {
          eligibleProviders.push(currentProvider);
        }
      }

      if (eligibleProviders.length >= 2) {
        firstProviders = eligibleProviders.slice(0, 2);
      } else if (eligibleProviders.length === 1) {
        firstProviders = [eligibleProviders[0]];
      }
    } else {
      for (let i = 0; i < provider.length; i++) {
        const currentProvider = provider[i];
        const gameCount = games.views[currentProvider]?.length;
        const gameViews = games.views[currentProvider];

        if (currentProvider !== 'sport' && currentProvider !== 'poker' && gameCount > 0 && !gameViews.includes(undefined) && !list.some((item) => item.key === currentProvider)) {
          firstProviders = [currentProvider];
          break;
        }
      }
    }

    if (firstProviders.length > 0) {
      for (const firstProvider of firstProviders) {
        const gameCount = games.views[firstProvider]?.length;
        if (gameCount > 0 && list.length < 5) {
          const isProviderAlreadyDisplayed = list.some((item) => item.key === firstProvider);
          if (!isProviderAlreadyDisplayed) {
            list.push(
              <div
                className="item provider"
                key={`${firstProvider}-${gameCount}`}
                data-active={activeProvider === firstProvider && locationPath === '/'}
                onClick={() => {
                  if (locationPath !== '/') {
                    navigate('/');
                  }
                  dispatch(setActiveGameList(firstProvider));
                  setTimeout(() => {
                    scrollToSection('#nav-scroll-section');
                  }, 400);
                }}
              >
                <img src={`./images/providerBar/${firstProvider}.svg`} alt={firstProvider} />
                <span>
                  {words.server[switchProviderName(firstProvider)] ||
                    words.server[firstProvider] ||
                    words.local[firstProvider] ||
                    switchProviderName(firstProvider).replace(/_/g, ' ') ||
                    firstProvider.replace(/_/g, ' ')}
                </span>
              </div>
            );
          }
        }
      }
    }

    if (list.length < 5) {
      list.push(
        <div className="item login" key="profile" onClick={handleProfile}>
          <img src="./images/icons/plusR.svg" alt="reg/login" />
          <span>{!authorized ? words.server.registration : words.server.deposit}</span>
        </div>
      );
    }

    const hasSport = provider.includes('sport') && games.views.sport?.length > 0;
    const hasPoker = provider.includes('poker') && games.views.poker?.length > 0;

    const countFinal = () => {
      if (hasSport && hasPoker) return 0;
      if (hasSport || hasPoker) return 3;
      if (!hasSport && !hasPoker) return 4;
    };

    if (hasSport && hasPoker) {
      // Если присутствуют и "sport", и "poker", список провайдеров будет 0 элементов
    } else {
      const eligibleProviders = provider.filter((prov) => prov !== 'sport' && prov !== 'poker');
      for (let i = 0; i < eligibleProviders.length && list.length <= countFinal(); i++) {
        const currentProvider = eligibleProviders[i];
        const gameCount = games.views[currentProvider]?.length;

        if (
          firstProvider !== currentProvider &&
          !firstProviders.includes(currentProvider) &&
          games.views[currentProvider]?.some((item) => item !== undefined) &&
          gameCount > 0 &&
          !list.some((item) => item.key === currentProvider)
        ) {
          list.push(
            <div
              className="item provider"
              key={currentProvider}
              data-active={activeProvider === currentProvider && locationPath === '/'}
              onClick={() => {
                if (locationPath !== '/') {
                  navigate('/');
                }
                dispatch(setActiveGameList(currentProvider));
                setTimeout(() => {
                  scrollToSection('#nav-scroll-section');
                }, 400);
              }}
            >
              <img src={`./images/providerBar/${currentProvider}.svg`} alt={currentProvider} />
              <span>
                {words.server[switchProviderName(currentProvider)] ||
                  words.server[currentProvider] ||
                  words.local[currentProvider] ||
                  switchProviderName(currentProvider).replace(/_/g, ' ') ||
                  currentProvider.replace(/_/g, ' ')}
              </span>
            </div>
          );
        }
      }
    }

    if (hasPoker) {
      list.push(
        <div className="item provider" key="poker" data-active={activeProvider === 'poker' && locationPath === '/'} onClick={handlePokerGame}>
          <img src="./images/providerBar/poker.svg" alt="poker" />
          <span>{words.server[switchProviderName('poker')] || switchProviderName('poker')}</span>
        </div>
      );
    }

    if (hasSport) {
      list.push(
        <div className="item provider" key="sport" onClick={handleSportGame}>
          <img src="./images/providerBar/sport.svg" alt="sport" />
          <span>{words.server[switchProviderName('sport')] || switchProviderName('sport')}</span>
        </div>
      );
    }

    return list;
  }, [
    activeProvider,
    authorized,
    bottomMenu.menu,
    dispatch,
    games.views,
    handleMenu,
    handlePokerGame,
    handleProfile,
    handleSportGame,
    navigate,
    popup.name,
    provider,
    scrollToSection,
    words.local,
    words.server,
    locationPath,
  ]);

  return (
    <div data-visible={!visible} className="menu-alerts">
      <div className="list">{menuList}</div>
    </div>
  );
});

MobileMenu.propTypes = {
  visible: PropTypes.bool.isRequired,
  enable: PropTypes.bool,
};

MobileMenu.defaultProps = {
  enable: true,
};

const mapStateToProps = (state) => ({});
export default connect(mapStateToProps)(MobileMenu);

function switchProviderName(provider) {
  switch (provider) {
    case 'live_betting':
      return 'live games';
    case 'fishing':
      return 'fish_games';
    case 'sport':
      return 'sport';
    case 'poker':
      return 'poker';
    default:
      return provider;
  }
}

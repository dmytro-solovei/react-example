import React, { useContext, useRef, useEffect, useState, useMemo, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { useNavigate } from 'react-router-dom';
import ReactInlineSvg from 'react-inlinesvg';
import { MenuClickContext } from '../../contexts/MenuClickAttribute';
import { ButtonClose, Dropdown, Download, SupportButtons, ButtonLanguages } from '../../elements';
import { setActiveGameList } from '../../store/actions';

export const Menu = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const menuRef = useRef();
  const { menuClick, setMenuClick } = useContext(MenuClickContext);
  const allGames = useSelector((state) => state.api.gamesList?.games);
  const activeProvider = useSelector((state) => state.handling.activeGameList);

  const providersList = useSelector((state) => state.api?.gamesList?.providers);
  const [menu, setMenu] = useState(useSelector((state) => state.settings.menu));

  const locationPath = window.location.pathname;
  const [activeDropdownItem, setActiveDropdownItem] = useState(false);

  const scrollToSection = useCallback((section) => {
    let match = document.querySelector(section);
    setTimeout(() => {
      window.scrollTo({
        top: match?.offsetTop - 80,
        behavior: 'smooth',
      });
    }, 200);
  }, []);

  const handleCloseClick = useCallback(() => {
    setMenuClick(!menuClick);
    if (!menuClick) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style = '';
    }
  }, [setMenuClick, menuClick]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && event.target.classList.contains('menu')) {
        handleCloseClick();
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [menuRef, handleCloseClick]);

  const contentDropdown = useMemo(() => {
    const handleMenuItemClick = (itemUrl, isLink) => {
      if (!isLink) {
        if (locationPath !== '/') {
          navigate('/');
        }
        const isProvider = allGames.filter((item) => item.provider === itemUrl);
        if (isProvider) {
          dispatch(setActiveGameList(itemUrl));
        }
      }

      document.body.style = '';
      setMenuClick(false);
    };

    const renderHeading = (heading) => {
      return (
        <Dropdown.Heading>
          {heading}
          <div className="icon-arrow">
            <ReactInlineSvg src="/images/icons/arrow__down--grey.svg" description="arrow" title="menu" />
          </div>
        </Dropdown.Heading>
      );
    };

    const renderContent = (content) => {
      const items = content?.map((item, i) => {
        const isLink = item?.url?.startsWith('/');
        const Field = isLink ? Link : 'div';
        const handleClick = () => {
          handleMenuItemClick(item.url, isLink);
          setActiveDropdownItem(item.url); // Set the active dropdown item

          if (!isLink) {
            setTimeout(() => scrollToSection('.games'), 400);
          } else return null;
        };

        const field = (
          <Field
            className={classNames('item', {
              active: activeDropdownItem === item.url && item.url === activeProvider, // Add the active class based on activeDropdownItem
            })}
            data-url={item.url}
            key={i}
            to={item.url}
            onClick={handleClick}
          >
            {item.img && (
              <img
                src={item.img}
                alt={item.title}
                onError={(e) => {
                  e.onerror = null;
                  const parent = e.target;
                  parent.remove();
                }}
              />
            )}
            <span>{item.title?.replace('dealers', 'live games').replace(/_/g, ' ')}</span>
          </Field>
        );

        // * Дополнительно проверяем, если sport-betting и игра с id 130 в списке allGames
        const isSportGame = item.title === 'sport' && allGames?.filter((game) => game.id === '1822').length !== 0;
        // * Дополнительно проверяем, если poker и игра с собственным id в списке allGames
        const isPokerGame = item.url === 'poker' && allGames?.filter((game) => game.id === '1823').length !== 0;
        // * Проверяем есть ли провайдер такой в списке игр
        const isProvider = allGames?.some((game) => game.provider === item.url);
        //* Проверяем наличие тега в играх
        const isTag = allGames?.some((game) => game.tag?.includes(item.url));
        // * Проверяем  наличие типа
        const isType = allGames?.some((game) => game.type?.includes(item.url));

        if (isLink || isSportGame || isPokerGame || (isProvider && item.url !== 'sport-betting' && item.url !== 'poker') || isTag || isType) {
          return field;
        } else {
          return null;
        }
      });

      const isItems = items?.some((item) => item !== null);
      if (items && isItems) {
        return <Dropdown.Content>{items}</Dropdown.Content>;
      }
    };

    const renderDropdown = (menu) => {
      const dropdownContent = Object.keys(menu).map((category, i) => {
        const categoryItems = menu[category] || [];

        if (category === 'providers' && categoryItems.options && categoryItems.options.enable) {
          categoryItems.list = providersList?.map((provider, i) => {
            const item = {
              title: provider,
              url: provider,
              img: '/' + categoryItems.options.cdn + '/' + provider + categoryItems.options.format,
            };
            return item;
          });
        }

        const handleDropdownClick = () => {
          const updatedMenu = { ...menu }; // Create a copy of the menu object
          updatedMenu[category].open = !menu[category].open; // Update the open state of the category
          setMenu(updatedMenu); // Set the updated menu object
        };

        if (menu[category].options?.enable === false && menu[category]?.list?.length !== 0) {
          return null;
        }

        return (
          <React.Fragment>
            {renderContent(categoryItems.list) !== undefined && (
              <Dropdown opened={menu[category].open} data-key={category} onClick={() => handleDropdownClick()} key={category + i}>
                {category !== 'general' && <Dropdown.Heading>{renderHeading(category)}</Dropdown.Heading>}
                <Dropdown.Content>{renderContent(categoryItems.list)}</Dropdown.Content>
              </Dropdown>
            )}
          </React.Fragment>
        );
      });

      return dropdownContent;
    };

    return renderDropdown(menu);
  }, [menu, providersList, activeDropdownItem, locationPath, navigate, dispatch, setMenuClick, allGames, activeProvider]);

  const dropdownContent = contentDropdown;

  return (
    <div className="menu" data-opened={menuClick || false} ref={menuRef}>
      <div className="menu__container">
        <ButtonClose className={'close'} onClick={handleCloseClick} defaultIcon={null}>
          <svg xmlns="http://www.w3.org/2000/svg" version="1.0" width="20" height="20" viewBox="0 0 54.000000 54.000000" preserveAspectRatio="xMidYMid meet">
            <g transform="translate(0.000000,54.000000) scale(0.100000,-0.100000)" fill="#fff" stroke="none">
              <path d="M20 520 c-35 -35 -25 -58 72 -156 l92 -94 -92 -94 c-97 -99 -110 -127 -74 -159 36 -33 61 -21 158 75 l94 92 94 -92 c99 -97 127 -110 159 -74 33 36 21 61 -75 158 l-92 94 92 94 c97 98 107 121 72 156 -35 35 -58 25 -156 -72 l-94 -92 -94 92 c-98 97 -121 107 -156 72z" />
            </g>
          </svg>
        </ButtonClose>
        <div className="menu__navigate">
          {dropdownContent && <div className="menu__mapsite">{dropdownContent}</div>}
          <div className="menu_bottom">
            {Download && <Download />}
            {SupportButtons && <SupportButtons direction="top" type="support--menu" />}
            {ButtonLanguages && <ButtonLanguages className="flan-name" />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Menu;

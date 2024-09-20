import react, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { ButtonLanguages, SocialIcons } from '../../elements';

const LogoTypes = styled.div`
  display: grid;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  gap: 10px;
  grid-template-columns: repeat(auto-fit, minmax(calc(100% / ${(props) => props.itemsRow || 3} - 20px), calc(100% / ${(props) => props.itemsRow || 3} - 20px)));

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  @media (max-width: 992px) {
    grid-gap: 10px;
  }
`;

const Anotation = styled.div`
  margin: 20px 0;
  p {
    margin: 0;
    text-align: center;
    font-size: 13px;
    line-height: 1.5;
    color: #fff;
  }

  @media (max-width: 992px) {
    font-size: 10px;
  }
`;

export const Footer = () => {
  const size = useSelector((state) => state.handling.size);
  const settings = useSelector((state) => state.settings);
  const mapSite = settings.mapSite;
  const logoTypeList = settings.logotypeList;
  const itemsRow = !size.mobile ? 4 : 2;

  const Logo = () => {
    const [imageError, setImageError] = useState(false);

    const handleImageError = () => {
      setImageError(true);
    };

    const logoText = 'casino';

    return imageError ? logoText : <img class="logo" src="/images/logo.png" alt="logo" onError={handleImageError} />;
  };

  const renderMapSite = () => {
    return mapSite.map((item, index) => {
      return (
        <div className="footer__column" key={index}>
          <h3 className="footer__column__title">{item.title}</h3>
          <ul className="footer__column__list map-site__list">
            {item.items.map((item, index) => {
              return (
                <li className="footer__item item" key={index}>
                  <Link to={item.url} className="footer__link">
                    {item.title}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      );
    });
  };

  const additionalBlock = (
    <div className="footer__column">
      <ButtonLanguages />
      {Logo()}
      <div className="copyright">
        <p>©{new Date().getFullYear()} Casino. All rights reserved.</p>
      </div>
    </div>
  );

  const renderAnnotation = `
      HELP IS NEARBY, GAMBLERS ANONYMOUS: IF YOU HAVE A <br /> ONLINE GAMBLING PROBLEM, CALL 1-800-GAMBLER.
      <br /> DIGITAL ACTION SLR THE FORUM I Business Park, <br /> Building A, Third Floor, Suite 27, Santa Ana, <br /> San Jose, Costa Rica. <br /> Cryptocurrency Sports Betting
      &amp; Online Sportsbook - <br /> GeminiCasino.com 2023, Inc. All rights reserved. <br />
  `;

  const renderLogotype = (items) => {
    const logotypeImages = items.map((item) => {
      return (
        <a href={item.url} target="_blank" rel="noreferrer">
          <img src={item.image} alt="logo" />
        </a>
      );

      // return list;
    });

    if (logotypeImages.length === 0) {
      return null;
    } else {
      return logotypeImages;
    }
  };

  // Footer Mobile
  function getMaxItemsPerColumn(mapSite) {
    let maxItems = 0;

    mapSite.forEach((item) => {
      if (item.items.length > maxItems) {
        maxItems = item.items.length;
      }
    });

    return maxItems;
  }

  function renderTitle(title, index) {
    return (
      <h3 className="footer__column__title" key={`title_${index}`}>
        {title}
      </h3>
    );
  }

  function renderItem(item, parentIndex, subIndex) {
    const { url, title } = item;
    const key = `item_${parentIndex}_${subIndex}`; // Generate a composite key

    const link =
      url !== undefined ? (
        <Link to={url} className="footer__link" key={key}>
          {title}
        </Link>
      ) : (
        <span className="footer__link" key={key}>
          {title}
        </span>
      );

    return <div className="footer__item item">{link}</div>;
  }

  function renderFooterColumnsMobile(mapSite) {
    const maxItemsPerColumn = getMaxItemsPerColumn(mapSite);
    const column1 = []; // Array for the first column
    const columns = [column1]; // Array of all columns

    mapSite.forEach((item, index) => {
      const { title, items } = item;
      const currentColumn = items.length < maxItemsPerColumn ? column1 : [];

      // Add the title to the current column
      currentColumn.push(renderTitle(title, index));

      // Add the items to the current column
      items.forEach((item, subIndex) => {
        currentColumn.push(renderItem(item, index, subIndex));
      });

      // If the current column is not the first column and not empty, add it to the array of all columns
      if (currentColumn !== column1 && currentColumn.length > 0) {
        columns.push(currentColumn);
      }
    });

    // Рендерим колонки
    return columns.map((column, index) => (
      <div className="footer__column" key={`column--${index}`}>
        {column}
      </div>
    ));
  }

  const lengthItemsLogoType = renderLogotype(logoTypeList).length;

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__map-site map-site">
          {!size.mobile && renderMapSite()}
          {size.mobile && renderFooterColumnsMobile(mapSite)}
          {!size.mobile && additionalBlock}
        </div>
        <Anotation className="anotation">
          <p dangerouslySetInnerHTML={{ __html: renderAnnotation }}></p>
        </Anotation>
        <LogoTypes
          itemsRow={itemsRow}
          className="footer__logotypes"
          style={{
            justifyContent: (lengthItemsLogoType <= 2 && !size.mobile) || (lengthItemsLogoType === 1 && size.mobile) ? 'center' : '',
          }}
        >
          {renderLogotype(logoTypeList)}
        </LogoTypes>
        <SocialIcons />
      </div>
    </footer>
  );
};

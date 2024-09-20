import React, { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import classNames from 'classnames';
import { useOutsideClick } from '../../hooks/useOutsideClick';

import './SupportButtons.scss';

export const SupportButtons = ({ direction, type = 'inCategories', label = false, positionStatic }) => {
  const ref = useRef();
  const settings = useSelector((state) => state.settings);
  const words = useSelector((state) => state.words);
  const [opened, setOpened] = useState(false);
  useOutsideClick(ref, () => setOpened(false), opened);

  let keys = Object.keys(settings.support);
  const renderSupport = () => {
    // eslint-disable-next-line array-callback-return
    return keys.map((item) => {
      if (settings.support[item]) {
        // let logo = require("/images/icons/" + item + ".svg").default
        let logo = '/images/icons/social/' + item + '.svg';
        switch (item) {
          case 'jivosite':
            return (
              <div
                key={item}
                className="support-method"
                // onClick={() => window.jivo_api.open()}
              >
                <img
                  src={logo}
                  alt={item}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.parentNode.removeChild(e.target);
                  }}
                />
              </div>
            );
          default:
            let link = typeof settings.support[item] === 'string' ? settings.support[item] : '';
            return (
              <a key={item} className="support-method" target="_blank" rel="noopener noreferrer" href={link}>
                <img
                  src={logo}
                  alt={item}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.parentNode?.removeChild(e.target);
                  }}
                />
              </a>
            );
        }
      }
    });
  };

  if (keys.length === 0) return null;

  if (settings.support && Object.keys(settings.support)) {
    return (
      <div
        ref={ref}
        // className={
        //   (classNames(`SupportButtons ${type}`),
        //   {
        //     "SupportButtons--opened": opened,
        //   })
        // }
        className={classNames(`support ${type}`, {
          'direction-center': keys.length <= 4 && settings.supportButtons.menuTrigger,
        })}
        data-opened={positionStatic || opened}
        data-direction={direction}
      >
        <div className="trigger item" onClick={() => setOpened(!opened)}>
          <div
            className="icon"
            style={{
              backgroundImage: 'url(/images/icons/social/support.svg)',
            }}
          />
          {label && <span className="label">{words.server.support}</span>}
        </div>
        <div
          className={classNames('list', {
            'margin-auto': keys.length <= 4 && keys.length >= 3,
          })}
        >
          {renderSupport()}
        </div>
      </div>
    );
  }

  return <React.Fragment />;
};

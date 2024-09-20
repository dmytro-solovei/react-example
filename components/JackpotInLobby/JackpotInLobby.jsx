import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { Link } from 'react-router-dom';
import AnimateHeight from 'react-animate-height';

import classNames from 'classnames';
import { LazyLoadComponent } from 'react-lazy-load-image-component';

export const JackpotInLobby = (open = false) => {
  const jackpots = useSelector((state) => state.api.jackpots);
  const size = useSelector((state) => state.handling.size);
  const words = useSelector((state) => state.words);
  const settings = useSelector((state) => state.settings);

  const jackpotsSort =
    jackpots !== false
      ? jackpots?.sort((a, b) => {
          return Number(b.jackpot) - Number(a.jackpot);
        })
      : null;

  const totalJackpots =
    jackpots !== false
      ? jackpots
          ?.filter((jackpot) => jackpot)
          ?.map((jackpot) => Number(jackpot.jackpot))
          ?.reduce((acc, num) => acc + num, 0)
          .toFixed(2)
      : null;

  useEffect(() => {}, [jackpots]);

  const imagePath = settings.lobbyJackpots.path || '/images/jackpots/lobby';

  const renderElements = (jackpots) => {
    const item = jackpots?.map((jackpot, i) => {
      return (
        <Link
          key={jackpot.name + i}
          className={classNames('item', 'item_jackpots', jackpot.name, {
            active: jackpot.activate,
          })}
          to="/jackpots"
        >
          <img
            src={imagePath + jackpot.name + '--bg.png'}
            alt="background"
            className="background"
            // onError={(e) => {
            //   e.target.onerror = null;
            //   e.target.style.opacity = 0;
            //   e.target.style.visibility = 'hidden';
            //   const parent = e.target;
            //   parent.remove();
            // }}
          />
          <div className="image-block">
            <img
              src={imagePath + jackpot.name + '.png'}
              onError={(e) => {
                e.target.onerror = null;
                e.target.style.opacity = 0;
                e.target.style.visibility = 'hidden';
                const parent = e.target;
                parent.remove();
              }}
              alt={jackpot?.name}
            />
          </div>
          <div className="info">
            <span className="name">{jackpot?.name?.toUpperCase()}</span>
            <span className="value"> {jackpot.jackpot || '100'} </span>
          </div>
        </Link>
      );
    });

    if (jackpots?.length > 0) return item;
    else return null;
  };

  const [height, setHeight] = useState(0);

  if (jackpots === undefined) return null;

  return (
    <div
      className={classNames('loby-jackpots', settings.lobbyJackpots?.version)}
      // style={{ display: activeProvider === "providers" ? "none" : "" }}
    >
      <div
        className={'loby-jackpots_info'}
        onClick={() => {
          if (size.mobile) setHeight(height === 0 ? 'auto' : 0);
        }}
      >
        {settings.lobbyJackpots.background.enable && (
          <div className="abstact-image">
            <LazyLoadComponent>
              {!size.mobile
                ? settings.lobbyJackpots.background.pc.light && (
                    <img
                      onError={(e) => {
                        e.target.parentNode?.removeChild(e.target);
                      }}
                      src={settings.lobbyJackpots.background.pc.light}
                      alt="light"
                      className="light"
                    />
                  )
                : size.landscape
                ? settings.lobbyJackpots.background.mobileLandscape.light && (
                    <img
                      onError={(e) => {
                        e.target.parentNode?.removeChild(e.target);
                      }}
                      src={settings.lobbyJackpots.background.mobileLandscape.light}
                      alt="light"
                      className="light"
                    />
                  )
                : settings.lobbyJackpots.background.mobile.light && (
                    <img
                      onError={(e) => {
                        e.target.parentNode?.removeChild(e.target);
                      }}
                      src={settings.lobbyJackpots.background.mobile.light}
                      alt="light"
                      className="light"
                    />
                  )}

              {!size.mobile
                ? settings.lobbyJackpots.background.pc.monets && (
                    <img
                      onError={(e) => {
                        e.target.parentNode?.removeChild(e.target);
                      }}
                      src={settings.lobbyJackpots.background.pc.monets}
                      alt="monets"
                      className="monets"
                    />
                  )
                : size.landscape
                ? settings.lobbyJackpots.background.mobileLandscape.monets && (
                    <img
                      onError={(e) => {
                        e.target.parentNode?.removeChild(e.target);
                      }}
                      src={settings.lobbyJackpots.background.mobileLandscape.monets}
                      alt="monets"
                      className="monets"
                    />
                  )
                : settings.lobbyJackpots.background.mobile.monets && (
                    <img
                      onError={(e) => {
                        e.target.parentNode?.removeChild(e.target);
                      }}
                      src={settings.lobbyJackpots.background.mobile.monets}
                      alt="monets"
                      className="monets"
                    />
                  )}

              {!size.mobile
                ? settings.lobbyJackpots.background.pc.figure && (
                    <img
                      onError={(e) => {
                        e.target.parentNode?.removeChild(e.target);
                      }}
                      src={settings.lobbyJackpots.background.pc.figure}
                      alt="figure"
                      className="figure"
                    />
                  )
                : size.landscape
                ? settings.lobbyJackpots.background.mobileLandscape.figure && (
                    <img
                      onError={(e) => {
                        e.target.parentNode?.removeChild(e.target);
                      }}
                      src={settings.lobbyJackpots.background.mobileLandscape.figure}
                      alt="figure"
                      className="figure"
                    />
                  )
                : settings.lobbyJackpots.background.mobile.figure && (
                    <img
                      onError={(e) => {
                        e.target.parentNode?.removeChild(e.target);
                      }}
                      src={settings.lobbyJackpots.background.mobile.figure}
                      alt="figure"
                      className="figure"
                    />
                  )}
            </LazyLoadComponent>
          </div>
        )}
        <div className="inline">
          <div className="title">
            <span>{'total jackpots'}</span>
          </div>
          <div className="value">10752.54</div>
          {totalJackpots > 0 && <div className="value">{totalJackpots}</div>}
        </div>
        {jackpotsSort?.length > 0 && (
          <div
            className={classNames('show', {
              active: height || open,
              open: open,
            })}
            onClick={() => {
              if (!size.mobile) setHeight(height === 0 ? 'auto' : 0);
            }}
          >
            show more
          </div>
        )}
      </div>

      <AnimateHeight duration={!size.mobile ? 200 : 500} height={height}>
        <div
          className={classNames('loby-jackpots_list', {
            active: height || open,
          })}
        >
          {renderElements(jackpotsSort)}
        </div>
      </AnimateHeight>
    </div>
  );
};

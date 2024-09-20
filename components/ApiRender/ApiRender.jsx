import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    balanceHistoryRequest,
    closeGameRequest,
    fetchData, getGameHistoryRequest, getInfoRequest,
    getWindowSize,
    getWords, onlinePaymentDepositRequest, onlinePaymentRequest,
    setActiveGameList,
    signInRequest,
    signOutRequest,
} from '../../store/actions';

export const ApiRender = () => {
  const dispatch = useDispatch();

  const data = useSelector(state => state.api);
  const words = useSelector(state => state.words.words);
  const settings = useSelector(state => state.settings);
  const size = useSelector(state => state.handling.size);
  const info = useSelector(state => state.info.info);
  const game = useSelector(state => state.game);
  const payment = useSelector(state => state.payment);
  // const auth = useSelector(state => state.auth.userData);
  const activeProvider = useSelector(state => state.handling.activeGameList);

  function updateDimensions() {
    settings.rememberState && localStorage.setItem('lastProvider', activeProvider);
    let vh = window.innerHeight * 0.01;
    // Then we set the value in the --vh custom property to the root of the document
    document.documentElement.style.setProperty('--vh', `${vh}px`);
    return dispatch(
      getWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    );
  }

  console.log(settings);
  useEffect(() => {
    window.addEventListener('resize', updateDimensions);

    return () => {
      window.removeEventListener('resize', updateDimensions);
    };
  });

  useEffect(() => {
    // dispatch(setActiveGameList('home'));
    const fetchAll = async () => {
        await dispatch(signInRequest());
        await dispatch(fetchData());
        await dispatch(getInfoRequest());
        await dispatch(closeGameRequest());
        await dispatch(getGameHistoryRequest({date: ['2023-07-04 00:00:00', '2023-07-04 23:59:59']}));
        await dispatch(onlinePaymentRequest({action: 'methodGet'}));
        await dispatch(onlinePaymentDepositRequest({action: 'deposit', amount: 10, methodId: 2}));
        await dispatch(balanceHistoryRequest({date: ['2023-07-04 00:00:00', '2023-07-04 23:59:59']}));
    };

      fetchAll()
          .then(res => console.log(res));
  }, [dispatch]);

  useEffect(() => {
    if (data) {
      dispatch(getWords(data?.language));
    }
  }, [data, dispatch]);

  return (
    <div>
        <button onClick={() => dispatch(signOutRequest())}>sign out</button>
      <h1>ApiRender Component</h1>
      <div>
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </div>

      <h1>Languages</h1>
      <div>
        <pre>{JSON.stringify(words, null, 2)}</pre>
      </div>
      <h1>Settings</h1>
      <div>
        <pre>{JSON.stringify(settings, null, 2)}</pre>
      </div>
      <h1>Sizes</h1>
      <div>
        <pre>{JSON.stringify(size, null, 2)}</pre>
      </div>
      <h1>Info</h1>
      <div>
        <pre>{JSON.stringify(info, null, 2)}</pre>
      </div>
      <h1>Game</h1>
      <div>
        <pre>{JSON.stringify(game, null, 2)}</pre>
      </div>
      <h1>Payment</h1>
      <div>
        <pre>{JSON.stringify(payment, null, 2)}</pre>
      </div>
    </div>
  );
};
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {useLocation} from 'react-router-dom';
import { deviceDetect } from 'react-device-detect';
import { fetchData, getUserAgent, getWindowSize, getWords, getYourIpRequest, setActiveGameList, signInRequest } from '../store/actions';

export const useReduxView = () => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  const { userAgent } = deviceDetect();
  const data = useSelector((state) => state.api);
  const settings = useSelector((state) => state.settings);
  const activeProvider = useSelector((state) => state.handling.activeGameList);
  const words = useSelector((state) => state.words.local);
  const ip = useSelector((state) => state.auth.ip);

  useEffect(() => {
    function updateDimensions() {
      settings.rememberState && localStorage.setItem('lastProvider', activeProvider);
      let vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
      return dispatch(
        getWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        })
      );
    }
    window.addEventListener('resize', updateDimensions);

    return () => {
      window.removeEventListener('resize', updateDimensions);
    };
  }, [activeProvider, dispatch, settings.rememberState]);

  useEffect(() => {
    let page = pathname === '/' ? '/home' : pathname
    const fetchAll = async () => {
      await dispatch(getUserAgent(userAgent));
      await dispatch(getYourIpRequest());
      await dispatch(fetchData(page));
      // await dispatch(signInRequest());
    };

    fetchAll().then((res) => console.log(res));
  }, [dispatch]);

  useEffect(() => {
    if (data) {
      dispatch(getWords(data?.language));
    }
  }, [data, dispatch]);

  return !!(data && words);
};

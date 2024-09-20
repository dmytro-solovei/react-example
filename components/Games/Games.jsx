import React from 'react';
import { useSelector } from 'react-redux';

import { ProvidersSlider, Grid, ProvidersList } from '../../components';

export const Games = () => {
  const activeProvider = useSelector((state) => state.handling.activeGameList);

  return (
    <div className="games">
      {activeProvider === 'home' && <ProvidersSlider />}
      {activeProvider === 'providers' && <ProvidersList />}
      {(activeProvider !== 'providers' || activeProvider !== 'home') && <Grid />}
    </div>
  );
};

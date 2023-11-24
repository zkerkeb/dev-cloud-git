import React from 'react';
import AppRouter from './appRouter';

const withLayout = WrappedComponent => {
  return props => (
    <div>
      <header>Barre de navigation</header>
      <WrappedComponent {...props} />
      <footer>Pied de page</footer>
    </div>
  );
};

const AppWithLayout = withLayout(AppRouter);

export default AppWithLayout;

// we
import Counter from './components/counter';
import Title from './components/title';
// import Model3DViewer from './components/model3dViewer';
import yamato from './assets/3d/yamato.gltf';
import React, {lazy, Suspense} from 'react';
import MyList from './components/myList';
// import Search from './components/search';

const Model3DViewer = lazy(() => import('./components/model3dViewer'));

const App = () => {
  const data = Array.from({length: 10000}, (_, index) => `Item ${index + 1}`);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 20,
        width: '100%',
        height: '100%',
      }}>
      <Title label="VIVE LA FRANCE"></Title>
      <Title label="test ok"></Title>
      {/* <Search></Search> */}
      {/* <Counter></Counter> */}
      {/* <Suspense fallback={<div>Chargement...</div>}>
        <Model3DViewer modelUrl={yamato}></Model3DViewer>
      </Suspense> */}
      {/* <div>
        <h1>Ma Liste Virtuelle</h1>
        <MyList data={data} />
      </div> */}
    </div>
  );
};

export default App;

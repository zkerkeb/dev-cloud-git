// we
// import Model3DViewer from './components/model3dViewer';
import React, {lazy} from 'react';
// import Search from './components/search';
import './app.css';
import SocketChat from './components/socketChat';
// import AppWithLayout from './config/appWithLayout';

const Model3DViewer = lazy(() => import('./components/model3dViewer'));

const App = () => {
  const data = Array.from({length: 10000}, (_, index) => `Item ${index + 1}`);

  return (
    <>
      <SocketChat></SocketChat>
      {/* <AppWithLayout></AppWithLayout> */}
      {/* <CustomAudioPlayer />
      <FullScreenDiv></FullScreenDiv>
       */}
      {/* <RotatingSphere></RotatingSphere> */}
      {/* <DragAndDrop></DragAndDrop> */}
      {/* <PromiseExemple></PromiseExemple> */}
      {/* <Search></Search> */}
      {/* <Counter></Counter> */}
      {/* <OptimisticTaskList></OptimisticTaskList> */}

      {/* <Suspense fallback={<div>Chargement...</div>}>
    <Model3DViewer modelUrl={yamato}></Model3DViewer>
  </Suspense> */}
      {/* <div>
    <h1>Ma Liste Virtuelle</h1>
    <MyList data={data} />
  </div> */}
    </>
  );
};

export default App;

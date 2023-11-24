import {useRef} from 'react';

import Title from '../title';

const FullScreenDiv = () => {
  const ref = useRef(null);

  const exitFullscreen = () => {
    ref.current.classList.remove('fullscreen');

    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.mozCancelFullScreen) {
      // Firefox
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
      // Chrome, Safari and Opera
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
      // IE / Edge
      document.msExitFullscreen();
    }
  };

  const enterFullscreen = () => {
    ref.current.classList.add('fullscreen');

    if (ref.current.requestFullscreen) {
      ref.current.requestFullscreen();
    } else if (ref.current.mozRequestFullScreen) {
      /* Firefox */
      ref.current.mozRequestFullScreen();
    } else if (ref.current.webkitRequestFullscreen) {
      /* Chrome, Safari & Opera */
      ref.current.webkitRequestFullscreen();
    } else if (ref.current.msRequestFullscreen) {
      /* IE/Edge */
      ref.current.msRequestFullscreen();
    } else {
      console.log('Fullscreen API is not supported.');
    }
  };
  return (
    <div
      ref={ref}
      className="full"
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        height: '100%',
      }}>
      <img
        className="cover"
        src="https://i.scdn.co/image/ab67616d0000b273bfcff1dd252b22bba16a2a5d"
        alt="album cover"
      />
      <Title label="VIVE LA FRANCE"></Title>
      <Title label="test ok"></Title>
      <button onClick={enterFullscreen}>full screen</button>
      <button onClick={exitFullscreen}>exit full screen</button>
    </div>
  );
};

export default FullScreenDiv;

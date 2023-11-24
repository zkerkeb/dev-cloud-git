import shuffle from 'just-shuffle';
import {useEffect, useRef, useState} from 'react';
import sound_one from '../../assets/audio/sound_one.mp3';
import sound_three from '../../assets/audio/sound_three.mp3';
import sound_two from '../../assets/audio/sound_two.mp3';
const playListData = [sound_one, sound_two, sound_three];

const CustomAudioPlayer = () => {
  const audioRef = useRef(null);
  const [indexPlayList, setIndexPlayList] = useState(0);
  const [playList, setPlayList] = useState(playListData);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    // audioRef.current.pause();
    // console.log('isPlaying', audioRef.current.playing);
    setInterval(() => {
      if (!audioRef.current) {
        return;
      }
      setDuration(Math.round(audioRef.current.duration));
      setCurrentTime(Math.round(audioRef.current.currentTime));
    }, 1000);
  }, []);

  const randomize = array => {
    const randomizedArray = shuffle(array);
    setPlayList(randomizedArray);
    setIndexPlayList(0);
  };

  return (
    <>
      <audio
        onChange={e => {
          console.log('e', e);
        }}
        onCanPlay={() => {
          if (isPlaying) {
            audioRef.current.play();
          }
        }}
        ref={audioRef}
        src={playList[indexPlayList]}
      />
      <button
        onClick={() => {
          audioRef.current.play();
          setIsPlaying(true);
        }}>
        Play
      </button>
      <button
        onClick={() => {
          audioRef.current.pause();
          setIsPlaying(false);
        }}>
        Pause
      </button>
      <button
        onClick={() => {
          if (indexPlayList < playList.length - 1) {
            setIndexPlayList(indexPlayList + 1);
          } else {
            setIndexPlayList(0);
          }
        }}>
        Next
      </button>
      <button onClick={() => randomize(playList)}>Randomize</button>
      <div
        onClick={e => {
          const rect = e.target.getBoundingClientRect();
          const x = e.clientX - rect.left; //x position within the element.
          console.log('x', x);
          audioRef.current.currentTime = (x * duration) / 300;
          // set audio to x position
        }}
        style={{
          height: 5,
          width: 300,
          background: '#00000042',
          borderRadius: 5,
        }}>
        <div
          style={{
            height: 5,
            width: (currentTime * 300) / duration,
            background: 'red',
            borderRadius: 5,
          }}></div>
      </div>
    </>
  );
};

export default CustomAudioPlayer;

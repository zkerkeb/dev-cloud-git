import {useEffect, useRef, useState} from 'react';
import './index.css';
import axios from 'axios';

const Search = () => {
  const [input, setInput] = useState('');
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const callRef = useRef(null);

  useEffect(() => {
    if (input.length > 0) {
      setIsLoading(true);
      clearTimeout(callRef.current);
      callRef.current = setTimeout(() => {
        axios({
          method: 'GET',
          url: `https://api.muslimin-play.com/artists?name_contains=${input}`,
        })
          .then(res => {
            setIsLoading(false);
            console.log(res.data);
            setData(res.data);
          })
          .catch(err => {
            setIsLoading(false);
            console.log(err);
          });
      }, 300);
    }
  }, [input]);
  return (
    <div
      style={{
        width: 400,
        backgroundColor: 'red',
        display: 'flex',
        flexDirection: 'column',
      }}>
      <input
        onChange={e => setInput(e.target.value)}
        value={input}
        style={{
          width: '100%',
          backgroundColor: 'white',
          height: 40,
          borderRadius: 50,
          outline: 'none',

          fontSize: 20,
          border: '1px solid #00000033',
        }}
        type="text"
        placeholder="Search..."
      />
      <div
        style={{
          marginTop: 12,
          width: '100%',
          minHeight: 200,
          backgroundColor: 'green',
          display: input.length > 0 ? 'flex' : 'none',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',

          borderRadius: 24,
        }}>
        {isLoading ? <div className="spinner"></div> : null}
        {data
          .map((item, index) => (
            <div
              key={index}
              style={{
                width: '100%',
                height: 40,
                backgroundColor: 'white',
                borderRadius: 12,
                marginBottom: 12,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              {item.name}
            </div>
          ))
          .slice(0, 5)}
      </div>
    </div>
  );
};

export default Search;

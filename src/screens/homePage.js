import {useNavigate} from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();
  return (
    <>
      <p>HomePage</p>
      <button onClick={() => navigate('/about')}>to about page </button>
    </>
  );
};

export default HomePage;

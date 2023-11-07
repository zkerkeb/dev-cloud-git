import {render, screen} from '@testing-library/react';
import App from './App';

test('contains an element with "Tâches terminées"', () => {
  render(<App />);
  const linkElement = screen.getByText(/test ok/i);
  expect(linkElement).toBeInTheDocument();
});

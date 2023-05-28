import { render, screen } from '@testing-library/react';
import NotFound from './NotFound';

test('Renders Not Found', () => {
  render(<NotFound />);
  
  expect(
    screen.getByText('Not Found')
  ).toBeInTheDocument();
});
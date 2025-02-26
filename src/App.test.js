import { render, screen, within } from '@testing-library/react';
import App from './App';
import { ATTRIBUTE_LIST } from './consts';

test('renders character attributes', () => {
  render(<App />);
  const attributesContainer = screen.getByRole('heading', { name: /attributes/i }).parentElement;
  
  ATTRIBUTE_LIST.forEach(attr => {
    const element = within(attributesContainer).getByText(new RegExp(`${attr}: \\d+`, 'i'));
    expect(element).toBeInTheDocument();
  });
});

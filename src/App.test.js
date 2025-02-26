import { render, screen, within } from '@testing-library/react';
import App from './App';
import { ATTRIBUTE_LIST } from './consts';

test('renders character attributes and modifiers', () => {
  render(<App />);
  const attributesContainer = screen.getByRole('heading', { name: /attributes/i }).parentElement;
  
  ATTRIBUTE_LIST.forEach(attr => {
    // Check for attribute value
    const attributeElement = within(attributesContainer).getByText(new RegExp(`${attr}: \\d+`, 'i'));
    expect(attributeElement).toBeInTheDocument();

    // Check for modifier
    const modifierElement = within(attributesContainer).getByText(new RegExp(`${attr} Modifier: [+-]?\\d+`, 'i'));
    expect(modifierElement).toBeInTheDocument();
  });
});

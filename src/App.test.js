import { render, screen, within, fireEvent } from '@testing-library/react';
import App from './App';
import { ATTRIBUTE_LIST, SKILL_LIST } from './consts';

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

test('renders skills with points and modifiers', () => {
  render(<App />);
  const skillsContainer = screen.getByRole('heading', { name: /skills/i }).parentElement;
  
  // Check if available points info is displayed
  expect(within(skillsContainer).getByText(/Available Points:/i)).toBeInTheDocument();

  // Check if all skills are rendered
  SKILL_LIST.forEach(skill => {
    expect(within(skillsContainer).getByText(skill.name)).toBeInTheDocument();
    expect(within(skillsContainer).getByText(/Points: 0/i)).toBeInTheDocument();
  });
});

test('skill points calculation works correctly', () => {
  render(<App />);
  
  // Find Intelligence attribute controls
  const intElement = screen.getByText(/Intelligence: 10/i);
  const intIncrementButton = intElement.parentElement.querySelector('button:first-of-type');
  
  // Increase Intelligence by 2 (modifier should become +1)
  fireEvent.click(intIncrementButton);
  fireEvent.click(intIncrementButton);
  
  // Should now have 14 skill points (10 + 4 * 1)
  expect(screen.getByText(/Available Points: 14/i)).toBeInTheDocument();
});

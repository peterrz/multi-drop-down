import React from 'react';
import { render, fireEvent, screen, within } from '@testing-library/react';
import '@testing-library/jest-dom';
import MultiSelect from './index';
import { Option } from './types';

describe('MultiSelect basic interaction', () => {
  const OPTIONS: Option[] = [
    { label: 'Education', value: 'education', icon: '🎓' },
    { label: 'Science',   value: 'science',   icon: '🔬' },
    { label: 'Art',       value: 'art',       icon: '🎨' },
  ];

  const setup = (props = {}) => {
    const onChange = jest.fn();
    const utils = render(
      <MultiSelect
        options={OPTIONS}
        value={(props as { value?: Option[] }).value || []}
        onChange={onChange}
        placeholder="Select..."
        {...props}
      />
    );
    return { onChange, ...utils };
  };

  test('opens menu on input focus/click and lets you click an item', () => {
    const { onChange } = setup();
    const input = screen.getByTestId('multiselect-input');
    expect(screen.queryByText('Science')).not.toBeInTheDocument();
    fireEvent.focus(input);
    expect(screen.getByText(/Science/i)).toBeVisible();
    fireEvent.click(screen.getByText(/Science/i));
    expect(onChange).toHaveBeenCalledWith([OPTIONS[1]]);
  });

  test('selects and then deselects an option', () => {
    const { onChange, rerender } = setup();
  
    const input = screen.getByTestId('multiselect-input');
    fireEvent.focus(input);
  
    // Only look for "Art" in the menu
    const menu = screen.getByTestId('multiselect-menu');
    const artOption = within(menu).getByText(/Art/i);
    fireEvent.click(artOption);
    expect(onChange).toHaveBeenCalledWith([OPTIONS[2]]);
  
    rerender(
      <MultiSelect
        options={OPTIONS}
        value={[OPTIONS[2]]}
        onChange={onChange}
        placeholder="Select..."
      />
    );
  
    fireEvent.focus(screen.getByTestId('multiselect-input'));
    const menuAgain = screen.getByTestId('multiselect-menu');
    const artOptionAgain = within(menuAgain).getByText(/Art/i);
    fireEvent.click(artOptionAgain);
    expect(onChange).toHaveBeenCalledWith([]);
  });

  test('closes dropdown when clicking outside', () => {
    setup();
    const input = screen.getByTestId('multiselect-input');
    fireEvent.focus(input);
    expect(screen.getByText(/Science/i)).toBeVisible();
    fireEvent.mouseDown(document.body);
    expect(screen.queryByText(/Science/i)).not.toBeInTheDocument();
  });
});

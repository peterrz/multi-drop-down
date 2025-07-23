import React, { useState } from 'react';
import './App.css';
import MultiSelect from './components/MultiSelect';
import { Option } from './components/MultiSelect/types';
import ArrowIcon from './components/MultiSelect/ArrowIcon';

const ALL_OPTIONS: Option[] = [
  { label: 'Education', value: 'education', icon: '🎓' },
  { label: 'Science',   value: 'science',   icon: '🔬' },
  { label: 'Art',       value: 'art',       icon: '🎨' },
  { label: 'Sport',     value: 'sport',     icon: '⚽️' },
  { label: 'Music',     value: 'music',     icon: '🎵' },
  // …etc
];

function App() {
  const [selected, setSelected] = useState<Option[]>([]);

  return (
    <div className="app-container">
      <h1 className="app-title">
         Multi Select Component 🎉
      </h1>
      <MultiSelect
        options={ALL_OPTIONS}
        value={selected}
        onChange={setSelected}
        placeholder="Yeeeah, science! 🛸"
      />
    </div>
  );
}

export default App;

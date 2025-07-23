import React, {
  useState,
  useRef,
  useEffect,
  KeyboardEvent,
  ChangeEvent,
} from 'react';
import styles from './MultiSelect.module.scss';
import { MultiSelectProps, Option } from './types';
import ArrowIcon from './ArrowIcon';

const MultiSelect: React.FC<MultiSelectProps> = ({
  options,
  value,
  onChange,
  placeholder = 'Select...',
}) => {
  const [open, setOpen] = useState(false);
  const [filter, setFilter] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);

  // close on outside click
  useEffect(() => {
    const onBodyClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', onBodyClick);
    return () => document.removeEventListener('mousedown', onBodyClick);
  }, []);

  // filtered options
  const filtered = options.filter(o =>
    o.label.toLowerCase().includes(filter.toLowerCase())
  );

  // toggle a selection
  const toggleOption = (opt: Option) => {
    if (value.some(v => v.value === opt.value)) {
      onChange(value.filter(v => v.value !== opt.value));
    } else {
      onChange([...value, opt]);
    }
  };

  // remove a tag
  const removeOption = (val: string) =>
    onChange(value.filter(v => v.value !== val));

  // enter key 
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && filter.trim()) {
      const text = filter.trim();
      const existing = options.find(
        o => o.label.toLowerCase() === text.toLowerCase()
      );
      if (existing) toggleOption(existing);
      else
        onChange([
          ...value,
          { label: text, value: text.toLowerCase().replace(/\s+/g, '-') },
        ]);
      setFilter('');
    }
    if (e.key === 'Escape') setOpen(false);
  };

  return (
    <div className={styles.container} ref={containerRef}>
      {/* input */}
      <div className={styles.control} onClick={() => setOpen(true)}>
        <input
          type="text"
          data-testid="multiselect-input"
          value={filter}
          placeholder={placeholder}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setFilter(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => setOpen(true)}
          onClick={e => e.stopPropagation()}
        />

        <span
          className={`${styles.arrow} ${open ? styles.arrowOpen : ''}`}
          onClick={e => {
            e.stopPropagation();
            setOpen(o => !o);
          }}
          aria-hidden="true"
        >
         <ArrowIcon />
        </span>
      </div>

      {/* tags */}
      {value.length > 0 && (
        <div className={styles.tags} data-testid="multiselect-tags">
          {value.map(opt => (
            <span className={styles.tag} key={opt.value}>
              {opt.icon} {opt.label}
              <button
                type="button"
                onClick={e => {
                  e.stopPropagation();
                  removeOption(opt.value);
                }}
              >
                ×
              </button>
            </span>
          ))}
        </div>
      )}

      {/* dropdown menu */}
      {open && filtered.length > 0 && (
        <ul className={styles.menu} data-testid="multiselect-menu">
          {filtered.map(opt => {
            const isSelected = value.some(v => v.value === opt.value);
            return (
              <li
                key={opt.value}
                className={`${styles.option} ${
                  isSelected ? styles.selected : ''
                }`}
                onClick={() => toggleOption(opt)}
              >
                {opt.icon} {opt.label}
                {isSelected && <span className={styles.checkIcon}>✔️</span>}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default MultiSelect;

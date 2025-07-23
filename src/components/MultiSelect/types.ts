export interface Option {
    label: string;
    value: string;
    icon?: React.ReactNode; 
  }
  
  export interface MultiSelectProps {
    options: Option[];
    value: Option[];
    onChange: (newValue: Option[]) => void;
    placeholder?: string;
  }
  
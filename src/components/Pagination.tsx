import React from 'react';

interface PaginationProps {
  currentYear: number;
  years: number[];
  onYearChange: (year: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ 
  currentYear, 
  years, 
  onYearChange 
}) => {
  const currentIndex = years.indexOf(currentYear);
  const hasPrevious = currentIndex > 0;
  const hasNext = currentIndex < years.length - 1;

  const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '1rem',
    margin: '2rem 0',
  };

  const buttonStyle = {
    padding: '0.5rem 1rem',
    borderRadius: '0.375rem',
    transition: 'background-color 0.2s',
  };

  const activeButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#3b82f6',
    color: 'white',
    cursor: 'pointer',
  };

  const disabledButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#d1d5db',
    color: '#6b7280',
    cursor: 'not-allowed',
  };

  const yearStyle = {
    fontSize: '1.125rem',
    fontWeight: 500,
  };

  return (
    <div style={containerStyle}>
      <button
        onClick={() => hasPrevious && onYearChange(years[currentIndex - 1])}
        disabled={!hasPrevious}
        style={hasPrevious ? activeButtonStyle : disabledButtonStyle}
      >
        &larr; Previous Year
      </button>
      
      <span style={yearStyle}>
        {currentYear}
      </span>
      
      <button
        onClick={() => hasNext && onYearChange(years[currentIndex + 1])}
        disabled={!hasNext}
        style={hasNext ? activeButtonStyle : disabledButtonStyle}
      >
        Next Year &rarr;
      </button>
    </div>
  );
};

export default Pagination; 
import React from 'react';
import { PaginationProps } from '../types/index';

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
    gap: 'clamp(0.5rem, 2vw, 1rem)',
    margin: '2rem 0',
    flexWrap: 'wrap' as const,
    padding: '0 1rem',
  };

  const buttonStyle = {
    padding: 'clamp(0.25rem, 1vw, 0.5rem) clamp(0.5rem, 2vw, 1rem)',
    borderRadius: '0.375rem',
    transition: 'background-color 0.2s',
    fontSize: 'clamp(0.75rem, 1.5vw, 1rem)',
    whiteSpace: 'nowrap' as const,
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
    fontSize: 'clamp(0.9rem, 2vw, 1.125rem)',
    fontWeight: 500,
  };

  // Add media query for mobile devices
  const mediaQueryStyles = `
    @media (max-width: 640px) {
      .pagination-container {
        margin: 2.5rem 0;
      }
      
      .pagination-button {
        font-size: 1.1rem;
        padding: 0.75rem 1.25rem;
        font-weight: 600;
      }
      
      .pagination-year {
        font-size: 1.5rem;
        font-weight: 600;
        margin: 0 1rem;
      }
    }
  `;

  return (
    <div style={containerStyle} className="pagination-container">
      <style>{mediaQueryStyles}</style>
      <button
        onClick={() => hasPrevious && onYearChange(years[currentIndex - 1])}
        disabled={!hasPrevious}
        style={hasPrevious ? activeButtonStyle : disabledButtonStyle}
        className="pagination-button"
      >
        &larr; Previous Year
      </button>
      
      <span style={yearStyle} className="pagination-year">
        {currentYear}
      </span>
      
      <button
        onClick={() => hasNext && onYearChange(years[currentIndex + 1])}
        disabled={!hasNext}
        style={hasNext ? activeButtonStyle : disabledButtonStyle}
        className="pagination-button"
      >
        Next Year &rarr;
      </button>
    </div>
  );
};

export default Pagination; 
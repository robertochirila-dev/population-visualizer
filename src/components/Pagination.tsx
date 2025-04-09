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

  return (
    <div className="flex justify-center items-center space-x-4 my-8">
      <button
        onClick={() => hasPrevious && onYearChange(years[currentIndex - 1])}
        disabled={!hasPrevious}
        className={`px-4 py-2 rounded-md transition-colors ${
          hasPrevious 
            ? 'bg-blue-500 text-white hover:bg-blue-600' 
            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
        }`}
      >
        &larr; Previous Year
      </button>
      
      <span className="text-lg font-medium">
        {currentYear}
      </span>
      
      <button
        onClick={() => hasNext && onYearChange(years[currentIndex + 1])}
        disabled={!hasNext}
        className={`px-4 py-2 rounded-md transition-colors ${
          hasNext 
            ? 'bg-blue-500 text-white hover:bg-blue-600' 
            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
        }`}
      >
        Next Year &rarr;
      </button>
    </div>
  );
};

export default Pagination; 
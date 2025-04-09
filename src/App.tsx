import { useEffect, useState } from 'react';
import BarChart from './components/BarChart';
import Pagination from './components/Pagination';
import { PopulationData, YearData } from './types';
import populationData from './generated.json';

function App() {
  const [data, setData] = useState<PopulationData>([]);
  const [years, setYears] = useState<number[]>([]);
  const [currentYear, setCurrentYear] = useState<number>(0);
  const [currentData, setCurrentData] = useState<YearData | null>(null);
  const [displayCount, setDisplayCount] = useState<number>(10);

  useEffect(() => {
    // Load the population data
    const typedData = populationData as PopulationData;
    setData(typedData);

    // Extract list of years
    const yearsList = typedData.map(item => item.Year);
    setYears(yearsList);

    // Set initial year to the first one in the dataset
    if (yearsList.length > 0) {
      setCurrentYear(yearsList[0]);
    }
  }, []);

  useEffect(() => {
    // Update current data when the year changes
    if (currentYear && data.length) {
      const yearData = data.find(item => item.Year === currentYear);
      if (yearData) {
        setCurrentData(yearData);
      }
    }
  }, [currentYear, data]);

  const handleYearChange = (year: number) => {
    setCurrentYear(year);
  };

  const toggleDisplayCount = () => {
    setDisplayCount(displayCount === 10 ? 15 : 10);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-md p-6">
        {currentData ? (
          <>
            <BarChart 
              countries={currentData.Countries} 
              year={currentYear} 
              displayCount={displayCount}
            />
            
            <Pagination 
              currentYear={currentYear} 
              years={years} 
              onYearChange={handleYearChange} 
            />
            
            <div className="text-center mt-4">
              <button 
                onClick={toggleDisplayCount}
                className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors"
              >
                Show {displayCount === 10 ? '15' : '10'} Countries
              </button>
            </div>
          </>
        ) : (
          <div className="flex justify-center items-center h-64">
            <p className="text-xl text-gray-500">Loading data...</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;

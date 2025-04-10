import { useEffect, useState } from 'react';
import BarChart from './components/BarChart';
import Pagination from './components/Pagination';
import { PopulationData, YearData } from './types/index';
import populationData from './generated.json';

function App() {
  const [data, setData] = useState<PopulationData>([]);
  const [years, setYears] = useState<number[]>([]);
  const [currentYear, setCurrentYear] = useState<number>(0);
  const [currentData, setCurrentData] = useState<YearData | null>(null);
  const displayCount = 15;

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

  const containerStyle = {
    minHeight: '100vh',
    backgroundColor: 'white',
    padding: 'clamp(1rem, 3vw, 2rem) clamp(0.5rem, 2vw, 1rem)',
  };

  const contentStyle = {
    maxWidth: '1200px',
    margin: '0 auto',
    width: '100%',
  };

  const loadingStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '16rem',
  };

  const loadingTextStyle = {
    fontSize: 'clamp(1rem, 2vw, 1.25rem)',
    color: '#6b7280',
  };

  // Add media query for mobile devices
  const mediaQueryStyles = `
    @media (max-width: 640px) {
      .app-container {
        padding: 1.5rem 0.75rem;
      }
      
      .loading-text {
        font-size: 1.5rem;
      }
    }
  `;

  return (
    <div style={containerStyle} className="app-container">
      <style>{mediaQueryStyles}</style>
      <div style={contentStyle}>
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
          </>
        ) : (
          <div style={loadingStyle}>
            <p style={loadingTextStyle} className="loading-text">Loading data...</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;

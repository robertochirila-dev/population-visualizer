import { useEffect, useRef, useState } from 'react';
import { Country, BarChartProps } from '../types/index';

const BarChart: React.FC<BarChartProps> = ({ 
  countries = [], 
  year,
  displayCount = 15
}) => {
  const [sortedCountries, setSortedCountries] = useState<Country[]>([]);
  const [barWidths, setBarWidths] = useState<{ [key: string]: number }>({});
  const [slideDirection, setSlideDirection] = useState<'left' | 'right' | null>(null);
  const [prevYear, setPrevYear] = useState<number | null>(null);
  const chartRef = useRef<HTMLDivElement>(null);
  
  // Define a fixed color map for countries to ensure consistent colors
  const countryColors: { [key: string]: string } = {
    'China': '#3b82f6',
    'India': '#60a5fa',
    'United States': '#93c5fd',
    'Russian Federation': '#7dd3fc',
    'Indonesia': '#a5f3fc',
    'Japan': '#2563eb',
    'Brazil': '#3b82f6',
    'Germany': '#64748b',
    'Bangladesh': '#22c55e',
    'United Kingdom': '#818cf8',
    'Pakistan': '#f472b6',
    'Nigeria': '#c084fc',
    'Italy': '#f472b6',
    'France': '#a855f7',
    'Mexico': '#ec4899',
    'Ukraine': '#1d4ed8',
    'Vietnam': '#16a34a',
    'Thailand': '#14b8a6',
    'Philippines': '#a855f7',
    'Turkey': '#db2777',
    'Egypt': '#eab308',
    'Ethiopia': '#84cc16',
  };

  // Get color for a country (fallback to a random but consistent color if not defined)
  const getCountryColor = (countryName: string) => {
    if (countryColors[countryName]) {
      return countryColors[countryName];
    }
    
    // For countries without a predefined color, generate a deterministic color
    // based on the country name to ensure consistency
    let hash = 0;
    for (let i = 0; i < countryName.length; i++) {
      hash = countryName.charCodeAt(i) + ((hash << 5) - hash);
    }
    
    let color = '#';
    for (let i = 0; i < 3; i++) {
      const value = (hash >> (i * 8)) & 0xFF;
      color += ('00' + value.toString(16)).substr(-2);
    }
    
    return color;
  };
  
  // Determine slide direction when year changes
  useEffect(() => {
    if (prevYear !== null && prevYear !== year) {
      setSlideDirection(prevYear < year ? 'left' : 'right');
      
      // Reset slide direction after animation completes
      setTimeout(() => {
        setSlideDirection(null);
      }, 500);
    }
    
    setPrevYear(year);
  }, [year, prevYear]);

  useEffect(() => {
    if (countries.length) {
      // Reset animation state when countries change
      
      // Start with zero widths
      setBarWidths({});
      
      // Sort countries by population (descending)
      const sorted = [...countries]
        .sort((a, b) => b.Population - a.Population)
        .slice(0, displayCount);
      
      setSortedCountries(sorted);
      
      // Trigger animation after small delay
      setTimeout(() => {
        // Calculate bar widths
        const maxPopulation = sorted[0].Population;
        const newWidths: { [key: string]: number } = {};
        
        sorted.forEach(country => {
          // Calculate percentage of the max (maximum bar width is 90%)
          newWidths[country._id] = (country.Population / maxPopulation) * 90;
        });
        
        setBarWidths(newWidths);
      }, 50);
    }
  }, [countries, displayCount]);

  const containerStyle = {
    width: '100%',
    maxWidth: '1200px',
    margin: '0 auto',
    fontFamily: 'system-ui, sans-serif',
    padding: '0 1rem',
  };
  
  const titleStyle = {
    fontSize: 'clamp(1.5rem, 5vw, 3rem)',
    fontWeight: 900,
    textAlign: 'center' as const,
    marginTop: '1.5rem',
    marginBottom: '1.5rem',
    wordWrap: 'break-word' as const,
  };
  
  const getYearStyle = () => {
    const baseStyle = {
      fontSize: 'clamp(1.5rem, 4vw, 3rem)',
      fontWeight: 400,
      textAlign: 'center' as const,
      color: '#9ca3af',
      marginBottom: '4rem',
      position: 'relative' as const,
      animation: slideDirection ? 
        `slide${slideDirection === 'left' ? 'Left' : 'Right'} 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)` : 
        'none',
    };
    
    return baseStyle;
  };
  
  const chartStyle = {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '0.625rem',
    padding: '0 clamp(0.5rem, 2vw, 2rem)',
    opacity: slideDirection ? 0 : 1,
    animation: slideDirection ? 'fadeIn 0.3s ease-in forwards 0.3s' : 'none',
  };
  
  const getRowStyle = (index: number) => {
    return {
      display: 'grid',
      gridTemplateColumns: 'minmax(80px, 2fr) 8fr minmax(60px, 2fr)',
      alignItems: 'center',
      height: 'clamp(1.25rem, 2vw, 1.5rem)',
      opacity: 0,
      transform: 'translateY(20px)',
      animation: `fadeInUp 0.5s ease forwards ${0.05 * index}s`,
    };
  };
  
  const countryNameStyle = {
    textAlign: 'right' as const,
    paddingRight: '1rem',
    fontSize: 'clamp(0.6rem, 1.5vw, 0.875rem)',
    whiteSpace: 'nowrap' as const,
    overflow: 'hidden' as const,
    textOverflow: 'ellipsis' as const,
  };
  
  const populationStyle = {
    paddingLeft: '0.5rem',
    fontSize: 'clamp(0.6rem, 1.5vw, 0.75rem)',
    color: '#4b5563',
  };
  
  const barContainerStyle = {
    height: '100%',
  };
  
  const getBarStyle = (country: Country) => {
    return {
      width: `${barWidths[country._id] || 0}%`,
      backgroundColor: getCountryColor(country.Country),
      height: '100%',
      transition: 'width 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)',
    };
  };

  // Add keyframes for all animations
  const animationKeyframes = `
    @keyframes fadeInUp {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    
    @keyframes slideLeft {
      from {
        transform: translateX(50px);
        opacity: 0;
      }
      to {
        transform: translateX(0);
        opacity: 1;
      }
    }
    
    @keyframes slideRight {
      from {
        transform: translateX(-50px);
        opacity: 0;
      }
      to {
        transform: translateX(0);
        opacity: 1;
      }
    }
    
    @keyframes fadeIn {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }
  `;

  // Add additional media query for small screens
  const mediaQueryStyles = `
    @media (max-width: 640px) {
      .bar-chart-container {
        padding: 0.5rem;
      }
      
      .bar-chart-title {
        font-size: 2rem;
        margin-bottom: 1rem;
      }
      
      .bar-chart-year {
        font-size: 2.5rem;
        margin-bottom: 2rem;
      }
      
      .bar-chart-row {
        height: 2rem;
        margin-bottom: 0.75rem;
      }
      
      .bar-chart-country {
        font-size: 0.9rem;
        font-weight: 600;
      }
      
      .bar-chart-population {
        font-size: 0.9rem;
        font-weight: 500;
      }
    }
  `;

  return (
    <div style={containerStyle} className="bar-chart-container">
      <style>{animationKeyframes}</style>
      <style>{mediaQueryStyles}</style>
      <h1 style={titleStyle} className="bar-chart-title">World Population By Year</h1>
      <h2 style={getYearStyle()} className="bar-chart-year">{year}</h2>
      
      <div style={chartStyle} ref={chartRef}>
        {sortedCountries.map((country, index) => (
          <div key={country._id} style={getRowStyle(index)} className="bar-chart-row">
            {/* Country Name Column */}
            <div style={countryNameStyle} title={country.Country} className="bar-chart-country">{country.Country}</div>
            
            {/* Progress Bar Column */}
            <div style={barContainerStyle}>
              <div style={getBarStyle(country)}></div>
            </div>
            
            {/* Population Number Column */}
            <div style={populationStyle} className="bar-chart-population">{country.Population.toLocaleString()}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BarChart; 
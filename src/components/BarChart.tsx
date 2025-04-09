import { useEffect, useRef, useState } from 'react';
import { Country } from '../types';

interface BarChartProps {
  countries: Country[];
  year: number;
  displayCount?: number;
}

const BarChart: React.FC<BarChartProps> = ({ 
  countries = [], 
  year,
  displayCount = 10 
}) => {
  const [sortedCountries, setSortedCountries] = useState<Country[]>([]);
  const [barHeights, setBarHeights] = useState<{ [key: string]: number }>({});
  const chartRef = useRef<HTMLDivElement>(null);
  
  // Define a color map for countries to ensure consistent colors
  const countryColors: { [key: string]: string } = {
    'China': 'bg-blue-500',
    'India': 'bg-blue-400',
    'United States': 'bg-blue-300',
    'Indonesia': 'bg-blue-200',
    'Pakistan': 'bg-red-400',
    'Brazil': 'bg-blue-600',
    'Nigeria': 'bg-purple-400',
    'Bangladesh': 'bg-green-400',
    'Russia': 'bg-red-500',
    'Mexico': 'bg-pink-500',
    'Japan': 'bg-indigo-500',
    'Ethiopia': 'bg-green-500',
    'Philippines': 'bg-purple-500',
    'Egypt': 'bg-yellow-500',
    'Vietnam': 'bg-green-600',
    'Thailand': 'bg-teal-500',
    'Germany': 'bg-gray-500',
    'Turkey': 'bg-red-600',
    'France': 'bg-purple-600',
    'United Kingdom': 'bg-red-300',
    'Italy': 'bg-green-300',
    'Ukraine': 'bg-blue-700',
  };

  // Get color for a country (fallback to a random color if not defined)
  const getCountryColor = (countryName: string) => {
    return countryColors[countryName] || `bg-[#${Math.floor(Math.random()*16777215).toString(16)}]`;
  };

  useEffect(() => {
    if (countries.length) {
      // Sort countries by population (descending)
      const sorted = [...countries]
        .sort((a, b) => b.Population - a.Population)
        .slice(0, displayCount);
      
      setSortedCountries(sorted);
      
      // Start with zero heights
      const initialHeights: { [key: string]: number } = {};
      sorted.forEach(country => {
        initialHeights[country._id] = 0;
      });
      
      setBarHeights(initialHeights);
      
      // Animate to actual heights
      setTimeout(() => {
        const maxPopulation = sorted[0].Population;
        const newHeights: { [key: string]: number } = {};
        
        sorted.forEach(country => {
          // Calculate percentage of the max (maximum bar width is 90%)
          newHeights[country._id] = (country.Population / maxPopulation) * 90;
        });
        
        setBarHeights(newHeights);
      }, 100);
    }
  }, [countries, displayCount]);

  return (
    <div className="w-full max-w-5xl mx-auto">
      <h1 className="text-4xl font-bold text-center my-6">World Population By Year</h1>
      <h2 className="text-3xl font-bold text-center text-gray-500 mb-8">{year}</h2>
      
      <div ref={chartRef} className="space-y-4">
        {sortedCountries.map((country) => (
          <div key={country._id} className="flex items-center">
            <div className="w-32 text-right pr-4 font-medium">{country.Country}</div>
            <div className="flex-1 h-8 flex items-center">
              <div 
                className={`h-full ${getCountryColor(country.Country)} transition-all duration-1000 ease-out flex items-center`}
                style={{ width: `${barHeights[country._id] || 0}%` }}
              />
              <span className="ml-2">{country.Population.toLocaleString()}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BarChart; 
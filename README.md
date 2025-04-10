# Population Visualizer

A React application that visualizes global population data by country across different years. The application displays a bar chart with countries ordered by population, allowing users to navigate through different years.

## Features

- **Population Bar Chart**: Displays countries in descending order by population
- **Year Navigation**: Pagination to switch between different years
- **Color Coding**: Each country has a unique and consistent color
- **Animations**: Smooth vertical fade-in animations for each country
- **Data Visualization**: Shows the top 15 countries by population for each year

## Technologies Used

- React with TypeScript
- CSS-in-JS styling
- Vite for fast development and building

## Prerequisites

Before running this project, make sure you have:

- Node.js (v16 or higher)
- npm (v7 or higher)

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```

2. Navigate to the project directory:
   ```bash
   cd population-visualizer
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

## Running the Application

To start the development server:

```bash
npm run dev
```

The application will be available at http://localhost:5173 (or another port if 5173 is already in use).

## Building for Production

To create a production build:

```bash
npm run build
```

The built files will be in the `dist` directory.

To preview the production build:

```bash
npm run preview
```

## Project Structure

- `src/`: Source code
  - `components/`: React components
    - `BarChart.tsx`: Bar chart visualization component
    - `Pagination.tsx`: Year navigation component
  - `types.ts`: TypeScript type definitions
  - `App.tsx`: Main application component
  - `main.tsx`: Application entry point
  - `generated.json`: Population data

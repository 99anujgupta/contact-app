// COVIDChartsMapsDashboard.tsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';

const ChartsMaps: React.FC = () => {
  Chart.register(...registerables);

  const [worldData, setWorldData] = useState<any>({});
  const [countryData, setCountryData] = useState<any[]>([]);
  const [historicalData, setHistoricalData] = useState<any>({});
  const [selectedCountry, setSelectedCountry] = useState<{ lat: number; long: number } | null>(null);

  useEffect(() => {
    // Fetch worldwide data
    axios.get('https://disease.sh/v3/covid-19/all')
      .then(response => {
        setWorldData(response.data);
      })
      .catch(error => {
        console.error('Error fetching worldwide data:', error);
      });

    // Fetch country-specific data
    axios.get('https://disease.sh/v3/covid-19/countries')
      .then(response => {
        setCountryData(response.data);
      })
      .catch(error => {
        console.error('Error fetching country-specific data:', error);
      });

    // Fetch historical data
    axios.get('https://disease.sh/v3/covid-19/historical/all?lastdays=all')
      .then(response => {
        setHistoricalData(response.data);
      })
      .catch(error => {
        console.error('Error fetching historical data:', error);
      });
  }, []);

  // Process historical data for chart
  const chartData = {
    labels: Object.keys(historicalData.cases || {}),
    datasets: [
      {
        label: 'Total Cases',
        data: Object.values(historicalData.cases || {}),
        borderColor: 'red', // Change color to red
        fill: false,
      },
      // You can add similar datasets for other data (recovered, deaths, etc.)
    ],
  };

  return (
    <div className="flex flex-col p-6 space-y-6 bg-gray-100 rounded-lg shadow-md">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-blue-600 mb-2">COVID-19 Cases Fluctuations</h2>
        <Line data={chartData} options={{ /* Chart.js options */ }} />
      </div>
      <div className="text-center">
        <h2 className="text-3xl font-bold text-blue-600 mb-2">COVID-19 Map</h2>
        <div className="rounded-lg overflow-hidden border border-gray-300">
          <MapContainer center={[0, 0]} zoom={2} style={{ height: '500px', width: '100%' }}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            {countryData.map(country => (
              <Marker
                key={country.country}
                position={[country.countryInfo.lat, country.countryInfo.long]}
                eventHandlers={{
                  click: () => {
                    setSelectedCountry({
                      lat: country.countryInfo.lat,
                      long: country.countryInfo.long,
                    });
                  },
                }}
              >
                <Popup>
                  <div className="text-center">
                    <h3 className="text-xl font-semibold mb-2">{country.country}</h3>
                    <p className="text-gray-600">Total Active Cases: {country.active}</p>
                    <p className="text-gray-600">Total Recovered: {country.recovered}</p>
                    <p className="text-gray-600">Total Deaths: {country.deaths}</p>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </div>
    </div>
  );
};

export default ChartsMaps;

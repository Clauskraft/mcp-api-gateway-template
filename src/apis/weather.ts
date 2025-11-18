/**
 * Weather API configuration using OpenWeatherMap
 */

import { ApiConfig } from '../types/config.js';

export const weatherApi: ApiConfig = {
  name: 'weather',
  baseUrl: 'https://api.openweathermap.org/data/2.5',
  description: 'OpenWeatherMap API for weather data',
  requiresAuth: true,
  endpoints: [
    {
      name: 'getCurrentWeather',
      path: '/weather',
      method: 'GET',
      description: 'Get current weather data for a location',
      queryParams: [
        {
          name: 'q',
          type: 'string',
          description: 'City name, state code, and country code (e.g., "London,UK")',
          required: true,
        },
        {
          name: 'units',
          type: 'string',
          description: 'Units of measurement (standard, metric, imperial)',
          required: false,
          default: 'metric',
        },
        {
          name: 'appid',
          type: 'string',
          description: 'API key',
          required: true,
        },
      ],
    },
    {
      name: 'getForecast',
      path: '/forecast',
      method: 'GET',
      description: 'Get 5 day / 3 hour forecast data',
      queryParams: [
        {
          name: 'q',
          type: 'string',
          description: 'City name, state code, and country code',
          required: true,
        },
        {
          name: 'units',
          type: 'string',
          description: 'Units of measurement',
          required: false,
          default: 'metric',
        },
        {
          name: 'appid',
          type: 'string',
          description: 'API key',
          required: true,
        },
      ],
    },
  ],
};

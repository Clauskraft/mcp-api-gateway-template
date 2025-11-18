/**
 * Export all API configurations
 */

import { ApiConfig } from '../types/config.js';
import { weatherApi } from './weather.js';
import { placeholderApi } from './placeholder.js';

export const apis: ApiConfig[] = [
  weatherApi,
  placeholderApi,
];

export { weatherApi, placeholderApi };

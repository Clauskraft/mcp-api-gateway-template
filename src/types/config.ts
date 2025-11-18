/**
 * Configuration types for API endpoints
 */

export interface ApiConfig {
  name: string;
  baseUrl: string;
  description: string;
  endpoints: EndpointConfig[];
  headers?: Record<string, string>;
  requiresAuth?: boolean;
}

export interface EndpointConfig {
  name: string;
  path: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  description: string;
  parameters?: ParameterConfig[];
  queryParams?: ParameterConfig[];
  bodyParams?: ParameterConfig[];
}

export interface ParameterConfig {
  name: string;
  type: 'string' | 'number' | 'boolean' | 'object' | 'array';
  description: string;
  required: boolean;
  default?: any;
}

/**
 * HTTP utilities for making API requests
 */

export interface HttpRequestOptions {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  headers?: Record<string, string>;
  body?: any;
  queryParams?: Record<string, string>;
}

export async function makeHttpRequest(
  url: string,
  options: HttpRequestOptions
): Promise<any> {
  try {
    // Build URL with query parameters
    const fullUrl = new URL(url);
    if (options.queryParams) {
      Object.entries(options.queryParams).forEach(([key, value]) => {
        fullUrl.searchParams.append(key, value);
      });
    }

    const fetchOptions: RequestInit = {
      method: options.method,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    };

    if (options.body && options.method !== 'GET') {
      fetchOptions.body = JSON.stringify(options.body);
    }

    const response = await fetch(fullUrl.toString(), fetchOptions);
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      return await response.json();
    }
    
    return await response.text();
  } catch (error) {
    throw new Error(`Request failed: ${error instanceof Error ? error.message : String(error)}`);
  }
}

export function replacePathParams(path: string, params: Record<string, string>): string {
  let result = path;
  Object.entries(params).forEach(([key, value]) => {
    result = result.replace(`{${key}}`, encodeURIComponent(value));
  });
  return result;
}

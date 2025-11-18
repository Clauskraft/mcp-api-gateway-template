/**
 * JSONPlaceholder API configuration - A free fake REST API for testing
 */

import { ApiConfig } from '../types/config.js';

export const placeholderApi: ApiConfig = {
  name: 'jsonplaceholder',
  baseUrl: 'https://jsonplaceholder.typicode.com',
  description: 'Free fake REST API for testing and prototyping',
  requiresAuth: false,
  endpoints: [
    {
      name: 'getPosts',
      path: '/posts',
      method: 'GET',
      description: 'Get all posts',
      queryParams: [
        {
          name: 'userId',
          type: 'number',
          description: 'Filter posts by user ID',
          required: false,
        },
      ],
    },
    {
      name: 'getPost',
      path: '/posts/{id}',
      method: 'GET',
      description: 'Get a specific post by ID',
      parameters: [
        {
          name: 'id',
          type: 'number',
          description: 'Post ID',
          required: true,
        },
      ],
    },
    {
      name: 'getUsers',
      path: '/users',
      method: 'GET',
      description: 'Get all users',
      queryParams: [],
    },
    {
      name: 'getUser',
      path: '/users/{id}',
      method: 'GET',
      description: 'Get a specific user by ID',
      parameters: [
        {
          name: 'id',
          type: 'number',
          description: 'User ID',
          required: true,
        },
      ],
    },
  ],
};

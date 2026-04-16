const API_URL = '/api';

export const api = {
  async post(endpoint: string, data: any, token?: string) {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${API_URL}${endpoint}`, {
      method: 'POST',
      headers,
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'API request failed');
    }

    return response.json();
  },

  async get(endpoint: string, token?: string) {
    const headers: Record<string, string> = {};
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    const response = await fetch(`${API_URL}${endpoint}`, {
      method: 'GET',
      headers,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'API request failed');
    }

    return response.json();
  },

  async patch(endpoint: string, data: any, token: string) {
    const response = await fetch(`${API_URL}${endpoint}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'API request failed');
    }

    return response.json();
  },

  async login(credentials: any) {
    return this.post('/auth/login', credentials);
  },

  async getMe(token: string) {
    return this.get('/auth/me', token);
  },

  async getDashboard(token: string) {
    return this.get('/dashboard', token);
  },

  async updateProfileData(data: any, token: string) {
    return this.patch('/users/profile/data', data, token);
  },

  async getProjects(token?: string) {
    return this.get('/projects', token);
  },
  
  async createProject(data: any, token: string) {
    return this.post('/projects', data, token);
  },
  
  async updateProject(id: string, data: any, token: string) {
    return this.patch(`/projects/${id}`, data, token);
  }
};

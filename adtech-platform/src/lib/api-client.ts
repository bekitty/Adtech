// API Client for frontend to call backend APIs

const API_BASE = '/api'

interface ApiResponse<T = unknown> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

class ApiClient {
  private token: string | null = null

  setToken(token: string | null) {
    this.token = token
    if (token) {
      if (typeof window !== 'undefined') {
        localStorage.setItem('auth_token', token)
      }
    } else {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('auth_token')
      }
    }
  }

  getToken(): string | null {
    if (this.token) return this.token
    if (typeof window !== 'undefined') {
      this.token = localStorage.getItem('auth_token')
    }
    return this.token
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const token = this.getToken()

    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    }

    if (token) {
      (headers as Record<string, string>)['Authorization'] = `Bearer ${token}`
    }

    try {
      const response = await fetch(`${API_BASE}${endpoint}`, {
        ...options,
        headers,
      })

      const data = await response.json()

      if (!response.ok) {
        return {
          success: false,
          error: data.error || `HTTP error ${response.status}`,
        }
      }

      return data
    } catch (error) {
      console.error('API request error:', error)
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Network error',
      }
    }
  }

  // Auth endpoints
  async login(email: string, password: string) {
    const response = await this.request<{ user: unknown; token: string }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    })

    if (response.success && response.data?.token) {
      this.setToken(response.data.token)
    }

    return response
  }

  async register(email: string, password: string, name: string, company?: string) {
    const response = await this.request<{ user: unknown; token: string }>('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ email, password, name, company }),
    })

    if (response.success && response.data?.token) {
      this.setToken(response.data.token)
    }

    return response
  }

  async getCurrentUser() {
    return this.request<{ user: unknown }>('/auth/me')
  }

  logout() {
    this.setToken(null)
  }

  // Publisher endpoints
  async getPublisherDashboard() {
    return this.request('/publisher/dashboard')
  }

  async getInventory(params?: { status?: string; type?: string; search?: string }) {
    const searchParams = new URLSearchParams()
    if (params?.status) searchParams.set('status', params.status)
    if (params?.type) searchParams.set('type', params.type)
    if (params?.search) searchParams.set('search', params.search)
    const query = searchParams.toString()
    return this.request(`/publisher/inventory${query ? `?${query}` : ''}`)
  }

  async getInventoryById(id: string) {
    return this.request(`/publisher/inventory/${id}`)
  }

  async createInventory(data: Record<string, unknown>) {
    return this.request('/publisher/inventory', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  }

  async updateInventory(id: string, data: Record<string, unknown>) {
    return this.request(`/publisher/inventory/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    })
  }

  async deleteInventory(id: string) {
    return this.request(`/publisher/inventory/${id}`, {
      method: 'DELETE',
    })
  }

  async getDeals(params?: { status?: string; type?: string; search?: string }) {
    const searchParams = new URLSearchParams()
    if (params?.status) searchParams.set('status', params.status)
    if (params?.type) searchParams.set('type', params.type)
    if (params?.search) searchParams.set('search', params.search)
    const query = searchParams.toString()
    return this.request(`/publisher/deals${query ? `?${query}` : ''}`)
  }

  async getDealById(id: string) {
    return this.request(`/publisher/deals/${id}`)
  }

  async createDeal(data: Record<string, unknown>) {
    return this.request('/publisher/deals', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  }

  async updateDeal(id: string, data: Record<string, unknown>) {
    return this.request(`/publisher/deals/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    })
  }

  async deleteDeal(id: string) {
    return this.request(`/publisher/deals/${id}`, {
      method: 'DELETE',
    })
  }

  // Advertiser endpoints
  async getCampaigns(params?: { status?: string; advertiserId?: string; search?: string }) {
    const searchParams = new URLSearchParams()
    if (params?.status) searchParams.set('status', params.status)
    if (params?.advertiserId) searchParams.set('advertiserId', params.advertiserId)
    if (params?.search) searchParams.set('search', params.search)
    const query = searchParams.toString()
    return this.request(`/advertiser/campaigns${query ? `?${query}` : ''}`)
  }

  async getCampaignById(id: string) {
    return this.request(`/advertiser/campaigns/${id}`)
  }

  async createCampaign(data: Record<string, unknown>) {
    return this.request('/advertiser/campaigns', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  }

  async updateCampaign(id: string, data: Record<string, unknown>) {
    return this.request(`/advertiser/campaigns/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    })
  }

  async deleteCampaign(id: string) {
    return this.request(`/advertiser/campaigns/${id}`, {
      method: 'DELETE',
    })
  }

  async getCreatives(params?: { status?: string; type?: string; advertiserId?: string; search?: string }) {
    const searchParams = new URLSearchParams()
    if (params?.status) searchParams.set('status', params.status)
    if (params?.type) searchParams.set('type', params.type)
    if (params?.advertiserId) searchParams.set('advertiserId', params.advertiserId)
    if (params?.search) searchParams.set('search', params.search)
    const query = searchParams.toString()
    return this.request(`/advertiser/creatives${query ? `?${query}` : ''}`)
  }

  async getCreativeById(id: string) {
    return this.request(`/advertiser/creatives/${id}`)
  }

  async createCreative(data: Record<string, unknown>) {
    return this.request('/advertiser/creatives', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  }

  async updateCreative(id: string, data: Record<string, unknown>) {
    return this.request(`/advertiser/creatives/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    })
  }

  async deleteCreative(id: string) {
    return this.request(`/advertiser/creatives/${id}`, {
      method: 'DELETE',
    })
  }

  async getAnalytics(params?: { startDate?: string; endDate?: string; advertiserId?: string }) {
    const searchParams = new URLSearchParams()
    if (params?.startDate) searchParams.set('startDate', params.startDate)
    if (params?.endDate) searchParams.set('endDate', params.endDate)
    if (params?.advertiserId) searchParams.set('advertiserId', params.advertiserId)
    const query = searchParams.toString()
    return this.request(`/advertiser/analytics${query ? `?${query}` : ''}`)
  }

  async getBilling(advertiserId?: string) {
    const query = advertiserId ? `?advertiserId=${advertiserId}` : ''
    return this.request(`/advertiser/billing${query}`)
  }

  async addFunds(advertiserId: string, amount: number) {
    return this.request('/advertiser/billing', {
      method: 'POST',
      body: JSON.stringify({
        advertiserId,
        amount,
        type: 'deposit',
        description: 'Account deposit',
      }),
    })
  }
}

// Singleton instance
export const apiClient = new ApiClient()

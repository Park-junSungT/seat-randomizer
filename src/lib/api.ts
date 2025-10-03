import type { CreateArrangementRequest, CreateArrangementResponse, SeatArrangement } from '@/types';

class ApiClient {
  private baseUrl = '/api';

  async createArrangement(data: CreateArrangementRequest): Promise<CreateArrangementResponse> {
    const response = await fetch(`${this.baseUrl}/seats`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return response.json();
  }

  async getHistory(): Promise<SeatArrangement[]> {
    const response = await fetch(`${this.baseUrl}/history`);
    const data = await response.json();
    return data.history || [];
  }

  async saveHistory(arrangement: SeatArrangement): Promise<void> {
    await fetch(`${this.baseUrl}/history`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(arrangement),
    });
  }
}

export const api = new ApiClient();

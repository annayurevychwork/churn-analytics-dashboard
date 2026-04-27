export interface Customer {
  id: string;
  name: string;
  company: string;
  plan: 'Basic' | 'Pro' | 'Enterprise';
  mrr: number;
  churnProbability: number;
  lastActive: string;
  status: 'Active' | 'At Risk' | 'Churned';
}

export type SortKey = keyof Customer;
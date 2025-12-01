export interface OrderEntry {
  id: string;
  orderNumber: string; // Keeping as string to allow flexible input, though parsed as int for logic
  truckNumber: string;
  volume: number;
  concreteType: string;
  createdAt: number; // Timestamp
  dateKey: string; // ISO Date string YYYY-MM-DD for grouping
}

export type ViewMode = 'journal' | 'analytics';

export interface TruckStats {
  truckNumber: string;
  totalVolume: number;
  tripCount: number;
}
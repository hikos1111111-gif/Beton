import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Journal } from './components/Journal';
import { Analytics } from './components/Analytics';
import { OrderEntry, ViewMode } from './types';

// Initial dummy data to show functionality immediately
const INITIAL_DATA: OrderEntry[] = [
  { id: '1', orderNumber: '101', truckNumber: '059', volume: 5, concreteType: 'М200', createdAt: Date.now() - 86400000, dateKey: new Date(Date.now() - 86400000).toISOString().split('T')[0] },
  { id: '2', orderNumber: '102', truckNumber: '380', volume: 7, concreteType: 'М300', createdAt: Date.now() - 86400000, dateKey: new Date(Date.now() - 86400000).toISOString().split('T')[0] },
  { id: '3', orderNumber: '103', truckNumber: '228', volume: 4, concreteType: 'М100', createdAt: Date.now(), dateKey: new Date().toISOString().split('T')[0] },
];

const STORAGE_KEY = 'concrete_log_entries';

const App: React.FC = () => {
  const [view, setView] = useState<ViewMode>('journal');
  const [entries, setEntries] = useState<OrderEntry[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : INITIAL_DATA;
    } catch (e) {
      console.error("Failed to load data", e);
      return INITIAL_DATA;
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
  }, [entries]);

  const addEntry = (newEntry: Omit<OrderEntry, 'id' | 'createdAt' | 'dateKey'>) => {
    const now = new Date();
    const entry: OrderEntry = {
      ...newEntry,
      id: crypto.randomUUID(),
      createdAt: now.getTime(),
      dateKey: now.toISOString().split('T')[0],
    };
    setEntries(prev => [entry, ...prev]);
  };

  const updateEntry = (updatedEntry: OrderEntry) => {
    setEntries(prev => prev.map(e => e.id === updatedEntry.id ? updatedEntry : e));
  };

  const deleteEntry = (id: string) => {
    if (confirm('Вы уверены, что хотите удалить эту запись?')) {
      setEntries(prev => prev.filter(e => e.id !== id));
    }
  };

  return (
    <div className="min-h-screen text-concrete-50 pb-20">
      <Header currentView={view} setView={setView} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {view === 'journal' ? (
          <Journal 
            entries={entries} 
            addEntry={addEntry} 
            updateEntry={updateEntry}
            deleteEntry={deleteEntry}
          />
        ) : (
          <Analytics entries={entries} />
        )}
      </main>
    </div>
  );
};

export default App;
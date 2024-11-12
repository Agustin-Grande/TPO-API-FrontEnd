import { useContext } from 'react';
import { VistosContext } from '../context/VistosContext';

export function useVistos() {
  const context = useContext(VistosContext);
  if (!context) {
    throw new Error('useVistos must be used within a VistosProvider');
  }
  return context;
}

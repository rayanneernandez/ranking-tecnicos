import { Technician, ServiceRecord } from '../types';
import { v4 as uuidv4 } from 'uuid';

// Initial technicians list - already populated with your team
export const initialTechnicians: Technician[] = [
  {
    id: uuidv4(),
    name: 'Victor Santos',
    totalCalls: 0,
    avgServiceTime: 0,
    firstResponseTime: 0,
    rating: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: uuidv4(),
    name: 'João Rangel',
    totalCalls: 0,
    avgServiceTime: 0,
    firstResponseTime: 0,
    rating: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: uuidv4(),
    name: 'Fabricio',
    totalCalls: 0,
    avgServiceTime: 0,
    firstResponseTime: 0,
    rating: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: uuidv4(),
    name: 'Felipe Lopes',
    totalCalls: 0,
    avgServiceTime: 0,
    firstResponseTime: 0,
    rating: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: uuidv4(),
    name: 'Marcel Neves',
    totalCalls: 0,
    avgServiceTime: 0,
    firstResponseTime: 0,
    rating: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: uuidv4(),
    name: 'Leonardo',
    totalCalls: 0,
    avgServiceTime: 0,
    firstResponseTime: 0,
    rating: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: uuidv4(),
    name: 'Matheus Carvalho',
    totalCalls: 0,
    avgServiceTime: 0,
    firstResponseTime: 0,
    rating: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: uuidv4(),
    name: 'Matheus Medina',
    totalCalls: 0,
    avgServiceTime: 0,
    firstResponseTime: 0,
    rating: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

// Sample service records - empty by default
export const initialServiceRecords: ServiceRecord[] = [];

// You can add sample service records for testing if needed by uncommenting and modifying this code:
/*
export const initialServiceRecords: ServiceRecord[] = [
  {
    id: uuidv4(),
    technicianId: initialTechnicians[0].id, // Victor Santos
    date: '2025-01-15T10:30:00.000Z',
    serviceTime: 45,
    firstResponseTime: 10,
    rating: 4.5,
    notes: 'Fixed network issue quickly',
  },
  {
    id: uuidv4(),
    technicianId: initialTechnicians[1].id, // João Rangel
    date: '2025-01-16T14:15:00.000Z',
    serviceTime: 60,
    firstResponseTime: 15,
    rating: 5,
    notes: 'Excellent customer service',
  },
  // Add more sample records as needed
];
*/
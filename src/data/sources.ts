import type { Source, SourceCategory } from '../types';

export const sources: Source[] = [
  {
    id: 'src-vision',
    name: 'Vision',
    category: 'company',
    type: 'Strategy doc',
    icon: 'Building2',
    integrationId: 'confluence',
  },
  {
    id: 'src-product-strategy',
    name: 'Product Strategy',
    category: 'company',
    type: 'Strategy doc',
    icon: 'Target',
    integrationId: 'confluence',
  },
  {
    id: 'src-joe-autodesk',
    name: 'Joe — Autodesk',
    category: 'transcripts',
    type: 'User interview',
    icon: 'FileText',
    integrationId: 'google-drive',
  },
  {
    id: 'src-tiago-sosafe',
    name: 'Tiago — SoSafe',
    category: 'transcripts',
    type: 'User interview',
    icon: 'FileText',
    integrationId: 'google-drive',
  },
  {
    id: 'src-user-1',
    name: 'User 1',
    category: 'support-tickets',
    type: 'Support ticket',
    icon: 'TicketCheck',
    integrationId: 'jira',
  },
  {
    id: 'src-user-2',
    name: 'User 2',
    category: 'support-tickets',
    type: 'Support ticket',
    icon: 'TicketCheck',
    integrationId: 'jira',
  },
  {
    id: 'src-recording-1',
    name: 'Recording 1',
    category: 'sales-recordings',
    type: 'Sales call',
    icon: 'Mic',
    integrationId: 'google-drive',
  },
];

export const sourceCategories: SourceCategory[] = [
  {
    id: 'company',
    label: 'Company',
    sources: sources.filter((s) => s.category === 'company'),
  },
  {
    id: 'transcripts',
    label: 'Transcripts',
    sources: sources.filter((s) => s.category === 'transcripts'),
  },
  {
    id: 'support-tickets',
    label: 'Support Tickets',
    sources: sources.filter((s) => s.category === 'support-tickets'),
  },
  {
    id: 'sales-recordings',
    label: 'Sales Recordings',
    sources: sources.filter((s) => s.category === 'sales-recordings'),
  },
];

import type { OutputSchedule, GraphSyncSchedule } from '../types';

export function formatTime(time: string): string {
  const [h, m] = time.split(':').map(Number);
  const suffix = h >= 12 ? 'PM' : 'AM';
  const hour12 = h === 0 ? 12 : h > 12 ? h - 12 : h;
  return m === 0 ? `${hour12}:00 ${suffix}` : `${hour12}:${String(m).padStart(2, '0')} ${suffix}`;
}

function ordinal(n: number): string {
  const s = ['th', 'st', 'nd', 'rd'];
  const v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
}

export function formatSchedule(s: OutputSchedule): string {
  const t = formatTime(s.time);
  if (s.frequency === 'daily') return `Daily · ${t}`;
  if (s.frequency === 'weekly') return `Weekly · ${s.day ?? 'Mon'} ${t}`;
  return `Monthly · ${ordinal(s.dayOfMonth ?? 1)} ${t}`;
}

export function formatSyncSchedule(s: GraphSyncSchedule): string {
  const t = formatTime(s.time);
  return `Syncs ${s.frequency} at ${t}`;
}

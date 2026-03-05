import { motion } from 'framer-motion';
import { Brain, Network, FolderSync, Clock } from 'lucide-react';

const stats = [
  { icon: Network, value: '142', label: 'Entities', color: 'var(--color-accent)' },
  { icon: FolderSync, value: '5', label: 'Projects contributing', color: '#a78bfa' },
  { icon: Clock, value: '2h ago', label: 'Last synced', color: '#34d399' },
];

export function CompanyMemoryPage() {
  return (
    <div className="h-full p-8 overflow-y-auto">
      <div className="max-w-xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="flex items-center gap-3 mb-2"
        >
          <Brain className="w-7 h-7 text-[var(--color-accent)]" />
          <h1 className="text-2xl font-bold text-[var(--color-text-primary)]">
            Company Memory
          </h1>
        </motion.div>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.3 }}
          className="text-sm text-[var(--color-text-secondary)] mb-8"
        >
          Shared knowledge graph across all projects
        </motion.p>

        {/* Stat cards */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 + i * 0.08, duration: 0.3 }}
              className="flex flex-col items-center gap-2 p-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)]"
            >
              <stat.icon className="w-5 h-5" style={{ color: stat.color }} />
              <span className="text-xl font-semibold text-[var(--color-text-primary)]">
                {stat.value}
              </span>
              <span className="text-xs text-[var(--color-text-tertiary)] text-center">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Description */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.3 }}
          className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5 text-sm text-[var(--color-text-secondary)] leading-relaxed space-y-3"
        >
          <p>
            Company Memory is a shared knowledge graph that spans every project in your
            workspace. Entities discovered in one project — people, features, themes,
            pain-points — are automatically reconciled and linked across all projects.
          </p>
          <p>
            This enables cross-project entity resolution, shared taxonomies, and a
            persistent organisational knowledge base that grows with every analysis run.
          </p>
          <p className="text-[var(--color-text-tertiary)] italic">
            Full functionality coming soon.
          </p>
        </motion.div>
      </div>
    </div>
  );
}

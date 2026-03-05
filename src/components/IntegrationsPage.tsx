import { motion } from 'framer-motion';
import { useApp } from '../store';
import { integrationMeta } from '../data/integrations';
import { BrandMark } from './shared/BrandMark';
import type { Integration } from '../types';

function ActiveRow({ integration, index }: { integration: Integration; index: number }) {
  const { dispatch } = useApp();
  const meta = integrationMeta[integration.id] || '';

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04, duration: 0.25 }}
      className="flex items-center gap-3 px-4 py-3 rounded-lg border border-transparent hover:bg-[var(--color-surface-elevated)] hover:border-[var(--color-border)] transition-all group"
    >
      <BrandMark id={integration.id} size="md" />
      <div className="flex-1 min-w-0">
        <span className="text-sm font-medium text-[var(--color-text-primary)] group-hover:text-white transition-colors">
          {integration.name}
        </span>
        {meta && (
          <p className="text-[11px] text-[var(--color-text-tertiary)] mt-0.5">
            {meta}
          </p>
        )}
      </div>
      {integration.authType !== 'local' && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            dispatch({ type: 'TOGGLE_INTEGRATION', payload: integration.id });
          }}
          className="text-[11px] text-[var(--color-text-tertiary)] opacity-0 group-hover:opacity-100 hover:text-red-400 transition-all"
        >
          Disconnect
        </button>
      )}
    </motion.div>
  );
}

function AvailableRow({ integration, index }: { integration: Integration; index: number }) {
  const { dispatch } = useApp();

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.15 + index * 0.04, duration: 0.25 }}
      className="flex items-center gap-3 px-4 py-3 rounded-lg opacity-50 hover:opacity-100 transition-all group"
    >
      <BrandMark id={integration.id} size="md" />
      <div className="flex-1 min-w-0">
        <span className="text-sm font-medium text-[var(--color-text-secondary)]">
          {integration.name}
        </span>
        <p className="text-[11px] text-[var(--color-text-tertiary)] mt-0.5">
          {integration.description}
        </p>
      </div>
      <button
        onClick={() => dispatch({ type: 'TOGGLE_INTEGRATION', payload: integration.id })}
        className="text-xs font-medium text-[var(--color-text-tertiary)] px-2.5 py-1 rounded-md border border-[var(--color-border)] opacity-0 group-hover:opacity-100 hover:text-[var(--color-text-primary)] hover:border-[var(--color-border-bright)] transition-all"
      >
        Set up
      </button>
    </motion.div>
  );
}

export function IntegrationsPage() {
  const { state } = useApp();
  const active = state.integrations.filter((i) => i.connected);
  const available = state.integrations.filter((i) => !i.connected);

  return (
    <div className="h-full p-8 overflow-y-auto">
      <div className="max-w-xl mx-auto">
        <div className="mb-8">
          <h1 className="text-lg font-semibold text-[var(--color-text-primary)]">
            Connected Sources
          </h1>
          <p className="text-xs text-[var(--color-text-tertiary)] mt-1">
            Data sources available across all projects.
          </p>
        </div>

        {/* Active integrations */}
        {active.length > 0 && (
          <div className="mb-8">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-[var(--color-text-tertiary)] px-4 mb-2">
              Active
            </p>
            <div className="space-y-0.5">
              {active.map((integration, i) => (
                <ActiveRow key={integration.id} integration={integration} index={i} />
              ))}
            </div>
          </div>
        )}

        {/* Available integrations */}
        {available.length > 0 && (
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-wider text-[var(--color-text-tertiary)] px-4 mb-2">
              Available
            </p>
            <div className="space-y-0.5">
              {available.map((integration, i) => (
                <AvailableRow key={integration.id} integration={integration} index={i} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

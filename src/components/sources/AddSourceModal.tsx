import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowLeft, Search, Check, Puzzle } from 'lucide-react';
import { useApp } from '../../store';
import { integrationItems } from '../../data/integrations';
import { BrandMark, BrandDot } from '../shared/BrandMark';
import type { Integration } from '../../types';

function IntegrationRow({ integration, index }: { integration: Integration; index: number }) {
  const { dispatch } = useApp();

  return (
    <motion.button
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.03, duration: 0.2 }}
      onClick={() => dispatch({ type: 'BROWSE_INTEGRATION_ITEMS', payload: integration.id })}
      className="flex items-center gap-3 px-3 py-2.5 w-full text-left rounded-lg border border-transparent hover:bg-[var(--color-surface-elevated)] hover:border-[var(--color-border)] transition-all group"
    >
      <BrandMark id={integration.id} size="md" />
      <div className="flex-1 min-w-0">
        <span className="text-sm font-medium text-[var(--color-text-primary)] group-hover:text-white transition-colors">
          {integration.name}
        </span>
        <p className="text-[11px] text-[var(--color-text-tertiary)] truncate">
          {integration.description}
        </p>
      </div>
      <span className="text-[var(--color-text-tertiary)] text-sm opacity-0 group-hover:opacity-100 transition-opacity">
        ›
      </span>
    </motion.button>
  );
}

function BrowseItemsView() {
  const { state, dispatch } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  const activeId = state.addSourceActiveIntegration;
  const integration = state.integrations.find((i) => i.id === activeId);
  const items = activeId ? integrationItems[activeId] ?? [] : [];

  const filtered = items.filter(
    (item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.description?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false)
  );

  function toggleItem(id: string) {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function handleAdd() {
    const selected = items.filter((item) => selectedIds.has(item.id));
    dispatch({ type: 'ADD_SOURCES_FROM_INTEGRATION', payload: selected });
  }

  if (!integration || !activeId) return null;

  return (
    <>
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-3 border-b border-[var(--color-border)] shrink-0">
        <button
          onClick={() => dispatch({ type: 'BACK_TO_INTEGRATIONS_LIST' })}
          className="p-1 rounded-md text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface-elevated)] transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
        </button>
        <BrandMark id={activeId} size="sm" />
        <span className="text-sm font-medium text-[var(--color-text-primary)] flex-1">
          {integration.name}
        </span>
        <button
          onClick={() => dispatch({ type: 'CLOSE_ADD_SOURCE_MODAL' })}
          className="p-1 rounded-md text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface-elevated)] transition-colors"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Search */}
      <div className="px-4 py-2.5 border-b border-[var(--color-border)]">
        <div className="relative">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[var(--color-text-tertiary)]" />
          <input
            type="text"
            placeholder="Filter..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            autoFocus
            className="w-full pl-8 pr-3 py-1.5 text-xs bg-transparent text-[var(--color-text-primary)] placeholder:text-[var(--color-text-tertiary)] focus:outline-none"
          />
        </div>
      </div>

      {/* Items list */}
      <div className="flex-1 overflow-y-auto px-2 py-1.5">
        {filtered.map((item, i) => {
          const isChecked = selectedIds.has(item.id);
          return (
            <motion.button
              key={item.id}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.02, duration: 0.15 }}
              onClick={() => toggleItem(item.id)}
              className={`flex items-center gap-2.5 px-3 py-2 w-full text-left rounded-lg transition-all text-xs ${
                isChecked
                  ? 'bg-[var(--color-accent)]/10 border border-[var(--color-accent)]/25'
                  : 'border border-transparent hover:bg-[var(--color-surface-elevated)] hover:border-[var(--color-border)]'
              }`}
              whileTap={{ scale: 0.99 }}
            >
              <div
                className={`w-3.5 h-3.5 rounded border flex items-center justify-center shrink-0 transition-all ${
                  isChecked
                    ? 'bg-[var(--color-accent)] border-[var(--color-accent)]'
                    : 'border-[var(--color-border-bright)] group-hover:border-[var(--color-text-tertiary)]'
                }`}
              >
                {isChecked && <Check className="w-2.5 h-2.5 text-white" />}
              </div>
              <div className="flex-1 min-w-0">
                <span className={`block truncate ${isChecked ? 'text-[var(--color-text-primary)]' : 'text-[var(--color-text-secondary)]'}`}>
                  {item.name}
                </span>
                {item.description && (
                  <span className="text-[10px] text-[var(--color-text-tertiary)] block truncate mt-0.5">
                    {item.description}
                  </span>
                )}
              </div>
              <span className="text-[10px] text-[var(--color-text-tertiary)] shrink-0 tabular-nums">
                {item.type}
              </span>
            </motion.button>
          );
        })}
      </div>

      {/* Footer */}
      {selectedIds.size > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          className="px-4 py-2.5 border-t border-[var(--color-border)] shrink-0 flex items-center justify-end"
        >
          <button
            onClick={handleAdd}
            className="px-3 py-1.5 rounded-lg text-xs font-medium bg-[var(--color-accent)] text-white hover:bg-[var(--color-accent-hover)] transition-colors"
          >
            Add {selectedIds.size} source{selectedIds.size !== 1 ? 's' : ''}
          </button>
        </motion.div>
      )}
    </>
  );
}

export function AddSourceModal() {
  const { state, dispatch } = useApp();

  if (state.addSourceStep === 'closed') return null;

  const connectedIntegrations = state.integrations.filter((i) => i.connected);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
        onClick={() => dispatch({ type: 'CLOSE_ADD_SOURCE_MODAL' })}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.97, y: 8 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.97, y: 8 }}
          transition={{ duration: 0.15 }}
          className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl w-[400px] max-h-[60vh] shadow-2xl flex flex-col overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {state.addSourceStep === 'pick-integration' && (
            <>
              <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--color-border)] shrink-0">
                <span className="text-sm font-medium text-[var(--color-text-primary)]">
                  Add from...
                </span>
                <button
                  onClick={() => dispatch({ type: 'CLOSE_ADD_SOURCE_MODAL' })}
                  className="p-1 rounded-md text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface-elevated)] transition-colors"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto py-1.5 px-2">
                {connectedIntegrations.length > 0 ? (
                  connectedIntegrations.map((integration, i) => (
                    <IntegrationRow key={integration.id} integration={integration} index={i} />
                  ))
                ) : (
                  <div className="flex flex-col items-center justify-center py-8 px-6">
                    <div className="p-3 rounded-xl bg-[var(--color-bg)] border border-dashed border-[var(--color-border-bright)] mb-3">
                      <Puzzle className="w-5 h-5 text-[var(--color-text-tertiary)]" />
                    </div>
                    <p className="text-xs text-[var(--color-text-secondary)] text-center">
                      No sources connected yet.
                    </p>
                    <button
                      onClick={() => {
                        dispatch({ type: 'CLOSE_ADD_SOURCE_MODAL' });
                        dispatch({ type: 'NAVIGATE_TO_INTEGRATIONS' });
                      }}
                      className="mt-3 text-xs text-[var(--color-accent)] hover:underline"
                    >
                      Set up integrations
                    </button>
                  </div>
                )}
              </div>
            </>
          )}

          {state.addSourceStep === 'browse-items' && <BrowseItemsView />}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

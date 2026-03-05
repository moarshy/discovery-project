import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Plus, Upload, PanelLeftClose } from 'lucide-react';
import { useApp } from '../../store';
import { sourceCategories } from '../../data/sources';
import { entities } from '../../data/entities';
import { SourceItem } from './SourceItem';
import { AddSourceModal } from './AddSourceModal';
import { SkillPopover } from './SkillPopover';

interface SourcePanelProps {
  hasData: boolean;
  onCollapse?: () => void;
}

export function SourcePanel({ hasData, onCollapse }: SourcePanelProps) {
  const { state, dispatch } = useApp();
  const [autoSearch, setAutoSearch] = useState(false);

  // Find sources highlighted by a selected entity
  const highlightedSourceIds = new Set<string>();
  if (hasData && state.selectedEntityId) {
    const entity = entities.find((e) => e.id === state.selectedEntityId);
    if (entity) {
      entity.sourceRefs.forEach((id) => highlightedSourceIds.add(id));
    }
  }

  return (
    <div className="h-full flex flex-col bg-[var(--color-bg)]">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--color-border)]">
        <div className="flex items-center gap-2">
          {onCollapse && (
            <button
              onClick={onCollapse}
              className="p-1 rounded-md text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface-elevated)] transition-colors"
              title="Hide sources"
            >
              <PanelLeftClose className="w-3.5 h-3.5" />
            </button>
          )}
          <h3 className="text-sm font-semibold text-[var(--color-text-primary)]">
            Sources
          </h3>
        </div>
        <button
          onClick={() => dispatch({ type: 'OPEN_ADD_SOURCE_MODAL' })}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-md border border-dashed border-[var(--color-border-bright)] text-xs text-[var(--color-text-tertiary)] hover:text-[var(--color-text-secondary)] hover:border-[var(--color-accent)]/40 transition-colors"
        >
          <Plus className="w-3 h-3" />
          Add Source
        </button>
      </div>

      {/* Content */}
      {hasData ? (
        <>
          {/* Source list */}
          <div className="flex-1 overflow-y-auto px-3 py-3 space-y-4">
            {sourceCategories.map((category) => (
              <div key={category.id}>
                <p className="text-[10px] font-semibold uppercase tracking-wider text-[var(--color-text-tertiary)] px-1 mb-1.5">
                  {category.label}
                </p>
                <div className="space-y-1">
                  {category.sources.map((source) => {
                    const isSelected = state.selectedSourceId === source.id;
                    const showPopover = state.skillPopoverSourceId === source.id;

                    return (
                      <div key={source.id} className="relative">
                        <SourceItem
                          source={source}
                          isSelected={isSelected}
                          isHighlighted={highlightedSourceIds.has(source.id)}
                          onClick={() => {
                            if (isSelected) {
                              dispatch({ type: 'SELECT_SOURCE', payload: null });
                              dispatch({ type: 'CLOSE_SKILL_POPOVER' });
                            } else {
                              dispatch({ type: 'SELECT_SOURCE', payload: source.id });
                              dispatch({ type: 'OPEN_SKILL_POPOVER', payload: source.id });
                            }
                          }}
                          weight={state.sourceWeights[source.id] ?? 1.0}
                          onWeightChange={(w) =>
                            dispatch({ type: 'SET_SOURCE_WEIGHT', payload: { sourceId: source.id, weight: w } })
                          }
                        />
                        <AnimatePresence>
                          {showPopover && <SkillPopover sourceId={source.id} />}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Auto-search checkbox */}
          <div className="px-4 py-3 border-t border-[var(--color-border)]">
            <label className="flex items-start gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={autoSearch}
                onChange={(e) => setAutoSearch(e.target.checked)}
                className="mt-0.5 rounded border-[var(--color-border-bright)] bg-[var(--color-surface)] accent-[var(--color-accent)]"
              />
              <span className="text-xs text-[var(--color-text-secondary)] leading-tight">
                Automatically search all connected sources
              </span>
            </label>
          </div>
        </>
      ) : (
        /* Empty state */
        <div className="flex-1 flex flex-col items-center justify-center px-6">
          <div className="p-3 rounded-xl bg-[var(--color-surface)] border border-dashed border-[var(--color-border-bright)] mb-4">
            <Upload className="w-6 h-6 text-[var(--color-text-tertiary)]" />
          </div>
          <p className="text-sm font-medium text-[var(--color-text-secondary)] text-center">
            No sources yet
          </p>
          <p className="text-xs text-[var(--color-text-tertiary)] text-center mt-1.5 leading-relaxed">
            Add transcripts, tickets, strategy docs, or sales recordings to start synthesizing.
          </p>
          <button
            onClick={() => dispatch({ type: 'OPEN_ADD_SOURCE_MODAL' })}
            className="mt-4 flex items-center gap-1.5 px-3.5 py-2 rounded-lg border border-dashed border-[var(--color-border-bright)] text-xs font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] hover:border-[var(--color-accent)]/40 transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            Add Source
          </button>
        </div>
      )}

      {/* Add Source Modal */}
      <AddSourceModal />
    </div>
  );
}

import { motion } from 'framer-motion';
import { useApp } from '../../store';
import { useProjectData } from '../../hooks/useProjectData';
import { cn } from '../../lib/utils';

export function TableView() {
  const { state, dispatch } = useApp();
  const projectData = useProjectData();

  const entityTypes = projectData?.entityTypes ?? [];
  const sources = projectData?.sources ?? [];

  return (
    <div className="h-full overflow-y-auto px-4 py-3">
      {entityTypes.map((et, groupIdx) => (
        <div key={et.id} className="mb-5">
          {/* Entity type header */}
          <div className="flex items-center gap-2 mb-2">
            <div
              className="w-2.5 h-2.5 rounded-full"
              style={{ backgroundColor: et.color }}
            />
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-secondary)]">
              {et.label}
            </h4>
            <span className="text-[10px] text-[var(--color-text-tertiary)]">
              ({et.entities.length})
            </span>
          </div>

          {/* Entity rows */}
          <div className="space-y-1.5">
            {et.entities.map((entity, i) => {
              const isSelected = state.selectedEntityId === entity.id;
              const isHighlighted =
                state.selectedSourceId != null &&
                entity.sourceRefs.includes(state.selectedSourceId);

              return (
                <motion.button
                  key={entity.id}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: groupIdx * 0.05 + i * 0.03, duration: 0.25 }}
                  onClick={() =>
                    dispatch({
                      type: 'SELECT_ENTITY',
                      payload: isSelected ? null : entity.id,
                    })
                  }
                  className={cn(
                    'w-full text-left p-3 rounded-lg border transition-all',
                    isSelected
                      ? 'bg-[var(--color-surface-elevated)] border-[var(--color-accent)]/40'
                      : isHighlighted
                        ? 'bg-[var(--color-accent)]/5 border-[var(--color-accent)]/20'
                        : 'bg-[var(--color-surface)] border-[var(--color-border)] hover:border-[var(--color-border-bright)]'
                  )}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="text-xs font-medium text-[var(--color-text-primary)] truncate">
                        {entity.name}
                      </p>
                      <p className="text-[11px] text-[var(--color-text-tertiary)] mt-1 line-clamp-2">
                        {entity.description}
                      </p>
                    </div>
                  </div>

                  {/* Source badges */}
                  <div className="flex flex-wrap gap-1 mt-2">
                    {entity.sourceRefs.map((srcId) => {
                      const src = sources.find((s) => s.id === srcId);
                      if (!src) return null;
                      return (
                        <span
                          key={srcId}
                          className={cn(
                            'inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium',
                            state.selectedSourceId === srcId
                              ? 'bg-[var(--color-accent)]/20 text-[var(--color-accent)]'
                              : 'bg-[var(--color-surface-elevated)] text-[var(--color-text-tertiary)]'
                          )}
                        >
                          {src.name}
                        </span>
                      );
                    })}
                  </div>
                </motion.button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

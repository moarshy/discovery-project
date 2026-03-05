import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import { useApp } from '../../store';
import { entities } from '../../data/entities';
import { sources } from '../../data/sources';
import { graphEdges } from '../../data/graph';
import { getEntityTypeColor, getEntityTypeLabel } from '../../lib/graph-utils';

export function EntityDetailPanel() {
  const { state, dispatch } = useApp();
  const entity = entities.find((e) => e.id === state.selectedEntityId);

  if (!entity) return null;

  const color = getEntityTypeColor(entity.type);
  const typeLabel = getEntityTypeLabel(entity.type);

  // Find source objects for this entity
  const entitySources = entity.sourceRefs
    .map((id) => sources.find((s) => s.id === id))
    .filter(Boolean);

  // Find connected entities via non-mention edges
  const connectedEntities = graphEdges
    .filter(
      (e) =>
        e.relationship !== 'mentions' &&
        (e.source === entity.id || e.target === entity.id)
    )
    .map((e) => {
      const otherId = e.source === entity.id ? e.target : e.source;
      const other = entities.find((ent) => ent.id === otherId);
      return other ? { entity: other, relationship: e.relationship } : null;
    })
    .filter(Boolean);

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.2 }}
      className="absolute top-4 right-4 w-72 bg-[var(--color-surface)]/95 backdrop-blur-sm border border-[var(--color-border)] rounded-xl shadow-lg z-20 overflow-hidden"
    >
      {/* Header */}
      <div className="px-4 py-3 border-b border-[var(--color-border)]">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <h3 className="text-sm font-semibold text-[var(--color-text-primary)] leading-tight">
              {entity.name}
            </h3>
            <span
              className="inline-flex items-center mt-1.5 px-2 py-0.5 rounded-full text-[10px] font-medium"
              style={{
                backgroundColor: `${color}20`,
                color,
              }}
            >
              {typeLabel}
            </span>
          </div>
          <button
            onClick={() => dispatch({ type: 'SELECT_ENTITY', payload: null })}
            className="p-1 rounded-md text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface-elevated)] transition-colors shrink-0"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Description */}
      <div className="px-4 py-3 border-b border-[var(--color-border)]">
        <p className="text-[11px] text-[var(--color-text-secondary)] leading-relaxed">
          {entity.description}
        </p>
      </div>

      {/* Sources */}
      {entitySources.length > 0 && (
        <div className="px-4 py-3 border-b border-[var(--color-border)]">
          <p className="text-[10px] font-semibold text-[var(--color-text-tertiary)] uppercase tracking-wider mb-2">
            Sources ({entitySources.length})
          </p>
          <div className="flex flex-wrap gap-1.5">
            {entitySources.map(
              (src) =>
                src && (
                  <button
                    key={src.id}
                    onClick={() =>
                      dispatch({ type: 'SELECT_SOURCE', payload: src.id })
                    }
                    className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium bg-[var(--color-surface-elevated)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] border border-[var(--color-border)] hover:border-[var(--color-accent)] transition-colors"
                  >
                    {src.name}
                  </button>
                )
            )}
          </div>
        </div>
      )}

      {/* Connected entities */}
      {connectedEntities.length > 0 && (
        <div className="px-4 py-3">
          <p className="text-[10px] font-semibold text-[var(--color-text-tertiary)] uppercase tracking-wider mb-2">
            Connections
          </p>
          <div className="space-y-1.5">
            {connectedEntities.map(
              (conn) =>
                conn && (
                  <button
                    key={conn.entity.id}
                    onClick={() =>
                      dispatch({
                        type: 'SELECT_ENTITY',
                        payload: conn.entity.id,
                      })
                    }
                    className="w-full flex items-center gap-2 px-2 py-1.5 rounded-md text-left hover:bg-[var(--color-surface-elevated)] transition-colors group"
                  >
                    <span
                      className="w-2 h-2 rounded-full shrink-0"
                      style={{
                        backgroundColor: getEntityTypeColor(conn.entity.type),
                      }}
                    />
                    <span className="text-[11px] text-[var(--color-text-secondary)] group-hover:text-[var(--color-text-primary)] truncate">
                      {conn.entity.name}
                    </span>
                    <span className="text-[9px] text-[var(--color-text-tertiary)] ml-auto shrink-0">
                      {conn.relationship}
                    </span>
                  </button>
                )
            )}
          </div>
        </div>
      )}
    </motion.div>
  );
}

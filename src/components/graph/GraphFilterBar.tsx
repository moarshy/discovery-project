import { useApp } from '../../store';
import { entityTypes } from '../../data/entities';
import { getEdgeColor, getEdgeLabel } from '../../lib/graph-utils';
import type { EdgeType } from '../../types';

const edgeTypes: EdgeType[] = ['mentions', 'supports', 'contradicts', 'related'];

export function GraphFilterBar() {
  const { state, dispatch } = useApp();
  const { hiddenEntityTypes, hiddenEdgeTypes } = state.graphFilters;

  return (
    <div className="absolute bottom-4 left-4 flex flex-col gap-2 z-10">
      {/* Entity type toggles */}
      <div className="flex flex-wrap gap-1.5 bg-[var(--color-surface)]/90 backdrop-blur-sm border border-[var(--color-border)] rounded-lg px-2.5 py-2">
        <p className="w-full text-[10px] font-semibold text-[var(--color-text-tertiary)] uppercase tracking-wider mb-0.5">
          Entity Types
        </p>
        {entityTypes.map((et) => {
          const isHidden = hiddenEntityTypes.has(et.id);
          return (
            <button
              key={et.id}
              onClick={() =>
                dispatch({ type: 'TOGGLE_ENTITY_TYPE_FILTER', payload: et.id })
              }
              className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-medium transition-all"
              style={{
                backgroundColor: isHidden ? 'transparent' : `${et.color}20`,
                color: isHidden ? 'var(--color-text-tertiary)' : et.color,
                border: `1px solid ${isHidden ? 'var(--color-border)' : et.color}40`,
                opacity: isHidden ? 0.5 : 1,
                textDecoration: isHidden ? 'line-through' : 'none',
              }}
            >
              <span
                className="w-2 h-2 rounded-full shrink-0"
                style={{
                  backgroundColor: isHidden ? 'var(--color-text-tertiary)' : et.color,
                }}
              />
              {et.label}
            </button>
          );
        })}
      </div>

      {/* Edge type toggles */}
      <div className="flex flex-wrap gap-1.5 bg-[var(--color-surface)]/90 backdrop-blur-sm border border-[var(--color-border)] rounded-lg px-2.5 py-2">
        <p className="w-full text-[10px] font-semibold text-[var(--color-text-tertiary)] uppercase tracking-wider mb-0.5">
          Edges
        </p>
        {edgeTypes.map((et) => {
          const isHidden = hiddenEdgeTypes.has(et);
          return (
            <button
              key={et}
              onClick={() =>
                dispatch({ type: 'TOGGLE_EDGE_TYPE_FILTER', payload: et })
              }
              className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-medium transition-all"
              style={{
                backgroundColor: isHidden ? 'transparent' : `${getEdgeColor(et)}20`,
                color: isHidden ? 'var(--color-text-tertiary)' : getEdgeColor(et),
                border: `1px solid ${isHidden ? 'var(--color-border)' : getEdgeColor(et)}40`,
                opacity: isHidden ? 0.5 : 1,
                textDecoration: isHidden ? 'line-through' : 'none',
              }}
            >
              <span
                className="w-3 h-0.5 rounded shrink-0"
                style={{
                  backgroundColor: isHidden ? 'var(--color-text-tertiary)' : getEdgeColor(et),
                }}
              />
              {getEdgeLabel(et)}
            </button>
          );
        })}
      </div>
    </div>
  );
}

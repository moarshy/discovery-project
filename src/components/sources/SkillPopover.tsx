import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import { useApp } from '../../store';

interface SkillPopoverProps {
  sourceId: string;
}

export function SkillPopover({ sourceId }: SkillPopoverProps) {
  const { state, dispatch } = useApp();

  const extractionSkills = state.skills.filter(
    (s) => s.category === 'extraction' && s.enabled
  );
  const assigned = state.sourceSkillAssignments[sourceId] || [];

  return (
    <motion.div
      initial={{ opacity: 0, y: -4 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -4 }}
      transition={{ duration: 0.15 }}
      className="absolute left-0 right-0 mt-1 z-20 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg shadow-lg overflow-hidden"
    >
      <div className="flex items-center justify-between px-3 py-2 border-b border-[var(--color-border)]">
        <span className="text-[10px] font-semibold uppercase tracking-wider text-[var(--color-text-tertiary)]">
          Extraction Skills
        </span>
        <button
          onClick={() => dispatch({ type: 'CLOSE_SKILL_POPOVER' })}
          className="p-0.5 rounded text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface-elevated)] transition-colors"
        >
          <X className="w-3 h-3" />
        </button>
      </div>
      <div className="px-3 py-2 space-y-1">
        {extractionSkills.map((skill) => (
          <label
            key={skill.id}
            className="flex items-center gap-2 py-1 cursor-pointer group"
          >
            <input
              type="checkbox"
              checked={assigned.includes(skill.id)}
              onChange={() =>
                dispatch({
                  type: 'TOGGLE_SOURCE_SKILL',
                  payload: { sourceId, skillId: skill.id },
                })
              }
              className="rounded border-[var(--color-border-bright)] bg-[var(--color-surface)] accent-[var(--color-accent)]"
            />
            <span className="text-xs text-[var(--color-text-secondary)] group-hover:text-[var(--color-text-primary)] transition-colors">
              {skill.name}
            </span>
          </label>
        ))}
        {extractionSkills.length === 0 && (
          <p className="text-[11px] text-[var(--color-text-tertiary)] py-1">
            No extraction skills enabled.
          </p>
        )}
      </div>
    </motion.div>
  );
}

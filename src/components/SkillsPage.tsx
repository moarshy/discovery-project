import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  GitBranch,
  TicketCheck,
  BookOpen,
  HardDrive,
  MessageSquare,
  Upload,
  Lightbulb,
  AlertTriangle,
  Target,
  Languages,
  Compass,
  FileText,
  TrendingUp,
  Users,
  Flag,
  Sparkles,
  X,
  type LucideIcon,
} from 'lucide-react';
import { useApp } from '../store';
import { categoryMeta } from '../data/skills';
import type { Skill, SkillCategory } from '../types';

const iconMap: Record<string, LucideIcon> = {
  TicketCheck,
  BookOpen,
  HardDrive,
  MessageSquare,
  Upload,
  Lightbulb,
  AlertTriangle,
  Target,
  Languages,
  Compass,
  FileText,
  TrendingUp,
  Users,
  Flag,
  Sparkles,
  GitBranch,
};

const categoryOrder: SkillCategory[] = ['data-source', 'extraction', 'synthesis'];

function SkillRow({ skill, index }: { skill: Skill; index: number }) {
  const { dispatch } = useApp();
  const Icon = iconMap[skill.icon] || FileText;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.03, duration: 0.25 }}
      onClick={() => dispatch({ type: 'SELECT_SKILL', payload: skill.id })}
      className="flex items-center gap-3 px-4 py-3 rounded-lg border border-transparent hover:bg-[var(--color-surface-elevated)] hover:border-[var(--color-border)] transition-all group cursor-pointer"
    >
      <div
        className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
        style={{ backgroundColor: `${skill.color}20` }}
      >
        <Icon className="w-4 h-4" style={{ color: skill.color }} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-[var(--color-text-primary)]">
            {skill.name}
          </span>
          <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-[var(--color-surface)] text-[var(--color-text-tertiary)] border border-[var(--color-border)]">
            {categoryMeta[skill.category].label}
          </span>
          {skill.githubUrl && (
            <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-[#6366F1]/10 text-[#6366F1] border border-[#6366F1]/20 flex items-center gap-1">
              <GitBranch className="w-2.5 h-2.5" />
              GitHub
            </span>
          )}
        </div>
        <p className="text-[11px] text-[var(--color-text-tertiary)] mt-0.5">
          {skill.description}
        </p>
      </div>
      <button
        onClick={(e) => {
          e.stopPropagation();
          dispatch({ type: 'TOGGLE_SKILL', payload: skill.id });
        }}
        className={`w-8 h-[18px] rounded-full transition-colors flex items-center shrink-0 ${
          skill.enabled
            ? 'bg-[var(--color-accent)] justify-end'
            : 'bg-[var(--color-surface-elevated)] border border-[var(--color-border)] justify-start'
        }`}
      >
        <div
          className={`w-3.5 h-3.5 rounded-full mx-0.5 transition-colors ${
            skill.enabled ? 'bg-white' : 'bg-[var(--color-text-tertiary)]'
          }`}
        />
      </button>
    </motion.div>
  );
}

function SkillEditorModal() {
  const { state, dispatch } = useApp();
  const skill = state.skills.find((s) => s.id === state.editingSkillId);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [instructions, setInstructions] = useState('');
  const [initialized, setInitialized] = useState<string | null>(null);

  // Sync local state when a different skill is selected
  if (skill && initialized !== skill.id) {
    setName(skill.name);
    setDescription(skill.description);
    setInstructions(skill.instructions);
    setInitialized(skill.id);
  }

  if (!skill) return null;

  const Icon = iconMap[skill.icon] || FileText;

  function handleSave() {
    dispatch({
      type: 'UPDATE_SKILL',
      payload: { id: skill!.id, name, description, instructions },
    });
    dispatch({ type: 'DESELECT_SKILL' });
  }

  function handleClose() {
    dispatch({ type: 'DESELECT_SKILL' });
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/50"
        onClick={handleClose}
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl p-6 w-full max-w-2xl shadow-xl max-h-[90vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
              style={{ backgroundColor: `${skill.color}20` }}
            >
              <Icon className="w-4 h-4" style={{ color: skill.color }} />
            </div>
            <h3 className="text-sm font-semibold text-[var(--color-text-primary)]">
              Edit: {skill.name}
            </h3>
          </div>
          <button
            onClick={handleClose}
            className="p-1 rounded-md text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface-elevated)] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Fields */}
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-[var(--color-text-secondary)] mb-1.5">
              Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] text-sm text-[var(--color-text-primary)] placeholder:text-[var(--color-text-tertiary)] focus:outline-none focus:border-[var(--color-accent)] transition-colors"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-[var(--color-text-secondary)] mb-1.5">
              Description
            </label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] text-sm text-[var(--color-text-primary)] placeholder:text-[var(--color-text-tertiary)] focus:outline-none focus:border-[var(--color-accent)] transition-colors"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-[var(--color-text-secondary)] mb-1.5">
              Instructions
            </label>
            <textarea
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] text-sm text-[var(--color-text-primary)] placeholder:text-[var(--color-text-tertiary)] focus:outline-none focus:border-[var(--color-accent)] transition-colors font-mono min-h-[200px] resize-y"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-2 mt-6">
          <button
            onClick={handleClose}
            className="px-3 py-1.5 rounded-lg text-xs text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-elevated)] transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-3 py-1.5 rounded-lg text-xs font-medium bg-[var(--color-accent)] text-white hover:opacity-90 transition-opacity"
          >
            Save
          </button>
        </div>
      </motion.div>
    </div>
  );
}

function ImportSkillModal() {
  const { state, dispatch } = useApp();
  const [url, setUrl] = useState('');

  if (!state.showImportSkillModal) return null;

  function handleImport() {
    if (!url.trim()) return;
    dispatch({ type: 'IMPORT_SKILL', payload: { url: url.trim() } });
    setUrl('');
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/50"
        onClick={() => dispatch({ type: 'CLOSE_IMPORT_SKILL_MODAL' })}
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl p-6 w-full max-w-md shadow-xl"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-[var(--color-text-primary)]">
            Import Skill from GitHub
          </h3>
          <button
            onClick={() => dispatch({ type: 'CLOSE_IMPORT_SKILL_MODAL' })}
            className="p-1 rounded-md text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface-elevated)] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://github.com/org/skill-repo"
          className="w-full px-3 py-2 rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] text-sm text-[var(--color-text-primary)] placeholder:text-[var(--color-text-tertiary)] focus:outline-none focus:border-[var(--color-accent)] transition-colors"
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleImport();
          }}
        />
        <div className="flex justify-end gap-2 mt-4">
          <button
            onClick={() => dispatch({ type: 'CLOSE_IMPORT_SKILL_MODAL' })}
            className="px-3 py-1.5 rounded-lg text-xs text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-elevated)] transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleImport}
            disabled={!url.trim()}
            className="px-3 py-1.5 rounded-lg text-xs font-medium bg-[var(--color-accent)] text-white hover:opacity-90 transition-opacity disabled:opacity-40"
          >
            Import
          </button>
        </div>
      </motion.div>
    </div>
  );
}

export function SkillsPage() {
  const { state, dispatch } = useApp();

  return (
    <div className="h-full p-8 overflow-y-auto">
      <div className="max-w-xl mx-auto">
        <div className="mb-8 flex items-start justify-between">
          <div>
            <h1 className="text-lg font-semibold text-[var(--color-text-primary)]">
              Skills
            </h1>
            <p className="text-xs text-[var(--color-text-tertiary)] mt-1">
              Customizable units that source, extract, and synthesize your data.
            </p>
          </div>
          <button
            onClick={() => dispatch({ type: 'OPEN_IMPORT_SKILL_MODAL' })}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-[var(--color-text-secondary)] border border-[var(--color-border)] hover:text-[var(--color-text-primary)] hover:border-[var(--color-border-bright)] transition-colors"
          >
            <GitBranch className="w-3.5 h-3.5" />
            Import from GitHub
          </button>
        </div>

        {categoryOrder.map((cat) => {
          const meta = categoryMeta[cat];
          const skills = state.skills.filter((s) => s.category === cat);

          return (
            <div key={cat} className="mb-8">
              <div className="px-4 mb-2">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-[var(--color-text-tertiary)]">
                  {meta.label}
                </p>
                <p className="text-[11px] text-[var(--color-text-tertiary)] mt-0.5">
                  {meta.description}
                </p>
              </div>
              <div className="space-y-0.5">
                {skills.map((skill, i) => (
                  <SkillRow key={skill.id} skill={skill} index={i} />
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <ImportSkillModal />
      <SkillEditorModal />
    </div>
  );
}

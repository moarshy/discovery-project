import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Plus,
  FileText,
  Calendar,
  X,
  ArrowLeft,
  MessageSquare,
  Target,
  Layers,
  Activity,
  Palette,
} from 'lucide-react';
import { useApp } from '../store';
import { Button } from './shared/Button';

const projectTypes = [
  {
    id: 'voc',
    name: 'Voice of Customer',
    description: 'Synthesize support tickets, surveys, and customer feedback into actionable VoC insights.',
    icon: MessageSquare,
    color: '#6366F1',
    sources: 'Support tickets, Surveys, CSAT/PSAT',
    outputs: 'Monthly VoC Report',
  },
  {
    id: 'okr-progress',
    name: 'OKR Progress',
    description: 'Track OKR progress by combining strategy docs, experiment results, and behavior metrics.',
    icon: Target,
    color: '#10B981',
    sources: 'OKRs, Experiments, Metrics, Weekly updates',
    outputs: 'Monthly OKR Report',
  },
  {
    id: 'feature-prioritization',
    name: 'Feature Prioritization',
    description: 'Prioritize features by synthesizing customer interviews, strategy, and support signals.',
    icon: Layers,
    color: '#8B5CF6',
    sources: 'Strategy docs, Interviews, Tickets, Recordings',
    outputs: 'Synthesis Report, PRD',
  },
  {
    id: 'feature-activation',
    name: 'Feature Activation',
    description: 'Analyze activation funnels by correlating analytics data with qualitative user feedback.',
    icon: Activity,
    color: '#F59E0B',
    sources: 'Analytics, Interviews, Tickets, Feedback',
    outputs: 'Activation Report',
  },
  {
    id: 'brand-strategy',
    name: 'Brand Strategy',
    description: 'Map brand language, perceptions, and strategic tensions from internal and customer voices.',
    icon: Palette,
    color: '#EC4899',
    sources: 'Interviews, Support tickets, Slack threads',
    outputs: 'Vocabulary Map, Strategy, Tensions',
  },
];

const projectTypeMap = Object.fromEntries(projectTypes.map((pt) => [pt.id, pt]));

type ModalStep = 'closed' | 'pick-type' | 'name-project';

export function ProjectsList() {
  const { state, dispatch } = useApp();
  const [modalStep, setModalStep] = useState<ModalStep>('closed');
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [projectName, setProjectName] = useState('');
  const nameInputRef = useRef<HTMLInputElement>(null);

  // Focus the name input when stepping to name-project
  useEffect(() => {
    if (modalStep === 'name-project') {
      // Small delay so the DOM has rendered
      requestAnimationFrame(() => nameInputRef.current?.focus());
    }
  }, [modalStep]);

  function closeModal() {
    setModalStep('closed');
    setSelectedType(null);
    setProjectName('');
  }

  function handlePickType(typeId: string) {
    setSelectedType(typeId);
    const pt = projectTypeMap[typeId];
    setProjectName(pt?.name ?? '');
    setModalStep('name-project');
  }

  function handleCreate() {
    if (!selectedType || !projectName.trim()) return;
    dispatch({
      type: 'CREATE_PROJECT',
      payload: { name: projectName.trim(), projectType: selectedType },
    });
    closeModal();
  }

  const chosenType = selectedType ? projectTypeMap[selectedType] : null;

  return (
    <div className="h-full p-8 overflow-y-auto">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-[var(--color-text-primary)]">
            Projects
          </h1>
          <Button
            variant="primary"
            size="md"
            icon={Plus}
            onClick={() => setModalStep('pick-type')}
          >
            Create New
          </Button>
        </div>

        {/* Project cards grid */}
        <div className="grid grid-cols-2 gap-4">
          {state.projects.map((project, i) => {
            const pt = projectTypeMap[project.projectType];
            const TypeIcon = pt?.icon ?? FileText;
            const typeColor = pt?.color ?? '#6366F1';

            return (
              <motion.button
                key={project.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05, duration: 0.3 }}
                onClick={() =>
                  dispatch({ type: 'NAVIGATE_TO_PROJECT', payload: project.id })
                }
                className="text-left p-5 rounded-xl border transition-all border-[var(--color-border)] bg-[var(--color-surface)] hover:bg-[var(--color-surface-elevated)] hover:border-[var(--color-border-bright)] group"
              >
                <div className="flex items-start gap-3">
                  <div
                    className="p-2 rounded-lg shrink-0 mt-0.5"
                    style={{
                      backgroundColor: `${typeColor}15`,
                      color: typeColor,
                    }}
                  >
                    <TypeIcon className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-sm font-semibold transition-colors text-[var(--color-text-primary)] group-hover:text-[var(--color-text-primary)]">
                      {project.name}
                    </h3>
                    <div className="flex items-center gap-2 mt-1.5">
                      {pt && (
                        <span
                          className="text-[10px] font-medium px-1.5 py-0.5 rounded-full"
                          style={{
                            backgroundColor: `${typeColor}15`,
                            color: typeColor,
                          }}
                        >
                          {pt.name}
                        </span>
                      )}
                      <span className="flex items-center gap-1 text-xs text-[var(--color-text-tertiary)]">
                        <Calendar className="w-3 h-3" />
                        {project.date}
                      </span>
                    </div>
                    <p className="text-xs text-[var(--color-text-secondary)] mt-2">
                      {project.inputCount} inputs &middot; {project.outputCount}{' '}
                      outputs
                    </p>
                  </div>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Create New Project Modal */}
      <AnimatePresence>
        {modalStep !== 'closed' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
            onClick={closeModal}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.2 }}
              className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl w-[820px] max-h-[80vh] shadow-2xl flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* ── Step 1: Pick a type ── */}
              {modalStep === 'pick-type' && (
                <>
                  <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--color-border)] shrink-0">
                    <div>
                      <h3 className="text-base font-semibold text-[var(--color-text-primary)]">
                        New Project
                      </h3>
                      <p className="text-xs text-[var(--color-text-tertiary)] mt-0.5">
                        Choose a project type to get started
                      </p>
                    </div>
                    <button
                      onClick={closeModal}
                      className="p-1.5 rounded-md text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface-elevated)] transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="overflow-y-auto px-6 py-5 space-y-2">
                    {projectTypes.map((pt, i) => {
                      const Icon = pt.icon;
                      return (
                        <motion.button
                          key={pt.id}
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.04, duration: 0.25 }}
                          onClick={() => handlePickType(pt.id)}
                          className="w-full text-left p-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] hover:bg-[var(--color-surface-elevated)] hover:border-[var(--color-border-bright)] transition-all group"
                        >
                          <div className="flex items-start gap-3">
                            <div
                              className="p-2.5 rounded-xl shrink-0"
                              style={{ backgroundColor: `${pt.color}15`, color: pt.color }}
                            >
                              <Icon className="w-5 h-5" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="text-sm font-semibold text-[var(--color-text-primary)] group-hover:text-[var(--color-text-primary)] transition-colors">
                                {pt.name}
                              </h4>
                              <p className="text-xs text-[var(--color-text-secondary)] mt-1 leading-relaxed">
                                {pt.description}
                              </p>
                              <div className="flex gap-6 mt-2">
                                <div>
                                  <span className="text-[10px] font-semibold uppercase tracking-wider text-[var(--color-text-tertiary)]">
                                    Sources
                                  </span>
                                  <p className="text-[11px] text-[var(--color-text-secondary)] mt-0.5">
                                    {pt.sources}
                                  </p>
                                </div>
                                <div>
                                  <span className="text-[10px] font-semibold uppercase tracking-wider text-[var(--color-text-tertiary)]">
                                    Outputs
                                  </span>
                                  <p className="text-[11px] text-[var(--color-text-secondary)] mt-0.5">
                                    {pt.outputs}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </motion.button>
                      );
                    })}
                  </div>
                </>
              )}

              {/* ── Step 2: Name the project ── */}
              {modalStep === 'name-project' && chosenType && (
                <>
                  <div className="flex items-center justify-between px-5 py-4 border-b border-[var(--color-border)] shrink-0">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => setModalStep('pick-type')}
                        className="p-1.5 rounded-md text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface-elevated)] transition-colors"
                      >
                        <ArrowLeft className="w-4 h-4" />
                      </button>
                      <div>
                        <h3 className="text-base font-semibold text-[var(--color-text-primary)]">
                          Name your project
                        </h3>
                        <div className="flex items-center gap-1.5 mt-0.5">
                          <div
                            className="w-2 h-2 rounded-full"
                            style={{ backgroundColor: chosenType.color }}
                          />
                          <span className="text-xs text-[var(--color-text-tertiary)]">
                            {chosenType.name}
                          </span>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={closeModal}
                      className="p-1.5 rounded-md text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface-elevated)] transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="px-5 py-5 space-y-5">
                    {/* Type summary card */}
                    <div className="flex items-start gap-3 p-3 rounded-lg bg-[var(--color-bg)] border border-[var(--color-border)]">
                      <div
                        className="p-2 rounded-lg shrink-0"
                        style={{ backgroundColor: `${chosenType.color}15`, color: chosenType.color }}
                      >
                        <chosenType.icon className="w-5 h-5" />
                      </div>
                      <p className="text-[11px] text-[var(--color-text-tertiary)] leading-relaxed">
                        {chosenType.description}
                      </p>
                    </div>

                    {/* Name input */}
                    <div>
                      <label className="block text-xs font-medium text-[var(--color-text-secondary)] mb-1.5">
                        Project name
                      </label>
                      <input
                        ref={nameInputRef}
                        type="text"
                        value={projectName}
                        onChange={(e) => setProjectName(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') handleCreate();
                        }}
                        placeholder={`e.g. ${chosenType.name} — Q1 2026`}
                        className="w-full px-3 py-2.5 text-sm bg-[var(--color-bg)] border border-[var(--color-border)] rounded-lg text-[var(--color-text-primary)] placeholder:text-[var(--color-text-tertiary)] focus:outline-none focus:border-[var(--color-accent)] transition-colors"
                      />
                    </div>

                    {/* Create button */}
                    <div className="flex justify-end gap-2 pt-1">
                      <Button variant="ghost" size="md" onClick={closeModal}>
                        Cancel
                      </Button>
                      <Button
                        variant="primary"
                        size="md"
                        icon={Plus}
                        onClick={handleCreate}
                        disabled={!projectName.trim()}
                      >
                        Create Project
                      </Button>
                    </div>
                  </div>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

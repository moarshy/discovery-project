import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Plus,
  FileText,
  Calendar,
  X,
  ArrowLeft,
  Lock,
  Users,
  BarChart3,
  Lightbulb,
  Briefcase,
  TrendingUp,
  MessageSquare,
  ClipboardList,
  Megaphone,
} from 'lucide-react';
import { useApp } from '../store';
import { Button } from './shared/Button';

const projectTypes = [
  {
    id: 'user-research',
    name: 'User Research',
    description: 'Synthesize user interviews, surveys, and usability tests into actionable insights.',
    icon: Users,
    color: '#6366F1',
    sources: 'Transcripts, Survey data, Session recordings',
    outputs: 'VoC Report, Persona cards, Journey maps',
    comingSoon: false,
  },
  {
    id: 'analytics-review',
    name: 'Analytics Review',
    description: 'Combine quantitative data with qualitative signals to surface trends and anomalies.',
    icon: BarChart3,
    color: '#10B981',
    sources: 'Dashboards, Metrics exports, A/B test results',
    outputs: 'Trend report, Opportunity sizing, KPI summary',
    comingSoon: true,
  },
  {
    id: 'solution-discovery',
    name: 'Solution Discovery',
    description: 'Explore the problem and solution space across customer needs and market signals.',
    icon: Lightbulb,
    color: '#F59E0B',
    sources: 'Customer feedback, Competitor analysis, Strategy docs',
    outputs: 'Opportunity map, PRD draft, Business case',
    comingSoon: true,
  },
  {
    id: 'meeting-prep',
    name: 'Meeting Prep',
    description: 'Quickly gather context from multiple sources before a stakeholder meeting.',
    icon: Briefcase,
    color: '#8B5CF6',
    sources: 'Docs, Slack threads, Previous meeting notes',
    outputs: 'Briefing doc, Talking points, Decision log',
    comingSoon: true,
  },
  {
    id: 'competitive-analysis',
    name: 'Competitive Analysis',
    description: 'Aggregate and compare competitor data across positioning, features, and pricing.',
    icon: TrendingUp,
    color: '#EF4444',
    sources: 'Competitor sites, G2 reviews, Sales battle cards',
    outputs: 'Competitive matrix, Gap analysis, Win/loss report',
    comingSoon: true,
  },
  {
    id: 'customer-feedback',
    name: 'Customer Feedback',
    description: 'Consolidate feedback from support tickets, NPS, and CS conversations into themes.',
    icon: MessageSquare,
    color: '#06B6D4',
    sources: 'Support tickets, NPS responses, CS notes',
    outputs: 'Theme report, Priority matrix, Action items',
    comingSoon: true,
  },
  {
    id: 'sprint-planning',
    name: 'Sprint Planning',
    description: 'Combine product strategy, tech debt, and customer urgency to prioritize the next sprint.',
    icon: ClipboardList,
    color: '#EC4899',
    sources: 'Roadmap, Tech debt tracker, Customer requests',
    outputs: 'Sprint backlog, Priority rationale, Risk assessment',
    comingSoon: true,
  },
  {
    id: 'launch-review',
    name: 'Launch Review',
    description: 'Post-launch synthesis of metrics, customer reactions, and internal retrospective data.',
    icon: Megaphone,
    color: '#F97316',
    sources: 'Launch metrics, Customer feedback, Retro notes',
    outputs: 'Launch report, Lessons learned, Follow-up plan',
    comingSoon: true,
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
            const isComingSoon = pt ? pt.comingSoon : false;

            return (
              <motion.button
                key={project.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05, duration: 0.3 }}
                onClick={() =>
                  !isComingSoon &&
                  dispatch({ type: 'NAVIGATE_TO_PROJECT', payload: project.id })
                }
                disabled={isComingSoon}
                className={`text-left p-5 rounded-xl border transition-all relative ${
                  isComingSoon
                    ? 'border-[var(--color-border)] bg-[var(--color-surface)] opacity-40 cursor-not-allowed'
                    : 'border-[var(--color-border)] bg-[var(--color-surface)] hover:bg-[var(--color-surface-elevated)] hover:border-[var(--color-border-bright)] group'
                }`}
              >
                {isComingSoon && (
                  <span className="absolute top-4 right-4 flex items-center gap-1 px-2 py-0.5 rounded-full bg-[var(--color-surface-elevated)] border border-[var(--color-border)] text-[10px] font-medium text-[var(--color-text-tertiary)]">
                    <Lock className="w-2.5 h-2.5" />
                    Coming Soon
                  </span>
                )}
                <div className="flex items-start gap-3">
                  <div
                    className="p-2 rounded-lg shrink-0 mt-0.5"
                    style={{
                      backgroundColor: isComingSoon ? 'rgba(107,114,128,0.1)' : `${typeColor}15`,
                      color: isComingSoon ? '#6b7280' : typeColor,
                    }}
                  >
                    <TypeIcon className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <h3 className={`text-sm font-semibold transition-colors ${
                      isComingSoon
                        ? 'text-[var(--color-text-tertiary)]'
                        : 'text-[var(--color-text-primary)] group-hover:text-white'
                    }`}>
                      {project.name}
                    </h3>
                    <div className="flex items-center gap-2 mt-1.5">
                      {pt && (
                        <span
                          className="text-[10px] font-medium px-1.5 py-0.5 rounded-full"
                          style={{
                            backgroundColor: isComingSoon ? 'rgba(107,114,128,0.1)' : `${typeColor}15`,
                            color: isComingSoon ? '#6b7280' : typeColor,
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
              {modalStep === 'pick-type' && (() => {
                const featured = projectTypes.find((pt) => !pt.comingSoon)!;
                const comingSoonTypes = projectTypes.filter((pt) => pt.comingSoon);
                const FeaturedIcon = featured.icon;

                return (
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

                    <div className="overflow-y-auto px-6 py-5 space-y-6">
                      {/* Featured: User Research */}
                      <motion.button
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.25 }}
                        onClick={() => handlePickType(featured.id)}
                        className="w-full text-left p-5 rounded-xl border border-[var(--color-accent)]/30 bg-[var(--color-accent)]/5 hover:bg-[var(--color-accent)]/10 hover:border-[var(--color-accent)]/50 transition-all group"
                      >
                        <div className="flex items-start gap-4">
                          <div
                            className="p-3 rounded-xl shrink-0"
                            style={{ backgroundColor: `${featured.color}20`, color: featured.color }}
                          >
                            <FeaturedIcon className="w-6 h-6" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2.5">
                              <h4 className="text-base font-semibold text-[var(--color-text-primary)] group-hover:text-white transition-colors">
                                {featured.name}
                              </h4>
                              <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-green-500/15 text-green-400">
                                Available
                              </span>
                            </div>
                            <p className="text-xs text-[var(--color-text-secondary)] mt-1.5 leading-relaxed">
                              {featured.description}
                            </p>
                            <div className="flex gap-6 mt-3">
                              <div>
                                <span className="text-[10px] font-semibold uppercase tracking-wider text-[var(--color-text-tertiary)]">
                                  Sources
                                </span>
                                <p className="text-[11px] text-[var(--color-text-secondary)] mt-0.5">
                                  {featured.sources}
                                </p>
                              </div>
                              <div>
                                <span className="text-[10px] font-semibold uppercase tracking-wider text-[var(--color-text-tertiary)]">
                                  Outputs
                                </span>
                                <p className="text-[11px] text-[var(--color-text-secondary)] mt-0.5">
                                  {featured.outputs}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.button>

                      {/* Coming Soon section */}
                      <div>
                        <p className="text-[10px] font-semibold uppercase tracking-wider text-[var(--color-text-tertiary)] mb-3">
                          Coming Soon
                        </p>
                        <div className="grid grid-cols-4 gap-2">
                          {comingSoonTypes.map((pt, i) => {
                            const Icon = pt.icon;
                            return (
                              <motion.div
                                key={pt.id}
                                initial={{ opacity: 0, y: 6 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.05 + i * 0.03, duration: 0.2 }}
                                className="flex flex-col items-center gap-2 p-3.5 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] opacity-45 cursor-default"
                              >
                                <div
                                  className="p-2 rounded-lg"
                                  style={{ backgroundColor: 'rgba(107,114,128,0.1)', color: '#6b7280' }}
                                >
                                  <Icon className="w-4.5 h-4.5" />
                                </div>
                                <span className="text-[11px] font-medium text-[var(--color-text-tertiary)] text-center leading-tight">
                                  {pt.name}
                                </span>
                              </motion.div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </>
                );
              })()}

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

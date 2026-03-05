import { useState, useMemo, Fragment } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Search, Sparkles, Check, Plus, Minus, FileText } from 'lucide-react';
import { useApp } from '../../store';
import { useProjectData } from '../../hooks/useProjectData';
import {
  outputTemplates,
  suggestedTemplates,
  projectTypeLabels,
  categoryOrder,
  type OutputTemplate,
} from '../../data/output-templates';
import { outputIcons } from './output-icons';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Match a hardcoded report to a template.
 *  - Unique types (prd, business-case, etc.) match directly.
 *  - For the generic 'report' type, also match on title substring. */
function reportMatchesTemplate(
  report: { type: string; title: string },
  template: OutputTemplate,
): boolean {
  if (report.type !== template.type) return false;
  // Unique types — direct match is enough
  if (template.type !== 'report') return true;
  // Generic 'report' type: fuzzy-match on title keywords
  const tLower = template.title.toLowerCase();
  const rLower = report.title.toLowerCase();
  // Check if the first meaningful word of the template title appears in the report title
  const keywords = tLower.split(/\s+/).filter((w) => w.length > 3);
  return keywords.some((kw) => rLower.includes(kw));
}

// ---------------------------------------------------------------------------
// TemplateCard
// ---------------------------------------------------------------------------

interface CardProps {
  template: OutputTemplate;
  status: 'included' | 'added' | 'suggested' | 'available';
  onAdd: () => void;
  onRemove: () => void;
}

function TemplateCard({ template, status, onAdd, onRemove }: CardProps) {
  const Icon = outputIcons[template.type] || FileText;
  const isActive = status === 'included' || status === 'added';

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.2 }}
      className={`relative group p-3 rounded-xl border transition-all ${
        isActive
          ? 'border-green-500/40 bg-green-500/5'
          : 'border-[var(--color-border)] bg-[var(--color-surface)] hover:border-[var(--color-border-bright)]'
      }`}
    >
      <div className="flex items-start gap-2.5">
        {/* Icon pill */}
        <div
          className={`p-1.5 rounded-lg shrink-0 ${
            isActive
              ? 'bg-green-500/10 text-green-400'
              : 'bg-[var(--color-surface-elevated)] text-[var(--color-text-tertiary)]'
          }`}
        >
          <Icon className="w-4 h-4" />
        </div>

        <div className="min-w-0 flex-1">
          <h4 className="text-xs font-semibold text-[var(--color-text-primary)] leading-tight">
            {template.title}
          </h4>
          <p className="text-[11px] text-[var(--color-text-tertiary)] mt-0.5 line-clamp-2 leading-snug">
            {template.description}
          </p>
        </div>
      </div>

      {/* Bottom-right badge / action */}
      <div className="mt-2 flex items-center justify-between">
        {/* Suggested pill */}
        {status === 'suggested' && (
          <span className="flex items-center gap-1 text-[10px] font-medium text-[var(--color-accent)]">
            <Sparkles className="w-3 h-3" />
            Suggested
          </span>
        )}
        {status !== 'suggested' && <span />}

        {/* Action */}
        {status === 'included' && (
          <span className="flex items-center gap-1 text-[10px] font-medium text-green-400">
            <Check className="w-3 h-3" />
            Included
          </span>
        )}
        {status === 'added' && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onRemove();
            }}
            className="flex items-center gap-1 text-[10px] font-medium text-green-400 hover:text-red-400 transition-colors"
          >
            <span className="group-hover:hidden flex items-center gap-1">
              <Check className="w-3 h-3" />
              Added
            </span>
            <span className="hidden group-hover:flex items-center gap-1">
              <Minus className="w-3 h-3" />
              Remove
            </span>
          </button>
        )}
        {(status === 'suggested' || status === 'available') && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onAdd();
            }}
            className="flex items-center gap-1 text-[10px] font-medium text-[var(--color-text-tertiary)] hover:text-[var(--color-accent)] transition-colors opacity-0 group-hover:opacity-100"
          >
            <Plus className="w-3 h-3" />
            Add
          </button>
        )}
      </div>
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// Section heading
// ---------------------------------------------------------------------------

function SectionHeading({ children, extra }: { children: React.ReactNode; extra?: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2 mt-4 mb-2">
      <h3 className="text-[10px] font-bold uppercase tracking-wider text-[var(--color-text-tertiary)]">
        {children}
      </h3>
      {extra}
      <div className="flex-1 h-px bg-[var(--color-border)]" />
    </div>
  );
}

// ---------------------------------------------------------------------------
// Category sub-heading
// ---------------------------------------------------------------------------

function CategoryHeading({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-2 mt-3 mb-1.5 col-span-full">
      <span className="text-[10px] font-semibold text-[var(--color-text-tertiary)] uppercase tracking-wide">
        {label}
      </span>
      <div className="flex-1 h-px bg-[var(--color-border)] opacity-50" />
    </div>
  );
}

// ---------------------------------------------------------------------------
// OutputTemplateModal
// ---------------------------------------------------------------------------

export function OutputTemplateModal() {
  const { state, dispatch } = useApp();
  const projectData = useProjectData();
  const [search, setSearch] = useState('');

  const projectId = state.activeProjectId ?? '';
  const project = state.projects.find((p) => p.id === projectId);
  const projectType = project?.projectType ?? '';
  const hardcodedReports = projectData?.reports ?? [];
  const addedIds = state.addedOutputTemplates[projectId] ?? [];

  // Derive which templates are hardcoded (matched to existing reports)
  const hardcodedTemplateIds = useMemo(() => {
    const ids = new Set<string>();
    for (const tpl of outputTemplates) {
      if (hardcodedReports.some((r) => reportMatchesTemplate(r, tpl))) {
        ids.add(tpl.id);
      }
    }
    return ids;
  }, [hardcodedReports]);

  const suggestedIds = useMemo(
    () => new Set(suggestedTemplates[projectType] ?? []),
    [projectType],
  );
  const addedSet = useMemo(() => new Set(addedIds), [addedIds]);

  // Status helper
  function getStatus(tpl: OutputTemplate): 'included' | 'added' | 'suggested' | 'available' {
    if (hardcodedTemplateIds.has(tpl.id)) return 'included';
    if (addedSet.has(tpl.id)) return 'added';
    if (suggestedIds.has(tpl.id)) return 'suggested';
    return 'available';
  }

  // Filter by search
  const filtered = useMemo(() => {
    if (!search.trim()) return outputTemplates;
    const q = search.toLowerCase();
    return outputTemplates.filter(
      (t) =>
        t.title.toLowerCase().includes(q) ||
        t.description.toLowerCase().includes(q) ||
        t.category.toLowerCase().includes(q),
    );
  }, [search]);

  // Partition into sections
  const inProject = filtered.filter((t) => getStatus(t) === 'included' || getStatus(t) === 'added');
  const suggested = filtered.filter((t) => getStatus(t) === 'suggested');
  const rest = filtered.filter((t) => getStatus(t) === 'available');

  // Group "rest" by category
  const restByCategory = useMemo(() => {
    const map = new Map<string, OutputTemplate[]>();
    for (const cat of categoryOrder) {
      const items = rest.filter((t) => t.category === cat);
      if (items.length > 0) map.set(cat, items);
    }
    return map;
  }, [rest]);

  const handleAdd = (templateId: string) => {
    dispatch({ type: 'ADD_OUTPUT_TEMPLATE', payload: { projectId, templateId } });
  };

  const handleRemove = (templateId: string) => {
    dispatch({ type: 'REMOVE_OUTPUT_TEMPLATE', payload: { projectId, templateId } });
  };

  return (
    <AnimatePresence>
      {/* Backdrop */}
      <motion.div
        key="backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4"
        onClick={() => dispatch({ type: 'CLOSE_OUTPUT_TEMPLATE_MODAL' })}
      >
        {/* Modal */}
        <motion.div
          key="modal"
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.2 }}
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-lg max-h-[80vh] bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl shadow-2xl flex flex-col overflow-hidden"
        >
          {/* Header */}
          <div className="px-5 pt-5 pb-3 shrink-0">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold text-[var(--color-text-primary)]">
                Output Templates
              </h2>
              <button
                onClick={() => dispatch({ type: 'CLOSE_OUTPUT_TEMPLATE_MODAL' })}
                className="p-1 rounded-md text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface-elevated)] transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <p className="text-xs text-[var(--color-text-tertiary)] mt-1">
              Add outputs to this project
            </p>

            {/* Search */}
            <div className="relative mt-3">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[var(--color-text-tertiary)]" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search templates..."
                className="w-full pl-8 pr-3 py-2 rounded-lg bg-[var(--color-bg)] border border-[var(--color-border)] text-xs text-[var(--color-text-primary)] placeholder:text-[var(--color-text-tertiary)] focus:outline-none focus:border-[var(--color-accent)]/50 transition-colors"
              />
            </div>
          </div>

          {/* Scrollable body */}
          <div className="flex-1 overflow-y-auto px-5 pb-5">
            {/* IN THIS PROJECT */}
            {inProject.length > 0 && (
              <>
                <SectionHeading>In this project</SectionHeading>
                <div className="grid grid-cols-2 gap-2">
                  <AnimatePresence mode="popLayout">
                    {inProject.map((tpl) => (
                      <TemplateCard
                        key={tpl.id}
                        template={tpl}
                        status={getStatus(tpl)}
                        onAdd={() => handleAdd(tpl.id)}
                        onRemove={() => handleRemove(tpl.id)}
                      />
                    ))}
                  </AnimatePresence>
                </div>
              </>
            )}

            {/* SUGGESTED */}
            {suggested.length > 0 && (
              <>
                <SectionHeading
                  extra={
                    <Sparkles className="w-3 h-3 text-[var(--color-accent)]" />
                  }
                >
                  Suggested for {projectTypeLabels[projectType] ?? projectType}
                </SectionHeading>
                <div className="grid grid-cols-2 gap-2">
                  <AnimatePresence mode="popLayout">
                    {suggested.map((tpl) => (
                      <TemplateCard
                        key={tpl.id}
                        template={tpl}
                        status="suggested"
                        onAdd={() => handleAdd(tpl.id)}
                        onRemove={() => handleRemove(tpl.id)}
                      />
                    ))}
                  </AnimatePresence>
                </div>
              </>
            )}

            {/* ALL TEMPLATES */}
            {restByCategory.size > 0 && (
              <>
                <SectionHeading>All templates</SectionHeading>
                <div className="grid grid-cols-2 gap-2">
                  <AnimatePresence mode="popLayout">
                    {Array.from(restByCategory.entries()).map(([cat, items]) => (
                      <Fragment key={cat}>
                        <CategoryHeading label={cat} />
                        {items.map((tpl) => (
                          <TemplateCard
                            key={tpl.id}
                            template={tpl}
                            status="available"
                            onAdd={() => handleAdd(tpl.id)}
                            onRemove={() => handleRemove(tpl.id)}
                          />
                        ))}
                      </Fragment>
                    ))}
                  </AnimatePresence>
                </div>
              </>
            )}

            {/* Empty state */}
            {filtered.length === 0 && (
              <p className="text-xs text-[var(--color-text-tertiary)] text-center py-8">
                No templates match "{search}"
              </p>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

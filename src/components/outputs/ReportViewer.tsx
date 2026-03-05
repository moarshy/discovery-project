import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Quote, Copy, Download, RefreshCw, Maximize2, Minimize2, Share2 } from 'lucide-react';
import { useApp } from '../../store';
import { useProjectData } from '../../hooks/useProjectData';
import { CitationMarker } from './CitationMarker';
import { ShareToSlackModal } from './ShareToSlackModal';
import type { Report, Citation } from '../../types';

interface ReportViewerProps {
  report: Report;
}

const typeLabels: Record<string, string> = {
  report: 'Report',
  prd: 'PRD',
  'business-case': 'Business Case',
  'vocabulary-map': 'Vocabulary Map',
  'brand-strategy': 'Brand Strategy',
  'tensions-report': 'Tensions Report',
  'activation-report': 'Activation Report',
  'okr-report': 'OKR Report',
  'experiment-report': 'Experiment Report',
  'progress-report': 'Progress Report',
};

const typeBadgeColors: Record<string, string> = {
  report: '#6366F1',
  prd: '#10B981',
  'business-case': '#F59E0B',
  'vocabulary-map': '#06B6D4',
  'brand-strategy': '#8B5CF6',
  'tensions-report': '#F43F5E',
  'activation-report': '#D946EF',
  'okr-report': '#10B981',
  'experiment-report': '#8B5CF6',
  'progress-report': '#22C55E',
};

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

/** Parse a paragraph for inline citation markers [N], bold, callouts, metrics, and priority badges. */
function renderParagraph(
  paragraph: string,
  citations: Citation[],
  paragraphIdx: number,
) {
  // Check for metric lines
  const metricRegex = /^\[metric:\s*(.+?)\s*\|\s*(.+?)\s*\]$/;
  const metricLines = paragraph.split('\n').filter((l) => metricRegex.test(l.trim()));
  if (metricLines.length > 0 && metricLines.length === paragraph.split('\n').filter((l) => l.trim()).length) {
    // All lines are metrics — render as grid
    return (
      <div key={paragraphIdx} className="grid grid-cols-2 gap-2 my-3">
        {metricLines.map((line, mi) => {
          const match = line.trim().match(metricRegex);
          if (!match) return null;
          return (
            <div
              key={mi}
              className="bg-[var(--color-surface-elevated)] border border-[var(--color-border)] rounded-lg px-3 py-2.5 text-center"
            >
              <p className="text-sm font-bold text-[var(--color-text-primary)]">
                {match[2]}
              </p>
              <p className="text-[10px] text-[var(--color-text-tertiary)] mt-0.5">
                {match[1]}
              </p>
            </div>
          );
        })}
      </div>
    );
  }

  // Check for callout syntax: > [conflict] or > [recommendation]
  const calloutMatch = paragraph.match(/^>\s*\[(conflict|recommendation)\]\s*/);
  if (calloutMatch) {
    const calloutType = calloutMatch[1] as 'conflict' | 'recommendation';
    const text = paragraph.replace(/^>\s*\[(conflict|recommendation)\]\s*/, '');
    const borderColor = calloutType === 'conflict' ? '#F59E0B' : '#10B981';
    const bgColor = calloutType === 'conflict' ? 'rgba(245, 158, 11, 0.05)' : 'rgba(16, 185, 129, 0.05)';

    return (
      <div
        key={paragraphIdx}
        className="pl-3 py-2 pr-2 rounded-r-md my-1"
        style={{
          borderLeft: `3px solid ${borderColor}`,
          backgroundColor: bgColor,
        }}
      >
        {renderInlineContent(text, citations)}
      </div>
    );
  }

  return (
    <p key={paragraphIdx}>
      {renderInlineContent(paragraph, citations)}
    </p>
  );
}

/** Render inline content with bold, [N] citations, and (P0)/(P1)/(P2) badges. */
function renderInlineContent(text: string, citations: Citation[]) {
  // Split by bold, citation markers, and priority badges
  const parts = text.split(/(\*\*[^*]+\*\*|\[\d+\]|\(P[012]\))/g);
  return parts.map((part, idx) => {
    // Bold
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <span key={idx} className="font-semibold text-[var(--color-text-primary)]">
          {part.slice(2, -2)}
        </span>
      );
    }

    // Citation marker [N]
    const citMatch = part.match(/^\[(\d+)\]$/);
    if (citMatch) {
      const citIdx = parseInt(citMatch[1], 10);
      const citation = citations[citIdx - 1];
      if (citation) {
        return <CitationMarker key={idx} index={citIdx} citation={citation} />;
      }
      return <span key={idx}>{part}</span>;
    }

    // Priority badge
    const prioMatch = part.match(/^\(P([012])\)$/);
    if (prioMatch) {
      const level = prioMatch[1];
      const colors: Record<string, { bg: string; text: string }> = {
        '0': { bg: 'rgba(239, 68, 68, 0.15)', text: '#ef4444' },
        '1': { bg: 'rgba(245, 158, 11, 0.15)', text: '#f59e0b' },
        '2': { bg: 'rgba(59, 130, 246, 0.15)', text: '#3b82f6' },
      };
      const c = colors[level];
      return (
        <span
          key={idx}
          className="inline-flex items-center px-1.5 py-0 rounded-full text-[9px] font-bold mx-0.5"
          style={{ backgroundColor: c.bg, color: c.text }}
        >
          P{level}
        </span>
      );
    }

    return <span key={idx}>{part}</span>;
  });
}

export function ReportViewer({ report }: ReportViewerProps) {
  const { dispatch } = useApp();
  const projectData = useProjectData();
  const [hoveredSection, setHoveredSection] = useState<number | null>(null);
  const [activeSection, setActiveSection] = useState(0);
  const [showShareModal, setShowShareModal] = useState(false);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const sources = projectData?.sources ?? [];

  // Scroll spy via IntersectionObserver
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const idx = sectionRefs.current.indexOf(entry.target as HTMLDivElement);
            if (idx >= 0) setActiveSection(idx);
          }
        }
      },
      {
        root: container,
        rootMargin: '-20% 0px -60% 0px',
        threshold: 0,
      }
    );

    sectionRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, [report.id]);

  const scrollToSection = useCallback((idx: number) => {
    sectionRefs.current[idx]?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }, []);

  const badgeColor = typeBadgeColors[report.type] ?? '#6366F1';

  return (
    <div className="h-full flex flex-col bg-[var(--color-bg)]">
      {/* Header */}
      <div className="px-4 py-3 border-b border-[var(--color-border)] shrink-0">
        {/* Top row: back + title + actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => dispatch({ type: 'CLOSE_OUTPUT' })}
            className="p-1.5 rounded-md text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface-elevated)] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <h3 className="text-sm font-semibold text-[var(--color-text-primary)] flex-1">
            {report.title}
          </h3>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setShowShareModal(true)}
              title="Share to Slack"
              className="p-1.5 rounded-md text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface-elevated)] transition-colors"
            >
              <Share2 className="w-3.5 h-3.5" />
            </button>
            <button className="p-1.5 rounded-md text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface-elevated)] transition-colors">
              <Copy className="w-3.5 h-3.5" />
            </button>
            <button className="p-1.5 rounded-md text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface-elevated)] transition-colors">
              <Download className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
        {/* Meta row */}
        <div className="flex items-center gap-2 mt-2 ml-9">
          <span
            className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium"
            style={{
              backgroundColor: `${badgeColor}20`,
              color: badgeColor,
            }}
          >
            {typeLabels[report.type] ?? report.type}
          </span>
          <span className="text-[10px] text-[var(--color-text-tertiary)]">
            Synthesized from {report.sourceCount} sources
          </span>
          <span className="text-[10px] text-[var(--color-text-tertiary)]">
            &middot; {formatDate(report.generatedAt)}
          </span>
        </div>
      </div>

      {/* Mini TOC */}
      <div className="shrink-0 border-b border-[var(--color-border)] px-4 py-2 overflow-x-auto">
        <div className="flex gap-1">
          {report.sections.map((section, i) => {
            const isActive = activeSection === i;
            // Extract short label from heading (remove number prefix)
            const label = section.heading.replace(/^\d+\.\s*/, '');
            return (
              <button
                key={i}
                onClick={() => scrollToSection(i)}
                className="px-2.5 py-1 rounded-md text-[10px] font-medium whitespace-nowrap transition-colors"
                style={{
                  backgroundColor: isActive ? 'var(--color-accent)' : 'transparent',
                  color: isActive ? 'white' : 'var(--color-text-tertiary)',
                }}
              >
                {label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Report content */}
      <div ref={scrollContainerRef} className="flex-1 overflow-y-auto px-6 py-5 space-y-6">
        {report.sections.map((section, i) => (
          <motion.div
            key={i}
            ref={(el) => { sectionRefs.current[i] = el; }}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1, duration: 0.35 }}
            onMouseEnter={() => setHoveredSection(i)}
            onMouseLeave={() => setHoveredSection(null)}
          >
            {/* Section heading with hover actions */}
            <div className="flex items-center gap-2 mb-3 group relative">
              <h4 className="text-sm font-bold text-[var(--color-text-primary)]">
                {section.heading}
              </h4>
              <AnimatePresence>
                {hoveredSection === i && (
                  <motion.div
                    initial={{ opacity: 0, x: -4 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -4 }}
                    transition={{ duration: 0.15 }}
                    className="flex items-center gap-0.5 ml-auto"
                  >
                    {[
                      { Icon: RefreshCw, title: 'Regenerate' },
                      { Icon: Maximize2, title: 'Expand' },
                      { Icon: Minimize2, title: 'Simplify' },
                      { Icon: Copy, title: 'Copy' },
                    ].map(({ Icon, title }) => (
                      <button
                        key={title}
                        title={title}
                        className="p-1 rounded text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface-elevated)] transition-colors"
                      >
                        <Icon className="w-3 h-3" />
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Content with rich rendering */}
            <div className="text-xs text-[var(--color-text-secondary)] leading-relaxed space-y-2">
              {section.content.split('\n\n').map((paragraph, pi) => {
                // Handle markdown table
                if (paragraph.includes('|') && paragraph.includes('---')) {
                  const lines = paragraph.trim().split('\n').filter((l) => !l.match(/^\|[\s-|]+\|$/));
                  if (lines.length < 1) return <p key={pi}>{paragraph}</p>;

                  const headers = lines[0].split('|').map((h) => h.trim()).filter(Boolean);
                  const rows = lines.slice(1).map((r) =>
                    r.split('|').map((c) => c.trim()).filter(Boolean)
                  );

                  return (
                    <div key={pi} className="overflow-x-auto my-3">
                      <table className="w-full text-[11px]">
                        <thead>
                          <tr className="border-b border-[var(--color-border)]">
                            {headers.map((h, hi) => (
                              <th
                                key={hi}
                                className="text-left py-1.5 px-2 font-semibold text-[var(--color-text-tertiary)]"
                              >
                                {h}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {rows.map((row, ri) => (
                            <tr key={ri} className="border-b border-[var(--color-border)]/50">
                              {row.map((cell, ci) => (
                                <td
                                  key={ci}
                                  className="py-1.5 px-2 text-[var(--color-text-secondary)]"
                                >
                                  {cell}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  );
                }

                return renderParagraph(paragraph, section.citations, pi);
              })}
            </div>

            {/* End-of-section citation cards */}
            {section.citations.length > 0 && (
              <div className="mt-3 space-y-2">
                {section.citations.map((citation, ci) => {
                  const source = sources.find((s) => s.id === citation.sourceId);
                  return (
                    <div
                      key={ci}
                      className="flex gap-2.5 p-3 rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)]"
                    >
                      <Quote className="w-3.5 h-3.5 text-[var(--color-accent)] shrink-0 mt-0.5" />
                      <div>
                        <p className="text-[11px] text-[var(--color-text-secondary)] italic leading-relaxed">
                          &ldquo;{citation.quote}&rdquo;
                        </p>
                        {source && (
                          <button
                            onClick={() =>
                              dispatch({
                                type: 'SELECT_SOURCE',
                                payload: citation.sourceId,
                              })
                            }
                            className="mt-1.5 inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium bg-[var(--color-accent)]/10 text-[var(--color-accent)] hover:bg-[var(--color-accent)]/20 transition-colors"
                          >
                            {source.name}
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Share to Slack modal */}
      {showShareModal && (
        <ShareToSlackModal report={report} onClose={() => setShowShareModal(false)} />
      )}
    </div>
  );
}

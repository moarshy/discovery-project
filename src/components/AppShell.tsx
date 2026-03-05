import { type ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Layers, Puzzle, Zap, Activity, Brain, Settings, Sun, Moon } from 'lucide-react';
import { useApp } from '../store';
import { ProjectsList } from './ProjectsList';
import { ProjectWorkspace } from './ProjectWorkspace';
import { IntegrationsPage } from './IntegrationsPage';
import { SkillsPage } from './SkillsPage';
import { RunHistoryPage } from './RunHistoryPage';
import { CompanyMemoryPage } from './CompanyMemoryPage';
import type { Screen } from '../types';

function SidebarButton({
  icon,
  label,
  active,
  onClick,
}: {
  icon: ReactNode;
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`relative group p-2 rounded-lg transition-colors ${
        active
          ? 'bg-[var(--color-accent)]/15 text-[var(--color-accent)]'
          : 'text-[var(--color-text-tertiary)] hover:text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-elevated)]'
      }`}
    >
      {icon}
      <span className="pointer-events-none absolute left-full top-1/2 -translate-y-1/2 ml-2 px-2 py-1 rounded-md text-xs font-medium whitespace-nowrap bg-[var(--color-surface-elevated)] text-[var(--color-text-primary)] border border-[var(--color-border)] shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-150">
        {label}
      </span>
    </button>
  );
}

export function AppShell() {
  const { state, dispatch } = useApp();

  function handleNav(screen: Screen) {
    if (screen === 'projects') dispatch({ type: 'NAVIGATE_TO_PROJECTS' });
    else if (screen === 'integrations') dispatch({ type: 'NAVIGATE_TO_INTEGRATIONS' });
    else if (screen === 'skills') dispatch({ type: 'NAVIGATE_TO_SKILLS' });
    else if (screen === 'history') dispatch({ type: 'NAVIGATE_TO_HISTORY' });
    else if (screen === 'memory') dispatch({ type: 'NAVIGATE_TO_MEMORY' });
  }

  return (
    <div className="h-full flex flex-col bg-[var(--color-bg)]">
      {/* Title bar — drag region for Electron */}
      <div
        className="flex items-center h-11 px-4 border-b border-[var(--color-border)] bg-[var(--color-surface)] shrink-0"
        style={{ WebkitAppRegion: 'drag' } as React.CSSProperties}
      >
        {/* Traffic light spacer on macOS */}
        <div className="w-16 shrink-0" />
        <div className="flex items-center gap-2">
          <Layers className="w-4 h-4 text-[var(--color-accent)]" />
          <span className="text-sm font-semibold text-[var(--color-text-primary)]">
            Discovery
          </span>
        </div>
      </div>

      <div className="flex flex-1 min-h-0">
        {/* Sidebar */}
        <div className="w-12 shrink-0 border-r border-[var(--color-border)] bg-[var(--color-surface)] flex flex-col items-center py-3 gap-3">
          <SidebarButton
            icon={<Layers className="w-5 h-5" />}
            label="Projects"
            active={state.screen === 'projects' || state.screen === 'workspace'}
            onClick={() => handleNav('projects')}
          />
          <SidebarButton
            icon={<Puzzle className="w-5 h-5" />}
            label="Integrations"
            active={state.screen === 'integrations'}
            onClick={() => handleNav('integrations')}
          />
          <SidebarButton
            icon={<Zap className="w-5 h-5" />}
            label="Skills"
            active={state.screen === 'skills'}
            onClick={() => handleNav('skills')}
          />
          <SidebarButton
            icon={<Activity className="w-5 h-5" />}
            label="Run History"
            active={state.screen === 'history'}
            onClick={() => handleNav('history')}
          />
          <SidebarButton
            icon={<Brain className="w-5 h-5" />}
            label="Company Memory"
            active={state.screen === 'memory'}
            onClick={() => handleNav('memory')}
          />
          <div className="flex-1" />
          <SidebarButton
            icon={state.theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            label={state.theme === 'dark' ? 'Light mode' : 'Dark mode'}
            active={false}
            onClick={() => dispatch({ type: 'TOGGLE_THEME' })}
          />
          <SidebarButton
            icon={<Settings className="w-5 h-5" />}
            label="Settings"
            active={false}
            onClick={() => {}}
          />
        </div>

        {/* Main content */}
        <div className="flex-1 min-w-0">
          <AnimatePresence mode="wait">
            {state.screen === 'projects' && (
              <motion.div
                key="projects"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
                className="h-full"
              >
                <ProjectsList />
              </motion.div>
            )}
            {state.screen === 'workspace' && (
              <motion.div
                key="workspace"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.2 }}
                className="h-full"
              >
                <ProjectWorkspace />
              </motion.div>
            )}
            {state.screen === 'integrations' && (
              <motion.div
                key="integrations"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.2 }}
                className="h-full"
              >
                <IntegrationsPage />
              </motion.div>
            )}
            {state.screen === 'skills' && (
              <motion.div
                key="skills"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.2 }}
                className="h-full"
              >
                <SkillsPage />
              </motion.div>
            )}
            {state.screen === 'history' && (
              <motion.div
                key="history"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.2 }}
                className="h-full"
              >
                <RunHistoryPage />
              </motion.div>
            )}
            {state.screen === 'memory' && (
              <motion.div
                key="memory"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.2 }}
                className="h-full"
              >
                <CompanyMemoryPage />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

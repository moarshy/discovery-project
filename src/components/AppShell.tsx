import { motion, AnimatePresence } from 'framer-motion';
import { Layers, Puzzle, Zap, Activity, Settings, Sun, Moon } from 'lucide-react';
import { useApp } from '../store';
import { ProjectsList } from './ProjectsList';
import { ProjectWorkspace } from './ProjectWorkspace';
import { IntegrationsPage } from './IntegrationsPage';
import { SkillsPage } from './SkillsPage';
import { RunHistoryPage } from './RunHistoryPage';
import type { Screen } from '../types';

export function AppShell() {
  const { state, dispatch } = useApp();

  function handleNav(screen: Screen) {
    if (screen === 'projects') dispatch({ type: 'NAVIGATE_TO_PROJECTS' });
    else if (screen === 'integrations') dispatch({ type: 'NAVIGATE_TO_INTEGRATIONS' });
    else if (screen === 'skills') dispatch({ type: 'NAVIGATE_TO_SKILLS' });
    else if (screen === 'history') dispatch({ type: 'NAVIGATE_TO_HISTORY' });
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
          <button
            onClick={() => handleNav('projects')}
            className={`p-2 rounded-lg transition-colors ${
              state.screen === 'projects' || state.screen === 'workspace'
                ? 'bg-[var(--color-accent)]/15 text-[var(--color-accent)]'
                : 'text-[var(--color-text-tertiary)] hover:text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-elevated)]'
            }`}
            title="Projects"
          >
            <Layers className="w-5 h-5" />
          </button>
          <button
            onClick={() => handleNav('integrations')}
            className={`p-2 rounded-lg transition-colors ${
              state.screen === 'integrations'
                ? 'bg-[var(--color-accent)]/15 text-[var(--color-accent)]'
                : 'text-[var(--color-text-tertiary)] hover:text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-elevated)]'
            }`}
            title="Integrations"
          >
            <Puzzle className="w-5 h-5" />
          </button>
          <button
            onClick={() => handleNav('skills')}
            className={`p-2 rounded-lg transition-colors ${
              state.screen === 'skills'
                ? 'bg-[var(--color-accent)]/15 text-[var(--color-accent)]'
                : 'text-[var(--color-text-tertiary)] hover:text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-elevated)]'
            }`}
            title="Skills"
          >
            <Zap className="w-5 h-5" />
          </button>
          <button
            onClick={() => handleNav('history')}
            className={`p-2 rounded-lg transition-colors ${
              state.screen === 'history'
                ? 'bg-[var(--color-accent)]/15 text-[var(--color-accent)]'
                : 'text-[var(--color-text-tertiary)] hover:text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-elevated)]'
            }`}
            title="Run History"
          >
            <Activity className="w-5 h-5" />
          </button>
          <div className="flex-1" />
          <button
            onClick={() => dispatch({ type: 'TOGGLE_THEME' })}
            className="p-2 rounded-lg text-[var(--color-text-tertiary)] hover:text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-elevated)] transition-colors"
            title={state.theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {state.theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
          <button
            className="p-2 rounded-lg text-[var(--color-text-tertiary)] hover:text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-elevated)] transition-colors"
            title="Settings"
          >
            <Settings className="w-5 h-5" />
          </button>
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
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

import {
  FileText, ClipboardList, TrendingUp,
  Map, BookOpen, AlertTriangle, BarChart3, Target, FlaskConical, ListChecks,
  MessageSquareWarning, Repeat,
} from 'lucide-react';

export const outputIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  report: FileText,
  prd: ClipboardList,
  'business-case': TrendingUp,
  'vocabulary-map': Map,
  'brand-strategy': BookOpen,
  'tensions-report': AlertTriangle,
  'activation-report': BarChart3,
  'okr-report': Target,
  'experiment-report': FlaskConical,
  'progress-report': ListChecks,
  'cs-friction': MessageSquareWarning,
  'rebrand-readiness': Repeat,
};

import type { IntegrationId } from '../../types';
import { BrandDot } from '../shared/BrandMark';

interface IntegrationBadgeProps {
  integrationId?: IntegrationId;
}

export function IntegrationBadge({ integrationId }: IntegrationBadgeProps) {
  return <BrandDot id={integrationId} />;
}

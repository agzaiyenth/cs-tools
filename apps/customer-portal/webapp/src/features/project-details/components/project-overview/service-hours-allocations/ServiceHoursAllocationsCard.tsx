// Copyright (c) 2026 WSO2 LLC. (https://www.wso2.com).
//
// WSO2 LLC. licenses this file to you under the Apache License,
// Version 2.0 (the "License"); you may not use this file except
// in compliance with the License.
// You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing,
// software distributed under the License is distributed on an
// "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
// KIND, either express or implied.  See the License for the
// specific language governing permissions and limitations
// under the License.

import { Box, Card, CardContent, Skeleton, Typography } from "@wso2/oxygen-ui";
import { Clock } from "@wso2/oxygen-ui-icons-react";
import type { JSX } from "react";
import type { ProjectDetails } from "@features/project-hub/types/projects";
import {
  formatProjectDate,
  formatServiceHoursDecimalAsHrMin,
} from "@features/project-details/utils/projectDetails";
import ErrorIndicator from "@components/error-indicator/ErrorIndicator";

export interface ServiceHoursAllocationsCardProps {
  project?: ProjectDetails | null;
  isLoading?: boolean;
  isError?: boolean;
}

const NOT_AVAILABLE = "Not Available";

function formatHoursDisplay(
  consumed: number | undefined,
  total: number | undefined,
): string {
  if (consumed == null && total == null) return NOT_AVAILABLE;
  const c = Number(consumed ?? 0);
  const t = Number(total ?? 0);
  const pct = t === 0 ? 0 : Math.round((c / t) * 100);
  return `${formatServiceHoursDecimalAsHrMin(c)}/${formatServiceHoursDecimalAsHrMin(t)} (${pct}%)`;
}

/**
 * Query and onboarding hours summary for the project overview grid.
 *
 * @param props - Project payload and loading state.
 * @returns {JSX.Element} Service hours card.
 */
export default function ServiceHoursAllocationsCard({
  project,
  isLoading,
  isError,
}: ServiceHoursAllocationsCardProps): JSX.Element {
  const queryDisplay = formatHoursDisplay(
    project?.consumedQueryHours,
    project?.totalQueryHours,
  );
  const queryRemaining =
    project?.remainingQueryHours != null
      ? formatServiceHoursDecimalAsHrMin(project.remainingQueryHours)
      : NOT_AVAILABLE;

  const onboardingDisplay = formatHoursDisplay(
    project?.consumedOnboardingHours,
    project?.totalOnboardingHours,
  );
  const onboardingRemaining =
    project?.remainingOnboardingHours != null
      ? formatServiceHoursDecimalAsHrMin(project.remainingOnboardingHours)
      : NOT_AVAILABLE;
  const onboardingExpiry =
    project?.onboardingExpiryDate?.trim() && project.onboardingExpiryDate
      ? formatProjectDate(project.onboardingExpiryDate)
      : NOT_AVAILABLE;

  return (
    <Card sx={{ height: "100%" }}>
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
          <Clock size={20} aria-hidden />
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Service hours
          </Typography>
        </Box>
        {isLoading ? (
          <Skeleton variant="rounded" width="100%" height={120} />
        ) : isError ? (
          <ErrorIndicator entityName="service hours" />
        ) : (
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Box>
              <Typography variant="body2" color="text.secondary">
                Query hours
              </Typography>
              <Typography variant="body2">{queryDisplay}</Typography>
              <Typography variant="caption" color="text.secondary">
                Remaining: {queryRemaining}
              </Typography>
            </Box>
            <Box>
              <Typography variant="body2" color="text.secondary">
                Onboarding hours
              </Typography>
              <Typography variant="body2">{onboardingDisplay}</Typography>
              <Typography variant="caption" color="text.secondary">
                Remaining: {onboardingRemaining} · Expires {onboardingExpiry}
              </Typography>
            </Box>
          </Box>
        )}
      </CardContent>
    </Card>
  );
}

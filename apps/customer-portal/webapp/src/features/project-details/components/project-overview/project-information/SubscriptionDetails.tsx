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

import {
  Box,
  Chip,
  LinearProgress,
  Skeleton,
  Typography,
} from "@wso2/oxygen-ui";
import type { JSX } from "react";
import {
  SUBSCRIPTION_STATUS,
  type SubscriptionStatus,
} from "@features/project-details/constants/projectDetailsConstants";
import {
  calculateProgress,
  formatProjectDate,
  getSubscriptionColor,
  getSubscriptionStatus,
} from "@features/project-details/utils/projectDetails";

function subscriptionDateLabel(value: string | null | undefined): string {
  if (!value) return "--";
  const trimmed = value.trim();
  if (/^\d{4}-\d{2}-\d{2}/.test(trimmed)) {
    return formatProjectDate(trimmed);
  }
  return trimmed;
}

export interface SubscriptionDetailsProps {
  startDate?: string | null;
  endDate?: string | null;
  isLoading?: boolean;
}

/**
 * Subscription period, status chip, and progress for the overview card.
 *
 * @param props - ISO date strings from project payload.
 * @returns {JSX.Element} Subscription block.
 */
export default function SubscriptionDetails({
  startDate,
  endDate,
  isLoading,
}: SubscriptionDetailsProps): JSX.Element {
  if (isLoading) {
    return (
      <Box sx={{ pt: 2, borderTop: 1, borderColor: "divider" }}>
        <Skeleton variant="text" width="40%" height={24} sx={{ mb: 2 }} />
        <Skeleton variant="rounded" width="100%" height={8} sx={{ mb: 2 }} />
        <Box sx={{ display: "flex", gap: 4 }}>
          <Skeleton variant="text" width={120} />
          <Skeleton variant="text" width={120} />
        </Box>
      </Box>
    );
  }

  const startLabel = subscriptionDateLabel(startDate ?? "");
  const endLabel = subscriptionDateLabel(endDate ?? "");
  const status: SubscriptionStatus = getSubscriptionStatus(
    endDate ?? "",
    startDate ?? undefined,
  );
  const progress = calculateProgress(startDate ?? "", endDate ?? "");
  const chipColor = getSubscriptionColor(status);
  const isExpired = status === SUBSCRIPTION_STATUS.EXPIRED;

  return (
    <Box sx={{ pt: 2, borderTop: 1, borderColor: "divider" }}>
      <Typography variant="body2" fontWeight="medium" sx={{ mb: 1 }}>
        Subscription Period
      </Typography>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
        <Chip label={status} size="small" color={chipColor} variant="outlined" />
      </Box>
      <LinearProgress
        variant="determinate"
        value={Math.min(100, Math.max(0, progress))}
        color={isExpired ? "error" : "success"}
        sx={{ height: 8, mb: 2 }}
      />
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 3,
          justifyContent: "space-between",
        }}
      >
        <Box>
          <Typography variant="caption" color="text.secondary">
            Start
          </Typography>
          <Typography variant="body2">{startLabel}</Typography>
        </Box>
        <Box>
          <Typography variant="caption" color="text.secondary">
            End
          </Typography>
          <Typography variant="body2">{endLabel}</Typography>
        </Box>
      </Box>
      <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: "block" }}>
        {isExpired ? `Expired on ${endLabel}` : `Expires on ${endLabel}`}
      </Typography>
    </Box>
  );
}

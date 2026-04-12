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

import type { PaginationRequest } from "./common";

// Basic project definition returned in search list responses.
export type ProjectListItem = {
  id: string;
  name: string;
  key: string;
  createdOn: string;
  description: string;
  type?: {
    id: string;
    label: string;
  };
  hasAgent: boolean;
  hasKbReferences?: boolean;
  activeCasesCount: number;
  activeChatsCount: number;
  slaStatus: string;
}

/** Account nested in project details response. */
export type ProjectDetailsAccount = {
  id: string;
  hasAgent?: boolean;
  hasKbReferences?: boolean;
  name: string;
  activationDate?: string | null;
  deactivationDate?: string | null;
  supportTier?: string;
  region?: string | null;
  ownerEmail?: string | null;
  technicalOwnerEmail?: string | null;
}

/** Detailed project information including account/subscription details. */
export type ProjectDetails = {
  id: string;
  key: string;
  name: string;
  description: string;
  createdOn: string;
  hasAgent?: boolean;
  hasKbReferences?: boolean;
  type: {
    id: string;
    label: string;
  };
  sfId?: string;
  hasSr: boolean;
  startDate?: string;
  endDate?: string;
  account?: ProjectDetailsAccount;
  totalQueryHours?: number;
  consumedQueryHours?: number;
  remainingQueryHours?: number;
  goLiveDate?: string | null;
  goLivePlanDate?: string | null;
  totalOnboardingHours?: number;
  consumedOnboardingHours?: number;
  remainingOnboardingHours?: number;
  onboardingExpiryDate?: string | null;
  onboardingStatus?: string | null;
}

// Project Search Response.
export type SearchProjectsResponse = {
  offset: number;
  limit: number;
  projects: ProjectListItem[];
  totalRecords: number;
}

// Request body for searching projects.
export type SearchProjectsRequest = {
  filters?: {
    searchQuery?: string;
  };
  pagination?: PaginationRequest;
}

// Global metadata response.
export type PortalMetadataResponse = {
  timeZones: Array<{ id: string; label: string }>;
  featureFlags?: {
    usageMetricsEnabled: boolean;
  };
}

// Project support statistics.
export type ProjectSupportStats = {
  ongoingCases: number;
  resolvedPast30DaysCasesCount: number;
  resolvedChats: number;
  activeChats: number;
}

// Project Stats Response
export type ProjectStatsResponse = {
  projectStats: {
    openCases: number;
    activeChats: number;
    deployments: number;
    slaStatus: string;
  };
  recentActivity: {
    totalHours: number;
    billableHours: number;
    lastDeploymentOn: string;
    systemHealth?: string;
  };
}

// Request body for PATCH /projects/:id.
export type PatchProjectRequest = {
  hasAgent?: boolean;
  hasKbReferences?: boolean;
}

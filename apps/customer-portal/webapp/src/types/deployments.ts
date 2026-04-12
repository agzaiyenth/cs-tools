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

import type { IdLabelRef } from "./common";
import type { ProductUpdate } from "./products";

// Product deployed in an environment.
export type DeploymentProduct = {
  id: string;
  name: string;
  version: string;
  supportStatus: string;
  description: string;
  cores: number;
  tps: number;
  releasedDate: string;
  endOfLifeDate: string;
  updateLevel: string;
}

// Document attached to a deployment.
export type DeploymentDocument = {
  id: string;
  name: string;
  description?: string | null;
  category?: string;
  sizeBytes?: number;
  size?: number;
  uploadedAt?: string;
  createdOn?: string;
  uploadedBy?: string;
  createdBy?: string;
  content?: string | null;
  downloadUrl?: string;
}

/** Response for GET /deployments/:deploymentId/attachments. */
export type DeploymentAttachmentsResponse = {
  limit: number;
  offset: number;
  attachments: DeploymentDocument[];
  totalRecords: number;
}

// Response for POST /deployments/:deploymentId/attachments.
export type PostDeploymentAttachmentResponse = {
  id: string;
  createdBy: string;
  createdOn: string;
  downloadUrl: string;
  size: number;
}

// Single deployment environment.
export type Deployment = {
  id: string;
  name: string;
  status: "Healthy" | "Warning";
  url: string;
  version: string;
  description: string;
  products: DeploymentProduct[];
  documents: DeploymentDocument[];
  deployedAt: string;
  uptimePercent: number;
}

export type ProjectDeploymentsListResponse = {
  deployments: ProjectDeploymentItem[];
  totalRecords?: number;
  offset?: number;
  limit?: number;
}

// Single item from GET /projects/:projectId/deployments (array response).
export type ProjectDeploymentItem = {
  id: string;
  name: string;
  createdOn: string;
  updatedOn: string;
  description: string | null;
  url: string | null;
  project: IdLabelRef;
  type: IdLabelRef;
  deployedProductCount?: number;
  instanceCount?: number;
}

// Response for GET /deployments/:deploymentId/products (paginated).
export type DeployedProductsResponse = {
  deployedProducts: DeploymentProductItem[];
  totalRecords: number;
  offset: number;
  limit: number;
}

/**
 * Union type for the deployment products endpoint response.
 * Some backend versions return a paginated object, others return a plain array.
 */
export type DeployedProductsResponsePayload =
  | DeploymentProductItem[]
  | DeployedProductsResponse;

/**
 * Type guard for DeployedProductsResponse.
 */
export function isDeployedProductsResponse(
  payload: unknown,
): payload is DeployedProductsResponse {
  return (
    typeof payload === "object" &&
    payload !== null &&
    Array.isArray((payload as { deployedProducts?: unknown }).deployedProducts)
  );
}

// Single item from GET /deployments/:deploymentId/products (array response).
export type DeploymentProductItem = {
  id: string;
  createdOn: string;
  updatedOn: string;
  description: string | null;
  product: IdLabelRef;
  deployment: IdLabelRef;
  version?: IdLabelRef | string | null;
  cores?: number | null;
  tps?: number | null;
  releasedOn?: string | null;
  endOfLifeOn?: string | null;
  updates?: ProductUpdate[] | null;
  instanceCount?: number;
  instances?: Array<{
    id: string;
    instance: string;
    coreUsageCount?: number | null;
    updates?: number | null;
    jdkVersion?: string | null;
    createdOn?: string | null;
    updatedOn?: string | null;
    customCreatedOn?: string | null;
    customUpdatedOn?: string | null;
  }> | null;
}

// Response for creating a deployment.
export type CreateDeploymentResponse = {
  createdBy: string;
  createdOn: string;
  id: string;
}

// Subscription data within license response.
export type SubscriptionData = {
  deploymentId: string;
  deploymentName: string;
  subscriptionKey: string;
  clientId: string;
  clientSecret: string;
  secrets: string;
}

// License response from POST /projects/:projectId/deployments/:deploymentId/license.
export type DeploymentLicense = {
  subscriptionData: SubscriptionData;
  signature: string;
}

// Request body for posting a deployment attachment (POST /deployments/:deploymentId/attachments).
export type PostDeploymentAttachmentRequest = {
  name: string;
  type: string;
  content: string;
  description?: string;
}

// Request body for PATCH /deployments/:deploymentId/products/:productId.
export type PatchDeploymentProductRequest = {
  cores?: number;
  tps?: number;
  description?: string;
  active?: boolean;
  updates?: Array<{
    date: string;
    details?: string;
    updateLevel: number;
  }>;
}

// Request body for POST /deployments/:deploymentId/products.
export type PostDeploymentProductRequest = {
  productId: string;
  versionId: string;
  projectId: string;
  cores?: number;
  tps?: number;
  description?: string;
}

// Request body for creating a deployment.
export type CreateDeploymentRequest = {
  deploymentTypeKey: number;
  description: string;
  name: string;
}

// Request body for PATCH /projects/:projectId/deployments/:deploymentId.
export type PatchDeploymentRequest = {
  active?: boolean;
  description?: string;
  name?: string;
  typeKey?: number;
}

export type ConsumptionFilter = {
  include?: boolean;
  startDate?: string;
  endDate?: string;
}

// Request payload for searching deployments (POST /projects/:projectId/deployments/search).
export type DeploymentSearchRequest = {
  filters?: {
    consumption?: ConsumptionFilter;
  };
  pagination?: {
    limit?: number;
    offset?: number;
  };
}

// Request payload for searching deployed products (POST /deployments/:deploymentId/products/search).
export type DeployedProductSearchRequest = {
  filters?: {
    consumption?: ConsumptionFilter;
  };
  pagination?: {
    limit?: number;
    offset?: number;
  };
}

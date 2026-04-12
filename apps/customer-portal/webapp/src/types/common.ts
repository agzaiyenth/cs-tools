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

// Id/label reference used across many API responses.
// Mirrors the backend `ReferenceItem` record. Optional `number`, `count`,
// and `abbreviation` are included because the backend returns them on the
// same shape for specific endpoints.
export type IdLabelRef = {
  id: string;
  label: string;
  count?: number;
  number?: string | null;
  abbreviation?: string | null;
};

// Metadata item (status, severity, type, etc.).
export type MetadataItem = {
  id: string;
  label: string;
};

export type TrendData = {
  value: string;
  direction: "up" | "down";
  color: "success" | "error" | "info" | "warning";
};

// Pagination metadata for search requests.
export type PaginationRequest = {
  offset?: number;
  limit?: number;
};

// Pagination metadata echoed back on list responses.
export type PaginationResponse = {
  offset: number;
  limit: number;
  totalRecords: number;
};

// Sort order used in list/search request payloads.
export type SortOrder = "asc" | "desc";

// Sort-by clause used in list/search request payloads.
export type SortBy = {
  field: string;
  order: SortOrder;
};

/** Object type where at least one key from T is required. */
export type AtLeastOne<
  T,
  Keys extends keyof T = keyof T,
> = Keys extends keyof T
  ? Required<Pick<T, Keys>> & Partial<Omit<T, Keys>>
  : never;

/** Shared env context for conversations and case classification APIs. */
export type SharedEnvContext = {
  envProducts: Record<string, string[]>;
  region: string;
  tier: string;
}

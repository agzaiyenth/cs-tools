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

// Registry token from POST /projects/projectId/registry-tokens/search.
export type RegistryToken = {
  id?: number;
  name: string;
  displayName?: string;
  description: string;
  creationTime?: string;
  tokenType?: "User" | "Service";
  createdFor?: string;
  createdBy?: string;
  expiresAt?: number;
  disable?: boolean;
  duration?: number;
  permissions?: { namespace: string }[];
}

// Response for POST /projects/projectId/registry-tokens (create token).
export type RegistryTokenCreationResponse = {
  secret: string;
}

// Request body for creating a registry token (POST /projects/:projectId/registry-tokens).
export type CreateRegistryTokenRequest = {
  robotName: string;
  tokenType: "User" | "Service";
  createdFor?: string;
}

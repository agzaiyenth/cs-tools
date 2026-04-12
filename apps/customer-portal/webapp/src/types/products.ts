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

// Product from GET /products.
export type ProductItem = {
  id: string;
  label?: string;
  name?: string;
  class?: string;
}

// Product version from POST /products/:productId/versions/search.
export type ProductVersionItem = {
  id: string;
  version: string;
  currentSupportStatus?: string | null;
  releaseDate?: string;
  supportEolDate?: string;
  earliestPossibleSupportEolDate?: string;
  product?: { id: string; label: string };
}

export type ProductsResponse = {
  products: ProductItem[];
  totalRecords: number;
  offset: number;
  limit: number;
}

export type ProductVersionsSearchResponse = {
  versions: ProductVersionItem[];
  totalRecords: number;
  offset: number;
  limit: number;
}

export type ProductUpdate = {
  updateLevel: number;
  date: string;
  details?: string | null;
}

// Request body for POST /products/:productId/versions/search.
export type ProductVersionsSearchRequest = {
  pagination?: { limit?: number; offset?: number };
}

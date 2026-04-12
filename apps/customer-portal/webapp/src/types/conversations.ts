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

import type { CaseCommentInlineAttachment } from "./attachments";
import type { IdLabelRef, PaginationRequest, SharedEnvContext, SortBy } from "./common";

// Chat history list item (support chat session summary).
export type ChatHistoryItem = {
  chatId: string;
  chatNumber?: string;
  title: string;
  startedTime: string;
  messages: number;
  kbArticles: number;
  status: string;
}

// Response for project chat history list.
export type ChatHistoryResponse = {
  chatHistory: ChatHistoryItem[];
}

// Conversation statistics response.
export type ConversationStats = {
  abandonedCount: number;
  openCount: number;
  resolvedCount: number;
}

// Conversation from POST /projects/:projectId/conversations/search.
// Backend: modules/types/types.bal `Conversation` — project/case/state all
// nullable, number and initialMessage also nullable.
export type Conversation = {
  id: string;
  number: string | null;
  initialMessage: string | null;
  messageCount: number;
  createdOn: string;
  createdBy: string;
  project: IdLabelRef | null;
  case: IdLabelRef | null;
  state: IdLabelRef | null;
}

// Response for conversations search.
export type ConversationSearchResponse = {
  conversations: Conversation[];
  totalRecords: number;
  offset: number;
  limit: number;
}

export type ConversationMessage = {
  id: string;
  content: string;
  type: string;
  createdOn: string;
  createdBy: string;
  isEscalated: boolean;
  hasInlineAttachments: boolean;
  inlineAttachments: CaseCommentInlineAttachment[];
}

export type ConversationMessagesResponse = {
  comments: ConversationMessage[];
  totalRecords: number;
  offset: number;
  limit: number;
}

// Filter values for conversations search (state filter uses statuses from filters API).
export type AllConversationsFilterValues = {
  stateId?: string;
}

/** Slot option definition for select-type user input collection. */
export type SelectSlotOption = {
  slot: string;
  label: string;
  options: string[];
  type: "select";
}

/** Slot option definition for free-text user input collection. */
export type TextSlotOption = {
  slot: string;
  label: string;
  type: "text";
  freeText?: true;
}

/** Slot option union for user input collection. */
export type SlotOption = SelectSlotOption | TextSlotOption;

/** Slot state containing filled/missing slots and available options. */
export type SlotState = {
  intentId?: string;
  filledSlots?: Record<string, string>;
  missingSlots?: string[];
  isComplete?: boolean;
  slotOptions?: SlotOption[];
}

/** Intent information from conversation response. */
export type ConversationIntent = {
  intentId?: string;
  intentLabel?: string;
  confidence?: number;
  severity?: string;
  caseType?: string;
}

/** Response from POST /projects/:projectId/conversations (Novera chat). */
export type ConversationResponse = {
  message: string;
  sessionId: string;
  conversationId: string;
  intent?: ConversationIntent;
  slotState?: SlotState;
  actions: unknown;
  recommendations?: {
    query: string;
    recommendations: Array<{ title: string; articleId: string; score: number }>;
  } | null;
  resolved: unknown;
}

// Request body for POST /projects/:projectId/conversations/search.
export type ConversationSearchRequest = {
  filters?: {
    searchQuery?: string;
    stateKeys?: number[];
    createdByMe?: boolean;
  };
  pagination: PaginationRequest;
  sortBy?: SortBy;
}

// Request body for POST /projects/:projectId/conversations (Novera chat).
export type ConversationRequest = SharedEnvContext & {
  message: string;
}

// --- Chat UI types (from former chatTypes.ts) ---

export type ChatSender = "user" | "bot";

export type Recommendation = {
  title: string;
  articleId: string;
  score: number;
}

export type Message = {
  id: string;
  text: string;
  sender: ChatSender;
  timestamp: Date;
  showCreateCaseAction?: boolean;
  isLoading?: boolean;
  isError?: boolean;
  slotState?: SlotState;
  recommendations?: Recommendation[];
  thinkingSteps?: string[];
  thinkingLabel?: string | null;
  isStreaming?: boolean;
}

export type ChatNavState = {
  initialUserMessage?: string;
  conversationResponse?: ConversationResponse;
  initialEnvProducts?: Record<string, string[]>;
  accountId?: string;
  chatNumber?: string;
}

export type ChatWebSocketEvent = {
  type: string;
  [key: string]: unknown;
}

export type ChatWebSocketPayload = {
  type: "user_message";
  accountId: string;
  conversationId: string;
  message: string;
  envProducts: Record<string, string[]>;
}

export type UseChatWebSocketOptions = {
  onEvent: (event: ChatWebSocketEvent) => void;
  onClose?: () => void;
  onError?: (message: string) => void;
}

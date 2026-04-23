# Updates — Stat Card Value Calculations

All stat card values are derived from the `GET /recommendations` API response, which returns an array of `RecommendedUpdateLevelItem` objects (one per tracked product). The aggregation is performed in `aggregateUpdateStats()` (`utils/updates.ts`).

---

## Overall Update Status (top stat cards)

| Card | Value | Source fields |
|---|---|---|
| **Products Tracked** | `data.length` | Number of items in the response array |
| **Total Updates Installed** | `Σ (installedUpdatesCount + installedSecurityUpdatesCount)` | Summed across all products |
| **Total Updates Pending** | `Σ (availableUpdatesCount + availableSecurityUpdatesCount)` | Summed across all products |
| **Security Updates Pending** | `Σ availableSecurityUpdatesCount` | Summed across all products |

### Breakdowns

- **Installed breakdown** — Regular: `Σ installedUpdatesCount` · Security: `Σ installedSecurityUpdatesCount`
- **Pending breakdown** — Regular: `Σ availableUpdatesCount` · Security: `Σ availableSecurityUpdatesCount`

---

## Per-product Update Cards (Update Details section)

Each card maps to one `RecommendedUpdateLevelItem`.

| Field | Value | Source field |
|---|---|---|
| **Current Level** | `endingUpdateLevel` | Highest update level currently installed |
| **Latest Level** | `recommendedUpdateLevel` | Latest available level for the product's channel |
| **Pending Levels** | `recommendedUpdateLevel − endingUpdateLevel` | Computed |
| **Installed** total | `installedUpdatesCount + installedSecurityUpdatesCount` | Per item |
| **Installed** breakdown | `{R}R • {S}S` | R = `installedUpdatesCount`, S = `installedSecurityUpdatesCount` |
| **Pending** total | `availableUpdatesCount + availableSecurityUpdatesCount` | Per item |
| **Pending** breakdown | `{R}R • {S}S` | R = `availableUpdatesCount`, S = `availableSecurityUpdatesCount` |

### Click navigation

Clicking a section navigates to `/projects/{projectId}/updates/pending` with the following query params:

| Section clicked | `startingUpdateLevel` | `endingUpdateLevel` |
|---|---|---|
| **Installed** | `item.startingUpdateLevel` | `item.endingUpdateLevel` |
| **Pending** | `item.endingUpdateLevel` | `item.recommendedUpdateLevel` |

`productName` and `productBaseVersion` are always included in the query params.

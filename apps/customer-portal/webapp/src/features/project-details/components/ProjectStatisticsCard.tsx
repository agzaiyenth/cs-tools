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
  Card,
  CardContent,
  Typography,
  Grid,
  Box,
  StatCard,
  Divider,
  Skeleton,
} from "@wso2/oxygen-ui";
import { Activity } from "@wso2/oxygen-ui-icons-react";
import type { JSX } from "react";

import { statItems } from "@features/project-details/constants/projectDetailsConstants";
import type { ProjectStatisticsCardProps } from "@features/project-details/types/projectDetailsComponents";

const SKELETON_COUNT = 9;

const StatCardSkeleton = ({ gridSize }: { gridSize: object }): JSX.Element => (
  <Grid size={gridSize} sx={{ display: "flex" }}>
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
        p: 2,
        border: 1,
        borderColor: "divider",
        borderRadius: 2,
        gap: 2,
      }}
    >
      <Box sx={{ flex: 1 }}>
        <Skeleton variant="text" width="60%" height={16} sx={{ mb: 1 }} />
        <Skeleton variant="rounded" width={48} height={28} />
      </Box>
      <Skeleton variant="circular" width={40} height={40} />
    </Box>
  </Grid>
);

const ProjectStatisticsCard = ({
  stats,
  isLoading,
  isError,
  isSidebarOpen = false,
  showDeploymentsStat = true,
}: ProjectStatisticsCardProps): JSX.Element => {
  const gridSize = isSidebarOpen ? { xs: 12, xl: 4 } : { xs: 12, sm: 6, lg: 4 };
  const visibleStats = showDeploymentsStat
    ? statItems
    : statItems.filter((s) => s.key !== "deployments");
  const isStatLoading = isLoading || (!isError && !stats);
  return (
    <Card sx={{ height: "100%" }}>
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Activity size={20} />
          <Typography variant="h6">Project Statistics</Typography>
        </Box>
        <Divider sx={{ mb: 3, pb: 2 }} />

        <Grid container spacing={2} sx={{ alignItems: "stretch" }}>
          {isStatLoading
            ? Array.from({ length: SKELETON_COUNT }).map((_, i) => (
                <StatCardSkeleton key={i} gridSize={gridSize} />
              ))
            : visibleStats.map((stat) => {
                const StatIcon = stat.icon;
                return (
                  <Grid size={gridSize} key={stat.label} sx={{ display: "flex" }}>
                    <StatCard
                      label={stat.label}
                      value={isError ? "Error" : (stats?.[stat.key] ?? "--").toString()}
                      icon={<StatIcon size={24} />}
                      iconColor={stat.iconColor}
                      sx={{ width: "100%" }}
                    />
                  </Grid>
                );
              })}
        </Grid>
      </CardContent>
    </Card>
  );
};

export default ProjectStatisticsCard;

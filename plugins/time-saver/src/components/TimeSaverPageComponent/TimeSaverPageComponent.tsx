/*
 * Copyright 2024 The Backstage Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import React, { useState } from 'react';
import { Typography, Grid, Tabs, Tab, Divider, Paper } from '@material-ui/core';
import {
  InfoCard,
  Page,
  Content,
  ContentHeader,
  SupportButton,
} from '@backstage/core-components';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon';
import { AllStatsBarChart } from '../AllStatsBarChartComponent/AllStatsBarChartComponent';
import { ByTeamBarChart } from '../ByTeamBarCharComponent/ByTeamBarChartComponent';
import { GroupDivisionPieChart } from '../GroupDivisionPieChartComponent/GroupDivisionPieChartComponent';
import { DailyTimeSummaryLineChartTeamWise } from '../TeamWiseDailyTimeLinearComponent/TeamWiseDailyTimeLinearComponent';
import { TeamWiseTimeSummaryLinearChart } from '../TeamWiseTimeSummaryLinearComponent/TeamWiseTimeSummaryLinearComponent';
import TeamSelector from '../TeamSelectorComponent/TeamSelectorComponent';
import { DailyTimeSummaryLineChartTemplateWise } from '../TemplateWiseDailyTimeLinearComponent/TemplateWiseWiseDailyTimeLinearComponent';
import { TemplateWiseTimeSummaryLinearChart } from '../TemplateWiseTimeSummaryLinearComponent/TemplateWiseTimeSummaryLinearComponent';
import TemplateAutocomplete from '../TemplateAutocompleteComponent/TemplateAutocompleteComponent';
import { ByTemplateBarChart } from '../ByTemplateBarCharComponent/ByTemplateBarChartComponent';
import StatsTable from '../Table/StatsTable';
import { TemplateCountGauge } from '../Gauge/TemplatesTaskCountGauge';
import { TimeSavedGauge } from '../Gauge/TimeSavedGauge';
import { TeamsGauge } from '../Gauge/TeamsGauge';
import { TemplatesGauge } from '../Gauge/TemplatesGauge';
import { EmptyTimeSaver } from '../Gauge/EmptyDbContent';
import {
  DateFiltersComponent,
  IFilterDates,
} from '../DateFiltersComponent/DateFiltersComponent';
import CustomHeader, {
  HeaderProps,
} from '../TimeSaverHeader/TimeSaverHeaderComponent';
import { configApiRef, useApi } from '@backstage/core-plugin-api';

const GaugesContainer = ({
  dates,
  hoursPerDay,
}: {
  dates: IFilterDates;
  hoursPerDay: number;
}) => (
  <Grid
    container
    spacing={4}
    direction="row"
    justifyContent="space-between"
    alignItems="center"
    style={{
      marginTop: '12px',
      marginBottom: '12px',
    }}
  >
    <Grid item xs={6} sm={6} md={2}>
      <Paper elevation={0}>
        <TemplateCountGauge dates={dates} />
      </Paper>
    </Grid>
    <Grid item xs={6} sm={6} md={2}>
      <Paper elevation={0}>
        <TimeSavedGauge heading="Time Saved [hours]" dates={dates} />
      </Paper>
    </Grid>
    <Grid item xs={6} sm={6} md={2}>
      <Paper elevation={0}>
        <TimeSavedGauge
          number={hoursPerDay}
          heading="Time Saved [days]"
          dates={dates}
        />
      </Paper>
    </Grid>
    <Grid item xs={6} sm={6} md={2}>
      <Paper elevation={0}>
        <TeamsGauge dates={dates} />
      </Paper>
    </Grid>
    <Grid item xs={6} sm={6} md={2}>
      <Paper elevation={0}>
        <TemplatesGauge dates={dates} />
      </Paper>
    </Grid>
  </Grid>
);

export const TimeSaverPageComponent = (props: HeaderProps) => {
  const configApi = useApi(configApiRef);
  const hoursPerDay =
    configApi.getOptionalNumber('ts.frontend.table.hoursPerDay') ?? 8;

  const [selectedTab, setSelectedTab] = useState(0);
  const [selectedTeam, setSelectedTeam] = useState('');
  const [template, setTemplate] = useState('');

  const handleChange = (
    _event: unknown,
    _newValue: React.SetStateAction<number>,
  ) => {
    setSelectedTab(_newValue);
  };
  // TODO : Define / create _event type

  const handleTeamChange = (team: string) => {
    setSelectedTeam(team);
  };

  const handleTemplateChange = (templateUsed: string) => {
    setTemplate(templateUsed);
  };

  const handleClearTeam = () => {
    setSelectedTeam('');
  };

  return (
    <LocalizationProvider dateAdapter={AdapterLuxon}>
      <Page themeId="tool">
        <CustomHeader
          title={props.title}
          subtitle={props.subtitle}
          headerLabel={props.headerLabel}
        />
        <Content>
          <ContentHeader title="Time Saver">
            <Tabs value={selectedTab} onChange={handleChange} centered={false}>
              <Tab label="All Stats" />
              <Tab label="By Team" />
              <Tab label="By Template" />
            </Tabs>
            <SupportButton>
              Time Saver plugin retrieves its config from template.metadata and
              groups it in a dedicated table, then it has a bunch of APIs for
              data queries
            </SupportButton>
          </ContentHeader>
          <EmptyTimeSaver />

          <Grid container spacing={3} direction="column">
            <Grid item>
              <InfoCard title="Time statistics that you have saved using Backstage Templates">
                <Typography variant="body1">
                  <Grid container spacing={3}>
                    <Grid item xs={12}>
                      <DateFiltersComponent>
                        {dates => (
                          <>
                            {selectedTab === 0 && (
                              <Grid container spacing={2}>
                                <GaugesContainer
                                  dates={dates}
                                  hoursPerDay={hoursPerDay}
                                />
                                <Divider variant="fullWidth" />
                                <Grid xs={6}>
                                  <AllStatsBarChart dates={dates} />
                                </Grid>
                                <Grid xs={6}>
                                  <StatsTable dates={dates} />
                                </Grid>
                                <Grid xs={6}>
                                  <DailyTimeSummaryLineChartTeamWise
                                    dates={dates}
                                  />
                                </Grid>
                                <Grid xs={6}>
                                  <TeamWiseTimeSummaryLinearChart
                                    dates={dates}
                                  />
                                </Grid>
                                <Grid xs={6}>
                                  <GroupDivisionPieChart dates={dates} />
                                </Grid>
                              </Grid>
                            )}
                            {selectedTab === 1 && (
                              <Grid container spacing={3}>
                                <Grid xs={12}>
                                  <Grid xs={6}>
                                    <TeamSelector
                                      onTeamChange={handleTeamChange}
                                      onClearButtonClick={handleClearTeam}
                                    />
                                    <Divider orientation="vertical" />
                                  </Grid>
                                </Grid>
                                <Grid xs={6}>
                                  <ByTeamBarChart
                                    team={selectedTeam}
                                    dates={dates}
                                  />
                                </Grid>
                                <Grid xs={6}>
                                  <StatsTable
                                    team={selectedTeam}
                                    dates={dates}
                                  />
                                </Grid>
                                <Grid xs={6}>
                                  <DailyTimeSummaryLineChartTeamWise
                                    team={selectedTeam}
                                    dates={dates}
                                  />
                                </Grid>
                                <Grid xs={6}>
                                  <TeamWiseTimeSummaryLinearChart
                                    team={selectedTeam}
                                    dates={dates}
                                  />
                                </Grid>
                              </Grid>
                            )}
                            {selectedTab === 2 && (
                              <Grid container spacing={3}>
                                <Grid xs={12}>
                                  <Grid xs={6}>
                                    <TemplateAutocomplete
                                      onTemplateChange={handleTemplateChange}
                                    />
                                  </Grid>
                                </Grid>
                                <Grid xs={6}>
                                  <ByTemplateBarChart
                                    templateName={template}
                                    dates={dates}
                                  />
                                </Grid>
                                <Grid xs={6}>
                                  <StatsTable
                                    templateName={template}
                                    dates={dates}
                                  />
                                </Grid>
                                <Grid xs={6}>
                                  <DailyTimeSummaryLineChartTemplateWise
                                    templateName={template}
                                    dates={dates}
                                  />
                                </Grid>
                                <Grid xs={6}>
                                  <TemplateWiseTimeSummaryLinearChart
                                    templateName={template}
                                    dates={dates}
                                  />
                                </Grid>
                              </Grid>
                            )}
                          </>
                        )}
                      </DateFiltersComponent>
                    </Grid>
                  </Grid>
                </Typography>
              </InfoCard>
            </Grid>
          </Grid>
        </Content>
      </Page>
    </LocalizationProvider>
  );
};

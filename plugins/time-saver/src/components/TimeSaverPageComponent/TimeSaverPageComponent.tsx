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
  Header,
  Page,
  Content,
  ContentHeader,
  HeaderLabel,
  SupportButton,
} from '@backstage/core-components';
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
//  Translation
import { useTranslationRef } from '@backstage/core-plugin-api/alpha';
import { TimeSaverTranslationRef } from '../../translationRef';

const { t } = useTranslationRef(TimeSaverTranslationRef);

export const TimeSaverPageComponent = () => {
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

  const GaugesContainer = (
    <Grid
      container
      spacing={4}
      direction="row"
      justifyContent="space-between"
      alignItems="center"
    >
      <Grid item xs={2}>
        <Paper elevation={0}>
          <TemplateCountGauge />
        </Paper>
      </Grid>
      <Grid item xs={2}>
        <Paper elevation={0}>
          <TimeSavedGauge heading={t('TimeSaverPageComponent.GaugesContainer.hoursTimeSavedGauge')} />
        </Paper>
      </Grid>
      <Grid item xs={2}>
        <Paper elevation={0}>
          <TimeSavedGauge number={8} heading={t('TimeSaverPageComponent.GaugesContainer.daysTimeSavedGauge')} />
        </Paper>
      </Grid>
      <Grid item xs={2}>
        <Paper elevation={0}>
          <TeamsGauge />
        </Paper>
      </Grid>
      <Grid item xs={2}>
        <Paper elevation={0}>
          <TemplatesGauge />
        </Paper>
      </Grid>
    </Grid>
  );

  return (
    <Page themeId="tool">
      <Header
        title={t('TimeSaverPageComponent.GaugesContainer.page.header.title')}
        subtitle={t('TimeSaverPageComponent.GaugesContainer.page.header.subtitle')}
      >
        <HeaderLabel label={t('TimeSaverPageComponent.GaugesContainer.page.header.ownerHeaderLabel.label')} value="Rackspace" />
        <HeaderLabel label={t('TimeSaverPageComponent.GaugesContainer.page.header.lifecycleHeaderLabel.label')} value="experimental" />
      </Header>
      <Content>
        <ContentHeader title={t('TimeSaverPageComponent.GaugesContainer.page.content.header.title')}>
          <Tabs value={selectedTab} onChange={handleChange} centered={false}>
            <Tab label={t('TimeSaverPageComponent.GaugesContainer.page.content.header.tabs.allStatsTab.label')} />
            <Tab label={t('TimeSaverPageComponent.GaugesContainer.page.content.header.tabs.byTeamTab.label')} />
            <Tab label={t('TimeSaverPageComponent.GaugesContainer.page.content.header.tabs.byTemplateTab.label')} />
          </Tabs>
          <SupportButton>
          {t('TimeSaverPageComponent.GaugesContainer.page.content.header.SupportButton')}
          </SupportButton>
        </ContentHeader>
        <EmptyTimeSaver />
        <Grid container spacing={3} direction="column">
          <Grid item>
            <InfoCard title={t('TimeSaverPageComponent.GaugesContainer.page.content.body.InfoCard.title')}>
              <Typography variant="body1">
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    {selectedTab === 0 && (
                      <Grid container spacing={2}>
                        {GaugesContainer}
                        <Divider variant="fullWidth" />
                        <Grid xs={6}>
                          <AllStatsBarChart />
                        </Grid>
                        <Grid xs={6}>
                          <StatsTable />
                        </Grid>
                        <Grid xs={6}>
                          <DailyTimeSummaryLineChartTeamWise />
                        </Grid>
                        <Grid xs={6}>
                          <TeamWiseTimeSummaryLinearChart />
                        </Grid>
                        <Grid xs={6}>
                          <GroupDivisionPieChart />
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
                          <ByTeamBarChart team={selectedTeam} />
                        </Grid>{' '}
                        <Grid xs={6}>
                          <StatsTable team={selectedTeam} />
                        </Grid>
                        <Grid xs={6}>
                          <DailyTimeSummaryLineChartTeamWise
                            team={selectedTeam}
                          />
                        </Grid>
                        <Grid xs={6}>
                          <TeamWiseTimeSummaryLinearChart team={selectedTeam} />
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
                          <ByTemplateBarChart template_name={template} />
                        </Grid>
                        <Grid xs={6}>
                          <StatsTable template_name={template} />
                        </Grid>
                        <Grid xs={6}>
                          <DailyTimeSummaryLineChartTemplateWise
                            template_name={template}
                          />
                        </Grid>
                        <Grid xs={6}>
                          <TemplateWiseTimeSummaryLinearChart
                            template_name={template}
                          />
                        </Grid>
                      </Grid>
                    )}
                  </Grid>
                </Grid>
              </Typography>
            </InfoCard>
          </Grid>
        </Grid>
      </Content>
    </Page>
  );
};

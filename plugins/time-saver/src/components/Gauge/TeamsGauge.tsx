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
import React, { useEffect, useState } from 'react';
import { configApiRef, useApi } from '@backstage/core-plugin-api';
import CircularProgress from '@material-ui/core/CircularProgress';
import Gauge from './Gauge';
import { fetchWithCredentials } from '../utils';
//  Translation
import { useTranslationRef } from '@backstage/core-plugin-api/alpha';
import { TimeSaverTranslationRef } from '../../translationRef';

const { t } = useTranslationRef(TimeSaverTranslationRef);

type GroupsResponse = {
  groups: string[];
};

export function TeamsGauge(): React.ReactElement {
  const configApi = useApi(configApiRef);
  const [data, setData] = useState<GroupsResponse | null>(null);

  useEffect(() => {
    const url = `${configApi.getString(
      'backend.baseUrl',
    )}/api/time-saver/groups`;

    fetchWithCredentials(url)
      .then(response => response.json())
      .then(dt => setData(dt))
      .catch();
  }, [configApi]);

  if (!data) {
    return <CircularProgress />;
  }

  return <Gauge number={data.groups.length} heading={t('Gauge.TeamsGauge.gaugeHeading')} />;
}

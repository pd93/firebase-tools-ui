/**
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import '../index.scss';
import './index.scss';

import { Icon } from '@rmwc/icon';
import { IconButton } from '@rmwc/icon-button';
import React from 'react';
import { Link } from 'react-router-dom';

import { CustomThemeProvider } from '../../../../themes';
import { OutcomeData } from '../types';

const RequestDetailsHeader: React.FC<{
  requestTimeComplete: string | undefined;
  requestTimeFromNow: string | undefined;
  requestMethod: string | undefined;
  resourcePath: string | undefined;
  outcomeData: OutcomeData | undefined;
  setShowCopyNotification: (value: boolean) => void;
}> = ({
  requestTimeComplete,
  requestTimeFromNow,
  requestMethod,
  resourcePath,
  outcomeData,
  setShowCopyNotification,
}) => (
  <div className="Firestore-Request-Details-Header">
    <div
      className="Firestore-Request-Details-Header-Return"
      title="Go back to Table"
    >
      <IconButton icon="arrow_back_ios" tag={Link} to="/firestore/requests" />
    </div>
    <div className="Firestore-Request-Details-Header-Info">
      <CustomThemeProvider use={outcomeData?.theme || 'note'} wrap>
        <div className="Firestore-Request-Outcome" title={outcomeData?.label}>
          {outcomeData?.icon && (
            <Icon icon={{ icon: outcomeData?.icon, size: 'large' }} />
          )}
        </div>
      </CustomThemeProvider>
      <div className="Firestore-Request-Method">{requestMethod}</div>
      <div className="Firestore-Request-Path" title={resourcePath}>
        {resourcePath && (
          <div className="Firestore-Request-Path-Container">
            <div>{resourcePath}</div>
            <IconButton
              icon="content_copy"
              onClick={(event: React.MouseEvent<HTMLElement>) => {
                event.preventDefault();
                event.stopPropagation();
                navigator.clipboard.writeText(resourcePath.replace(/\s/g, ''));
                setShowCopyNotification(true);
              }}
              title="Copy Path"
            />
          </div>
        )}
      </div>
      <div className="Firestore-Request-Date" title={requestTimeComplete}>
        {requestTimeFromNow}
      </div>
    </div>
  </div>
);

export default RequestDetailsHeader;

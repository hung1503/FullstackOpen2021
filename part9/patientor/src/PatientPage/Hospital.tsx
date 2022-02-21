import React from 'react';
import { HospitalEntry } from '../types';
import { Icon, Card } from 'semantic-ui-react';

const Hospital: React.FC<{ entry: HospitalEntry }> = ({ entry }) => (
  <div>
    <Card>
      <Card.Content>
        {entry.date} <Icon name="hospital symbol" />
      </Card.Content>
      <Card.Content description={entry.description} />
    </Card>
  </div>
);

export default Hospital;
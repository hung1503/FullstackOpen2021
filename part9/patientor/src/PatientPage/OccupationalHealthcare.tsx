import React from 'react';
import { OccupationalHealthcareEntry } from '../types';
import { Icon, Card } from 'semantic-ui-react';

const OccupationalHealthcare: React.FC<{entry: OccupationalHealthcareEntry}> = ({ entry }) => (
  <div>
    <Card>
      <Card.Content>
        {entry.date} <Icon name="user doctor" />
      </Card.Content>
      <Card.Content description={entry.description} />
    </Card>
  </div>
);

export default OccupationalHealthcare;
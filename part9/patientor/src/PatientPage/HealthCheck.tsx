import React from 'react';
import { HealthCheckEntry } from '../types';
import { Icon, Card } from 'semantic-ui-react';

const HealthCheck: React.FC<{ entry: HealthCheckEntry }> = ({ entry }) => {

  return (
    <div>
      <Card>
        <Card.Content>
          {entry.date} <Icon name="user doctor" />
        </Card.Content>
        <Card.Content description={entry.description} />
      </Card>
    </div>
  );
};

export default HealthCheck;
// This file is part of InvenioRDM
// Copyright (C) 2020 CERN.
// Copyright (C) 2020 Northwestern University.
//
// Invenio App RDM is free software; you can redistribute it and/or modify it
// under the terms of the MIT License; see LICENSE file for more details.

import React from 'react';
import { Card, Image } from 'semantic-ui-react';
import _truncate from 'lodash/truncate';

export function renderResultsGridItem(result, index) {
    const metadata = result.metadata;
    return (
      <Card fluid key={index} href={`#`}>
        <Image src={result.imageSrc || 'http://placehold.it/200'} />
        <Card.Content>
          <Card.Header>{metadata.title}</Card.Header>
          <Card.Description>
            {_truncate(metadata.keywords.join(","), { length: 200 })}
          </Card.Description>
        </Card.Content>
      </Card>
    );
  }

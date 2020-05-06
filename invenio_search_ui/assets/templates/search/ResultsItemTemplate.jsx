// This file is part of InvenioRDM
// Copyright (C) 2020 CERN.
// Copyright (C) 2020 Northwestern University.
//
// Invenio App RDM is free software; you can redistribute it and/or modify it
// under the terms of the MIT License; see LICENSE file for more details.

import React from 'react';
import {Item} from 'semantic-ui-react';
import _truncate from 'lodash/truncate';

export const renderResultsListItem = (result, index) => {
    const metadata = result.metadata;
    return (
      <Item key={index} href={`#`}>
        <Item.Image
          size="small"
          src={result.imageSrc || 'http://placehold.it/200'}
        />
        <Item.Content>
          <Item.Header>{metadata.title}</Item.Header>
          <Item.Description>
            {_truncate(metadata.keywords.join(","), { length: 200 })}
          </Item.Description>
        </Item.Content>
      </Item>
    );
  };

/*
 * This file is part of React-SearchKit.
 * Copyright (C) 2019 CERN.
 *
 * React-SearchKit is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import React, { Component } from 'react';
import { Container, Grid, Accordion, Menu } from 'semantic-ui-react';
import {
  ReactSearchKit,
  SearchBar,
  BucketAggregation,
  EmptyResults,
  Error,
  ResultsLoader,
  withState,
} from 'react-searchkit';
import { Results } from './Results';
import { InvenioSearchApi } from 'react-searchkit';
import ReactDOM from 'react-dom';
import 'semantic-ui-css/semantic.min.css';


const OnResults = withState(Results);

const sortValues = [
  {
    text: 'Most viewed',
    sortBy: 'mostviewed',
    sortOrder: 'asc',
    defaultOnEmptyString: true,
  },
  {
    text: 'Least viewed',
    sortBy: 'mostviewed',
    sortOrder: 'desc',
  },
  {
    text: 'Newest',
    sortBy: 'mostrecent',
    sortOrder: 'asc',
    default: true,
  },
  {
    text: 'Oldest',
    sortBy: 'mostrecent',
    sortOrder: 'desc',
  },
];

const resultsPerPageValues = [
  {
    text: '10',
    value: 10,
  },
  {
    text: '20',
    value: 20,
  },
  {
    text: '50',
    value: 50,
  },
];


export class App extends Component {
  constructor(props) {
    super(props);
    this.state = { activeIndex: -1, config: null, templates: null };
  }

  componentDidMount() {
    // const confPath = this.props.config ?
    //   this.props.config : 'invenio_search_ui/configRSK'

     // import(`../${confPath}`).then((module) => {
    // // import('../wild_search/configRSK').then((module) => {
    //   this.setState({config: module.default()})
    //
    // });

    const overwriteMapPath = this.props.overwriteMap ?
      this.props.overwriteMap : 'overwriteMap'
    console.log(this.props.overwriteMap, "PATH_DYNAMIC_IMPORT")


    import(/* webpackMode: "lazy" */
      `../react_searchkit/${overwriteMapPath}`).then((module) => {
    // import('../wild_search/configRSK').then((module) => {
      const OverMap = module.default();
      console.log(module.default(), '===================')
      this.setState({templates: OverMap.templates, config: OverMap.config})

    });
  }

  handleClick = (e, titleProps) => {
    const { index } = titleProps;
    const { activeIndex } = this.state;
    const newIndex = activeIndex === index ? -1 : index;

    this.setState({ activeIndex: newIndex });
  };

  renderAccordionAggregations = (
    title,
    resultsAggregations,
    aggregations,
    customProps
  ) => {
    const { activeIndex } = this.state;

    return resultsAggregations !== undefined ? (
      <Accordion as={Menu} vertical>
        <Menu.Item>
          <Accordion.Title
            content={title}
            index={customProps.index}
            active={activeIndex === customProps.index}
            onClick={this.handleClick}
          />
          <Accordion.Content
            active={activeIndex === customProps.index}
            content={aggregations}
          />
        </Menu.Item>
      </Accordion>
    ) : null;
  };

  render() {
    console.log(this.state.config, "@@@@@currentSearchConf")
    if(this.state.config){
    return (
      <ReactSearchKit searchApi={this.state.config}>
        <Container>
          <Grid>
            <Grid.Row>
              <Grid.Column width={3} />
              <Grid.Column width={10}>
                <SearchBar />
              </Grid.Column>
              <Grid.Column width={3} />
            </Grid.Row>
          </Grid>
          <Grid relaxed style={{ padding: '2em 0' }}>
            <Grid.Row columns={2}>
              <Grid.Column width={4}>
                <BucketAggregation
                  title="File types"
                  agg={{
                    field: 'file_type',
                    aggName: 'file_type',
                  }}
                />
                <br />
                <BucketAggregation
                  title="Keywords"
                  agg={{
                    field: 'keywords',
                    aggName: 'keywords',
                  }}
                />
                <br />
                <BucketAggregation
                  title="Types"
                  agg={{
                    field: 'resource_type.type',
                    aggName: 'type',
                    childAgg: {
                      field: 'resource_type.subtype',
                      aggName: 'subtype',
                    },
                  }}
                />
                <br />
              </Grid.Column>
              <Grid.Column width={12}>
                <ResultsLoader>
                  <EmptyResults />
                  <Error />
                  <OnResults
                    sortValues={sortValues}
                    resultsPerPageValues={resultsPerPageValues}
                    templates={this.state.templates}
                  />
                </ResultsLoader>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
      </ReactSearchKit>
    );
    }
    console.log("returning null")
    return null;
  }
}

export function renderReact(ID, overwrite){
  console.log(ID, overwrite, 'INIT')
  return ReactDOM.render(<App overwriteMap={overwrite}/>, document.getElementById(ID));
}


window.renderReact = renderReact

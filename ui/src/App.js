import React, { Component } from 'react'
import { Button, Grid, Icon, Menu, Segment } from 'semantic-ui-react'

import 'semantic-ui-css/semantic.min.css'

import QueryInput from './QueryInput'
import ReactLeafletMap from './ReactLeafletMap'
import ResultTable from './ResultTable'

class App extends Component {
  render() {
    return (
      <div style={{ width: 'inherit', height: 'inherit' }}>
        <Menu>
          <Menu.Item header>Cuis</Menu.Item>
          <Menu.Item name="about" />
          <Menu.Item name="connect" />
        </Menu>
        <Grid stretched columns={2}>
          <Grid.Column style={{ paddingRight: 0 }}>
            <Segment
              style={{
                padding: 0,
                marginBottom: 0,
                position: 'relative'
              }}
            >
              <QueryInput />
            </Segment>
            <Segment compact style={{ width: '100%', padding: 0 }}>
              <Button style={{ width: 'inherit' }}>
                <Icon name="play" />
                Execute
              </Button>
            </Segment>
            <Segment
              style={{
                paddingTop: 0,
                paddingBottom: 0,
                paddingLeft: '5px',
                paddingRight: '5px',
                marginTop: 0,
                marginBottom: 0
              }}
            >
              <ResultTable />
            </Segment>
          </Grid.Column>
          <Grid.Column stretched style={{ paddingLeft: 0 }}>
            <ReactLeafletMap />
          </Grid.Column>
        </Grid>
      </div>
    )
  }
}

export default App

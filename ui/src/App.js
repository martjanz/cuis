import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Grid, Menu, Segment } from 'semantic-ui-react'

import 'semantic-ui-css/semantic.min.css'

import QueryInput from './QueryInput'
import Map from './Map'
import ResultTable from './ResultTable'
import { ShortcutManager } from 'react-shortcuts'

import * as api from './api'

import keymap from './keymap'

const shortcutManager = new ShortcutManager(keymap)

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      data: null
    }
  }

  getChildContext() {
    return { shortcuts: shortcutManager }
  }

  getData(query) {
    api.getData(query).then(result => {
      this.setState({ data: result.data, rowCount: result.rowCount, query })
    })
  }

  render() {
    return (
      <div style={{ width: 'inherit', height: 'inherit' }}>
        <Menu>
          <Menu.Item header>Cuis</Menu.Item>
          <Menu.Item>A simple PostGIS query viewer</Menu.Item>
        </Menu>
        <Grid columns={2}>
          <Grid.Column style={{ paddingRight: 0, paddingLeft: '1.2rem' }}>
            <Segment
              style={{
                padding: 0,
                position: 'relative'
              }}
            >
              <QueryInput onSubmit={this.getData.bind(this)} />
            </Segment>
            <Segment
              style={{
                paddingLeft: '5px',
                paddingRight: '5px',
                marginTop: 0,
                marginBottom: 0
              }}
            >
              <ResultTable
                data={this.state.data}
                rowCount={this.state.rowCount}
              />
            </Segment>
          </Grid.Column>
          <Grid.Column style={{ paddingLeft: 0, paddingRight: '1.2rem' }}>
            <Map />
          </Grid.Column>
        </Grid>
      </div>
    )
  }
}

App.childContextTypes = {
  shortcuts: PropTypes.object.isRequired
}

export default App

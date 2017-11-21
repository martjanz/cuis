import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Button, Grid, Menu, Message, Segment } from 'semantic-ui-react'

import 'semantic-ui-css/semantic.min.css'

import About from './About'
import DbConfig from './DbConfig'
import Help from './Help'
import Map from './Map'
import QueryInput from './QueryInput'
import ResultTable from './ResultTable'
import { ShortcutManager } from 'react-shortcuts'

import * as api from '../api'

import keymap from '../keymap'

const shortcutManager = new ShortcutManager(keymap)

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      aboutIsOpen: false,
      dbConfigIsOpen: false,
      helpIsOpen: false,
      mapData: null,
      querying: false,
      tableData: [],
      // Default dbconfig values
      dbConfig: {
        host: 'localhost',
        port: 5432,
        database: 'cuis',
        user: 'postgres',
        password: 'postgres'
      }
    }

    this.getData = this.getData.bind(this)
    this._toggleAboutModal = this._toggleAboutModal.bind(this)
    this._toggleDbConfigModal = this._toggleDbConfigModal.bind(this)
    this._toggleHelpModal = this._toggleHelpModal.bind(this)
    this._saveDbConfig = this._saveDbConfig.bind(this)
  }

  getChildContext() {
    return { shortcuts: shortcutManager }
  }

  getData(query) {
    this.setState({
      tableData: [],
      queryError: null,
      querying: true
    })

    api
      .getData(this.state.dbConfig, query)
      .then(result => {
        let mapData
        let tableData = []

        if (result.data && result.data.length > 0) {
          if (result.data[0].hasOwnProperty('geojson')) {
            // Handmade GeoJSON structure
            mapData = { type: 'FeatureCollection', features: [] }
            result.data.forEach(row => {
              mapData.features.push({
                type: 'Feature',
                geometry: JSON.parse(row.geojson)
              })
              delete row.geojson
              tableData.push(row)
            })
          } else tableData = result.data
        }

        this.setState({
          querying: false,
          tableData,
          mapData,
          rowCount: result.rowCount,
          query
        })
      })
      .catch(error => this.setState({ querying: false, queryError: error }))
  }

  _saveDbConfig(dbConfig) {
    this.setState({ dbConfig: dbConfig })
    this._toggleDbConfigModal()
  }

  _toggleAboutModal() {
    this.setState({ aboutIsOpen: !this.state.aboutIsOpen })
  }

  _toggleDbConfigModal() {
    this.setState({ dbConfigIsOpen: !this.state.dbConfigIsOpen })
  }

  _toggleHelpModal() {
    this.setState({ helpIsOpen: !this.state.helpIsOpen })
  }

  render() {
    let resultPanel
    if (this.state.querying) {
      resultPanel = (
        <Message color="olive">
          <Message.Header>Running query...</Message.Header>
          <p>{this.state.queryError}</p>
        </Message>
      )
    } else if (this.state.queryError)
      resultPanel = (
        <Message negative>
          <Message.Header>Error querying PostGIS!</Message.Header>
          <p>{this.state.queryError}</p>
        </Message>
      )
    else
      resultPanel = (
        <ResultTable
          data={this.state.tableData}
          rowCount={this.state.rowCount}
        />
      )

    return (
      <div style={{ width: 'inherit', height: 'inherit' }}>
        <About
          isOpen={this.state.aboutIsOpen}
          onClose={this._toggleAboutModal}
        />
        <DbConfig
          isOpen={this.state.dbConfigIsOpen}
          config={this.state.dbConfig}
          onClose={this._toggleDbConfigModal}
          onSave={this._saveDbConfig}
        />
        <Help isOpen={this.state.helpIsOpen} onClose={this._toggleHelpModal} />
        <Menu>
          <Menu.Item header onClick={this._toggleAboutModal}>
            Cuis
          </Menu.Item>
          <Menu.Item>
            <Button onClick={this._toggleDbConfigModal}>
              Connection settings...
            </Button>
          </Menu.Item>
          <Menu.Item position="right" onClick={this._toggleHelpModal}>
            Help
          </Menu.Item>
        </Menu>
        <Grid columns={2}>
          <Grid.Column
            style={{ paddingBottom: 0, paddingRight: 0, paddingLeft: '1.2rem' }}
          >
            <Segment
              style={{
                padding: 0,
                position: 'relative'
              }}
            >
              <QueryInput
                style={{ maxHeight: '30%' }}
                onSubmit={this.getData}
              />
            </Segment>
            <Segment
              style={{
                paddingLeft: '5px',
                paddingRight: '5px',
                marginTop: 0,
                marginBottom: 0
              }}
            >
              {resultPanel}
            </Segment>
          </Grid.Column>
          <Grid.Column
            style={{ paddingBottom: 0, paddingLeft: 0, paddingRight: '1.2rem' }}
          >
            <Map
              geojson={this.state.mapData}
              tableData={this.state.tableData}
            />
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

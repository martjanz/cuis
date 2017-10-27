import React, { Component } from 'react'
import { Button, Grid, Icon, Menu, Segment, Table } from 'semantic-ui-react'

import CodeMirror from 'react-codemirror'
import 'codemirror/mode/sql/sql'
import 'codemirror/lib/codemirror.css'

import 'semantic-ui-css/semantic.min.css'

import ReactLeafletMap from './ReactLeafletMap'

class App extends Component {
  editorRefCallback = ref => {
    const cm = ref.getCodeMirror()
    cm.setSize('100%', '100%')
  }

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
              <CodeMirror
                options={{
                  mode: 'text/x-pgsql',
                  lineNumbers: true,
                  htmlMode: true,
                  matchClosing: true,
                  indentWithTabs: true
                }}
                autoFocus={true}
                value={'SELECT * FROM tabla;'}
                ref={this.editorRefCallback}
              />
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
              <Table celled fixed singleLine compact size="small">
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell>Name</Table.HeaderCell>
                    <Table.HeaderCell>Status</Table.HeaderCell>
                    <Table.HeaderCell>Description</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>

                <Table.Body>
                  <Table.Row>
                    <Table.Cell>John</Table.Cell>
                    <Table.Cell>Approved</Table.Cell>
                    <Table.Cell
                      title={[
                        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore',
                        'et dolore magna aliqua.'
                      ].join(' ')}
                    >
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua.
                    </Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>Jamie</Table.Cell>
                    <Table.Cell>Approved</Table.Cell>
                    <Table.Cell>Shorter description</Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>Jill</Table.Cell>
                    <Table.Cell>Denied</Table.Cell>
                    <Table.Cell>Shorter description</Table.Cell>
                  </Table.Row>
                </Table.Body>
              </Table>
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

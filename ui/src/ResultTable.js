import React, { PureComponent } from 'react'

import { Table } from 'semantic-ui-react'

class ResultTable extends PureComponent {
  render() {
    return (
      <Table celled fixed singleLine compact size="small">
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>ID</Table.HeaderCell>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>Population</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          <Table.Row>
            <Table.Cell>1</Table.Cell>
            <Table.Cell>Gualeguaychú</Table.Cell>
            <Table.Cell>102421</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    )
  }
}

export default ResultTable

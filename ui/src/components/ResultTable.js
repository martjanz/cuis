import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import { Message, Table } from 'semantic-ui-react'

class ResultTable extends PureComponent {
  render() {
    if (!this.props.data || this.props.data.length === 0)
      return <Message>No data to show here.</Message>

    const columns = Object.keys(this.props.data[0]).map((col, idx) => (
      <Table.HeaderCell key={'header-' + idx}>{col}</Table.HeaderCell>
    ))

    const rows = this.props.data.map((row, idx) => {
      const cells = Object.keys(row).map((cell, idx) => (
        <Table.Cell key={'cell-' + idx}>{row[cell]}</Table.Cell>
      ))
      return <Table.Row key={'row-' + idx}>{cells}</Table.Row>
    })

    return (
      <div>
        <Table celled fixed singleLine compact size="small">
          <Table.Header>
            <Table.Row>{columns}</Table.Row>
          </Table.Header>
          <Table.Body>{rows}</Table.Body>
        </Table>
        <Message>
          {this.props.data.length}{' '}
          {this.props.data.length !== 1 ? 'rows' : 'row'} displayed ({
            this.props.rowCount
          }{' '}
          total)
        </Message>
      </div>
    )
  }
}

ResultTable.propTypes = {
  data: PropTypes.array,
  rowCount: PropTypes.number
}

export default ResultTable

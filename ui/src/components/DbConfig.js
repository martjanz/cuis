import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Button, Form, Modal } from 'semantic-ui-react'

class DbConfig extends PureComponent {
  constructor(props) {
    super(props)

    this.state = props.config
  }

  _handleChange(e, { name, value }) {
    this.setState({ [name]: value })
  }

  _handleSubmit() {
    this.props.onSave(this.state)
  }

  render() {
    const { config } = this.props

    return (
      <Modal open={this.props.isOpen} onClose={this.props.onClose} size="tiny">
        <Modal.Header>Connect to PostGIS database server</Modal.Header>
        <Modal.Content>
          <Form onSubmit={this._handleSubmit.bind(this)}>
            <Form.Input
              name="host"
              label="Host"
              placeholder="localhost"
              value={this.state.host}
              required
              onChange={this._handleChange.bind(this)}
            />
            <Form.Input
              name="port"
              label="Port"
              placeholder="port"
              type="number"
              defaultValue={config.port}
              required
              onChange={this._handleChange.bind(this)}
            />
            <Form.Input
              name="database"
              label="Database"
              placeholder="postgres"
              defaultValue={config.database}
              required
              onChange={this._handleChange.bind(this)}
            />
            <Form.Input
              name="user"
              label="User"
              placeholder="postgres"
              defaultValue={config.user}
              onChange={this._handleChange.bind(this)}
              required
            />
            <Form.Input
              name="password"
              label="Password"
              type="password"
              defaultValue={config.password}
              onChange={this._handleChange.bind(this)}
              required
            />
            <Button type="submit">Save</Button>
          </Form>
        </Modal.Content>
      </Modal>
    )
  }
}

DbConfig.propTypes = {
  config: PropTypes.object,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired
}

export default DbConfig

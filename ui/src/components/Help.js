import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Container, List, Message, Modal } from 'semantic-ui-react'

class Help extends PureComponent {
  render() {
    return (
      <Modal open={this.props.isOpen} onClose={this.props.onClose}>
        <Modal.Header>Help</Modal.Header>
        <Modal.Content>
          <Message color="blue">
            <Message.Header>Important!</Message.Header>
            <Message.Content>
              To have geographic data displayed on the map you need: <br />
              <List bulleted>
                <List.Item>
                  A <code>geojson</code> field
                </List.Item>
                <List.Item>
                  <code>NULL</code> or valid GeoJSON feature on every row
                </List.Item>
                <List.Item>Spatial data on WGS84 (SRID 4326)</List.Item>
              </List>
            </Message.Content>
          </Message>
          <Message size="small">
            <Message.Content>
              <strong>Tip:</strong> start with{' '}
              <code>SELECT ST_AsGeoJSON(geom) as geojson, ...</code>.
            </Message.Content>
          </Message>
          <Container>
            You can go to{' '}
            <a href="https://www.postgresql.org/docs/">PostgreSQL</a> and{' '}
            <a href="http://postgis.net/documentation/">PostGIS</a>{' '}
            documentation to see all what you can do with this awesome couple.
          </Container>
        </Modal.Content>
      </Modal>
    )
  }
}

Help.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
}

export default Help

import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Popup } from 'react-map-gl'
import { List } from 'semantic-ui-react'

class MapPopup extends PureComponent {
  render() {
    const content = Object.keys(this.props.data).map(key => (
      <List.Item>
        <List.Content>
          <List.Header>{key}</List.Header>
          <List.Description>
            {this.props.data[key] || '<NULL>'}
          </List.Description>
        </List.Content>
      </List.Item>
    ))
    return (
      <Popup
        longitude={this.props.longitude}
        latitude={this.props.latitude}
        closeButton={false}
      >
        <div>
          <List>{content}</List>
        </div>
      </Popup>
    )
  }
}

MapPopup.propTypes = {
  longitude: PropTypes.number.isRequired,
  latitude: PropTypes.number.isRequired,
  data: PropTypes.object
}

export default MapPopup

import React from 'react'
import { PureComponent } from 'react'
import { Map, TileLayer } from 'react-leaflet'

import 'leaflet/dist/leaflet.css'

const position = [-33.009, -58.5335]

class ReactLeafletMap extends PureComponent {
  render() {
    return (
      <Map center={position} zoom={13}>
        <TileLayer
          url="https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_nolabels/{z}/{x}/{y}.png"
          attribution="&copy; <a href=&quot;http://www.openstreetmap.org/copyright&quot;>OpenStreetMap</a> &copy; <a href=&quot;http://cartodb.com/attributions&quot;>CartoDB</a>"
          subdomains="abcd"
        />
      </Map>
    )
  }
}

export default ReactLeafletMap

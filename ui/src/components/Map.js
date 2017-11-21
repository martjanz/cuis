/* global window,document */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import MapGL, { NavigationControl } from 'react-map-gl'
import { PerspectiveMercatorViewport } from 'viewport-mercator-project'
import Turf from 'turf'

import DeckGLOverlay from './DeckglOverlay.js'

import 'mapbox-gl/dist/mapbox-gl.css'

import MapPopup from './MapPopup.js'

// Set your mapbox token here
const MAPBOX_TOKEN =
  'pk.eyJ1IjoibWFydGphbnoiLCJhIjoiTjRrSElYSSJ9.yHVI12iSPY6coJaDWHO4xw' // eslint-disable-line

const colorScale = r => [
  Math.random() * 255,
  Math.random() * 255,
  Math.random() * 255
]

class Map extends Component {
  constructor(props) {
    super(props)

    this.state = {
      viewport: {
        ...DeckGLOverlay.defaultViewport,
        width: 400,
        height: 400
      }
    }
  }

  componentDidMount() {
    window.addEventListener('resize', this._resize.bind(this))
    this._resize()
  }

  _resize() {
    this._onViewportChange({
      width: window.innerWidth / 2,
      height: window.innerHeight - 70
    })
  }

  _onViewportChange(viewport) {
    this.setState({
      viewport: { ...this.state.viewport, ...viewport }
    })
  }

  _handleHover(info) {
    // When hovering outside geometries no info is provided.
    if (!info || !info.object) {
      this.setState({
        coordinates: null,
        info: null
      })
      return
    }

    this.setState({
      coordinates: info.lngLat,
      info: this.props.tableData[info.index]
    })
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.geojson) {
      // Current viewport
      let stateViewport = this.state.viewport

      // Returns envelope as GeoJSON
      const envelope = Turf.envelope(nextProps.geojson)

      // Get opposite vertices from envolving rectangle
      const bbox = [
        envelope.geometry.coordinates[0][0],
        envelope.geometry.coordinates[0][2]
      ]

      let plainViewport = new PerspectiveMercatorViewport({
        width: this.state.viewport.width,
        height: this.state.viewport.height
      }).fitBounds(bbox, { padding: 10 })

      // Replace only desired new viewport settings
      // TODO: It will be a nice feature to opt-out which viewport settings
      // should be recalculated on new queries. This feature could help to not
      // lose the current viewport (map position, orientation, pitch...)
      stateViewport = {
        ...stateViewport,
        zoom: plainViewport.zoom,
        center: plainViewport.center,
        latitude: plainViewport.latitude,
        longitude: plainViewport.longitude
      }

      this.setState({ viewport: stateViewport })
    }
  }

  render() {
    const { viewport } = this.state
    const data = this.props.geojson

    const popup = this.state.coordinates &&
      this.state.info && (
        <MapPopup
          longitude={this.state.coordinates[0]}
          latitude={this.state.coordinates[1]}
          closeButton={false}
          data={this.state.info}
        />
      )

    return (
      <MapGL
        {...viewport}
        onViewportChange={this._onViewportChange.bind(this)}
        mapboxApiAccessToken={MAPBOX_TOKEN}
        style={{ cursor: 'crosshair' }}
      >
        <div
          className="map-nav-control"
          style={{ position: 'absolute', right: 0 }}
        >
          <NavigationControl
            onViewportChange={this._onViewportChange.bind(this)}
          />
        </div>
        {popup}
        <DeckGLOverlay
          viewport={viewport}
          data={data}
          colorScale={colorScale}
          onHover={this._handleHover.bind(this)}
        />
      </MapGL>
    )
  }
}

Map.propTypes = {
  geojson: PropTypes.object
}

Map.defaultProps = {
  geojson: []
}

export default Map

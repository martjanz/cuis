/* global window,document */
import React, { Component } from 'react'
import MapGL, { NavigationControl } from 'react-map-gl'
import DeckGLOverlay from './DeckglOverlay.js'

import { json as requestJson } from 'd3-request'

import 'mapbox-gl/dist/mapbox-gl.css'

// Set your mapbox token here
const MAPBOX_TOKEN =
  'pk.eyJ1IjoibWFydGphbnoiLCJhIjoiTjRrSElYSSJ9.yHVI12iSPY6coJaDWHO4xw' // eslint-disable-line

// Source data GeoJSON
const DATA_URL =
  'https://raw.githubusercontent.com/uber-common/deck.gl-data/master/examples/geojson/vancouver-blocks.json' // eslint-disable-line

const colorScale = r => [r * 255, 140, 200 * (1 - r)]

class Map extends Component {
  constructor(props) {
    super(props)

    this.state = {
      viewport: {
        ...DeckGLOverlay.defaultViewport,
        width: 400,
        height: 400
      },
      data: null
    }

    requestJson(DATA_URL, (error, response) => {
      if (!error) {
        this.setState({ data: response })
      }
    })
  }

  componentDidMount() {
    window.addEventListener('resize', this._resize.bind(this))
    this._resize()
  }

  _resize() {
    this._onViewportChange({
      width: window.innerWidth / 2,
      height: window.innerHeight - 60
    })
  }

  _onViewportChange(viewport) {
    this.setState({
      viewport: { ...this.state.viewport, ...viewport }
    })
  }

  render() {
    const { viewport, data } = this.state

    return (
      <MapGL
        {...viewport}
        onViewportChange={this._onViewportChange.bind(this)}
        mapboxApiAccessToken={MAPBOX_TOKEN}
      >
        <div
          className="map-nav-control"
          style={{ position: 'absolute', right: 0 }}
        >
          <NavigationControl
            onViewportChange={this._onViewportChange.bind(this)}
          />
        </div>
        <DeckGLOverlay
          viewport={viewport}
          data={data}
          colorScale={colorScale}
        />
      </MapGL>
    )
  }
}

export default Map

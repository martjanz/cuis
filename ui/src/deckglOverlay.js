import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { setParameters } from 'luma.gl'
import DeckGL, { GeoJsonLayer } from 'deck.gl'

const LIGHT_SETTINGS = {
  lightsPosition: [-125, 50.5, 5000, -122.8, 48.5, 8000],
  ambientRatio: 0.2,
  diffuseRatio: 0.5,
  specularRatio: 0.3,
  lightsStrength: [1.0, 0.0, 2.0, 0.0],
  numberOfLights: 2
}

class DeckGLOverlay extends Component {
  static get defaultViewport() {
    return {
      latitude: 49.254,
      longitude: -123.13,
      zoom: 11,
      maxZoom: 16,
      pitch: 45,
      bearing: 0
    }
  }

  _initialize(gl) {
    setParameters(gl, {
      depthTest: true,
      depthFunc: gl.LEQUAL
    })
  }

  render() {
    const { viewport, data } = this.props

    if (!data) return null

    const layer = new GeoJsonLayer({
      id: 'geojson-layer',
      data,
      filled: true,
      fp64: true,
      getFillColor: this.props.colorScale,
      lightSettings: LIGHT_SETTINGS,
      pickable: Boolean(this.props.onHover),
      opacity: 0.8,
      onHover: this.props.onHover,
      stroked: false,
      wireframe: true
    })

    return (
      <DeckGL
        {...viewport}
        layers={[layer]}
        onWebGLInitialized={this._initialize}
      />
    )
  }
}

DeckGLOverlay.propTypes = {
  colorScale: PropTypes.func.isRequired,
  data: PropTypes.object,
  onHover: PropTypes.func,
  viewport: PropTypes.object.isRequired
}

export default DeckGLOverlay

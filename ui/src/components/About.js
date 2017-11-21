import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Modal } from 'semantic-ui-react'

class AboutModal extends PureComponent {
  render() {
    return (
      <Modal open={this.props.isOpen} onClose={this.props.onClose} size="tiny">
        <Modal.Header>
          About Cuis <small>v1.0</small>
        </Modal.Header>
        <Modal.Content>
          <p>
            This is a simple PostGIS query tool built using{' '}
            <a href="https://nodejs.org/en/">Node</a>,{' '}
            <a href="https://reactjs.org/">React</a> and{' '}
            <a href="https://uber.github.io/deck.gl/#/">Deck.gl</a>.<br />
          </p>
          <p>
            Source code available on{' '}
            <a href="https://gitlab.com/martjanz/cuis">GitLab</a>.
          </p>
          <p>
            Feel free to report bugs, suggest new features, improve
            documentation or submit you own Pull Requests. Hope to see you
            there!
          </p>
        </Modal.Content>
      </Modal>
    )
  }
}

AboutModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
}

export default AboutModal

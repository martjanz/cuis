import React, { PureComponent } from 'react'
import { Modal } from 'semantic-ui-react'

class AboutModal extends PureComponent {
  render() {
    console.log('AboutModal!')
    return (
      <Modal defaultOpen={true} size="tiny">
        <Modal.Header>About Cuis</Modal.Header>
        <Modal.Content>
          This is a simple PostGIS query viewer built using{' '}
          <a href="https://nodejs.org/en/">Node</a>,{' '}
          <a href="https://reactjs.org/">React</a> and{' '}
          <a href="https://uber.github.io/deck.gl/#/">Deck.gl</a>.<br />
          <br />
          Source code available on{' '}
          <a href="https://gitlab.com/martjanz/cuis">GitLab</a>
        </Modal.Content>
      </Modal>
    )
  }
}

export default AboutModal

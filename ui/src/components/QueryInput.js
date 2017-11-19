import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Button, Icon } from 'semantic-ui-react'
import { Shortcuts } from 'react-shortcuts'
import CodeMirror from 'react-codemirror'
import 'codemirror/mode/sql/sql'
import 'codemirror/lib/codemirror.css'

class QueryInput extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      code:
        '-- Type your SQL query here. Then click Execute button.\n' +
        'select *, st_asgeojson(geom) as geojson from cuencas;'
    }

    this.updateCode = this.updateCode.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  editorRefCallback = ref => {
    const cm = ref.getCodeMirror()
    cm.setSize('100%', '100%')
  }

  updateCode(newCode) {
    this.setState({ code: newCode })
  }

  _handleShortcuts(action, event) {
    switch (action) {
      case 'EXECUTE':
        this.onSubmit()
        break
      default:
        break
    }
  }

  onSubmit() {
    this.props.onSubmit(this.state.code)
  }

  render() {
    return (
      <Shortcuts name="QueryInput" handler={this._handleShortcuts.bind(this)}>
        <CodeMirror
          options={{
            mode: 'text/x-pgsql',
            lineNumbers: true,
            htmlMode: true,
            matchClosing: true,
            indentWithTabs: true
          }}
          autoFocus={true}
          value={this.state.code}
          ref={this.editorRefCallback}
          onChange={this.updateCode}
        />
        <Button
          style={{ width: '100%', height: '35px' }}
          onClick={this.onSubmit}
        >
          <Icon name="play" />
          Execute (F5 / ⌘+Enter)
        </Button>
      </Shortcuts>
    )
  }
}

QueryInput.propTypes = {
  query: PropTypes.string,
  onSubmit: PropTypes.func.isRequired
}

export default QueryInput

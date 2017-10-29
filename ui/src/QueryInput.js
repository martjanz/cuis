import React, { PureComponent } from 'react'

import CodeMirror from 'react-codemirror'
import 'codemirror/mode/sql/sql'
import 'codemirror/lib/codemirror.css'

class QueryInput extends PureComponent {
  editorRefCallback = ref => {
    const cm = ref.getCodeMirror()
    cm.setSize('100%', '100%')
  }

  render() {
    return (
      <CodeMirror
        options={{
          mode: 'text/x-pgsql',
          lineNumbers: true,
          htmlMode: true,
          matchClosing: true,
          indentWithTabs: true
        }}
        autoFocus={true}
        value={'-- Type your SQL query here. Then click Execute button.'}
        ref={this.editorRefCallback}
      />
    )
  }
}

export default QueryInput

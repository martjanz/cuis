import React, { PureComponent } from 'react'

import CodeMirror from 'react-codemirror'
import 'codemirror/mode/sql/sql'
import 'codemirror/lib/codemirror.css'

class QueryInput extends PureComponent {
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
        value={'SELECT * FROM polygons;'}
        ref={this.editorRefCallback}
      />
    )
  }
}

export default QueryInput

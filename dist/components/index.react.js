'use strict';

var Something = function Something() {
  return React.createElement(
    'h1',
    null,
    'LOL'
  );
};

ReactDOM.render(React.createElement(Something, null), document.getElementById('root'));
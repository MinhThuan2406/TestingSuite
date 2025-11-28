/* eslint-disable */
const React = require('react');
module.exports = new Proxy({}, {
    get: () => function Icon(props) { return React.createElement('div', props, 'Icon'); },
});

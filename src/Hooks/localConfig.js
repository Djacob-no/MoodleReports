// Local development configuration for using test fixtures
// Set USE_LOCAL_DATA=true to use JSON fixtures instead of remote API

const USE_LOCAL_DATA = process.env.REACT_APP_USE_LOCAL_DATA === 'true';

export default USE_LOCAL_DATA;
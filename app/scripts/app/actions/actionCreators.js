import ActionConstants from './actionConstants.js';

export default {
  setConfig(config) {
    return {
      type: ActionConstants.SET_CONFIG,
      payload: config
    }
  }
}
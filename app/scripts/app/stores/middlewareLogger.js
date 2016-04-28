/*
 State logger
 From https://medium.com/@meagle/understanding-87566abcfb7a#.1i0s2ov3h
 More robust https://www.npmjs.com/package/redux-logger
 */

export default function createLogger({ getState }) {
  return (next) =>
    (action) => {
      const prevState   = getState();
      const returnValue = next(action);
      const nextState   = getState();
      const actionType  = String(action.type);
      const message     = `action ${actionType}`;
      console.log(`%c prev state`, `color: #9E9E9E`, prevState);
      console.log(`%c action`, `color: #03A9F4`, action);
      console.log(`%c next state`, `color: #4CAF50`, nextState);
      return returnValue;
    };
}
import Rest from '../../nori/service/Rest.js';
import Obs from '../../nori/extras/ObservableSubject.js'

let _observable = Obs();

export default {

  promise: null,

  onError(handler) {
    _observable.subscribe('error', handler);
  },

  onSuccess(handler) {
    _observable.subscribe('success', handler);
  },

  load(filename) {
    if (!filename) {
      console.warn('JSONLoader: Must specify file name');
      return;
    }

    console.log('JSONLoader: Loading',filename);

    this.promise = Rest.request({
      method: 'GET',
      url   : filename,
      json  : true
    }).then((data) => {
        _observable.notify('success', data);
      }, (err) => {
        console.warn('JSON Loading error:', err);
        _observable.notify('error', err);
      }
    );
  }

}
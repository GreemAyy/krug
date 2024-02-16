class EventEmitter{
    Map<String,List<Function>> events = {};

    void on(String eventName, void Function() callback){
      var event = events[eventName];
      if(event==null){
         events[eventName]=[];
      }
      events[eventName]!.add(callback);
    }

    void emit(String eventName, [dynamic value]){
      var callbacks = events[eventName];
      if(callbacks != null){
        for (var call in callbacks) { 
          call();
        }
      }
    }
}

class GlobalStore{
    GlobalStore(this._states);
    Map<String, dynamic> _states = {};
    Map<String, dynamic> _localHolder = {};
    final EventEmitter _emitter = EventEmitter();

    void set(String key, dynamic value, [bool shouldUpdate = true]){
      _states[key] = value;
      if(shouldUpdate){
        _emitter.emit(key, value);
      }
    }

    void mapMultiSet(Map<String,dynamic> value){
      value.forEach((key, value) {
        if(value is Map){
          if(value["--update"] != null){
            _states[key] = value["--update"];
          }else{
            _states[key] = value;
            _emitter.emit(key);
          }
        }else{
          _states[key] = value;
          _emitter.emit(key);
        }
      });
    }

    void multiSet(List<String> keys, List<dynamic> values, [List<bool> shouldUpdate = const []]){
      if(keys.length==values.length){
        for(int i = 0;i < keys.length; i++){
          var key = keys[i];
          var value = values[i];
          _states[key] = value;
          if(shouldUpdate.isNotEmpty && keys.length==shouldUpdate.length){
            if(shouldUpdate[i]){
              _emitter.emit(key);
            }
          }else{
            _emitter.emit(key);
          }
        }
      }
    }

    void update(String key) => _emitter.emit(key);

    void updateWithData(String key, dynamic data){
      _localHolder[key] = data;
      _emitter.emit(key);
    }

    dynamic get(String key) => _states[key];
    
    void watch<CallbackType>(String key, void Function(CallbackType data) callback){
      _emitter.on(key, () => callback(_states[key]??_localHolder[key]));
    }
}

final store = GlobalStore({
  "cart": [],
  "id":null,
  "hash":null
});

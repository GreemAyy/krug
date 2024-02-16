class EventEmitter{
    private emits:{[k:string]:Function[]} = {}
    on(emitKey:string,onEmit:(data:any)=>void){
        if(emitKey in this.emits)
            this.emits[emitKey].push(onEmit)
        else
            this.emits[emitKey]=[onEmit]
    }
    emit(emitKey:string,args?:any){
        this.emits[emitKey]?.forEach(fn=>fn(args))
    }
}

type SetValueType<T extends Object,SetType> = T[keyof T] | ((value: SetType) => T[keyof T]);
export class GlobalStore<T extends Object> {
    private states: T = Object({});
    private emitter = new EventEmitter();
    constructor(states?: T) {
        this.states = states || ({} as T);
    }
    update(key: keyof T | string){
        this.emitter.emit(key as string);
    }
    set<SetType>(key: keyof T | string, value: SetValueType<T,SetType>, update: boolean = true) {
        if (typeof value === 'function')
            //@ts-ignore
            this.states[key] = value(this.states[key]);
        else
            this.states[key as  keyof T] = value;
        if (update)
            this.emitter.emit(key as string, value);
    }
    get<K extends keyof T>(key: K): T[K] {
        return this.states[key];
    }
    watch<WatchT>(key: keyof T | string, onChange: (value: WatchT) => void) {
        this.emitter.on(key as string, () => onChange(this.states[key as keyof  T] as WatchT));
    }
}
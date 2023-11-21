import io_namespace from './namespace.js';
export default class io_Object extends io_namespace {
    constructor() {
        super();
    }

    IoEvent = (args) => {
        if(!args) return false;
        if(typeof args != 'object') return;
        if(args == null) return;
        let data = args;
        /* result data from server */
    }

    readData = (data) => {

        if(!(data instanceof ArrayBuffer)) {
            return data;
        }
        let data2 = msgpack.decode(new Uint8Array(data));
        if(data2) return data2;
        return data;
    }

    handleData = () => {
        this.ws.onAny((event, ...args) => {
            if(args[0]) {
                let data = args[0];
                if(typeof data == 'string') return this.IoEvent(args);
                if(typeof data == 'number') return this.IoEvent(args);
                if(typeof data == 'boolean') return this.IoEvent(args);
                if(typeof data == 'undefined') return this.IoEvent(args);
                if(typeof data == 'function') return this.IoEvent(args);
                data = this.readData(args[0]);
                this.IoEvent(data);
            }
        });
    }
}
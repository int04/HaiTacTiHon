/**
 * Bundled by jsDelivr using Rollup v2.79.1 and Terser v5.17.1.
 * Original file: /npm/socket.io-msgpack-parser@3.0.2/index.js
 *
 * Do NOT use SRI with dynamically generated files! More information: https://www.jsdelivr.com/using-sri-with-dynamic-files
 */
import t from "./encode_notepack.js";
import e from "./encode_component-emitter.js";
var r = {},
    o = t,
    n = e,
    i = r.protocol = 5,
    a = r.PacketType = {
        CONNECT: 0,
        DISCONNECT: 1,
        EVENT: 2,
        ACK: 3,
        CONNECT_ERROR: 4
    },
    c = Number.isInteger || function (t) {
        return "number" == typeof t && isFinite(t) && Math.floor(t) === t
    },
    d = function (t) {
        return "string" == typeof t
    },
    p = function (t) {
        return "[object Object]" === Object.prototype.toString.call(t)
    };

function u() {}

function f() {}
u.prototype.encode = function (t) {
    return [o.encode(t)]
}, n(f.prototype), f.prototype.add = function (t) {
    var e = o.decode(t);
    this.checkPacket(e), this.emit("decoded", e)
}, f.prototype.checkPacket = function (t) {
    if (!(c(t.type) && t.type >= a.CONNECT && t.type <= a.CONNECT_ERROR)) throw new Error("invalid packet type");
    if (!d(t.nsp)) throw new Error("invalid namespace");
    if (! function (t) {
            switch (t.type) {
            case a.CONNECT:
                return void 0 === t.data || p(t.data);
            case a.DISCONNECT:
                return void 0 === t.data;
            case a.CONNECT_ERROR:
                return d(t.data) || p(t.data);
            default:
                return Array.isArray(t.data)
            }
        }(t)) throw new Error("invalid payload");
    if (!(void 0 === t.id || c(t.id))) throw new Error("invalid packet id")
}, f.prototype.destroy = function () {};
var E = r.Encoder = u,
    s = r.Decoder = f;
export {
    s as Decoder, E as Encoder, r as
    default, i as protocol
};

// Environnement Node.js simulé pour le navigateur (exécuté dans le Worker des leçons).
// Source de lib/node-shim.js : lancer `node tools/build-shim.mjs` après toute modification.
function shim() {
  var g = globalThis;
  var enc = new TextEncoder(), dec = new TextDecoder();
  function mkErr(code, msg, path, sys) { var e = new Error(code + ': ' + msg + ", " + sys + " '" + path + "'"); e.code = code; e.path = path; e.syscall = sys; e.errno = code === 'ENOENT' ? -2 : -17; return e; }

  // ── events
  function EventEmitter() { this._e = {}; }
  var EP = EventEmitter.prototype;
  EP._ev = function () { return this._e || (this._e = {}); };
  EP.on = EP.addListener = function (n, f) { (this._ev()[n] = this._ev()[n] || []).push(f); return this; };
  EP.prependListener = function (n, f) { (this._ev()[n] = this._ev()[n] || []).unshift(f); return this; };
  EP.once = function (n, f) { var self = this; function w() { self.off(n, w); return f.apply(self, arguments); } w.listener = f; return this.on(n, w); };
  EP.off = EP.removeListener = function (n, f) { var l = this._ev()[n]; if (l) this._e[n] = l.filter(function (x) { return x !== f && x.listener !== f; }); return this; };
  EP.removeAllListeners = function (n) { if (n) delete this._ev()[n]; else this._e = {}; return this; };
  EP.emit = function (n) {
    var a = Array.prototype.slice.call(arguments, 1), l = this._ev()[n];
    if (!l || !l.length) { if (n === 'error') throw (a[0] instanceof Error ? a[0] : new Error('Unhandled error. (' + a[0] + ')')); return false; }
    l.slice().forEach(function (f) { f.apply(this, a); }, this); return true;
  };
  EP.listenerCount = function (n) { return (this._ev()[n] || []).length; };
  EP.listeners = function (n) { return (this._ev()[n] || []).map(function (f) { return f.listener || f; }); };
  EP.eventNames = function () { var e = this._ev(); return Object.keys(e).filter(function (k) { return e[k].length; }); };
  EP.setMaxListeners = function () { return this; };
  EventEmitter.EventEmitter = EventEmitter;
  EventEmitter.once = function (em, n) { return new Promise(function (res, rej) { em.once(n, function () { res(Array.prototype.slice.call(arguments)); }); if (n !== 'error') em.once('error', rej); }); };
  var events = EventEmitter;

  // ── path (posix)
  function norm(p) {
    var abs = p.charAt(0) === '/', out = [];
    p.split('/').forEach(function (s) { if (!s || s === '.') return; if (s === '..') { if (out.length && out[out.length - 1] !== '..') out.pop(); else if (!abs) out.push('..'); } else out.push(s); });
    var r = out.join('/'); if (abs) r = '/' + r; if (!r) r = abs ? '/' : '.';
    if (p.length > 1 && p.charAt(p.length - 1) === '/' && r !== '/') r += '/'; return r;
  }
  var path = {
    sep: '/', delimiter: ':',
    normalize: norm,
    join: function () { var a = Array.prototype.filter.call(arguments, Boolean); return a.length ? norm(a.join('/')) : '.'; },
    resolve: function () { var r = ''; for (var i = arguments.length - 1; i >= 0 && r.charAt(0) !== '/'; i--) if (arguments[i]) r = arguments[i] + (r ? '/' + r : ''); if (r.charAt(0) !== '/') r = process.cwd() + (r ? '/' + r : ''); r = norm(r); return r.length > 1 && r.slice(-1) === '/' ? r.slice(0, -1) : r; },
    isAbsolute: function (p) { return p.charAt(0) === '/'; },
    dirname: function (p) { var t = p.length > 1 ? p.replace(/\/+$/, '') : p; var i = t.lastIndexOf('/'); return i < 0 ? '.' : i === 0 ? '/' : t.slice(0, i); },
    basename: function (p, ext) { var b = p.replace(/\/+$/, '').split('/').pop(); if (ext && b.slice(-ext.length) === ext && b !== ext) b = b.slice(0, -ext.length); return b; },
    extname: function (p) { var b = p.split('/').pop(), i = b.lastIndexOf('.'); return i <= 0 ? '' : b.slice(i); },
    relative: function (from, to) { var a = path.resolve(from).split('/').filter(Boolean), b = path.resolve(to).split('/').filter(Boolean), i = 0; while (i < a.length && i < b.length && a[i] === b[i]) i++; return a.slice(i).map(function () { return '..'; }).concat(b.slice(i)).join('/'); },
    parse: function (p) { var base = path.basename(p), ext = path.extname(p); var dir = path.dirname(p); return { root: p.charAt(0) === '/' ? '/' : '', dir: dir === '.' && p.indexOf('/') < 0 ? '' : dir, base: base, ext: ext, name: ext ? base.slice(0, -ext.length) : base }; },
    format: function (o) { var dir = o.dir || o.root || ''; var base = o.base || ((o.name || '') + (o.ext || '')); return dir ? (dir === o.root ? dir + base : dir + '/' + base) : base; }
  };
  path.posix = path;

  // ── util
  var util = {
    format: function (f) {
      var a = Array.prototype.slice.call(arguments, 1);
      if (typeof f !== 'string') return [f].concat(a).map(function (x) { return util.inspect(x); }).join(' ');
      var out = f.replace(/%[sdifjoO%]/g, function (m) { if (m === '%%') return '%'; if (!a.length) return m; var v = a.shift();
        return m === '%s' ? (typeof v === 'string' ? v : util.inspect(v)) : m === '%d' ? String(Number(v)) : m === '%i' ? String(parseInt(v, 10)) : m === '%f' ? String(parseFloat(v)) : m === '%j' ? JSON.stringify(v) : util.inspect(v); });
      return a.length ? out + ' ' + a.map(function (x) { return typeof x === 'string' ? x : util.inspect(x); }).join(' ') : out;
    },
    inspect: function (v) { if (typeof v === 'string') return "'" + v + "'"; if (typeof v === 'function') return '[Function]'; try { return JSON.stringify(v, null, 0).replace(/"([a-zA-Z_]\w*)":/g, '$1: ').replace(/,/g, ', ').replace(/\{/g, '{ ').replace(/\}/g, ' }').replace(/\{  \}/g, '{}').replace(/"/g, "'"); } catch (e) { return String(v); } },
    promisify: function (fn) { return function () { var a = Array.prototype.slice.call(arguments), self = this; return new Promise(function (res, rej) { a.push(function (err, val) { err ? rej(err) : res(val); }); fn.apply(self, a); }); }; },
    isDeepStrictEqual: function (a, b) { return deepEq(a, b, true); },
    TextEncoder: TextEncoder, TextDecoder: TextDecoder, types: { isPromise: function (x) { return !!x && typeof x.then === 'function'; } }
  };


  // ── util.parseArgs (d'après la doc Node.js : options type/short/multiple/default, strict, allowPositionals, tokens)
  function paErr(code, msg) { var e = new TypeError(msg); e.code = code; return e; }
  util.parseArgs = function parseArgs(config) {
    config = config || {};
    var args = config.args !== undefined ? config.args : proc.argv.slice(2);
    var strict = config.strict !== undefined ? config.strict : true;
    var allowPositionals = config.allowPositionals !== undefined ? config.allowPositionals : !strict;
    var allowNegative = !!config.allowNegative;
    var options = config.options || {};
    var hasOwn = function (o, k) { return Object.prototype.hasOwnProperty.call(o, k); };
    var shorts = {};
    Object.keys(options).forEach(function (name) {
      var o = options[name];
      if (o.type !== 'string' && o.type !== 'boolean') throw paErr('ERR_INVALID_ARG_VALUE', "The property 'options." + name + ".type' must be one of: 'string', 'boolean'. Received " + util.inspect(o.type));
      if (o.short !== undefined) {
        if (typeof o.short !== 'string' || o.short.length !== 1) throw paErr('ERR_INVALID_ARG_VALUE', "The property 'options." + name + ".short' must be a single character. Received " + util.inspect(o.short));
        shorts[o.short] = name;
      }
      if (o.default !== undefined) {
        var okType = o.type === 'string' ? 'string' : 'boolean';
        var vals = o.multiple ? o.default : [o.default];
        if (o.multiple && !Array.isArray(o.default)) throw paErr('ERR_INVALID_ARG_TYPE', 'The "options.' + name + '.default" property must be an instance of Array.');
        vals.forEach(function (v) { if (typeof v !== okType) throw paErr('ERR_INVALID_ARG_TYPE', 'The "options.' + name + '.default" property must be of type ' + okType + '.'); });
      }
    });
    function typeOf(name) { return hasOwn(options, name) ? options[name].type : undefined; }
    var tokens = [];
    for (var i = 0; i < args.length; i++) {
      var arg = args[i];
      if (arg === '--') {
        tokens.push({ kind: 'option-terminator', index: i });
        for (var j = i + 1; j < args.length; j++) tokens.push({ kind: 'positional', index: j, value: args[j] });
        break;
      }
      if (arg.length > 2 && arg[0] === '-' && arg[1] === '-') {
        var eq = arg.indexOf('='), name = eq >= 0 ? arg.slice(2, eq) : arg.slice(2);
        var tk = { kind: 'option', name: name, rawName: '--' + name, index: i, value: undefined, inlineValue: undefined };
        if (eq >= 0) { tk.value = arg.slice(eq + 1); tk.inlineValue = true; }
        else if (typeOf(name) === 'string' && i + 1 < args.length) { tk.value = args[++i]; tk.inlineValue = false; }
        tokens.push(tk);
      } else if (arg.length > 1 && arg[0] === '-' && arg[1] !== '-') {
        for (var k = 1; k < arg.length; k++) {
          var ch = arg[k], long = hasOwn(shorts, ch) ? shorts[ch] : ch;
          var t2 = { kind: 'option', name: long, rawName: '-' + ch, index: i, value: undefined, inlineValue: undefined };
          if (typeOf(long) === 'string') {
            if (k + 1 < arg.length) { t2.value = arg.slice(k + 1); t2.inlineValue = true; }
            else if (i + 1 < args.length) { t2.value = args[++i]; t2.inlineValue = false; }
            tokens.push(t2); break;
          }
          tokens.push(t2);
        }
      } else {
        tokens.push({ kind: 'positional', index: i, value: arg });
      }
    }
    var values = Object.create(null), positionals = [];
    tokens.forEach(function (t) {
      if (t.kind === 'positional') {
        if (!allowPositionals) throw paErr('ERR_PARSE_ARGS_UNEXPECTED_POSITIONAL', "Unexpected argument '" + t.value + "'. This command does not take positional arguments");
        positionals.push(t.value); return;
      }
      if (t.kind !== 'option') return;
      var name = t.name;
      if (!hasOwn(options, name)) {
        if (allowNegative && name.indexOf('no-') === 0 && hasOwn(options, name.slice(3)) && options[name.slice(3)].type === 'boolean') { name = name.slice(3); t.name = name; t.value = false; }
        else if (strict) throw paErr('ERR_PARSE_ARGS_UNKNOWN_OPTION', "Unknown option '" + t.rawName + "'" + (allowPositionals ? ". To specify a positional argument starting with a '-', place it at the end of the command after '--', as in '-- \"" + t.rawName + "\"" : ''));
      }
      var type = typeOf(name);
      if (strict && type) {
        var sh = options[name].short, both = (sh ? '-' + sh + ', ' : '') + '--' + name;
        if (type === 'string' && typeof t.value !== 'string') throw paErr('ERR_PARSE_ARGS_INVALID_OPTION_VALUE', "Option '" + both + " <value>' argument missing");
        if (type === 'string' && t.inlineValue === false && t.value.length > 1 && t.value[0] === '-') {
          var raw = t.rawName, isShort = raw[1] !== '-';
          throw paErr('ERR_PARSE_ARGS_INVALID_OPTION_VALUE', "Option '" + raw + "' argument is ambiguous.\nDid you forget to specify the option argument for '" + raw + "'?\nTo specify an option argument starting with a dash use " + (isShort ? "'--" + name + "=-XYZ' or '" + raw + "-XYZ'." : "'" + raw + "=-XYZ'."));
        }
        if (type === 'boolean' && t.value !== undefined && t.value !== false) throw paErr('ERR_PARSE_ARGS_INVALID_OPTION_VALUE', "Option '" + both + "' does not take an argument");
      }
      var v = t.value === undefined ? true : t.value;
      if (type && options[name].multiple) { (values[name] = values[name] || []).push(v); }
      else values[name] = v;
    });
    Object.keys(options).forEach(function (name) {
      if (options[name].default !== undefined && values[name] === undefined) values[name] = options[name].default;
    });
    var out = { values: values, positionals: positionals };
    if (config.tokens) out.tokens = tokens;
    return out;
  };

  // ── assert
  function AssertionError(o) { var e = new Error(o.message); e.name = 'AssertionError'; e.code = 'ERR_ASSERTION'; e.actual = o.actual; e.expected = o.expected; e.operator = o.operator; e.generatedMessage = !o.userMsg; return e; }
  function deepEq(a, b, strict) {
    if (strict ? Object.is(a, b) : a == b) return true;
    if (typeof a !== 'object' || typeof b !== 'object' || !a || !b) return false;
    if (Array.isArray(a) !== Array.isArray(b)) return false;
    var ka = Object.keys(a), kb = Object.keys(b); if (ka.length !== kb.length) return false;
    return ka.every(function (k) { return Object.prototype.hasOwnProperty.call(b, k) && deepEq(a[k], b[k], strict); });
  }
  function fail(actual, expected, msg, op, def) { throw AssertionError({ message: msg instanceof Error ? msg.message : (msg || def), actual: actual, expected: expected, operator: op, userMsg: !!msg }); }
  function assert(v, m) { if (!v) fail(v, true, m, '==', 'The expression evaluated to a falsy value'); }
  assert.ok = assert;
  assert.equal = function (a, b, m) { if (!(a == b)) fail(a, b, m, '==', a + ' == ' + b); };
  assert.notEqual = function (a, b, m) { if (a == b) fail(a, b, m, '!=', a + ' != ' + b); };
  assert.strictEqual = function (a, b, m) { if (!Object.is(a, b)) fail(a, b, m, 'strictEqual', 'Expected values to be strictly equal: ' + util.inspect(a) + ' !== ' + util.inspect(b)); };
  assert.notStrictEqual = function (a, b, m) { if (Object.is(a, b)) fail(a, b, m, 'notStrictEqual', 'Expected "actual" to be strictly unequal to: ' + util.inspect(b)); };
  assert.deepEqual = function (a, b, m) { if (!deepEq(a, b, false)) fail(a, b, m, 'deepEqual', 'Expected values to be loosely deep-equal'); };
  assert.deepStrictEqual = function (a, b, m) { if (!deepEq(a, b, true)) fail(a, b, m, 'deepStrictEqual', 'Expected values to be strictly deep-equal'); };
  assert.throws = function (fn, exp, m) { var threw = false; try { fn(); } catch (e) { threw = true; if (typeof exp === 'function' && exp.prototype && !(e instanceof exp)) throw e; if (exp instanceof RegExp && !exp.test(String(e && e.message || e))) throw e; } if (!threw) fail(undefined, exp, typeof exp === 'string' ? exp : m, 'throws', 'Missing expected exception.'); };
  assert.rejects = function (p, exp) { return Promise.resolve(typeof p === 'function' ? p() : p).then(function () { fail(undefined, exp, undefined, 'rejects', 'Missing expected rejection.'); }, function () {}); };
  assert.fail = function (m) { fail(undefined, undefined, m, 'fail', 'Failed'); };
  assert.AssertionError = function (o) { return AssertionError(o); };
  assert.strict = assert;

  // ── Buffer
  function Buffer() {}
  function toBin(s) { var o = new Uint8Array(s.length); for (var i = 0; i < s.length; i++) o[i] = s.charCodeAt(i) & 255; return o; }
  function mk(u8) { Object.setPrototypeOf(u8, Buffer.prototype); return u8; }
  Buffer.prototype = Object.create(Uint8Array.prototype);
  Buffer.prototype.constructor = Buffer;
  Buffer.from = function (x, e) {
    if (typeof x === 'string') { e = e || 'utf8'; if (e === 'hex') { var m = x.match(/../g) || []; return mk(Uint8Array.from(m.map(function (h) { return parseInt(h, 16); }))); } if (e === 'base64') { return mk(toBin(atob(x.replace(/-/g, '+').replace(/_/g, '/')))); } return mk(enc.encode(x)); }
    return mk(Uint8Array.from(x));
  };
  Buffer.alloc = function (n, f) { var b = mk(new Uint8Array(n)); if (f) b.fill(typeof f === 'string' ? f.charCodeAt(0) : f); return b; };
  Buffer.isBuffer = function (b) { return b instanceof Buffer; };
  Buffer.byteLength = function (s) { return enc.encode(s).length; };
  Buffer.concat = function (l) { var n = 0; l.forEach(function (b) { n += b.length; }); var o = new Uint8Array(n), p = 0; l.forEach(function (b) { o.set(b, p); p += b.length; }); return mk(o); };
  Buffer.prototype.toString = function (e) {
    e = e || 'utf8';
    if (e === 'hex') return Array.prototype.map.call(this, function (b) { return ('0' + b.toString(16)).slice(-2); }).join('');
    if (e === 'base64') return btoa(String.fromCharCode.apply(null, this));
    return dec.decode(this);
  };
  Buffer.prototype.toJSON = function () { return { type: 'Buffer', data: Array.from(this) }; };
  Buffer.prototype.equals = function (o) { return this.length === o.length && this.every(function (v, i) { return v === o[i]; }); };

  // ── fs (système de fichiers virtuel en mémoire)
  var files = {}, dirs = { '/': 1 };
  var seed = g.__VFS || {};
  function addDirs(p) { var d = path.dirname(p); while (d !== '/' && !dirs[d]) { dirs[d] = 1; d = path.dirname(d); } }
  Object.keys(seed).forEach(function (k) { files[path.resolve(k)] = String(seed[k]); addDirs(path.resolve(k)); });
  function P(p) { return path.resolve(String(p)); }
  function read(p, o) {
    var f = P(p); if (!(f in files)) { throw dirs[f] ? mkErr('EISDIR', 'illegal operation on a directory', p, 'read') : mkErr('ENOENT', 'no such file or directory', p, 'open'); }
    var e = typeof o === 'string' ? o : o && o.encoding; return e ? files[f] : Buffer.from(files[f]);
  }
  function write(p, d, flag) { var f = P(p); if (!dirs[path.dirname(f)]) throw mkErr('ENOENT', 'no such file or directory', p, 'open'); files[f] = (flag === 'a' && files[f] ? files[f] : '') + (typeof d === 'string' ? d : d.toString()); }
  var fs = {
    readFileSync: read,
    writeFileSync: function (p, d) { write(p, d); },
    appendFileSync: function (p, d) { write(p, d, 'a'); },
    existsSync: function (p) { var f = P(p); return f in files || !!dirs[f]; },
    readdirSync: function (p) { var f = P(p); if (!dirs[f]) throw mkErr('ENOENT', 'no such file or directory', p, 'scandir'); var s = {}; Object.keys(files).concat(Object.keys(dirs)).forEach(function (k) { if (k !== f && path.dirname(k) === f) s[path.basename(k)] = 1; }); return Object.keys(s).sort(); },
    mkdirSync: function (p, o) { var f = P(p); if (dirs[f]) { if (o && o.recursive) return; throw mkErr('EEXIST', 'file already exists', p, 'mkdir'); } if (!(o && o.recursive) && !dirs[path.dirname(f)]) throw mkErr('ENOENT', 'no such file or directory', p, 'mkdir'); addDirs(f + '/x'); dirs[f] = 1; },
    statSync: function (p) { var f = P(p); if (f in files) return { size: Buffer.byteLength(files[f]), isFile: function () { return true; }, isDirectory: function () { return false; } }; if (dirs[f]) return { size: 0, isFile: function () { return false; }, isDirectory: function () { return true; } }; throw mkErr('ENOENT', 'no such file or directory', p, 'stat'); },
    unlinkSync: function (p) { var f = P(p); if (!(f in files)) throw mkErr('ENOENT', 'no such file or directory', p, 'unlink'); delete files[f]; },
    renameSync: function (a, b) { var s = read(a, 'utf8'); delete files[P(a)]; write(b, s); },
    copyFileSync: function (a, b) { write(b, read(a, 'utf8')); },
    rmSync: function (p, o) { var f = P(p); if (!(f in files) && !dirs[f]) { if (o && o.force) return; throw mkErr('ENOENT', 'no such file or directory', p, 'rm'); } Object.keys(files).forEach(function (k) { if (k === f || k.indexOf(f + '/') === 0) delete files[k]; }); delete dirs[f]; }
  };
  function cbify(fn) { return function () { var a = Array.prototype.slice.call(arguments), cb = a.pop(); var r, err = null; try { r = fn.apply(null, a); } catch (e) { err = e; } setTimeout(function () { err ? cb(err) : cb(null, r); }, 0); }; }
  ['readFile', 'writeFile', 'appendFile', 'readdir', 'mkdir', 'stat', 'unlink', 'rename', 'copyFile', 'rm'].forEach(function (n) { fs[n] = cbify(fs[n + 'Sync']); });
  fs.access = cbify(function (p) { if (!fs.existsSync(p)) throw mkErr('ENOENT', 'no such file or directory', p, 'access'); });
  fs.accessSync = function (p) { if (!fs.existsSync(p)) throw mkErr('ENOENT', 'no such file or directory', p, 'access'); };
  fs.promises = {};
  ['readFile', 'writeFile', 'appendFile', 'readdir', 'mkdir', 'stat', 'unlink', 'rename', 'copyFile', 'rm', 'access'].forEach(function (n) {
    var sync = n === 'access' ? fs.accessSync : fs[n + 'Sync'];
    fs.promises[n] = function () { var a = arguments; return new Promise(function (res, rej) { try { res(sync.apply(null, a)); } catch (e) { rej(e); } }); };
  });
  fs.constants = { F_OK: 0 };

  // ── crypto
  function sha256(bytes) {
    var K = [0x428a2f98,0x71374491,0xb5c0fbcf,0xe9b5dba5,0x3956c25b,0x59f111f1,0x923f82a4,0xab1c5ed5,0xd807aa98,0x12835b01,0x243185be,0x550c7dc3,0x72be5d74,0x80deb1fe,0x9bdc06a7,0xc19bf174,0xe49b69c1,0xefbe4786,0x0fc19dc6,0x240ca1cc,0x2de92c6f,0x4a7484aa,0x5cb0a9dc,0x76f988da,0x983e5152,0xa831c66d,0xb00327c8,0xbf597fc7,0xc6e00bf3,0xd5a79147,0x06ca6351,0x14292967,0x27b70a85,0x2e1b2138,0x4d2c6dfc,0x53380d13,0x650a7354,0x766a0abb,0x81c2c92e,0x92722c85,0xa2bfe8a1,0xa81a664b,0xc24b8b70,0xc76c51a3,0xd192e819,0xd6990624,0xf40e3585,0x106aa070,0x19a4c116,0x1e376c08,0x2748774c,0x34b0bcb5,0x391c0cb3,0x4ed8aa4a,0x5b9cca4f,0x682e6ff3,0x748f82ee,0x78a5636f,0x84c87814,0x8cc70208,0x90befffa,0xa4506ceb,0xbef9a3f7,0xc67178f2];
    var H = [0x6a09e667,0xbb67ae85,0x3c6ef372,0xa54ff53a,0x510e527f,0x9b05688c,0x1f83d9ab,0x5be0cd19];
    var l = bytes.length, n = (((l + 9 + 63) >> 6) << 6), m = new Uint8Array(n); m.set(bytes); m[l] = 0x80;
    var dv = new DataView(m.buffer); dv.setUint32(n - 8, Math.floor(l / 0x20000000)); dv.setUint32(n - 4, (l << 3) >>> 0);
    var w = new Array(64);
    function rr(x, c) { return (x >>> c) | (x << (32 - c)); }
    for (var o = 0; o < n; o += 64) {
      for (var i = 0; i < 16; i++) w[i] = dv.getUint32(o + i * 4);
      for (i = 16; i < 64; i++) { var s0 = rr(w[i - 15], 7) ^ rr(w[i - 15], 18) ^ (w[i - 15] >>> 3), s1 = rr(w[i - 2], 17) ^ rr(w[i - 2], 19) ^ (w[i - 2] >>> 10); w[i] = (w[i - 16] + s0 + w[i - 7] + s1) | 0; }
      var a = H[0], b = H[1], c = H[2], d = H[3], e = H[4], f = H[5], gg = H[6], h = H[7];
      for (i = 0; i < 64; i++) { var S1 = rr(e, 6) ^ rr(e, 11) ^ rr(e, 25), ch = (e & f) ^ (~e & gg), t1 = (h + S1 + ch + K[i] + w[i]) | 0, S0 = rr(a, 2) ^ rr(a, 13) ^ rr(a, 22), mj = (a & b) ^ (a & c) ^ (b & c), t2 = (S0 + mj) | 0; h = gg; gg = f; f = e; e = (d + t1) | 0; d = c; c = b; b = a; a = (t1 + t2) | 0; }
      H = [(H[0] + a) | 0, (H[1] + b) | 0, (H[2] + c) | 0, (H[3] + d) | 0, (H[4] + e) | 0, (H[5] + f) | 0, (H[6] + gg) | 0, (H[7] + h) | 0];
    }
    var out = new Uint8Array(32), ov = new DataView(out.buffer); H.forEach(function (x, i) { ov.setUint32(i * 4, x >>> 0); }); return out;
  }
  function bytesOf(d) { return typeof d === 'string' ? enc.encode(d) : d; }
  function finish(bytes, e) { var b = Buffer.from(Array.from(bytes)); return e ? b.toString(e) : b; }
  var crypto = {
    createHash: function (alg) { if (alg !== 'sha256') throw new Error('Digest method not supported (ici : sha256 uniquement)'); var parts = []; var h = { update: function (d) { parts.push(bytesOf(d)); return h; }, digest: function (e) { return finish(sha256(Buffer.concat(parts)), e); } }; return h; },
    createHmac: function (alg, key) { if (alg !== 'sha256') throw new Error('Digest method not supported (ici : sha256 uniquement)'); var parts = []; var h = { update: function (d) { parts.push(bytesOf(d)); return h; }, digest: function (e) { var k = bytesOf(key); if (k.length > 64) k = sha256(k); var kp = new Uint8Array(64); kp.set(k); var ip = kp.map(function (x) { return x ^ 0x36; }), op = kp.map(function (x) { return x ^ 0x5c; }); var inner = sha256(Buffer.concat([Buffer.from(Array.from(ip))].concat(parts))); return finish(sha256(Buffer.concat([Buffer.from(Array.from(op)), Buffer.from(Array.from(inner))])), e); } }; return h; },
    randomBytes: function (n) { var u = new Uint8Array(n); g.crypto.getRandomValues(u); return mk(u); },
    randomUUID: function () { return g.crypto.randomUUID(); },
    randomInt: function (a, b) { if (b === undefined) { b = a; a = 0; } return a + Math.floor(Math.random() * (b - a)); },
    timingSafeEqual: function (a, b) { if (a.length !== b.length) throw new RangeError('Input buffers must have the same byte length'); var r = 0; for (var i = 0; i < a.length; i++) r |= a[i] ^ b[i]; return r === 0; }
  };

  // ── stream (version simplifiée)
  function Readable() { EventEmitter.call(this); }
  Readable.prototype = Object.create(EP); Readable.prototype.constructor = Readable;
  Readable.from = function (it) { var r = new Readable(); r[Symbol.asyncIterator] = function () { return (async function* () { for await (var x of it) yield x; })(); }; return r; };
  function Transform(o) { EventEmitter.call(this); this._o = o || {}; }
  Transform.prototype = Object.create(EP); Transform.prototype.constructor = Transform;
  Transform.prototype.push = function (d) { if (d !== null && d !== undefined) this.emit('data', d); return true; };
  Transform.prototype.write = function (c) { var self = this; (this._o.transform || function (ch, e, cb) { cb(null, ch); }).call(this, typeof c === 'string' ? Buffer.from(c) : c, 'buffer', function (err, d) { if (err) return self.emit('error', err); if (d !== undefined && d !== null) self.emit('data', d); }); return true; };
  Transform.prototype.end = function (c) { if (c !== undefined) this.write(c); this.emit('end'); this.emit('finish'); };
  var stream = { Readable: Readable, Transform: Transform, PassThrough: function () { return new Transform(); }, Writable: Transform };


  // ── stream/promises (version simplifiée : étapes = flux Transform du simulateur, générateurs asynchrones ou itérables)
  function toAsyncIter(x) {
    if (x && typeof x[Symbol.asyncIterator] === 'function') return x;
    if (x && typeof x[Symbol.iterator] === 'function') return (async function* () { for (var c of x) yield c; })();
    var e = new TypeError('The "source" argument must be an iterable or async iterable'); e.code = 'ERR_INVALID_ARG_TYPE'; throw e;
  }
  var streamP = {
    pipeline: async function pipeline() {
      var a = Array.prototype.slice.call(arguments), last = a[a.length - 1];
      if (last && typeof last === 'object' && typeof last.write !== 'function' && !last[Symbol.asyncIterator] && !last[Symbol.iterator]) a.pop();
      if (a.length < 2) { var m = new TypeError('The "streams" argument must be specified'); m.code = 'ERR_MISSING_ARGS'; throw m; }
      var cur = typeof a[0] === 'function' ? a[0]() : a[0];
      for (var i = 1; i < a.length; i++) {
        var step = a[i], isLast = i === a.length - 1;
        if (typeof step === 'function') {
          var r = step(toAsyncIter(cur));
          if (isLast) return await r;
          cur = r;
        } else if (step && typeof step.write === 'function') {
          if (isLast) {
            var err = null; step.on('error', function (e) { err = e; });
            for await (var c of toAsyncIter(cur)) { step.write(c); if (err) throw err; }
            step.end(); if (err) throw err; return;
          }
          cur = (function (src, t) {
            return (async function* () {
              var out = [], err = null; t.on('data', function (d) { out.push(d); }); t.on('error', function (e) { err = e; });
              for await (var ch of toAsyncIter(src)) { t.write(ch); await Promise.resolve(); if (err) throw err; while (out.length) yield out.shift(); }
              t.end(); if (err) throw err; while (out.length) yield out.shift();
            })();
          })(cur, step);
        } else { var e2 = new TypeError('Invalid pipeline stage'); e2.code = 'ERR_INVALID_ARG_TYPE'; throw e2; }
      }
    },
    finished: function finished(s) { return new Promise(function (res, rej) { s.once('end', res); s.once('finish', res); s.once('error', rej); }); }
  };
  stream.promises = streamP;

  // ── zlib (versions asynchrones à callback, via CompressionStream / DecompressionStream du navigateur)
  function zRun(Ctor, fmt) {
    return function (data, opts, cb) {
      if (typeof opts === 'function') { cb = opts; opts = {}; }
      var run = (async function () {
        var input = typeof data === 'string' ? enc.encode(data) : bytesOf(data);
        var cs = new Ctor(fmt), w = cs.writable.getWriter();
        w.write(input); w.close();
        var rd = cs.readable.getReader(), parts = [], total = 0;
        for (;;) { var x = await rd.read(); if (x.done) break; parts.push(x.value); total += x.value.length; }
        var all = new Uint8Array(total), off = 0; parts.forEach(function (p) { all.set(p, off); off += p.length; });
        return mk(all);
      })();
      if (typeof cb !== 'function') { var e = new TypeError('The "callback" argument must be of type function.'); e.code = 'ERR_INVALID_ARG_TYPE'; throw e; }
      run.then(function (r) { cb(null, r); }, function (e) { cb(e); });
    };
  }
  function zSyncNo(name) { return function () { var e = new Error('zlib.' + name + ' : les versions synchrones ne sont pas disponibles dans ce simulateur. Utilise la version asynchrone (avec callback ou util.promisify).'); e.code = 'ERR_NOT_AVAILABLE'; throw e; }; }
  var zlib = {
    gzip: zRun(g.CompressionStream, 'gzip'), gunzip: zRun(g.DecompressionStream, 'gzip'),
    deflate: zRun(g.CompressionStream, 'deflate'), inflate: zRun(g.DecompressionStream, 'deflate'),
    deflateRaw: zRun(g.CompressionStream, 'deflate-raw'), inflateRaw: zRun(g.DecompressionStream, 'deflate-raw')
  };
  ['gzipSync', 'gunzipSync', 'deflateSync', 'inflateSync', 'deflateRawSync', 'inflateRawSync'].forEach(function (n) { zlib[n] = zSyncNo(n); });

  // ── timers, os, url, http…
  g.setImmediate = g.setImmediate || function (f) { var a = Array.prototype.slice.call(arguments, 1); return setTimeout(function () { f.apply(null, a); }, 0); };
  var timersP = { setTimeout: function (ms, v) { return new Promise(function (r) { setTimeout(function () { r(v); }, ms); }); }, setImmediate: function (v) { return Promise.resolve(v); } };
  var os = { EOL: '\n', platform: function () { return 'linux'; }, arch: function () { return 'x64'; }, cpus: function () { return [{ model: 'sim', speed: 3000 }, { model: 'sim', speed: 3000 }, { model: 'sim', speed: 3000 }, { model: 'sim', speed: 3000 }]; }, totalmem: function () { return 8589934592; }, freemem: function () { return 4294967296; }, homedir: function () { return '/home/user'; }, tmpdir: function () { return '/tmp'; }, hostname: function () { return 'sandbox'; }, type: function () { return 'Linux'; } };
  var STATUS = { 200: 'OK', 201: 'Created', 204: 'No Content', 301: 'Moved Permanently', 302: 'Found', 304: 'Not Modified', 400: 'Bad Request', 401: 'Unauthorized', 403: 'Forbidden', 404: 'Not Found', 405: 'Method Not Allowed', 409: 'Conflict', 429: 'Too Many Requests', 500: 'Internal Server Error', 503: 'Service Unavailable' };
  var http = { STATUS_CODES: STATUS, METHODS: ['DELETE', 'GET', 'HEAD', 'OPTIONS', 'PATCH', 'POST', 'PUT'],
    createServer: function (h) { var s = new EventEmitter(); s.listen = function (p, cb) { s.port = p; if (typeof cb === 'function') setTimeout(cb, 0); return s; }; s.close = function (cb) { if (typeof cb === 'function') setTimeout(cb, 0); return s; }; s.handler = h; return s; } };
  g.__mkRes = function () {
    var r = { statusCode: 200, headers: {}, body: '', ended: false,
      setHeader: function (k, v) { r.headers[String(k).toLowerCase()] = v; return r; }, getHeader: function (k) { return r.headers[String(k).toLowerCase()]; },
      writeHead: function (c, h) { r.statusCode = c; if (h) Object.keys(h).forEach(function (k) { r.headers[k.toLowerCase()] = h[k]; }); return r; },
      write: function (c) { r.body += typeof c === 'string' ? c : c.toString(); return true; },
      end: function (c) { if (c !== undefined && c !== null) r.write(c); r.ended = true; return r; } };
    return r;
  };
  g.__mkReq = function (o) {
    o = o || {}; var q = new EventEmitter(); q.method = o.method || 'GET'; q.url = o.url || '/'; q.headers = o.headers || {}; var body = o.body === undefined ? '' : (typeof o.body === 'string' ? o.body : JSON.stringify(o.body));
    q[Symbol.asyncIterator] = function () { return (async function* () { if (body) yield Buffer.from(body); })(); };
    setTimeout(function () { if (body) q.emit('data', Buffer.from(body)); q.emit('end'); }, 0); return q;
  };

  g.__parse = function (s) { try { return JSON.parse(s); } catch (e) { return null; } };

  // ── process, module, require
  var proc = new EventEmitter();
  proc.argv = ['/usr/local/bin/node', '/app/index.js']; proc.env = { NODE_ENV: 'development' }; proc.platform = 'linux'; proc.pid = 4242; proc.version = 'v22.0.0'; proc.versions = { node: '22.0.0', v8: '12.4' }; proc.exitCode = undefined;
  proc.cwd = function () { return '/home/user'; }; proc.uptime = function () { return 1.5; }; proc.memoryUsage = function () { return { rss: 5e7, heapUsed: 2e7, heapTotal: 3e7 }; };
  proc.exit = function (c) { var e = new Error('process.exit(' + (c || 0) + ')'); e.exitCode = c || 0; throw e; };
  proc.nextTick = function (f) { var a = Array.prototype.slice.call(arguments, 1); queueMicrotask(function () { f.apply(null, a); }); };
  proc.hrtime = { bigint: function () { return BigInt(Math.round(performance.now() * 1e6)); } };
  proc.stdout = { write: function (s) { return true; } }; proc.stderr = { write: function (s) { return true; } };
  g.process = proc; g.Buffer = Buffer;
  g.module = { exports: {} }; g.exports = g.module.exports; g.__filename = '/app/index.js'; g.__dirname = '/app';
  var noop = function () {};
  var mods = { events: events, path: path, util: util, assert: assert, 'assert/strict': assert, fs: fs, 'fs/promises': fs.promises, buffer: { Buffer: Buffer }, crypto: crypto, stream: stream, timers: { setTimeout: g.setTimeout, setInterval: g.setInterval, setImmediate: g.setImmediate }, 'timers/promises': timersP, os: os, http: http, https: http, url: { URL: URL, URLSearchParams: URLSearchParams }, process: proc,
    child_process: { exec: noop, execFile: noop, spawn: noop, fork: noop }, worker_threads: { isMainThread: true, parentPort: null, workerData: null, Worker: noop }, cluster: { isPrimary: true, fork: noop }, readline: { createInterface: function () { return new EventEmitter(); } }, test: noop, zlib: zlib, 'stream/promises': streamP };
  g.require = function (n) { n = String(n).replace(/^node:/, ''); if (n in mods) return mods[n]; var e = new Error("Cannot find module '" + n + "'"); e.code = 'MODULE_NOT_FOUND'; throw e; };
}

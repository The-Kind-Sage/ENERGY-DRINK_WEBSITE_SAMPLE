var dist = {};
var messages = {};
var hasRequiredMessages;
function requireMessages() {
  if (hasRequiredMessages) return messages;
  hasRequiredMessages = 1;
  Object.defineProperty(messages, "__esModule", { value: true });
  messages.NoticeMessage = messages.DataRowMessage = messages.CommandCompleteMessage = messages.ReadyForQueryMessage = messages.NotificationResponseMessage = messages.BackendKeyDataMessage = messages.AuthenticationMD5Password = messages.ParameterStatusMessage = messages.ParameterDescriptionMessage = messages.RowDescriptionMessage = messages.Field = messages.CopyResponse = messages.CopyDataMessage = messages.DatabaseError = messages.copyDone = messages.emptyQuery = messages.replicationStart = messages.portalSuspended = messages.noData = messages.closeComplete = messages.bindComplete = messages.parseComplete = void 0;
  messages.parseComplete = {
    name: "parseComplete",
    length: 5
  };
  messages.bindComplete = {
    name: "bindComplete",
    length: 5
  };
  messages.closeComplete = {
    name: "closeComplete",
    length: 5
  };
  messages.noData = {
    name: "noData",
    length: 5
  };
  messages.portalSuspended = {
    name: "portalSuspended",
    length: 5
  };
  messages.replicationStart = {
    name: "replicationStart",
    length: 4
  };
  messages.emptyQuery = {
    name: "emptyQuery",
    length: 4
  };
  messages.copyDone = {
    name: "copyDone",
    length: 4
  };
  class DatabaseError extends Error {
    constructor(message, length, name) {
      super(message);
      this.length = length;
      this.name = name;
    }
  }
  messages.DatabaseError = DatabaseError;
  class CopyDataMessage {
    constructor(length, chunk) {
      this.length = length;
      this.chunk = chunk;
      this.name = "copyData";
    }
  }
  messages.CopyDataMessage = CopyDataMessage;
  class CopyResponse {
    constructor(length, name, binary, columnCount) {
      this.length = length;
      this.name = name;
      this.binary = binary;
      this.columnTypes = new Array(columnCount);
    }
  }
  messages.CopyResponse = CopyResponse;
  class Field {
    constructor(name, tableID, columnID, dataTypeID, dataTypeSize, dataTypeModifier, format) {
      this.name = name;
      this.tableID = tableID;
      this.columnID = columnID;
      this.dataTypeID = dataTypeID;
      this.dataTypeSize = dataTypeSize;
      this.dataTypeModifier = dataTypeModifier;
      this.format = format;
    }
  }
  messages.Field = Field;
  class RowDescriptionMessage {
    constructor(length, fieldCount) {
      this.length = length;
      this.fieldCount = fieldCount;
      this.name = "rowDescription";
      this.fields = new Array(this.fieldCount);
    }
  }
  messages.RowDescriptionMessage = RowDescriptionMessage;
  class ParameterDescriptionMessage {
    constructor(length, parameterCount) {
      this.length = length;
      this.parameterCount = parameterCount;
      this.name = "parameterDescription";
      this.dataTypeIDs = new Array(this.parameterCount);
    }
  }
  messages.ParameterDescriptionMessage = ParameterDescriptionMessage;
  class ParameterStatusMessage {
    constructor(length, parameterName, parameterValue) {
      this.length = length;
      this.parameterName = parameterName;
      this.parameterValue = parameterValue;
      this.name = "parameterStatus";
    }
  }
  messages.ParameterStatusMessage = ParameterStatusMessage;
  class AuthenticationMD5Password {
    constructor(length, salt) {
      this.length = length;
      this.salt = salt;
      this.name = "authenticationMD5Password";
    }
  }
  messages.AuthenticationMD5Password = AuthenticationMD5Password;
  class BackendKeyDataMessage {
    constructor(length, processID, secretKey) {
      this.length = length;
      this.processID = processID;
      this.secretKey = secretKey;
      this.name = "backendKeyData";
    }
  }
  messages.BackendKeyDataMessage = BackendKeyDataMessage;
  class NotificationResponseMessage {
    constructor(length, processId, channel, payload) {
      this.length = length;
      this.processId = processId;
      this.channel = channel;
      this.payload = payload;
      this.name = "notification";
    }
  }
  messages.NotificationResponseMessage = NotificationResponseMessage;
  class ReadyForQueryMessage {
    constructor(length, status) {
      this.length = length;
      this.status = status;
      this.name = "readyForQuery";
    }
  }
  messages.ReadyForQueryMessage = ReadyForQueryMessage;
  class CommandCompleteMessage {
    constructor(length, text) {
      this.length = length;
      this.text = text;
      this.name = "commandComplete";
    }
  }
  messages.CommandCompleteMessage = CommandCompleteMessage;
  class DataRowMessage {
    constructor(length, fields) {
      this.length = length;
      this.fields = fields;
      this.name = "dataRow";
      this.fieldCount = fields.length;
    }
  }
  messages.DataRowMessage = DataRowMessage;
  class NoticeMessage {
    constructor(length, message) {
      this.length = length;
      this.message = message;
      this.name = "notice";
    }
  }
  messages.NoticeMessage = NoticeMessage;
  return messages;
}
var serializer = {};
var bufferWriter = {};
var hasRequiredBufferWriter;
function requireBufferWriter() {
  if (hasRequiredBufferWriter) return bufferWriter;
  hasRequiredBufferWriter = 1;
  Object.defineProperty(bufferWriter, "__esModule", { value: true });
  bufferWriter.Writer = void 0;
  class Writer {
    constructor(size = 256) {
      this.size = size;
      this.offset = 5;
      this.headerPosition = 0;
      this.buffer = Buffer.allocUnsafe(size);
    }
    ensure(size) {
      const remaining = this.buffer.length - this.offset;
      if (remaining < size) {
        const oldBuffer = this.buffer;
        const newSize = oldBuffer.length + (oldBuffer.length >> 1) + size;
        this.buffer = Buffer.allocUnsafe(newSize);
        oldBuffer.copy(this.buffer);
      }
    }
    addInt32(num) {
      this.ensure(4);
      this.buffer[this.offset++] = num >>> 24 & 255;
      this.buffer[this.offset++] = num >>> 16 & 255;
      this.buffer[this.offset++] = num >>> 8 & 255;
      this.buffer[this.offset++] = num >>> 0 & 255;
      return this;
    }
    addInt16(num) {
      this.ensure(2);
      this.buffer[this.offset++] = num >>> 8 & 255;
      this.buffer[this.offset++] = num >>> 0 & 255;
      return this;
    }
    addCString(string) {
      if (!string) {
        this.ensure(1);
      } else {
        const len = Buffer.byteLength(string);
        this.ensure(len + 1);
        this.buffer.write(string, this.offset, "utf-8");
        this.offset += len;
      }
      this.buffer[this.offset++] = 0;
      return this;
    }
    addString(string = "") {
      const len = Buffer.byteLength(string);
      this.ensure(len);
      this.buffer.write(string, this.offset);
      this.offset += len;
      return this;
    }
    add(otherBuffer) {
      this.ensure(otherBuffer.length);
      otherBuffer.copy(this.buffer, this.offset);
      this.offset += otherBuffer.length;
      return this;
    }
    join(code) {
      if (code) {
        this.buffer[this.headerPosition] = code;
        const length = this.offset - (this.headerPosition + 1);
        this.buffer.writeInt32BE(length, this.headerPosition + 1);
      }
      return this.buffer.slice(code ? 0 : 5, this.offset);
    }
    flush(code) {
      const result = this.join(code);
      this.offset = 5;
      this.headerPosition = 0;
      this.buffer = Buffer.allocUnsafe(this.size);
      return result;
    }
  }
  bufferWriter.Writer = Writer;
  return bufferWriter;
}
var hasRequiredSerializer;
function requireSerializer() {
  if (hasRequiredSerializer) return serializer;
  hasRequiredSerializer = 1;
  Object.defineProperty(serializer, "__esModule", { value: true });
  serializer.serialize = void 0;
  const buffer_writer_1 = requireBufferWriter();
  const writer = new buffer_writer_1.Writer();
  const startup = (opts) => {
    writer.addInt16(3).addInt16(0);
    for (const key of Object.keys(opts)) {
      writer.addCString(key).addCString(opts[key]);
    }
    writer.addCString("client_encoding").addCString("UTF8");
    const bodyBuffer = writer.addCString("").flush();
    const length = bodyBuffer.length + 4;
    return new buffer_writer_1.Writer().addInt32(length).add(bodyBuffer).flush();
  };
  const requestSsl = () => {
    const response = Buffer.allocUnsafe(8);
    response.writeInt32BE(8, 0);
    response.writeInt32BE(80877103, 4);
    return response;
  };
  const password = (password2) => {
    return writer.addCString(password2).flush(
      112
      /* code.startup */
    );
  };
  const sendSASLInitialResponseMessage = function(mechanism, initialResponse) {
    writer.addCString(mechanism).addInt32(Buffer.byteLength(initialResponse)).addString(initialResponse);
    return writer.flush(
      112
      /* code.startup */
    );
  };
  const sendSCRAMClientFinalMessage = function(additionalData) {
    return writer.addString(additionalData).flush(
      112
      /* code.startup */
    );
  };
  const query = (text) => {
    return writer.addCString(text).flush(
      81
      /* code.query */
    );
  };
  const emptyArray = [];
  const parse = (query2) => {
    const name = query2.name || "";
    if (name.length > 63) {
      console.error("Warning! Postgres only supports 63 characters for query names.");
      console.error("You supplied %s (%s)", name, name.length);
      console.error("This can cause conflicts and silent errors executing queries");
    }
    const types = query2.types || emptyArray;
    const len = types.length;
    const buffer = writer.addCString(name).addCString(query2.text).addInt16(len);
    for (let i = 0; i < len; i++) {
      buffer.addInt32(types[i]);
    }
    return writer.flush(
      80
      /* code.parse */
    );
  };
  const paramWriter = new buffer_writer_1.Writer();
  const writeValues = function(values, valueMapper) {
    for (let i = 0; i < values.length; i++) {
      const mappedVal = valueMapper ? valueMapper(values[i], i) : values[i];
      if (mappedVal == null) {
        writer.addInt16(
          0
          /* ParamType.STRING */
        );
        paramWriter.addInt32(-1);
      } else if (mappedVal instanceof Buffer) {
        writer.addInt16(
          1
          /* ParamType.BINARY */
        );
        paramWriter.addInt32(mappedVal.length);
        paramWriter.add(mappedVal);
      } else {
        writer.addInt16(
          0
          /* ParamType.STRING */
        );
        paramWriter.addInt32(Buffer.byteLength(mappedVal));
        paramWriter.addString(mappedVal);
      }
    }
  };
  const bind = (config = {}) => {
    const portal = config.portal || "";
    const statement = config.statement || "";
    const binary = config.binary || false;
    const values = config.values || emptyArray;
    const len = values.length;
    writer.addCString(portal).addCString(statement);
    writer.addInt16(len);
    writeValues(values, config.valueMapper);
    writer.addInt16(len);
    writer.add(paramWriter.flush());
    writer.addInt16(1);
    writer.addInt16(
      binary ? 1 : 0
      /* ParamType.STRING */
    );
    return writer.flush(
      66
      /* code.bind */
    );
  };
  const emptyExecute = Buffer.from([69, 0, 0, 0, 9, 0, 0, 0, 0, 0]);
  const execute = (config) => {
    if (!config || !config.portal && !config.rows) {
      return emptyExecute;
    }
    const portal = config.portal || "";
    const rows = config.rows || 0;
    const portalLength = Buffer.byteLength(portal);
    const len = 4 + portalLength + 1 + 4;
    const buff = Buffer.allocUnsafe(1 + len);
    buff[0] = 69;
    buff.writeInt32BE(len, 1);
    buff.write(portal, 5, "utf-8");
    buff[portalLength + 5] = 0;
    buff.writeUInt32BE(rows, buff.length - 4);
    return buff;
  };
  const cancel = (processID, secretKey) => {
    const buffer = Buffer.allocUnsafe(16);
    buffer.writeInt32BE(16, 0);
    buffer.writeInt16BE(1234, 4);
    buffer.writeInt16BE(5678, 6);
    buffer.writeInt32BE(processID, 8);
    buffer.writeInt32BE(secretKey, 12);
    return buffer;
  };
  const cstringMessage = (code, string) => {
    const stringLen = Buffer.byteLength(string);
    const len = 4 + stringLen + 1;
    const buffer = Buffer.allocUnsafe(1 + len);
    buffer[0] = code;
    buffer.writeInt32BE(len, 1);
    buffer.write(string, 5, "utf-8");
    buffer[len] = 0;
    return buffer;
  };
  const emptyDescribePortal = writer.addCString("P").flush(
    68
    /* code.describe */
  );
  const emptyDescribeStatement = writer.addCString("S").flush(
    68
    /* code.describe */
  );
  const describe = (msg) => {
    return msg.name ? cstringMessage(68, `${msg.type}${msg.name || ""}`) : msg.type === "P" ? emptyDescribePortal : emptyDescribeStatement;
  };
  const close = (msg) => {
    const text = `${msg.type}${msg.name || ""}`;
    return cstringMessage(67, text);
  };
  const copyData = (chunk) => {
    return writer.add(chunk).flush(
      100
      /* code.copyFromChunk */
    );
  };
  const copyFail = (message) => {
    return cstringMessage(102, message);
  };
  const codeOnlyBuffer = (code) => Buffer.from([code, 0, 0, 0, 4]);
  const flushBuffer = codeOnlyBuffer(
    72
    /* code.flush */
  );
  const syncBuffer = codeOnlyBuffer(
    83
    /* code.sync */
  );
  const endBuffer = codeOnlyBuffer(
    88
    /* code.end */
  );
  const copyDoneBuffer = codeOnlyBuffer(
    99
    /* code.copyDone */
  );
  const serialize = {
    startup,
    password,
    requestSsl,
    sendSASLInitialResponseMessage,
    sendSCRAMClientFinalMessage,
    query,
    parse,
    bind,
    execute,
    describe,
    close,
    flush: () => flushBuffer,
    sync: () => syncBuffer,
    end: () => endBuffer,
    copyData,
    copyDone: () => copyDoneBuffer,
    copyFail,
    cancel
  };
  serializer.serialize = serialize;
  return serializer;
}
var parser = {};
var bufferReader = {};
var hasRequiredBufferReader;
function requireBufferReader() {
  if (hasRequiredBufferReader) return bufferReader;
  hasRequiredBufferReader = 1;
  Object.defineProperty(bufferReader, "__esModule", { value: true });
  bufferReader.BufferReader = void 0;
  class BufferReader {
    constructor(offset = 0) {
      this.offset = offset;
      this.buffer = Buffer.allocUnsafe(0);
      this.encoding = "utf-8";
    }
    setBuffer(offset, buffer) {
      this.offset = offset;
      this.buffer = buffer;
    }
    int16() {
      const result = this.buffer.readInt16BE(this.offset);
      this.offset += 2;
      return result;
    }
    byte() {
      const result = this.buffer[this.offset];
      this.offset++;
      return result;
    }
    int32() {
      const result = this.buffer.readInt32BE(this.offset);
      this.offset += 4;
      return result;
    }
    uint32() {
      const result = this.buffer.readUInt32BE(this.offset);
      this.offset += 4;
      return result;
    }
    string(length) {
      const result = this.buffer.toString(this.encoding, this.offset, this.offset + length);
      this.offset += length;
      return result;
    }
    cstring() {
      const start = this.offset;
      let end = start;
      while (this.buffer[end++] !== 0) {
      }
      this.offset = end;
      return this.buffer.toString(this.encoding, start, end - 1);
    }
    bytes(length) {
      const result = this.buffer.slice(this.offset, this.offset + length);
      this.offset += length;
      return result;
    }
  }
  bufferReader.BufferReader = BufferReader;
  return bufferReader;
}
var hasRequiredParser;
function requireParser() {
  if (hasRequiredParser) return parser;
  hasRequiredParser = 1;
  Object.defineProperty(parser, "__esModule", { value: true });
  parser.Parser = void 0;
  const messages_1 = requireMessages();
  const buffer_reader_1 = requireBufferReader();
  const CODE_LENGTH = 1;
  const LEN_LENGTH = 4;
  const HEADER_LENGTH = CODE_LENGTH + LEN_LENGTH;
  const LATEINIT_LENGTH = -1;
  const emptyBuffer = Buffer.allocUnsafe(0);
  class Parser {
    constructor(opts) {
      this.buffer = emptyBuffer;
      this.bufferLength = 0;
      this.bufferOffset = 0;
      this.reader = new buffer_reader_1.BufferReader();
      if ((opts === null || opts === void 0 ? void 0 : opts.mode) === "binary") {
        throw new Error("Binary mode not supported yet");
      }
      this.mode = (opts === null || opts === void 0 ? void 0 : opts.mode) || "text";
    }
    parse(buffer, callback) {
      this.mergeBuffer(buffer);
      const bufferFullLength = this.bufferOffset + this.bufferLength;
      let offset = this.bufferOffset;
      while (offset + HEADER_LENGTH <= bufferFullLength) {
        const code = this.buffer[offset];
        const length = this.buffer.readUInt32BE(offset + CODE_LENGTH);
        const fullMessageLength = CODE_LENGTH + length;
        if (fullMessageLength + offset <= bufferFullLength) {
          const message = this.handlePacket(offset + HEADER_LENGTH, code, length, this.buffer);
          callback(message);
          offset += fullMessageLength;
        } else {
          break;
        }
      }
      if (offset === bufferFullLength) {
        this.buffer = emptyBuffer;
        this.bufferLength = 0;
        this.bufferOffset = 0;
      } else {
        this.bufferLength = bufferFullLength - offset;
        this.bufferOffset = offset;
      }
    }
    mergeBuffer(buffer) {
      if (this.bufferLength > 0) {
        const newLength = this.bufferLength + buffer.byteLength;
        const newFullLength = newLength + this.bufferOffset;
        if (newFullLength > this.buffer.byteLength) {
          let newBuffer;
          if (newLength <= this.buffer.byteLength && this.bufferOffset >= this.bufferLength) {
            newBuffer = this.buffer;
          } else {
            let newBufferLength = this.buffer.byteLength * 2;
            while (newLength >= newBufferLength) {
              newBufferLength *= 2;
            }
            newBuffer = Buffer.allocUnsafe(newBufferLength);
          }
          this.buffer.copy(newBuffer, 0, this.bufferOffset, this.bufferOffset + this.bufferLength);
          this.buffer = newBuffer;
          this.bufferOffset = 0;
        }
        buffer.copy(this.buffer, this.bufferOffset + this.bufferLength);
        this.bufferLength = newLength;
      } else {
        this.buffer = buffer;
        this.bufferOffset = 0;
        this.bufferLength = buffer.byteLength;
      }
    }
    handlePacket(offset, code, length, bytes) {
      const { reader } = this;
      reader.setBuffer(offset, bytes);
      let message;
      switch (code) {
        case 50:
          message = messages_1.bindComplete;
          break;
        case 49:
          message = messages_1.parseComplete;
          break;
        case 51:
          message = messages_1.closeComplete;
          break;
        case 110:
          message = messages_1.noData;
          break;
        case 115:
          message = messages_1.portalSuspended;
          break;
        case 99:
          message = messages_1.copyDone;
          break;
        case 87:
          message = messages_1.replicationStart;
          break;
        case 73:
          message = messages_1.emptyQuery;
          break;
        case 68:
          message = parseDataRowMessage(reader);
          break;
        case 67:
          message = parseCommandCompleteMessage(reader);
          break;
        case 90:
          message = parseReadyForQueryMessage(reader);
          break;
        case 65:
          message = parseNotificationMessage(reader);
          break;
        case 82:
          message = parseAuthenticationResponse(reader, length);
          break;
        case 83:
          message = parseParameterStatusMessage(reader);
          break;
        case 75:
          message = parseBackendKeyData(reader);
          break;
        case 69:
          message = parseErrorMessage(reader, "error");
          break;
        case 78:
          message = parseErrorMessage(reader, "notice");
          break;
        case 84:
          message = parseRowDescriptionMessage(reader);
          break;
        case 116:
          message = parseParameterDescriptionMessage(reader);
          break;
        case 71:
          message = parseCopyInMessage(reader);
          break;
        case 72:
          message = parseCopyOutMessage(reader);
          break;
        case 100:
          message = parseCopyData(reader, length);
          break;
        default:
          return new messages_1.DatabaseError("received invalid response: " + code.toString(16), length, "error");
      }
      reader.setBuffer(0, emptyBuffer);
      message.length = length;
      return message;
    }
  }
  parser.Parser = Parser;
  const parseReadyForQueryMessage = (reader) => {
    const status = reader.string(1);
    return new messages_1.ReadyForQueryMessage(LATEINIT_LENGTH, status);
  };
  const parseCommandCompleteMessage = (reader) => {
    const text = reader.cstring();
    return new messages_1.CommandCompleteMessage(LATEINIT_LENGTH, text);
  };
  const parseCopyData = (reader, length) => {
    const chunk = reader.bytes(length - 4);
    return new messages_1.CopyDataMessage(LATEINIT_LENGTH, chunk);
  };
  const parseCopyInMessage = (reader) => parseCopyMessage(reader, "copyInResponse");
  const parseCopyOutMessage = (reader) => parseCopyMessage(reader, "copyOutResponse");
  const parseCopyMessage = (reader, messageName) => {
    const isBinary = reader.byte() !== 0;
    const columnCount = reader.int16();
    const message = new messages_1.CopyResponse(LATEINIT_LENGTH, messageName, isBinary, columnCount);
    for (let i = 0; i < columnCount; i++) {
      message.columnTypes[i] = reader.int16();
    }
    return message;
  };
  const parseNotificationMessage = (reader) => {
    const processId = reader.int32();
    const channel = reader.cstring();
    const payload = reader.cstring();
    return new messages_1.NotificationResponseMessage(LATEINIT_LENGTH, processId, channel, payload);
  };
  const parseRowDescriptionMessage = (reader) => {
    const fieldCount = reader.int16();
    const message = new messages_1.RowDescriptionMessage(LATEINIT_LENGTH, fieldCount);
    for (let i = 0; i < fieldCount; i++) {
      message.fields[i] = parseField(reader);
    }
    return message;
  };
  const parseField = (reader) => {
    const name = reader.cstring();
    const tableID = reader.uint32();
    const columnID = reader.int16();
    const dataTypeID = reader.uint32();
    const dataTypeSize = reader.int16();
    const dataTypeModifier = reader.int32();
    const mode = reader.int16() === 0 ? "text" : "binary";
    return new messages_1.Field(name, tableID, columnID, dataTypeID, dataTypeSize, dataTypeModifier, mode);
  };
  const parseParameterDescriptionMessage = (reader) => {
    const parameterCount = reader.int16();
    const message = new messages_1.ParameterDescriptionMessage(LATEINIT_LENGTH, parameterCount);
    for (let i = 0; i < parameterCount; i++) {
      message.dataTypeIDs[i] = reader.int32();
    }
    return message;
  };
  const parseDataRowMessage = (reader) => {
    const fieldCount = reader.int16();
    const fields = new Array(fieldCount);
    for (let i = 0; i < fieldCount; i++) {
      const len = reader.int32();
      fields[i] = len === -1 ? null : reader.string(len);
    }
    return new messages_1.DataRowMessage(LATEINIT_LENGTH, fields);
  };
  const parseParameterStatusMessage = (reader) => {
    const name = reader.cstring();
    const value = reader.cstring();
    return new messages_1.ParameterStatusMessage(LATEINIT_LENGTH, name, value);
  };
  const parseBackendKeyData = (reader) => {
    const processID = reader.int32();
    const secretKey = reader.int32();
    return new messages_1.BackendKeyDataMessage(LATEINIT_LENGTH, processID, secretKey);
  };
  const parseAuthenticationResponse = (reader, length) => {
    const code = reader.int32();
    const message = {
      name: "authenticationOk",
      length
    };
    switch (code) {
      case 0:
        break;
      case 3:
        if (message.length === 8) {
          message.name = "authenticationCleartextPassword";
        }
        break;
      case 5:
        if (message.length === 12) {
          message.name = "authenticationMD5Password";
          const salt = reader.bytes(4);
          return new messages_1.AuthenticationMD5Password(LATEINIT_LENGTH, salt);
        }
        break;
      case 10:
        {
          message.name = "authenticationSASL";
          message.mechanisms = [];
          let mechanism;
          do {
            mechanism = reader.cstring();
            if (mechanism) {
              message.mechanisms.push(mechanism);
            }
          } while (mechanism);
        }
        break;
      case 11:
        message.name = "authenticationSASLContinue";
        message.data = reader.string(length - 8);
        break;
      case 12:
        message.name = "authenticationSASLFinal";
        message.data = reader.string(length - 8);
        break;
      default:
        throw new Error("Unknown authenticationOk message type " + code);
    }
    return message;
  };
  const parseErrorMessage = (reader, name) => {
    const fields = {};
    let fieldType = reader.string(1);
    while (fieldType !== "\0") {
      fields[fieldType] = reader.cstring();
      fieldType = reader.string(1);
    }
    const messageValue = fields.M;
    const message = name === "notice" ? new messages_1.NoticeMessage(LATEINIT_LENGTH, messageValue) : new messages_1.DatabaseError(messageValue, LATEINIT_LENGTH, name);
    message.severity = fields.S;
    message.code = fields.C;
    message.detail = fields.D;
    message.hint = fields.H;
    message.position = fields.P;
    message.internalPosition = fields.p;
    message.internalQuery = fields.q;
    message.where = fields.W;
    message.schema = fields.s;
    message.table = fields.t;
    message.column = fields.c;
    message.dataType = fields.d;
    message.constraint = fields.n;
    message.file = fields.F;
    message.line = fields.L;
    message.routine = fields.R;
    return message;
  };
  return parser;
}
var hasRequiredDist;
function requireDist() {
  if (hasRequiredDist) return dist;
  hasRequiredDist = 1;
  (function(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.DatabaseError = exports.serialize = exports.parse = void 0;
    const messages_1 = requireMessages();
    Object.defineProperty(exports, "DatabaseError", { enumerable: true, get: function() {
      return messages_1.DatabaseError;
    } });
    const serializer_1 = requireSerializer();
    Object.defineProperty(exports, "serialize", { enumerable: true, get: function() {
      return serializer_1.serialize;
    } });
    const parser_1 = requireParser();
    function parse(stream, callback) {
      const parser2 = new parser_1.Parser();
      stream.on("data", (buffer) => parser2.parse(buffer, callback));
      return new Promise((resolve) => stream.on("end", () => resolve()));
    }
    exports.parse = parse;
  })(dist);
  return dist;
}
export {
  requireDist as r
};

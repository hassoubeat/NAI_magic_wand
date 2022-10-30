export class PngParser {
  constructor(arrayBuffer) {
    this.arrayBuffer = arrayBuffer;
    this.dataView = new DataView(arrayBuffer, 0x08);
  }

  getDataURI() {
    return `data:image/png;base64,${btoa(Array.from(new Uint8Array(this.arrayBuffer), e => String.fromCharCode(e)).join(""))}`;
  }

  getUint32(offset) {
    return this.dataView.getUint32(offset, false);
  }

  getUint8(offset) {
    return this.dataView.getUint8(offset);
  }

  getChar(offset) {
    return String.fromCharCode(this.getUint8(offset));
  }

  getString(offset, number) {
    return Array(number).fill(0).map((v, i) => this.getChar(offset + i)).join("");
  }

  readChunk(offset) {
    let currentOffset = offset;
    const size = this.getUint32(currentOffset);
    currentOffset += 4;
    const type = this.getString(currentOffset, 4);
    currentOffset += 4;

    const dataOffset = currentOffset;
    currentOffset += size;

    const crc = this.getUint32(currentOffset);
    currentOffset += 4;
    return {
        size: size,
        type: type,
        crc: crc,
        dataOffset: dataOffset,
        endOffset: currentOffset,
    };
  }

  getChunks() {
    const chunks = [];
    let chunk = { size: 0, type: "", crc: 0, endOffset: 0x00 };
    while (chunk.type !== "IEND") {
        chunk = this.readChunk(chunk.endOffset);
        chunks.push(chunk);
    }
    return chunks;
  }

  getMetadata() {
    const metadata = {};
    for (const chunk of this.getChunks()) {
      if (chunk.type !== "tEXt") continue;
      const tEXtMap = this.getMapFromtEXt(this.getString(chunk.dataOffset, chunk.size));
      metadata[tEXtMap.key] = tEXtMap.value;
    }
    return metadata;
  }

  getMapFromtEXt(tEXt) {
    // space sperate
    const separateIndex = tEXt.indexOf("\x00");
    return {
      key: tEXt.substring(0, separateIndex),
      value: tEXt.substring(separateIndex+1),
    }
  }
}
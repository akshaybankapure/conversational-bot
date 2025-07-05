class ASRBase {
  async transcribe(audioBuffer) {
    throw new Error('Not implemented');
  }
}

module.exports = ASRBase;

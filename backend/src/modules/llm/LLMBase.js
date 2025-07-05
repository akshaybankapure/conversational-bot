class LLMBase {
  async generateResponse(context, input) {
    throw new Error('Not implemented');
  }
}

module.exports = LLMBase;

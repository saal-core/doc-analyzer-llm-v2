const AxiosRequestManager = require("../helpers/AxiosRequestManager");

const { LLM_GUARD_BASE_URL = "", LLM_GUARD_AUTH_TOKEN = "" } = process.env;
class LLMGuard {
  static axiosManager = new AxiosRequestManager();

  static chunkText(text = "", chunkSize) {
    const chunks = [];
    for (let i = 0; i < text.length; i += chunkSize) {
      chunks?.push(text?.slice(i, i + chunkSize));
    }
    return chunks;
  }

  static scanner = async (type, prompt, output = null) => {
    const typeKeys = {
      input: "prompt",
      output: "output",
    };
    console.log("Scanner triggered", LLM_GUARD_BASE_URL, type, prompt, output);
    try {
      const axios = this.axiosManager.axiosInstance();
      const response = await axios.post(
        `${LLM_GUARD_BASE_URL}/scan/${typeKeys?.[type]}`,
        { prompt, ...(output && { output }) },
        {
          timeout: 30000,
          timeoutErrorMessage: "LLM Guard is not reponding",
          headers: {
            Authorization: `Bearer ${LLM_GUARD_AUTH_TOKEN}`,
          },
        }
      );

      const isValid = response?.data?.is_valid || false;

      console.log("Scanner finished is Valid: ", isValid);
      return isValid;
    } catch (e) {
      return false;
    }
  };

  static scanLargeTextInChunks = async (
    type,
    prompt,
    output = null,
    chunkSize = 256
  ) => {
    try {
      const chunkedText = this.chunkText(prompt, chunkSize);
      if (chunkedText?.length) {
        return await new Promise((resolve) => {
          (async () => {
            await Promise.all(
              chunkedText?.map(async (text) => {
                const valid = await this.scanner(type, text, output);
                if (!valid) {
                  this.axiosManager.cancelAllRequests();
                  resolve(false);
                }
              })
            );
            resolve(true);
          })();
        });
      }
      return true;
    } catch (e) {
      console.error(
        `Something went wrong while scanning request - scan type (${type}), prompt (${prompt})`,
        e
      );
      return false;
    }
  };

  static scanInput = (prompt) => this.scanLargeTextInChunks("input", prompt);
  static scanOutput = (prompt, output) =>
    this.scanLargeTextInChunks("output", prompt, output);
}

module.exports = LLMGuard;

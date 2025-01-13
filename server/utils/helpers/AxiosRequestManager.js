const { default: axios } = require("axios");

class AxiosRequestManager {
  constructor() {
    this.controllers = new Map();
  }

  // Create a new axios instance
  axiosInstance() {
    const instance = axios.create();

    // Intercept request to add abort controller
    instance.interceptors.request.use((config) => {
      const controller = new AbortController();
      config.signal = controller.signal;

      // Add the controller to the map using a unique request identifier
      const requestId = this.getRequestId(config);
      this.controllers.set(requestId, controller);

      return config;
    });

    // Intercept response to clean up controller
    instance.interceptors.response.use(
      (response) => {
        const requestId = this.getRequestId(response.config);
        this.controllers.delete(requestId); // Clean up completed request
        return response;
      },
      (error) => {
        if (axios.isCancel(error)) {
          console.warn("Request canceled:", error.message);
        }
        const requestId = this.getRequestId(error.config);
        this.controllers.delete(requestId); // Clean up failed request
        return Promise.reject(error);
      }
    );

    return instance;
  }

  // Generate a unique ID for each request
  getRequestId(config) {
    return `${config.method}:${config.url}`;
  }

  // Cancel a specific request
  cancelRequest(config) {
    const requestId = this.getRequestId(config);
    const controller = this.controllers.get(requestId);
    if (controller) {
      controller.abort(); // Abort the request
      this.controllers.delete(requestId); // Remove from the map
    }
  }

  // Cancel all pending requests
  cancelAllRequests() {
    this.controllers.forEach((controller) => controller.abort());
    this.controllers.clear();
  }
}

module.exports = AxiosRequestManager;

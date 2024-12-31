import axios from "axios";

export interface SuccessResponse {
  status: string;
  pid: number;
  message: string;
}

export interface ErrorResponse {
  error: string;
}

type PipelineResponse = SuccessResponse | ErrorResponse;

const startPipeline = async (): Promise<PipelineResponse> => {
  try {
    const response = await axios.post<SuccessResponse>(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/workflows/pipeline/start`
    );

    // Return the successful response as is
    return {
      status: response.data.status,
      pid: response.data.pid,
      message: response.data.message,
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // Extract error details with a fallback
      const errorDetail =
        (error.response?.data as { detail?: string })?.detail ||
        "An unexpected error occurred";

      return {
        error: errorDetail,
      };
    }

    // Handle unexpected errors that aren't Axios errors
    return {
      error: "An unknown error occurred",
    };
  }
};

const getPipelineStatus = async (): Promise<PipelineResponse> => {
  try {
    const response = await axios.get<SuccessResponse>(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/workflows/pipeline/status`
    );

    // Return the successful response as is
    return {
      status: response.data.status,
      pid: response.data.pid,
      message: response.data.message,
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // Extract error details with a fallback
      const errorDetail =
        (error.response?.data as { detail?: string })?.detail ||
        "An unexpected error occurred";

      return {
        error: errorDetail,
      };
    }

    // Handle unexpected errors that aren't Axios errors
    return {
      error: "An unknown error occurred",
    };
  }
};

const stopPipeline = async (): Promise<PipelineResponse> => {
  try {
    const response = await axios.post<SuccessResponse>(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/workflows/pipeline/stop`
    );

    // Return the successful response as is
    return {
      status: response.data.status,
      pid: response.data.pid,
      message: response.data.message,
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // Extract error details with a fallback
      const errorDetail =
        (error.response?.data as { detail?: string })?.detail ||
        "An unexpected error occurred";

      return {
        error: errorDetail,
      };
    }

    // Handle unexpected errors that aren't Axios errors
    return {
      error: "An unknown error occurred",
    };
  }
};

export {
  startPipeline,
  getPipelineStatus,
  stopPipeline,
}
const isDev = !process.env.NODE_ENV || process.env.NODE_ENV === "development";

export const baseUrl = isDev
  ? "http://localhost:5001/ajtu-dd6e7/us-central1/api"
  : "https://us-central1-ajtu-dd6e7.cloudfunctions.net/api";

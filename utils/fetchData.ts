import environment from "../environment/environment";

export default async function fetchData(
  url: string,
  method: "GET"|"POST"|"PUT"|"DELETE",
  body: {} = {},
  auth: string|undefined,
  setIsLoading: (loading: boolean) => void
) {
  let requestBody: string | null = null;
  if (method === 'POST' || method === 'PUT') {
    requestBody = JSON.stringify(body);
  }
  try {
    setIsLoading(true);
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };
    if (auth) {
      headers["Authorization"] = `Bearer ${auth}`;
    }
    const response = await fetch(`${environment.REQUEST_URI}${url}`, {
      method,
      headers,
      body: requestBody,
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Fetch error:", error);
    setIsLoading(false);
    throw error;
  } finally {
    setIsLoading(false);
  }
}

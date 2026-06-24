const BASE_URL = "http://localhost:3001/api/reviews";

function getHeaders() {
  const token = localStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
}

export async function submitReview(data: {
  service_id: number;
  rating: number;
  comment?: string;
}) {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(data),
  });
  const result = await res.json();
  if (!res.ok) throw new Error(result.error);
  return result;
}

export async function getWorkerReviews(worker_id: number) {
  const res = await fetch(`${BASE_URL}/worker/${worker_id}`);
  const data = await res.json();
  if (!res.ok) throw new Error(data.error);
  return data;
}

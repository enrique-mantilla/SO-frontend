const API_BASE = import.meta.env.VITE_API_URL || ""

async function request(endpoint, options = {}) {
  const url = `${API_BASE}${endpoint}`
  const config = {
    headers: { "Content-Type": "application/json" },
    ...options,
  }

  const res = await fetch(url, config)
  if (!res.ok) throw new Error(`API Error: ${res.status}`)
  return res.json()
}

export function get(endpoint) {
  return request(endpoint)
}

export function post(endpoint, data) {
  return request(endpoint, { method: "POST", body: JSON.stringify(data) })
}

export function patch(endpoint, data) {
  return request(endpoint, { method: "PATCH", body: JSON.stringify(data) })
}

export function del(endpoint) {
  return request(endpoint, { method: "DELETE" })
}

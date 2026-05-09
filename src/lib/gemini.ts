const API_BASE = "http://localhost:3001/api";

export async function generateSummary(text: string) {
  const response = await fetch(`${API_BASE}/summarize`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text })
  });
  if (!response.ok) throw new Error("Failed to generate summary");
  const data = await response.json();
  return data.summary;
}

export async function chatWithAI(message: string, context?: string, history?: any[]) {
  const response = await fetch(`${API_BASE}/viva/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message, contextText: context, history })
  });
  if (!response.ok) throw new Error("Failed to chat");
  return response.json();
}

export async function explainDiagram(imageBase64: string, mimeType: string = "image/jpeg") {
  // Note: Diagram explainer is not implemented in the backend yet,
  // we would add it or just mock it here.
  return "Backend diagram parsing under construction...";
}

export async function generateQuestionBank(context: string) {
  const response = await fetch(`${API_BASE}/questions`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text: context })
  });
  if (!response.ok) throw new Error("Failed to generate questions");
  const data = await response.json();
  return data.questions;
}

export type ContactRequestPayload = {
  name: string;
  phone: string;
  message: string | null;
};

export async function createContactRequest(payload: ContactRequestPayload) {
  const response = await fetch("/api/contact-requests", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const data = await response.json().catch(() => null);
    throw new Error(data?.detail || "Не удалось отправить заявку");
  }

  return response.json();
}

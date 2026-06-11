// lib/credits.ts — Platform credits interface stub
// CR AudioViz AI · EIN 39-3646201 · June 2026
// Full implementation lives in javari-platform — this is a consumer stub

export async function checkCredits(userId: string, amount: number): Promise<boolean> {
  // Defers to platform credits API
  try {
    const r = await fetch(`${process.env.NEXT_PUBLIC_PLATFORM_URL || "https://craudiovizai.com"}/api/credits/check`, {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, amount })
    });
    if (!r.ok) return true; // Fail open — don't block on credits API failure
    const d = await r.json();
    return d.sufficient !== false;
  } catch { return true; }
}

export async function deductCredits(userId: string, amount: number, description: string): Promise<boolean> {
  try {
    const r = await fetch(`${process.env.NEXT_PUBLIC_PLATFORM_URL || "https://craudiovizai.com"}/api/credits/deduct`, {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, amount, description })
    });
    return r.ok;
  } catch { return false; }
}

export async function getBalance(userId: string): Promise<number> {
  try {
    const r = await fetch(`${process.env.NEXT_PUBLIC_PLATFORM_URL || "https://craudiovizai.com"}/api/credits/balance?userId=${userId}`);
    if (!r.ok) return 999;
    const d = await r.json();
    return d.balance || 0;
  } catch { return 999; }
}

// The dashboard password as it was typed into Vercel. Vercel keeps exactly what is pasted, so a value pasted as "my password" (with the quotes)
// or as ADMIN_PASSWORD=my password would never match what a person types. This strips those, and spaces at both ends. No imports: tested on its own.
export function cleanPassword(raw) {
  let value = String(raw ?? '').trim();
  value = value.replace(/^ADMIN_PASSWORD\s*=\s*/, '').trim();
  if (value.length >= 2 && ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'")))) value = value.slice(1, -1).trim();
  return value;
}

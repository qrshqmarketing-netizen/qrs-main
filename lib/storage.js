// sessionStorage / localStorage can throw (private browsing, blocked cookies), so every access is guarded.

const guarded = (kind) => ({
  get(key) {
    try { return window[kind].getItem(key); } catch { return null; }
  },
  set(key, value) {
    try { window[kind].setItem(key, value); } catch {}
  },
});

export const session = guarded('sessionStorage');
export const local = guarded('localStorage');

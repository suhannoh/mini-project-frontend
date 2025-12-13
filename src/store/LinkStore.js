import { create } from "zustand";

const LinkStore = create(
    (set) => ({
    linkStore : null,            // ✅ 로그인 유저 정보
    setLinkStore: (userData) => set({ linkStore: userData }),
    clearLinkStore : () => set({ linkStore : null})
 }));

export default LinkStore;
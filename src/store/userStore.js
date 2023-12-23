import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";

const useUserStore = create()(
  devtools(
    persist(
      (set) => ({
        newName: "",
        idRuas: "",
        updateNewName: (newName) => set({ newName }),
        updateIdRuas: (idRuas) => set({ idRuas }),
        newEmail: "",
        updateNewEmail: (newEmail) => set({ newEmail }),
        newPassword: "",
        updatenewPassword: (newPassword) => set({ newPassword }),
        userToken: "",
        updateUserToken: (userToken) => set({ userToken }),
      }),
      { name: "useUserStore", storage: createJSONStorage(() => sessionStorage) }
    )
  )
);

export default useUserStore;

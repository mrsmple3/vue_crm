import { database } from "@/firebase";
import { ref, push, get, child } from "firebase/database";

export default {
  actions: {
    async createRecord({ dispatch, commit }, record) {
      try {
        const uid = await dispatch("getUid");
        return await push(ref(database, `/users/${uid}/records/`), record);
      } catch (error) {
        commit("SET_ERROR", error);
        throw error;
      }
    },
    async fetchRecords({ dispatch, commit }) {
      try {
        const uid = await dispatch("getUid");
        const snapshot = await get(ref(database, `/users/${uid}/records/`));
        const records = snapshot.val() || {};
        return Object.keys(records).map((key) => ({
          ...records[key],
          id: key,
        }));
      } catch (error) {
        commit("SET_ERROR", error);
        throw error;
      }
    },
  },
};

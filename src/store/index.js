import { createStore } from "vuex";
import { auth, database } from "@/firebase";
import { ref, set, onValue, push, get, child, update } from "firebase/database";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import router from "@/router";
import record from "./record";
export default createStore({
  state: {
    user: null,
    error: null,
    info: {},
  },
  getters: {
    info: (s) => s.info,
    error: (s) => s.error,
  },
  mutations: {
    SET_USER(state, user) {
      state.user = user;
    },
    CLEAR_USER(state) {
      state.user = null;
    },
    SET_ERROR(state, error) {
      state.error = error;
    },
    CLEAR_ERROR(state) {
      state.error = null;
    },
    SET_INFO(state, info) {
      state.info = info;
    },
    CLEAR_INFO(state) {
      state.info = {};
    },
  },
  actions: {
    async login({ commit }, details) {
      const { email, password } = details;
      try {
        await signInWithEmailAndPassword(auth, email, password);
      } catch (error) {
        commit("SET_ERROR", error);
        throw error;
      }
      commit("SET_USER", auth.currentUser);
    },

    async register({ commit, dispatch }, details) {
      const { email, password, name } = details;
      try {
        await createUserWithEmailAndPassword(auth, email, password);
        const uid = await dispatch("getUid");
        await set(ref(database, `/users/${uid}/info/`), { bill: 10000, name });
        commit("SET_USER", auth.currentUser);
      } catch (error) {
        commit("SET_ERROR", error);
        throw error;
      }
    },

    getUid() {
      const user = auth.currentUser;
      return user ? user.uid : null;
    },

    async fetchInfo({ commit, dispatch }) {
      try {
        const uid = await dispatch("getUid");
        onValue(ref(database, `/users/${uid}/info/`), (snapshot) => {
          const info = snapshot.val();
          commit("SET_INFO", info);
        });
      } catch (error) {
        this.commit("SET_ERROR", error);
        throw error;
      }
    },

    async logout({ commit }) {
      await signOut(auth);
      commit("CLEAR_USER");
      commit("CLEAR_INFO");
    },

    async fetchCurrency() {
      const key = process.env.VUE_APP_FIXER;
      const res = await fetch(
        `http://data.fixer.io/api/latest?access_key=${key}&symbols=USD,EUR,RUB`
      );
      return await res.json();
    },
    async createCategory({ commit, dispatch }, { title, limit }) {
      try {
        const uid = await dispatch("getUid");
        const category = await push(
          ref(database, `/users/${uid}/categories/`),
          {
            title,
            limit,
          }
        );
        return { title, limit, id: category.key };
      } catch (error) {
        commit("SET_ERROR", error);
        throw error;
      }
    },
    async fetchCategories({ commit, dispatch }) {
      try {
        const uid = await dispatch("getUid");
        const snapshot = await get(ref(database, `/users/${uid}/categories/`));
        const categories = snapshot.val() || {};
        return Object.keys(categories).map((key) => ({
          ...categories[key],
          id: key,
        }));
      } catch (error) {
        commit("SET_ERROR", error);
        throw error;
      }
    },
    async fetchCategoryById({ commit, dispatch }, id) {
      try {
        const uid = await dispatch("getUid");
        const snapshot = await get(
          child(ref(database, `/users/${uid}/categories/`), id)
        );
        const category = snapshot.val() || {};
        return { ...category, id };
      } catch (error) {
        commit("SET_ERROR", error);
        throw error;
      }
    },
    async fetchRecordById({ commit, dispatch }, id) {
      try {
        const uid = await dispatch("getUid");
        const snapshot = await get(
          child(ref(database, `/users/${uid}/records/`), id)
        );
        const record = snapshot.val() || {};
        return { ...record, id };
      } catch (error) {
        commit("SET_ERROR", error);
        throw error;
      }
    },
    async updateCategory({ commit, dispatch }, { title, limit, id }) {
      try {
        const uid = await dispatch("getUid");
        const category = await update(
          child(ref(database, `/users/${uid}/categories/`), id),
          { title, limit }
        );
      } catch (error) {
        commit("SET_ERROR", error);
        throw error;
      }
    },
    async updateInfo({ commit, dispatch, getters }, toUpdate) {
      try {
        const uid = await dispatch("getUid");
        const updateData = { ...getters.info, ...toUpdate };
        update(ref(database, `/users/${uid}/info/`), toUpdate);
        commit("SET_INFO", updateData);
      } catch (error) {
        this.commit("SET_ERROR", error);
        throw error;
      }
    },
    initAuth({ commit }) {
      auth.onAuthStateChanged(async (user) => {
        if (user === null) {
          commit("CLEAR_USER");
        } else {
          commit("SET_USER", user);
          if (router.isReady() && router.currentRoute.value.path === "/login") {
            router.push("/");
          }
        }
      });
    },
  },
  modules: { record },
});

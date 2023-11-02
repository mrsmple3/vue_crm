import { createStore } from "vuex";
import { auth } from "@/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import router from "@/router";

export default createStore({
  state: {
    user: null,
  },
  getters: {},
  mutations: {
    SET_USER(state, user) {
      state.user = user;
    },
    CLEAR_USER(state) {
      state.user = null;
    },
  },
  actions: {
    async login({ commit }, details) {
      const { email, password } = details;
      try {
        await signInWithEmailAndPassword(auth, email, password);
      } catch (error) {
        alert(error.message);
        return;
      }
      console.log(auth.currentUser);
      commit("SET_USER", auth.currentUser);
    },

    async register({ commit }, details) {
      const { email, password } = details;
      try {
        await createUserWithEmailAndPassword(auth, email, password);
      } catch (error) {
        alert(error.message);
        return;
      }
      console.log(auth.currentUser);
      commit("SET_USER", auth.currentUser);
    },
    async logout({ commit }) {
      await signOut(auth);
      console.log(LogOut);
      commit("CLEAR_USER");
    },
    // fetch({ commit }) {
    //   auth.onAuthStateChanged(async (user) => {
    //     if (user === null) {
    //       commit("CLEAR_USER");
    //     } else {
    //       commit("SET_USER", user);
    //       if (router.isReady() && router.currentRoute.value.path === "/login") {
    //         router.push("/");
    //       }
    //     }
    //   });
    // },
  },
  modules: {},
});

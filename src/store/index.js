import { createStore } from 'vuex'
import auth from './modules/auth'
import vehicles from './modules/vehicles'
import colors from './modules/colors'
import classes from './modules/classes'
import sites from './modules/sites'
import violations from './modules/violations'
import users from "@/store/modules/users";

export default createStore({
  state: {
    sidebarVisible: '',
    sidebarUnfoldable: false,
  },
  mutations: {
    toggleSidebar(state) {
      state.sidebarVisible = !state.sidebarVisible
    },
    toggleUnfoldable(state) {
      state.sidebarUnfoldable = !state.sidebarUnfoldable
    },
    updateSidebarVisible(state, payload) {
      state.sidebarVisible = payload.value
    },
  },
  actions: {},
  modules: {
    auth,
    vehicles,
    colors,
    classes,
    sites,
    violations,
    users,
  },
})

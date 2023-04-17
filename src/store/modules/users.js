import {
    active as api_active,
    create as api_create,
    index as api_index,
    remove as api_remove,
    //roles as api_roles,
    update as api_update,
} from "@/api/users";
import base from "./base";

const state = {
    ...base.state,
    filters: {},
    roles: [],
}

const getters = {
    ...base.getters,
    filters: (state) => state.filters,
    //roles: state => state.roles,
    orderByList: () => {
        return {
            first_name: 'First Name',
            last_name: 'Last name',
            created_at: 'Register Date',
            login_at: 'Last Login',
        }
    },
};

const mutations = {
    ...base.mutations,
    setFilters(state, filters) {
        state.filters = filters;
    },
    clearData(state) {
        state.data = {
            id: -1, username: '', password: '', first_name: '', last_name: '', is_admin: false//, roles: []
        }
    },
    // setRoles(state, roles) {
    //     state.roles = roles
    // }
}

const actions = {
    ...base.actions,


    index({commit, getters}, filters = {}) {
        if (filters === {}) {
            filters = getters.filters
        }

        //const {color_id, site_id, violation_id, class_id, from_date, to_date} = filters;
        commit('setFilters', filters)
        return new Promise((resolve) => {
            commit('setLoading', true)
            api_index(
                getters.order,
                getters.orderBy,
                getters.page,
                getters.perPage,
            )
                .then((response) => {
                    let users = response.data.data;
                    commit('setList', users)
                    commit('setListPagination', response.data.paging)
                    commit('setLoading', false)
                    resolve(response)
                })
                .catch((error) => {
                    commit('setErrors', error)
                    // reject(error)
                });
        });
    },

    // roles({commit}) {
    //     return new Promise((resolve) => {
    //         api_roles()
    //             .then((response) => {
    //                 let roles = response.data.data.map(itm => {
    //                     return {
    //                         id: parseInt(itm.id),
    //                         title: itm.attributes.title,
    //                     }
    //                 });
    //                 commit('setRoles', roles)
    //                 resolve(response)
    //             })
    //             .catch((error) => {
    //                 commit('setErrors', error)
    //                 // reject(error)
    //             });
    //     });
    // },

    create({commit, dispatch}, payload) {
        commit('clearNotifications')
        const {first_name, last_name, username, password, admin/*, roles*/} = payload;
        return new Promise((resolve) => {
            api_create(username, password, first_name, last_name, admin/*, roles*/)
                .then((response) => {
                    commit('setMessages', response.data)
                    dispatch('reset')
                    resolve(response)
                })
                .catch((error) => {
                    commit('setErrors', error)
                    // reject(error)
                });
        });
    },

    update({commit, dispatch}, payload) {
        commit('clearNotifications')
        const {id, first_name, last_name, username, password, is_admin} = payload;
        console.log(id, first_name, last_name, username, password, is_admin);
        return new Promise((resolve) => {
            api_update(id, username, password, first_name, last_name, is_admin)
                .then((response) => {
                    commit('setMessages', response.data)
                    dispatch('reset')
                    resolve(response)
                })
                .catch((error) => {
                    commit('setErrors', error)
                    // reject(error)
                });
        });
    },

    active({commit}, payload) {
        commit('clearNotifications')
        const {id, active} = payload;
        return new Promise((resolve) => {
            api_active(id, active)
                .then((response) => {
                    commit('setMessages', response.data)
                    resolve(response)
                })
                .catch((error) => {
                    commit('setErrors', error)
                    // reject(error)
                });
        });
    },

    remove({commit, dispatch}, payload) {
        commit('clearNotifications')
        return new Promise((resolve) => {
            api_remove(payload.id)
                .then((response) => {
                    commit('setMessages', response.data)
                    dispatch('reset')
                    resolve(response)
                })
                .catch((error) => {
                    commit('setErrors', error)
                    // reject(error)
                });
        });
    },

    /**
     * check if data.id is not set then create otherwise update current data
     * @param getters
     * @param dispatch
     */
    submit({getters, dispatch}) {
        let action = getters.data.id < 0 ? 'create' : 'update';
        return dispatch(action, getters.data)
    },

    reset({commit, dispatch}) {
        commit('clearData')
        dispatch('index')
    }
};

const users = {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
}

export default users
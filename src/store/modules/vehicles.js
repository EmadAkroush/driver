import {index as api_index, remove as api_remove} from '@/api/vehicles'
import base from './base'

const state = {
    ...base.state,
    classFilter: '',
    filters: {},
}

const getters = {
    ...base.getters,
    classFilter: (state) => state.classFilter,
    filters: (state) => state.filters,
    orderByList: () => {
        return {
            pass_at: 'Date and Time',
        }
    },
}

const mutations = {
    ...base.mutations,
    setClassFilter(state, classFilter) {
        state.classFilter = classFilter
    },
    setFilters(state, filters) {
        state.filters = filters;
    }
}

const actions = {
    ...base.actions,
    setClassFilter({dispatch, getters, commit}, classFilter) {
        if (getters.classFilter == classFilter) commit('setClassFilter', '')
        else commit('setClassFilter', classFilter)
        dispatch('index')
    },

    index({commit, getters}, filters = {}) {
        if (filters === {}) {
            filters = getters.filters
        }

        const {color_id, site_id, violation_id, class_id, from_date, to_date} = filters;
        commit('setFilters', filters)
        return new Promise((resolve) => {
            commit('setLoading', true)
            api_index(
                getters.searchQuery,
                getters.order,
                getters.orderBy,
                getters.page,
                getters.perPage,
                color_id,
                site_id,
                violation_id,
                class_id,
                from_date,
                to_date,
            )
                .then((response) => {
                    let vehicles = response.data.data.map((itm) => {
                        return {
                            ...itm,
                        }
                    })
                    commit('setList', vehicles)
                    commit('setListPagination', response.data.paging)
                    commit('setLoading', false)
                    resolve(response)
                })
                .catch((error) => {
                    commit('clearNotifications')
                    commit('setErrors', error)
                    // reject(error)
                })
        })
    },

    remove({commit /*, dispatch*/}, payload) {
        commit('clearNotifications')
        return new Promise((resolve) => {
            api_remove(payload.id)
                .then((response) => {
                    commit('setMessages', response.data)
                    resolve(response)
                })
                .catch((error) => {
                    commit('setErrors', error)
                    // reject(error)
                })
        })
    },
}

const vehicles = {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
}

export default vehicles

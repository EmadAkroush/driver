import {index as api_index} from '@/api/colors'
import base from './base'

const state = {
    ...base.state,
    classFilter: '',
}

const getters = {
    ...base.getters,
    classFilter: (state) => state.classFilter,
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
}

const actions = {
    ...base.actions,
    setClassFilter({dispatch, getters, commit}, classFilter) {
        if (getters.classFilter == classFilter) commit('setClassFilter', '')
        else commit('setClassFilter', classFilter)
        dispatch('index')
    },

    index({commit, getters}) {
        return new Promise((resolve) => {
            commit('setLoading', true)
            api_index(
                getters.searchQuery,
                getters.classFilter,
                getters.order,
                getters.orderBy,
                getters.page,
                getters.perPage,
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
}

const colors = {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
}

export default colors

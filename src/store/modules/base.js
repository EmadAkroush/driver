import {debounce} from '@/utils'

const state = {
    isLoading: false,
    data: null,
    notifications: {
        errors: [],
        success: [],
        warning: [],
        info: [],
    },

    //--- data list info
    list: [],
    listPagination: {},

    searchQuery: '',
    //--- paging parameters
    page: 1,
    perPage: undefined,
    order: 'desc',
    orderBy: undefined,

    //--- default messages
    success_msg: {
        title: 'Success',
        detail: 'Operation has been successfully done',
    },
    fail_msg: {title: 'Unsuccess', detail: 'Unsuccessful operation'},
    net_error_msg: {title: 'Net Error', detail: 'Network connection error'},
}

const getters = {
    isLoading: (state) => state.isLoading,
    data: (state) => state.data,
    notifications: (state) => state.notifications,

    list: (state) => state.list,
    listQuery: (state) => state.listQuery,
    listPagination: (state) => state.listPagination,

    searchQuery: (state) => state.searchQuery,

    page: (state) => state.page,
    perPage: (state) => state.perPage,
    order: (state) => state.order,
    orderBy: (state) => state.orderBy,
    perPageList: () => [16, 24, 36, 48],
    orderList: () => {
        return {asc: 'Ascending', desc: 'Descending'}
    },
}

const mutations = {
    setData(state, data) {
        state.data = data
    },
    setList(state, list) {
        state.list = list
    },
    setListPagination(state, meta) {
        const {current_page, from, last_page, per_page, to, total} = meta
        state.perPage = per_page;
        state.listPagination = {
            current_page,
            from,
            last_page,
            per_page,
            to,
            total,
        }
    },
    setSearchQuery(state, searchQuery) {
        state.searchQuery = searchQuery
    },
    setPage(state, page) {
        state.page = page
    },
    setPerPage(state, perPage) {
        state.perPage = perPage
    },
    setOrder(state, order) {
        state.order = order
    },
    setOrderBy(state, orderBy) {
        state.orderBy = orderBy
    },
    setLoading(state, status) {
        state.isLoading = status
    },
    /*!
    error response:
    {
        "errors":[{
          "title":"test",
          "detail":"test_detail"
        }]
    }
    */
    setErrors(state, err) {
        let errors = []
        if (err.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            if (err.response.data && err.response.data.errors) {
                errors = err.response.data.errors
            } else {
                errors = [state.fail_msg, {title: 'error', detail: err.message}]
            }
        } else if (err.request) {
            // The request was made but no response was received
            // `err.request` is an instance of XMLHttpRequest in the browser and an instance of
            // http.ClientRequest in node.js
            errors = [state.net_error_msg, {title: 'error', detail: err.message}]
        } else {
            // Something happened in setting up the request that triggered an Error
            errors = [state.fail_msg, {title: 'error', detail: err.message}]
        }
        state.notifications.errors = errors
    },

   /*!
    message response(success, warning, info):
    {
        "success":[{
          "title":"test",
          "detail":"test_detail"
        }],
        "warning":[{
          "title":"test",
          "detail":"test_detail"
        }],
        "info":[{
          "title":"test",
          "detail":"test_detail"
        }]
    }
    */
    setMessages(state, data) {
        if(data.success)
            state.notifications.success = data.success
        if(data.warning)
            state.notifications.warning = data.warning
        if(data.info)
            state.notifications.info = data.info
    },
    clearNotifications(state) {
        state.notifications.errors = []
        state.notifications.success = []
        state.notifications.warning = []
        state.notifications.info = []
    },
    clearData(state) {
        state.data = null;
    }
}

const actions = {
    setSearchQuery: debounce(({dispatch, commit}, searchQuery) => {
        commit('setSearchQuery', searchQuery)
        dispatch('index')
    }, 500),
    setPage({dispatch, commit}, page) {
        commit('setPage', page)
        dispatch('index')
    },
    setPerPage({dispatch, commit}, perPage) {
        commit('setPerPage', perPage)
        dispatch('index')
    },
    setOrder({dispatch, commit}, order) {
        commit('setOrder', order)
        dispatch('index')
    },
    setOrderBy({dispatch, getters, commit}, orderBy) {
        if (getters.orderBy == orderBy) commit('setOrderBy', '')
        else commit('setOrderBy', orderBy)
        dispatch('index')
    },
}

const base = {
    state,
    mutations,
    actions,
    getters,
}

export default base

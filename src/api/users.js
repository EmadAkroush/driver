import request from '@/utils/request'
import {parametrizer} from '@/utils'

const END_POINT = '/users';

export function index(order, order_by, page, per_page) {
    if(order_by) {
        order_by = (order_by + '').toLowerCase();
    }
    return request({
        url: `${END_POINT}`,
        method: 'get',
        params: parametrizer({order, order_by, page, per_page})
    })
}

export function create(first_name, last_name, username, password, is_admin/*,roles*/) {
    return request({
        url: `${END_POINT}`,
        method: 'post',
        params: parametrizer({first_name, last_name, username, password, is_admin/*,roles*/})
    })
}

export function update(id, username, password, first_name, last_name, is_admin) {
    return request({
        url: `${END_POINT}/${id}`,
        method: 'patch',
        params: parametrizer({first_name, last_name, username, password, is_admin})
    })
}

export function active(id, active) {
    return request({
        url: `${END_POINT}/${id}/active`,
        method: 'patch',
        params: parametrizer({active})
    })
}

export function remove(id) {
    return request({
        url: `${END_POINT}/${id}`,
        method: 'delete'
    })
}

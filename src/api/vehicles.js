import request from '@/utils/request'
import {parametrizer} from '@/utils'

const END_POINT = '/vehicles'

export function index(search_query, order, order_by, page, per_page, color_id, site_id, violation_id, class_id, from_date, to_date) {
    if(order_by) {
        order_by = (order_by + '').toLowerCase();
    }
    return request({
        url: `${END_POINT}`,
        method: 'get',
        params: parametrizer({
            search_query,
            order,
            order_by,
            page,
            per_page,
            color_id,
            site_id,
            violation_id,
            class_id,
            from_date,
            to_date
        }),
    })
}

export function remove(id) {
    return request({
        url: `${END_POINT}/${id}`,
        method: 'delete',
    })
}

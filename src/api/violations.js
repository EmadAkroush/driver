import request from '@/utils/request'
import {parametrizer} from "@/utils";

const END_POINT = '/violation_classes'

export function index(search_query, order, order_by, page, per_page) {
    return request({
        url: `${END_POINT}`,
        method: 'get',
        params: parametrizer({search_query, order, order_by, page, per_page}),
    })
}

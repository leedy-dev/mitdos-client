import { AxiosPromise } from "axios";
import { BoardSearchData, PagingInfo } from "src/models/datas/dataModel";
import apiClient from "src/services/lib/mitdAxios";

// get - get board list with page
export const getBoardWithPaging = (data: PagingInfo & BoardSearchData): AxiosPromise => {
    return apiClient.get('http://localhost:8080/api/sample/board', { params: data });
};

// post - create board
export const createBoard = (data: FormData): AxiosPromise => {
    return apiClient.post('http://localhost:8080/api/sample/board', data);
};

// delete - delete board
export const deleteBoard = (id: number): AxiosPromise => {
    return apiClient.delete('http://localhost:8080/api/sample/board/' + id);
}

// put - update board
export const updateBoard = (id: number, data: FormData): AxiosPromise => {
    return apiClient.put('http://localhost:8080/api/sample/board/' + id, data);
}
// get - get board list with page
import { AxiosPromise } from "axios";
import apiClient from "src/services/lib/mitdAxios";

export const createEventStream = (data: { userId: string }, lastEventId?: string): AxiosPromise => {
    const config = {
        headers: {
            'Last-Event-ID': lastEventId
        }
    }

    return apiClient.get('/api/sample/noitice-message/create-event-stream-by-user-id', { params: data, headers: {'Last-Event-ID': lastEventId}});
};

export const createEvent = (data: { userId: string, type: string }): AxiosPromise => {
    return apiClient.get('/api/sample/noitice-message/create-event-by-user-id', { data: data });
}
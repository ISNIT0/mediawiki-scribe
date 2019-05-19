import axios from 'axios';

export function postJSON<T>(url: string, data: { [key: string]: any }): Promise<T> {
    return axios
        .post<T>(url, data, { responseType: 'json' })
        .then((a) => a.data);
}

export function getJSON<T>(url: string, headers: { [key: string]: any } = {}): Promise<T> {
    return axios
        .get<T>(url, { headers, responseType: 'json' })
        .then((a) => a.data)
        .catch((err) => {
            console.warn(`Failed to get url [${url}]`);
            throw err;
        });
}

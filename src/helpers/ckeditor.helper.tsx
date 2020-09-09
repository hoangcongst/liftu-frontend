import CommonHelper from "./common.helper";
import { API_COMMAND } from "../types/api.type";

export default class MyUploadAdapter {
    loader: any;
    url: string;
    xhr!: XMLHttpRequest;
    constructor(loader: any) {
        // CKEditor 5's FileLoader instance.
        this.loader = loader;
        this.url = API_COMMAND.BASE_URL + API_COMMAND.STORAGE_CREATE.url
    }

    upload() {
        return this.loader.file
            .then((file: any) => new Promise((resolve, reject) => {
                this._initRequest();
                this._initListeners(resolve, reject, file);
                this._sendRequest(file);
            }));
    }

    // Aborts the upload process.
    abort() {
        if (this.xhr) {
            this.xhr.abort();
        }
    }

    // Example implementation using XMLHttpRequest.
    _initRequest() {
        const xhr = this.xhr = new XMLHttpRequest();
        xhr.open('POST', this.url, true);
        xhr.setRequestHeader("Authorization", 'Bearer ' + CommonHelper.getToken())
        xhr.responseType = 'json';
    }

    // Initializes XMLHttpRequest listeners.
    _initListeners(resolve: any, reject: any, file: any) {
        const xhr = this.xhr;
        const loader = this.loader;
        const genericErrorText = `Couldn't upload file: ${loader.file.name}.`;

        xhr.addEventListener('error', () => reject(genericErrorText));
        xhr.addEventListener('abort', () => reject());
        xhr.addEventListener('load', () => {
            const response = xhr.response;

            if (!response || response.error) {
                return reject(response && response.error ? response.error.message : genericErrorText);
            }

            // If the upload is successful, resolve the upload promise with an object containing
            // at least the "default" URL, pointing to the image on the server.
            resolve({
                default: response.data
            });
        });

        if (xhr.upload) {
            xhr.upload.addEventListener('progress', evt => {
                if (evt.lengthComputable) {
                    loader.uploadTotal = evt.total;
                    loader.uploaded = evt.loaded;
                }
            });
        }
    }

    // Prepares the data and sends the request.
    _sendRequest(file: any) {
        const data = new FormData();
        data.append('file', file);
        this.xhr.send(data);
    }
}
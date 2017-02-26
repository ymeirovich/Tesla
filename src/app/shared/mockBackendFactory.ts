
import { MockBackend, MockConnection } from '@angular/http/testing';
import { ResponseOptions, Response, BaseRequestOptions, Http } from '@angular/http';


export class MockBackendFactory {
    public mockBackendFactory = (backend: MockBackend, options: BaseRequestOptions) => {
        return new Http(backend, options);
    }
}
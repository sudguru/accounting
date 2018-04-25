import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { AuthProvider } from './auth';
import { Observable } from 'rxjs/Observable';
import { Storage } from '@ionic/storage';

@Injectable()

export class TokenInterceptor implements HttpInterceptor {
  token = 'aaa.aaa.aaa';
  constructor(public auth: AuthProvider, private storage: Storage) {
    
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });
    return next.handle(request);
  }
}

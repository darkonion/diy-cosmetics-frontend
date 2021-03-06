import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {AuthenticationService} from './authentication.service';
import {Observable} from 'rxjs';

@Injectable()
export class HttpInterceptorService implements HttpInterceptor {


  constructor(private authenticationService: AuthenticationService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (req.method !== 'GET' && this.authenticationService.isUserLoggedIn() && req.url.indexOf('basicauth') === -1) {

      const authReq = req.clone({
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: `${sessionStorage.getItem('token')}`
        })
      });
      return next.handle(authReq);
    } else {
      return next.handle(req);
    }
  }
}

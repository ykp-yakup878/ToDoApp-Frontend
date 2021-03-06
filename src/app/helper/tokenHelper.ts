import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import jwtDecode from 'jwt-decode';
import { ToastrService } from 'ngx-toastr';
import { CryptoHelper } from './cryptoHelper';

export class TokenHelper {
  cryptoHelper: CryptoHelper = new CryptoHelper();
  toastrService:ToastrService
  router:Router

  decodeToken() {
    const helper = new JwtHelperService();
    const encryptToken = localStorage.getItem('token');
    if (encryptToken) {
      try {
        const decryptToken = this.cryptoHelper.decrypted(encryptToken);
        let decodedToken = helper.decodeToken(decryptToken);
        return decodedToken != null ? decodedToken : false;
      } catch (error) {
        return false;
      }
    } else {
      return false;
    }
  }
  userRole() {
    let user =
      this.decodeToken()[
        'http://schemas.microsoft.com/ws/2008/06/identity/claims/role'
      ];
    return user;
  }
  userName() {
    let user =
      this.decodeToken()[
        'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'
      ];
    return user;
  }
  userEmail() {
    let user = this.decodeToken()['email'];
    return user;
  }
  userId() {
    let userId =
      this.decodeToken()[
        'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'
      ];
      if (userId != undefined) {
        return userId
      }
      else{
        console.log("userId yok")
        this.toastrService.error('','Kullanıcı Yok')
        this.router.navigate(['auth/login', {replaceUrl:true}])
      }
    // return userId;
  }
  userRoleExp() {
    let exp = this.decodeToken()['exp'];
    return exp;
  }
}

import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { AuthCheck } from "../services/authentication.service";

export const AuthGuard: CanActivateFn = (route, state) => {
  console.log({route, state});

  const router = inject(Router);
  const authService = inject(AuthCheck);
  const isLogged = authService.isLoggedIn;


  if (!isLogged) {
    router.navigate(['/']);
  }
  return isLogged;
}

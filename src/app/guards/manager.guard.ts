// src/app/guards/manager.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class ManagerGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const isManagerLoggedIn = !!localStorage.getItem('loggedInManager');
    if (isManagerLoggedIn) return true;

    this.router.navigate(['/manager-login']);
    return false;
  }
}

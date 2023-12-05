import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';

interface CacheEntry {
  response: HttpResponse<any>;
  expiry: number;
}

@Injectable({
  providedIn: 'root'
})
export class CacheService {
  private cache = new Map<string, CacheEntry>();

  constructor() { }

  get(url: string): HttpResponse<any> | null {
    const entry = this.cache.get(url);
    if (!entry) return null;

    const now = Date.now();
    if (now > entry.expiry) {
      this.cache.delete(url);
      return null;
    }

    return entry.response;
  }

  put(url: string, response: HttpResponse<any>, ttl: number): void {
    const expiry = Date.now() + ttl;
    this.cache.set(url, { response, expiry });
  }

  invalidate(url: string): void {
    this.cache.delete(url);
  }

  clear(): void {
    this.cache.clear();
  }
}
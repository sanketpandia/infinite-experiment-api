// cache.service.ts
import * as NodeCache from 'node-cache';

export class CacheService {
  private cache: NodeCache;

  constructor() {
    this.cache = new NodeCache();
  }

  set(key: string, value: any, ttlSeconds?: number): boolean {
    return this.cache.set(key, value, ttlSeconds);
  }

  get(key: string): any {
    return this.cache.get(key);
  }

  del(key: string): number {
    return this.cache.del(key);
  }

  flush(): void {
    this.cache.flushAll();
  }
}

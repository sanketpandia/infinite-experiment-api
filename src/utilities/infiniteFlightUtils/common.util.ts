// common-infinite-flight-utils.ts
export class CommonInfiniteFlightUtils {
  findServerIdByName(objects: any[], name: string): string | undefined {
    const server = objects.find((obj) => obj.name === name);
    return server ? server.id : undefined;
  }
}

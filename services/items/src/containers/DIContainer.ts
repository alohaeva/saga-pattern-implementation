class DIContainer {
  private readonly services: Record<string, any>;

  constructor() {
    this.services = {};
  }

  register(serviceName: string, service: any) {
    if (!this.services[serviceName]) {
      return (this.services[serviceName] = service);
    }
  }

  get<T>(serviceName: string): T {
    return this.services[serviceName];
  }
}

export const diContainer = new DIContainer();

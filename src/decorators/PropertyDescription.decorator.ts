import 'reflect-metadata';

export function PropertyDescription(description: string) {
    return function (target: any, propertyKey: string) {
        Reflect.defineMetadata('description', description, target, propertyKey);
    };
}

export function getPropertyDescription(target: any, propertyKey: string): string | undefined {
    return Reflect.getMetadata('description', target, propertyKey);
}
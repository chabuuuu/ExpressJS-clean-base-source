import 'reflect-metadata';

export function PropertyExample(example: string) {
    return function (target: any, propertyKey: string) {
        Reflect.defineMetadata('example', example, target, propertyKey);
    };
}

export function getPropertyExample(target: any, propertyKey: string): string | undefined {
    return Reflect.getMetadata('example', target, propertyKey);
}
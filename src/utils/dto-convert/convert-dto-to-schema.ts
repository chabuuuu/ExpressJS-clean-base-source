import { getPropertyDescription } from '@/decorators/PropertyDescription.decorator';
import { convertToDto } from '@/utils/dto-convert/convert-to-dto';
import 'reflect-metadata';

export function generateResponseSchema(dtoClass: any): Record<any, any> {
    const schema: Record<any, any> = {
        type: 'object',
        properties: {
            httpStatus: {
                type: 'integer',
                description: 'HTTP status code',
            },
            httpMessage: {
                type: 'string',
                description: 'HTTP status message',
            },
            error: {
                type: 'object',
                description: 'Error response',
            },
            data: {
                type: 'object',
                description: 'Data response',
                properties: {}
            }
        },
    };    
    const instance = new dtoClass();
    const instanceKeys = Object.keys(convertToDto<typeof dtoClass>(dtoClass, {}));    


    for (const key of instanceKeys) {        
        const type = Reflect.getMetadata('design:type', instance, key);
        const description = getPropertyDescription(instance, key);
        const example = Reflect.getMetadata('example', instance, key);

        let typeString = '';

        switch (type) {
            case String:
                typeString = 'string';
                break;
            case Number:
                typeString = 'integer';
                break;
            case Boolean:
                typeString = 'boolean';
                break;
            default:
                typeString = 'object';
        }

        schema.properties.data.properties[key] = {
            type: typeString,
            description: description,
            example: example,
        };
        console.log('schema', JSON.stringify(schema));
        
    }
    return schema;
}

export function generateRequestSchema(dtoClass: any): Record<any, any> {
    const schema: Record<any, any> = {
        type: 'object',
        properties: {},
    };    
    const instance = new dtoClass();
    const instanceKeys = Object.keys(convertToDto<typeof dtoClass>(dtoClass, {}));    


    for (const key of instanceKeys) {        
        const type = Reflect.getMetadata('design:type', instance, key);
        const description = getPropertyDescription(instance, key);
        const example = Reflect.getMetadata('example', instance, key);

        let typeString = '';

        switch (type) {
            case String:
                typeString = 'string';
                break;
            case Number:
                typeString = 'integer';
                break;
            case Boolean:
                typeString = 'boolean';
                break;
            default:
                typeString = 'object';
        }

        schema.properties[key] = {
            type: typeString,
            description: description,
            example: example,
        };        
    }
    return schema;
}
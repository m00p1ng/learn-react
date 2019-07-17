import 'reflect-metadata';
import { MetadataKeys } from './MetadataKeys';

export function bodyValidator(...keys: string[]) {
  return function(target: any, key: string, decs: PropertyDescriptor) {
    Reflect.defineMetadata(MetadataKeys.vaildator, keys, target, key);
  };
}

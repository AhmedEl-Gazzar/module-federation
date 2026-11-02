
    export type RemoteKeys = 'products';
    type PackageType<T> = T extends 'products' ? typeof import('products') :any;
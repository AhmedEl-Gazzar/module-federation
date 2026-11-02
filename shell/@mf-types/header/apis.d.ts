
    export type RemoteKeys = 'header';
    type PackageType<T> = T extends 'header' ? typeof import('header') :any;
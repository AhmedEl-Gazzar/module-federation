
    export type RemoteKeys = 'utils' | 'utils/add';
    type PackageType<T> = T extends 'utils/add' ? typeof import('utils/add') :T extends 'utils' ? typeof import('utils') :any;

    export type RemoteKeys = 'utils' | 'utils/add' | 'utils/button';
    type PackageType<T> = T extends 'utils/button' ? typeof import('utils/button') :T extends 'utils/add' ? typeof import('utils/add') :T extends 'utils' ? typeof import('utils') :any;
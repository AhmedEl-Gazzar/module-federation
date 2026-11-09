
    export type RemoteKeys = 'utils' | 'utils/add' | 'utils/button' | 'utils/data';
    type PackageType<T> = T extends 'utils/data' ? typeof import('utils/data') :T extends 'utils/button' ? typeof import('utils/button') :T extends 'utils/add' ? typeof import('utils/add') :T extends 'utils' ? typeof import('utils') :any;
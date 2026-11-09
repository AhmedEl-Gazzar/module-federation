import type { DataFetchParams } from '@module-federation/bridge-react/data-fetch';
export type Data = {
    message: string;
    fetchedAt: string;
    params?: DataFetchParams;
};
export declare const fetchData: (params?: DataFetchParams) => Promise<Data>;

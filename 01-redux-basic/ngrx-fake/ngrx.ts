export interface Action {
    type: string;
    payload?: any;
};

export interface Reducer<T> {
    (stado: T, action: Action): T
}

declare var System;

export function load<T>(url: string): Promise<T> {
    console.log(`load: ${url}`);
    return System.import(url);
}

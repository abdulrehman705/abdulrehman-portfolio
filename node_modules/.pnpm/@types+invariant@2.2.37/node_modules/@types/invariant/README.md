# Installation
> `npm install --save @types/invariant`

# Summary
This package contains type definitions for invariant (https://github.com/zertosh/invariant).

# Details
Files were exported from https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/invariant.
## [index.d.ts](https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/invariant/index.d.ts)
````ts
declare let invariant: invariant.InvariantStatic;

export = invariant;
export as namespace invariant;

declare namespace invariant {
    interface InvariantStatic {
        (testValue: false, format: string, ...extra: any[]): never;
        (testValue: any, format: string, ...extra: any[]): asserts testValue;
    }
}

````

### Additional Details
 * Last updated: Tue, 07 Nov 2023 03:09:37 GMT
 * Dependencies: none

# Credits
These definitions were written by [MichaelBennett](https://github.com/bennett000), [dtinth](https://github.com/dtinth), and [Turadg Aleahmad](https://github.com/turadg).

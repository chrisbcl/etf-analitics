// https://2ality.com/2015/01/es6-set-operations.html
export const difference = <T = string>(listA: T[], listB: T[]): T[] => {
    const a = new Set(listA);
    const b = new Set(listB);

    const difference = new Set([...a].filter((x) => !b.has(x)));

    return [...difference];
};

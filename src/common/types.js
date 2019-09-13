const t = {
    isString(x) {
        return typeof(x) == 'string';
    },

    isArray(x) {
        return Array.isArray(x);
    },

    isFunc(x) {
        return typeof(x) == 'function';
    },

    is(x, type) {
        return typeof(x) == type;
    },

};

export default t;

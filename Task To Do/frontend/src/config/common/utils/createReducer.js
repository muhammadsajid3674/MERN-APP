export const createReducer = (initialState, funcMap) => {
    return (state = initialState, { type, payload, keyState, service }) => {

        const handler = funcMap[type];

        return handler ? handler(state, payload, keyState, service) : state

    }

}
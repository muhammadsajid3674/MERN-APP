const protectedRoutes = (store) => (next) => (action) => {
    console.log('Dispatching:', action);
    console.log('Current State:', store.getState());

    const result = next(action);

    console.log('Updated State:', store.getState());
    return result;
};
export default protectedRoutes; 
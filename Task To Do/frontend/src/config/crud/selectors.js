import { createSelector } from 'reselect';

const selectCrud = (state) => state.crud;

export const selectCurrentItem = createSelector([selectCrud], (crud) => crud.current);

export const selectListItems = (service) =>
    createSelector([selectCrud], (crud) => crud.list[service]);

export const selectItemById = (service, itemId) =>
    createSelector(selectListItems(service), (list) => list.result.items.filter((item) => item.user === itemId));

export const selectCreatedItem = (service) => createSelector([selectCrud], (crud) => crud.create[service]);

// export const selectUpdatedItem = createSelector([selectCrud], (crud) => crud.update);

// export const selectReadItem = createSelector([selectCrud], (crud) => crud.read);

// export const selectDeletedItem = createSelector([selectCrud], (crud) => crud.delete);

// export const selectSearchedItems = createSelector([selectCrud], (crud) => crud.search);

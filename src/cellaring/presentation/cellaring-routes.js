const storageItemNew = () => import('./views/storage-item-new.vue');

const cellaringRoutes = [
    {
        path: 'items/new',
        name: 'storage-item-new',
        component: storageItemNew,
        meta: { title: 'New Storage Item' }
    }
];

export default cellaringRoutes;
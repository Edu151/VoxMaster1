const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      { path: '/Oracao', component: () => import('pages/PedidoOracao.vue') },
      { path: '/Encontros', component: () => import('pages/EncontrosInesperados.vue') },
      { path: '/Aprendizados', component: () => import('pages/Aprendizado.vue') },
      { path: '/Pubs', component: () => import('pages/Pubs.vue') },
      { path: '/Bibliadois', component: () => import('pages/BibliaDois.vue') },
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes

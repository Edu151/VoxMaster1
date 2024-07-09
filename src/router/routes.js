const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Blog.vue') },
      { path: '/Biblia', component: () => import('pages/Biblia.vue') },
      { path: '/Oracao', component: () => import('pages/PedidoOracao.vue') },
      { path: '/Quem', component: () => import('pages/QuemMeEncontrei.vue') },
      { path: '/Marcou', component: () => import('pages/Marcou.vue') },
      { path: '/admin', component: () => import('pages/Admin.vue') },
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

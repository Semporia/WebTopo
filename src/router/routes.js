import Login from '../views/Login.vue'
import Home from '../views/Home.vue'
const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/Home',
    name: 'Home',
    component: Home,
    children:[
      {
        path: '/',
   
        component: resolve => require(['../views/Projectmanage'], resolve)
    },
      {
          path: '/Projectmanage',
          component: resolve => require(['../views/Projectmanage'], resolve)
      },
      {
        path: '/usermanage',
     
        component: resolve => require(['../views/usermanage'], resolve)
    },
    {
      path: '/Facility',
      component: resolve => require(['../views/Facility'], resolve)
  },
    ]
  },
  {
    path: '/TopoLayout',
    name:'TopoLayout',
    component: () => import('layouts/TopoLayout.vue'),
    children: [
      {
        path: '', component: () => import('pages/topo/Editor.vue')
      }
    ]
  },
  {
    path: '/Fullscreenpage',
    name: 'Fullscreenpage',
    component: () => import('pages/topo/Fullscreenpage'),
  },
  {
    path: '/Fullscreen', name: 'Fullscreen',component: () => import('pages/topo/Fullscreen.vue')
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes

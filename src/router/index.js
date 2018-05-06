import Vue from 'vue'
import Router from 'vue-router'
import TemplateCreator from '@/components/TemplateCreator'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'TemplateCreator',
      component: TemplateCreator
    }
  ]
})

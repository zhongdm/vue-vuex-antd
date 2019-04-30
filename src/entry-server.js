import { createApp } from './main'

export default context => {
  return new Promise((resolve, reject) => {
    const { app, router} = createApp()
    
    router.push(context.url)
    console.log('rrr  ',router)
    router.onReady(() => {
      const matchedComponents = router.getMatchedComponents()
      console.log('comp  ', matchedComponents, matchedComponents.length)
      if (!matchedComponents.length) {
        return reject({ code: 404 })
      }

      resolve(app)
    }, reject)
  })
}

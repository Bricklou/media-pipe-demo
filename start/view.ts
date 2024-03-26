import vite from '@adonisjs/vite/services/main'
import router from '@adonisjs/core/services/router'

export function route(...args: Parameters<typeof router.makeUrl>) {
  return router.makeUrl(...args)
}

function Image(props: { src: string; alt?: string; class?: string }) {
  const url = vite.assetPath(props.src)

  return Html.createElement('img', { src: url, alt: props.alt, class: props.class })
}

function Entrypoint(props: { entrypoints: string[] }) {
  const assets = vite.generateEntryPointsTags(props.entrypoints)

  const elements = assets.map((asset) => {
    if (asset.tag === 'script') {
      return Html.createElement('script', {
        ...asset.attributes,
      })
    }

    return Html.createElement('link', {
      ...asset.attributes,
    })
  })

  return Html.createElement(Html.Fragment, {}, elements)
}

export const Vite = {
  Entrypoint,
  Image,
}

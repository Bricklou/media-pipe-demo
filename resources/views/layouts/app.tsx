import { Vite } from '#start/view'

type AppProps = Html.PropsWithChildren<{}>

export function App({ children }: AppProps): JSX.Element {
  return (
    <>
      {'<!DOCTYPE html>'}
      <html lang="fr">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <meta name="view-transitions" content="same-origin" />

          <title>Hand drawing with Media Pipe</title>

          <script defer src="https://www.webrtc-experiment.com/EBML.js"></script>
          <Vite.Entrypoint entrypoints={['resources/css/app.css', 'resources/ts/app.tsx']} />
        </head>
        <body>
          <main>{children}</main>
        </body>
      </html>
    </>
  )
}

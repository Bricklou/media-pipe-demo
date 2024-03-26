import { App } from '../layouts/app.js'

export function Home() {
  return (
    <App>
      <div class="relative">
        <div class="container mx-auto p-8 z-10 absolute top-0 left-0 w-full">
          <h1 class="font-bold text-2xl">Draw image with your hand</h1>
        </div>

        <div class="w-screen h-screen">
          <video-container />
        </div>
      </div>
    </App>
  )
}

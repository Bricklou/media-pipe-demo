import { GestureRecognizerResult, type GestureRecognizer } from '@mediapipe/tasks-vision'
import { JSX } from 'preact'
import register from 'preact-custom-element'
import { useEffect, useRef, useState } from 'preact/hooks'
import { Video } from './video'
import { Canvas } from './canvas'
import { WebcamProvider } from '../hooks/webcam'

function VideoContainer(): JSX.Element {
  const [visionRecogniser, setVision] = useState<GestureRecognizer>()
  const [visionData, setVisionData] = useState<GestureRecognizerResult | null>(null)

  useEffect(() => {
    const fetchVision = async () => {
      console.log('Loading vision recogniser')
      const { gestureRecogniser } = await import('../utils/vision')
      setVision(await gestureRecogniser())
    }

    fetchVision()
  }, [])

  let text: string | null = null

  if (visionData && visionData.gestures.length > 0) {
    const categoryName = visionData.gestures[0][0].categoryName
    const categoryScore = (visionData.gestures[0][0].score * 100).toFixed(2)
    const handedness = visionData.handedness[0][0].displayName

    text = `${categoryName} (${categoryScore}%) - ${handedness}`
  }

  if (!visionRecogniser) {
    return <p>Loading...</p>
  }

  return (
    <div class="relative mx-auto p-4">
      <WebcamProvider>
        <div class="relative w-fit mx-auto">
          <Video vision={visionRecogniser} onVisionData={setVisionData} />
          <Canvas data={visionData} />
        </div>
      </WebcamProvider>

      {visionData && <p class="absolute z-10 bottom-4">{text}</p>}
    </div>
  )
}

register(VideoContainer, 'video-container')

import { DrawingUtils, GestureRecognizer, GestureRecognizerResult } from '@mediapipe/tasks-vision'
import { useEffect, useRef } from 'preact/hooks'
import { useWebcam } from '../hooks/webcam'

interface CanvasProps {
  data: GestureRecognizerResult | null
}

export function Canvas({ data }: CanvasProps) {
  const { videoRef } = useWebcam()
  const canvasRef = useRef<HTMLCanvasElement>(null)
  if (!data) return <></>

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || !videoRef.current) return

    const context = canvas.getContext('2d')

    if (!context) return

    context.save()
    context.clearRect(0, 0, canvas.width, canvas.height)
    canvas.width = videoRef.current.videoWidth
    canvas.height = videoRef.current.videoHeight

    const drawingUtils = new DrawingUtils(context)

    if (data.landmarks) {
      for (const landmarks of data.landmarks) {
        drawingUtils.drawConnectors(landmarks, GestureRecognizer.HAND_CONNECTIONS, {
          color: '#00FF00',
          lineWidth: 4,
        })

        drawingUtils.drawLandmarks(landmarks, {
          color: '#FF0000',
          lineWidth: 1,
        })
      }
    }
    context.restore()

    return () => {
      context.clearRect(0, 0, canvas.width, canvas.height)
    }
  }, [data])

  return (
    <canvas
      ref={canvasRef}
      class="z-1 absolute pointer-events-none left-0 top-0  max-h-full h-full"
    />
  )
}

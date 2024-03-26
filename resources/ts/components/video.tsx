import { GestureRecognizerResult, type GestureRecognizer } from '@mediapipe/tasks-vision'
import { useEffect, useLayoutEffect, useRef, useState } from 'preact/hooks'
import { useWebcam } from '../hooks/webcam'

interface VideoProps {
  vision: GestureRecognizer
  onVisionData: (data: GestureRecognizerResult | null) => void
}

export function Video({ vision, onVisionData }: VideoProps) {
  const { videoRef, stream } = useWebcam()
  const [lastVideoTime, setLastVideoTime] = useState<number>(-1)
  let interval: number
  const [timeout, setTimeout] = useState<number | null>(null)

  const requestRef = useRef<number>()

  const renderVideoFrame = () => {
    const video = videoRef.current
    if (!video) return

    if (!video.videoWidth) {
      window.setTimeout(() => {
        renderVideoFrame()
      }, 100)
      return
    }

    if (video.currentTime !== lastVideoTime) {
      const gestureRecognitionResult = vision.recognizeForVideo(video, Date.now())
      onVisionData(gestureRecognitionResult)
      setLastVideoTime(video.currentTime)
    }

    requestRef.current = requestAnimationFrame(() => renderVideoFrame())
  }

  useEffect(() => {
    return () => {
      if (timeout) {
        clearTimeout(timeout)
      }
    }
  }, [])

  useLayoutEffect(() => {
    if (!videoRef.current) return

    requestRef.current = requestAnimationFrame(() => {
      renderVideoFrame()
    })

    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current)
      }
      if (interval) {
        clearInterval(interval)
      }
    }
  }, [stream])

  return (
    <video
      class="bg-gray-100 rounded-sm max-h-full h-full"
      autoPlay
      playsInline
      reversed
      ref={videoRef}
    />
  )
}

import { RefObject, createContext } from 'preact'
import { PropsWithChildren } from 'preact/compat'
import { useCallback, useContext, useEffect, useRef, useState } from 'preact/hooks'

interface WebcamHook {
  videoRef: RefObject<HTMLVideoElement>
  stream: MediaStream | null
}

const WebcamContext = createContext<WebcamHook | undefined>(undefined)

type WebcamProviderProps = PropsWithChildren<{}>

export function WebcamProvider({ children }: WebcamProviderProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [stream, setStream] = useState<MediaStream | null>(null)

  useEffect(() => {
    requestWebcam()

    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop())
      }
      if (videoRef.current) {
        videoRef.current.srcObject = null
      }
    }
  }, [videoRef])

  const requestWebcam = useCallback(async () => {
    if (!videoRef.current) return

    try {
      console.log('Accessing webcam')
      const createdStream = await navigator.mediaDevices.getUserMedia({ video: true })
      const video = videoRef.current!
      video.srcObject = createdStream
      video.play()

      setStream(createdStream)
      console.log('Webcam ready')
    } catch (error) {
      console.error('Error accessing webcam:', error)
      setStream(null)
    }
  }, [videoRef])

  const webcam = {
    videoRef,
    stream,
  }

  return <WebcamContext.Provider value={webcam}>{children}</WebcamContext.Provider>
}

export function useWebcam(): WebcamHook {
  const context = useContext(WebcamContext)
  if (!context) {
    throw new Error('useWebcam must be used within a WebcamProvider')
  }
  return context
}

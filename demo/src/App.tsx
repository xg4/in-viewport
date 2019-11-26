import React, { useEffect, useRef } from 'react'
import InViewport from '../../src'

const BoxStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  fontSize: '20px'
}

const App: React.FC = () => {
  const iv = new InViewport()
  const aEl = useRef<HTMLDivElement>(null)
  const cEl = useRef<HTMLDivElement>(null)
  const dEl = useRef<HTMLDivElement>(null)
  const bEl = useRef<HTMLDivElement>(null)
  const eEl = useRef<HTMLDivElement>(null)
  const fEl = useRef<HTMLDivElement>(null)
  useEffect(() => {
    iv.on(
      aEl.current,
      () => {
        console.log('a 进入视图')
      },
      () => {
        console.log('a 离开视图')
      }
    )

    iv.on({
      el: aEl.current,
      onEnter: () => {
        console.log('a 进入视图2')
      },
      onLeave: () => {
        console.log('a 离开视图2')
      },
      once: true
    })

    iv.once(bEl.current, {
      onEnter: () => {
        console.log('b 进入视图')
      },
      onLeave: () => {
        console.log('b 离开视图')
      }
    })

    iv.once(
      cEl.current,
      () => {
        console.log('c 进入视图')
      },
      () => {
        console.log('c 离开视图')
      }
    )

    iv.on(dEl.current, {
      onEnter: () => {
        console.log('d 进入视图')
      },
      onLeave: () => {
        console.log('d 离开视图')
      }
    })

    iv.on({
      el: eEl.current,
      onEnter: () => {
        console.log('e 进入视图')
      },
      onLeave: () => {
        console.log('e 离开视图')
      }
    })
  }, [])
  return (
    <div className="container">
      <div
        ref={aEl}
        style={{
          ...BoxStyle,
          height: '200px',
          background: '#eee'
        }}
      >
        A
      </div>
      <div
        ref={bEl}
        style={{
          ...BoxStyle,
          height: '800px',
          background: '#333',
          color: '#fff'
        }}
      >
        B
      </div>
      <div
        style={{
          display: 'flex'
        }}
      >
        <div
          ref={cEl}
          style={{
            ...BoxStyle,
            flex: 1,
            color: '#333',
            backgroundColor: '#f90'
          }}
        >
          C
        </div>
        <div
          ref={dEl}
          style={{
            ...BoxStyle,
            flex: 1,
            color: '#333',
            backgroundColor: '#f9f'
          }}
        >
          D
        </div>
        <div
          ref={eEl}
          style={{
            ...BoxStyle,
            flex: 1,
            color: '#333',
            backgroundColor: '#99f'
          }}
        >
          E
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <button
          onClick={() => {
            iv.on(
              fEl.current,
              () => {
                console.log('f 进入视图')
              },
              () => {
                console.log('f 离开视图')
              }
            )
          }}
          style={{
            margin: '0 20px'
          }}
        >
          监听 F
        </button>
        <button
          onClick={() => {
            iv.off(fEl.current)
          }}
        >
          取消监听 F
        </button>
      </div>
      <div
        ref={fEl}
        style={{
          ...BoxStyle,
          height: '200px',
          background: '#eee'
        }}
      >
        F
      </div>
    </div>
  )
}

export default App

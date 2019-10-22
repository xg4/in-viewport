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
    aEl.current &&
      iv.on(aEl.current, {
        onEnter: () => {
          console.log('a 进入视图')
        },
        onLeave: () => {
          console.log('a 离开视图')
        }
      })
    bEl.current &&
      iv.once(bEl.current, {
        onEnter: () => {
          console.log('b 进入视图')
        },
        onLeave: () => {
          console.log('b 离开视图')
        }
      })
    cEl.current &&
      iv.once(
        cEl.current,
        () => {
          console.log('c 进入视图')
        },
        () => {
          console.log('c 离开视图')
        }
      )
    dEl.current &&
      iv.on(dEl.current, {
        onEnter: () => {
          console.log('d 进入视图')
        },
        onLeave: () => {
          console.log('d 离开视图')
        }
      })
    eEl.current &&
      iv.on(eEl.current, {
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
      <button style={{ display: 'flex', justifyContent: 'center' }}>
        <button
          onClick={() => {
            fEl.current &&
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
            fEl.current && iv.off(fEl.current)
          }}
        >
          取消监听 F
        </button>
      </button>
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

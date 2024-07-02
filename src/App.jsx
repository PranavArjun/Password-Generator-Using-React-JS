import { useState, useCallback ,useEffect , useRef} from 'react'


function App() {
  const [length, setLength] = useState(8)
  const [numberAllow, setNumberAllow] = useState(false)
  const [charAllow, setCharAllow] = useState(false)
  const [password, setPassword] = useState("")

  const passref = useRef(null)

  const passgenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if (numberAllow) str += "1234567890"
    if (charAllow) str += "!@#$%^&*(){}"

    for (let i = 0; i <length; i++) {
      let index = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(index)
    }

    setPassword(pass)

  }, [length, numberAllow, charAllow, setPassword])

  const copyPasswordToClipboard = useCallback(()=>{
      passref.current?.select()
      passref.current?.setSelectionRange(0,20)
      window.navigator.clipboard.writeText(password)
  },[password])

  useEffect(()=>{
    passgenerator()
  },[length,numberAllow,charAllow,passgenerator])


  return (
    <div className='h-screen flex items-center justify-center bg-slate-950'>
    <div className="w-full  max-w-md mx-auto shadow-md rounded-lg px-4 py-3  bg-gray-800 text-orange-500">
      <h1 className='text-white text-center my-3'>Password generator</h1>
      <div className="flex shadow rounded-lg overflow-hidden mb-4">
        <input
          type="text"
          value={password}
          className="outline-none w-full py-1 px-3"
          placeholder="Password"
          readOnly
          ref={passref}
        />
        <button
          onClick={copyPasswordToClipboard}
          className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'
        >copy</button>

      </div>
      <div className='flex text-sm gap-x-2'>
        <div className='flex items-center gap-x-1'>
          <input
            type="range"
            min={8}
            max={20}
            value={length}
            onChange={(e)=>setLength(e.target.value)}
            className='cursor-pointer'
          />
          <label>Length: {length}</label>
        </div>
        <div className="flex items-center gap-x-1">
          <input
            type="checkbox"
            defaultChecked={numberAllow}
            id="numberInput"
            onChange={()=>{
              setNumberAllow((prev)=>!prev);
            }}
            
          />
          <label htmlFor="numberInput">Numbers</label>
        </div>
        <div className="flex items-center gap-x-1">
          <input
            type="checkbox"
            defaultChecked={charAllow}
            id="characterInput"
            onChange={()=>{
              setCharAllow((prev)=>!prev);
            }}
            
          />
          <label htmlFor="characterInput">Characters</label>
        </div>
      </div>
    </div>
    </div>
  )
}

export default App

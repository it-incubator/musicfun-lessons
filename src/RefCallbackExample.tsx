import {useCallback, useEffect, useRef, useState} from "react";

export const RefCallbackExample = () => {
  const ref = useRef<HTMLInputElement | null>(null);
  const [search, setSearch] = useState('');

  // useEffect(() => {
  //   if (!ref.current) return;
  //   ref.current.focus();
  // }, []);

    useEffect(() => {
        return  () => {
            console.log('Cleanup USEEFFECT')
        }
    }, []);

  const refCallback = useCallback((xxx: HTMLInputElement | null) => {
      console.log('callback, xxx: ' + xxx)
      if (!xxx) return;

      ref.current = xxx;
      ref.current.focus();

      return () => {
          console.log('refCallback CLEANUP');
          ref.current = null;
      }
  }, [])

  return <div>
    <input  value={search} onChange={e => setSearch(e.target.value)} />
      {search.length < 3 && <input ref={refCallback}  />}
    </div>
}



export const RefCallbackExample1 = () => {
    const ref = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        if (!ref.current) return;
        ref.current.focus();
    }, []);

    return <div>
        <input  />
        <input ref={(xxx) => {
            ref.current = xxx;
        }}  />
    </div>
}

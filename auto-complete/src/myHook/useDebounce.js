import react,{useState , useEffect} from 'react'

function useDebounce(value, delay , setIsSearching) {

    const [debouncedValue, setDebouncedValue] = useState(value);
  
    useEffect(
      () => {
        const handler = setTimeout(() => {
          setDebouncedValue(value);
        }, delay);
        setIsSearching(true)
        
        return () => {
          clearTimeout(handler);
        };
      },
      [value, delay] 
    );
  
    return debouncedValue;
}
export default useDebounce;
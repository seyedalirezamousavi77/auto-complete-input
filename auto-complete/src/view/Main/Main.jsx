import React, { useState, useEffect } from 'react';
import useDebounce from '../../myHook/useDebounce'

function Main() {

    const [searchTerm, setSearchTerm] = useState('');
    const [results, setResults] = useState([]);
    const [isSearching, setIsSearching] = useState(false);
    const [all, setAll] = useState(['ali', 'alireza', 'aliReza', 'Ali', 'mohammad', 'mohammadReza', 'mohsen'])
    const debouncedSearchTerm = useDebounce(searchTerm, 3000);

    useEffect(
        () => {
            if (searchTerm.length > 3) {
                setIsSearching(true);
                setResults(all.filter(item => item.startsWith(searchTerm)));
            } else {
                setResults([]);
            }
            setIsSearching(false);
        },
        [debouncedSearchTerm]
    );
    
    return (
        <div>
            <input
                placeholder="Search Marvel Comics"
                onChange={e => setSearchTerm(e.target.value)}
            />

            {isSearching && <div>Searching ...</div>}

            {
                results.map(result => (
                    <div>
                        <h4>{result}</h4>
                    </div>
                ))
            }
        </div>
    );
}
export default Main
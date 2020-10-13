import React, { useState, useEffect } from 'react';
import useDebounce from '../../myHook/useDebounce'
import './Main.css'

function Main() {

    const [searchTerm, setSearchTerm] = useState('');
    const [results, setResults] = useState([]);
    const [isSearching, setIsSearching] = useState(false);
    const [all, setAll] = useState(['ali', 'alireza', 'aliReza', 'Ali', 'mohammad', 'mohammadReza', 'mohsen'])
    const debouncedSearchTerm = useDebounce(searchTerm, 322000, setIsSearching);

    useEffect(
        () => {
            setIsSearching(false);
            if (searchTerm.length > 3) {
                setResults(all.filter(item => item.startsWith(searchTerm)));
            } else {
                setResults([]);
            }
        },
        [debouncedSearchTerm]
    );

    return (
        <div>
            <input
                placeholder="Search Marvel Comics"
                onChange={e => setSearchTerm(e.target.value)}
            />

            <div className={searchTerm.length > 3 ? 'd-auto' : 'd-none'}>
                {isSearching && <div>Searching ...</div>}
                {
                    results.map(result => (
                        <div>
                            <h4>{result}</h4>
                        </div>
                    ))
                }
            </div>
        </div>
    );
}
export default Main
import React, { useState, useEffect } from 'react';
import useDebounce from '../../myHook/useDebounce'
import './Main.css'

import { css } from "@emotion/core";
import { ClipLoader } from "react-spinners";
import { Container } from 'react-bootstrap';

const override = css`
  position: absolute;
  top:8.75rem;
  right:25.5%;
  display: block;
  width:2rem;
  height:2rem;
  margin: 0 auto;
  border: .35rem solid;
  border-color: #00fff0;
  border-bottom-color: transparent;
`;

function Main() {

    const [searchTerm, setSearchTerm] = useState('');
    const [results, setResults] = useState([]);
    const [isSearching, setIsSearching] = useState(false);
    const [all, setAll] = useState(['ali', 'alireza', 'aliReza', 'Ali', 'mohammad', 'mohammadReza', 'mohsen'])
    const debouncedSearchTerm = useDebounce(searchTerm, 3000, setIsSearching);

    useEffect(
        () => {
            setIsSearching(false);
            setResults([])
            if (searchTerm.length > 2) {
                setResults(all.filter(item => item.startsWith(searchTerm)));
            } else {
                setResults([]);
            }
        },
        [debouncedSearchTerm]
    );

    const handleAutoComplete = (e) =>{
        e.preventDefault();
        setSearchTerm(e.target.innerHTML)
    }
    return (
        <Container fluid className="px-0 mx-0 bg-img pt-5">

            <h2 className="text-center text-light">
                please enter the name
            </h2>
            <input
                className="w-50 mx-auto mt-5 d-flex justify-content-center my-input"
                onChange={e => setSearchTerm(e.target.value)}
                autoComplete="true"
                value={searchTerm}
            />
            {
                searchTerm.length > 2 ?
                    <>
                        {isSearching && <div>
                            <ClipLoader
                                css={override}
                            />
                        </div>}
                        <div className="w-50 mx-auto text-white pl-3 mt-3 bg-result">
                            {
                                results.map((result , index) => (
                                    <div key={index}>
                                        <h4 className="w-50 mt-2" onClick={handleAutoComplete}>{result}</h4>
                                    </div>
                                ))
                            }
                        </div>
                    </> :
                    <h2  className="w-50 mx-auto text-white pl-3 mt-3 bg-result">
                        you should enter 3 charactor for see autocomplete
                    </h2>
                } 
                
            
        </Container >
    );
}
export default Main
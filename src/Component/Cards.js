import React, {useEffect, useState} from 'react';
import Card from "./Card";
import axios from "axios";

const Cards = ({category}) =>{
    const [categories, setCategories] = useState([]);
    const [joke, setJoke] = useState('');
    const [showJokeContainer, setShowJokeContainer] = useState(false);
    const [selected, setSelected] = useState('')
    const [loadingJoke, setLoadingJoke] = useState(false);
    const [loadingPage, setLoadingPage] = useState(false);
    const [id, setId] = useState(null);
    let handleClick;
    useEffect(() => {
        setLoadingPage(true);
        axios
            .get('https://api.chucknorris.io/jokes/categories')
            .then((response) => {
                setCategories(response.data);
                console.log(response.data);
                setLoadingPage(false);
            })
            .catch((error) => {
                console.error(error);
                setLoadingPage(false);
            });
    }, []);
    async function getJoke(){
        setLoadingJoke(true);
        axios
            .get(`https://api.chucknorris.io/jokes/random?category=${selected}`)
            .then((response) => {
                setJoke(response.data.value);
                setLoadingJoke(false);
            })
            .catch((error) => {
                console.log(error);
                setLoadingJoke(false);
            });

    }
    useEffect(() => {
        if (selected) {
            getJoke();
        }
    }, [selected])
    return (
        <>
            {loadingPage ?

                <div className="flex items-center justify-center m-16">
                    <div className="flex space-x-2">
                        <div className="w-4 h-10 bg-blue-50 animate-bounce400"></div>
                        <div className="w-4 h-10 bg-blue-50 animate-bounce200"></div>
                        <div className="w-4 h-10 bg-blue-50 animate-bounce"></div>
                    </div>
                </div>

                :

                <div>
                    <h3 className='text-4xl animate-bounce font-bold text-green-500 m-3'>Chuck Norries</h3>
                    <div className='grid md:grid-cols-2 grid-cols-4 gap-x-6 gap-y-8 m-3'>
                        {
                            categories.map((category, index) => (
                                <Card
                                    key = {index}
                                    handleClick={
                                        handleClick = () =>{
                                            setShowJokeContainer(true);
                                            setId(index);
                                            setSelected(category);
                                            console.log(selected);
                                        }}
                                    title = {category}
                                />
                            ))
                        }
                    </div>
                </div>
            }
            {selected &&
                <div className={`${showJokeContainer ? ' text-white block absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] sm:w-full w-[50vw] bg-gradient-to-r from-sky-800 to-gray-950 p-5' : 'hidden'} `}>
                <button className='float-right' onClick={() => {
                    setShowJokeContainer(false);
                    setId(null);
                }}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="ionicon w-6 aspect-auto text-white fill-current"
                         viewBox="0 0 512 512">
                        <path
                            d="M289.94 256l95-95A24 24 0 00351 127l-95 95-95-95a24 24 0 00-34 34l95 95-95 95a24 24 0 1034 34l95-95 95 95a24 24 0 0034-34z"/>
                    </svg>
                </button>
                <h4 className='font-bold text-3xl capitalize'>{selected}</h4>
                <div className='border-2 border-solid border-black mt-6'>
                    {loadingJoke ?
                        (
                            <div className='h-full w-full flex items-center justify-center text-white'>
                                <svg className='animate-spin fill-current w-14 aspect-auto' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M304 48a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zm0 416a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM48 304a48 48 0 1 0 0-96 48 48 0 1 0 0 96zm464-48a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM142.9 437A48 48 0 1 0 75 369.1 48 48 0 1 0 142.9 437zm0-294.2A48 48 0 1 0 75 75a48 48 0 1 0 67.9 67.9zM369.1 437A48 48 0 1 0 437 369.1 48 48 0 1 0 369.1 437z"/></svg>
                            </div>
                        ) :
                        (<p className='m-5 font-bold sm:text-xl text-3xl'> "{joke}" </p>)}
                    <button
                        className='m-3 bg-blue-600 w-[60%] sm:w-[105px] h-[40px] text-black font-bold text-base rounded-xl hover:bg-blue-500'
                        onClick={getJoke}>Next joke
                    </button>
                </div>
            </div>}
        </>
    );
}

export default Cards;

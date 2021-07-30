import React, { useEffect, useState } from 'react'
import { requestAthorQuotes, requestRandomQuote } from '../api/api'
import preloader from '../img/preloader.gif'
import search from '../img/search.png'
import cn from 'classnames'

export const Quotes = (props) => {

	useEffect(() => {
		getRandomQuote()
	}, [])

	const [isFetching, setIsFetching] = useState(true)
	const [quotes, setQuotes] = useState([])
	const [author, setAuthor] = useState('')
	const [quoteIndex, setQuoteIndex] = useState(0)
	const listQuotes = quotes.map(q => q.quoteText);
	const listAuthors = quotes.map(q => q.quoteAuthor);

	const changeAuthorInput = (e) => {
		setAuthor(e.target.value)
		console.log(e.target);
	}

	const getAuthorByKey = (e) => {
		if (e.key === 'Enter') {
			console.log('key');
			getAuthor()
		}
	}

	const getAuthor = async () => {
		setIsFetching(true)
		if (author) {
			const r = await requestAthorQuotes(author)
			setQuotes(r.data.data)
			setIsFetching(false)
		} else {
			getRandomQuote()
		}
		setQuoteIndex(0)

	}

	const getRandomQuote = async () => {
		setIsFetching(true)
		const r = await requestRandomQuote()
		setQuotes(r.data.data)
		setQuoteIndex(0)
		setIsFetching(false)
	}

	const changeIndexUp = () => {
		if (quoteIndex + 1 < listQuotes.length) {
			setQuoteIndex((prev) => prev + 1)
		}
	}
	const changeIndexDown = () => {
		if (quoteIndex - 1 >= 0) {
			setQuoteIndex((prev) => prev - 1)
		}
	}

	return (
		<div>
			{isFetching ? <div><img src={preloader} alt="" /></div> :
				<div>
					<div className='chooseAuthor'>
						<input onKeyPress={getAuthorByKey} placeholder='Search an author' value={author} onChange={changeAuthorInput} />
						<button onClick={getAuthor} className='searchBtn'><img className='searchIco' src={search} alt='search' /></button>
					</div>
					<div className={'quotes'}>
						<div className={'quote'}>{listQuotes[quoteIndex]} </div>
						<div className={'author'}> {listAuthors[quoteIndex]}</div>
						{listQuotes.length > 1 && <div className='switchBtns'>
							<button className={cn({ 'cursorNone': quoteIndex === 0 })} onClick={changeIndexDown}> &#8592; Previos</button>
							<button className={cn({ 'cursorNone': quoteIndex + 1 === listQuotes.length })} onClick={changeIndexUp}> Next &#8594;</button>
						</div>}
					</div>
				</div>}
		</div >
	)
}
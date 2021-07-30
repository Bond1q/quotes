import axios from "axios";


export const requestAthorQuotes = async (author) => {
	try {
		const response = await axios.get(`https://quote-garden.herokuapp.com/api/v3/quotes?author=${author}&limit=999`)
		return response
	} catch (error) {
		return {
			data: {
				data: {
					quoteText: 'problem'
				}
			}
		}
	}

}
export const requestRandomQuote = async () => {
	try {
		const response = await axios.get(`https://quote-garden.herokuapp.com/api/v3/quotes/random`)
		return response
	} catch (error) {
		return {
			data: {
				data: {
					quoteText: 'problem'
				}
			}
		}
	}
}

const letters = [
	['a', 'b', 'c', 'd'],
	['e', 'f', 'g', 'h'],
	['i', 'j', 'k', 'l'],
	['m', 'n', 'o', 'p'],
	['q', 'r', 's', 't'],
	['u', 'v', 'w', 'x', 'y', 'z']
]

const getFirstLetter = (name: string): string => {
	return name.charAt(0).toLowerCase()
}

const getLetterIndex = (name: string): number => {
	const letter = getFirstLetter(name)

	let index = 0
	letters.forEach((array: string[], i: number) => {
		if (array.includes(letter)) {
			if (typeof i === 'number') {
				index = i
			}
		}
	})
	return index
}

const getLetter = (name: string): string => {
	return letters[getLetterIndex(getFirstLetter(name))][0]
}

export { getLetter, getLetterIndex, getFirstLetter }

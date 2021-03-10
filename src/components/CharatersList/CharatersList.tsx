import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import CharacterItem from '../CharacterItem/CharacterItem';
import Filter from '../Filter/Filter';
import Suggest from '../Suggest/Suggest';

interface State {
	characters: {name: string, mass: string}[];
	isLoaded: boolean;
	error?: string;
	filteredData?: boolean;
	selected: {}[];
}

export default () => {
	const initaialState: State = {
		characters: [],
		isLoaded: false,
		filteredData: false,
		selected: [],
	};
	const [state, setState] = useState(initaialState);
    const dispatch = useDispatch()
	useEffect(() => {
		const getDatat = (url: string) => {
			fetch(url)
				.then((res) => res.json())
				.then(
					(result) => {
						setState((prevState: State) => {
							return {
								...prevState,
								isLoaded: true,
								characters: [
									...prevState.characters,
									...result.results,
								],
							};
						});

						if (result.next) {
							getDatat(result.next);
						}
					},
					(error) => {
						setState({
							...state,
							isLoaded: true,
							error,
						});
					}
				);
		};
		getDatat('https://swapi.dev/api/people/');
	}, []);

	useEffect(() => {
		state.filteredData &&
			setState((prevState: State) => {
				return {
					...prevState,
					characters: prevState.characters.sort((a, b) =>
						a.name.localeCompare(b.name)
					),
				};
			});
	}, [state.filteredData]);

	const onFilterClick = () => {
		setState((prevState: State) => {
			return {
				...prevState,
				filteredData: true,
			};
		});
	};
    

	const onCharacterSelect = (character: {name: string, mass: string}) => {
        dispatch({ type: 'SHOW_SUGGESTION', payload: character})
	};

	return (
		<>
			{state.isLoaded ? (
				<section>
					<h1>List of characters</h1>
					<Filter onClick={onFilterClick} />
					<ul>
						{state.characters.map((character) => {
							return (
								<CharacterItem
									character={character}
									key={`${character.name}-${character.mass}`}
									onClick={() => onCharacterSelect(character)}
								/>
							);
						})}
					</ul>
					<Suggest />
				</section>
			) : (
				<h1>Loading...</h1>
			)}
		</>
	);
};

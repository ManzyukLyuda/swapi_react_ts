
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import SuggestList from '../SuggestList/SuggestList';

interface State {
    reducer?: { selected: any; };
	films: { link: string; details: { release_date: number; title: string; episode_id: string; }; count: number}[];
	isLoaded: boolean;
	error?: string;
}

export default () => {
	const initaialState: State = {
		films: [],
		isLoaded: false,
	};
	const [state, setState] = useState(initaialState);
	let selected: any[] = [];
	useSelector((state: State) => {
		selected.push(...state.reducer!.selected);
	});
    const getDatat = (film: { link: string; details: { release_date: number; title: string; episode_id: string; }; count: number}) => {
        fetch(film.link)
            .then((res) => res.json())
            .then(
                (result) => {
                    film.details = result
                    console.log(film)
                    setState((prevState)=> {
                        result.count = 0;
                        return {
                            ...prevState,
                            isLoaded: true,
                            films: [...prevState.films, film],
                        };
                    })
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

    let films: { link: string; details: { release_date: number; title: string; episode_id: string; }; count: number}[] = [];
    selected.forEach((character) => {
		character.films.forEach((link: string) => {
            let linkToFilm = link;
            let object = {
                link: linkToFilm,
                count: 1,
                details: { release_date: 0, title: '', episode_id: '' }
            }
            var index = films.findIndex(film => film.link === object.link);
            if (index > -1){
                films[index].count+=1
            }
            else films.push(object);
        });
    });
	useEffect(() => {
        films.map(film=> getDatat(film))		
	}, []);


	return (
		<section>
			<h1>Suggestions</h1>
            {state.isLoaded ? 	<SuggestList films={state.films}/> : 
            <h1>Loading ...</h1>
            }
		
		</section>
	);
};

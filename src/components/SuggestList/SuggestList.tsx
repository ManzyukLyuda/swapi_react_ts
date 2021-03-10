/* eslint-disable import/no-anonymous-default-export */
import React from 'react';
type Film = {
    count: number, details: {release_date: number, title: string, episode_id: string}
}

interface State {
    films: Film[]
}
export default (state: State) => {
	return (
		<ul>
			{state.films
				.sort(
					(a, b) =>
						b.count! - a.count! ||
						b.details!.release_date - a.details!.release_date
				)
				.map(
					(
						film: {
							details: {
								title: string;
								episode_id: string;
								release_date: string | number | Date;
							};
						},
						index: number
					) => (
						<li
							key={`#${film.details.title + index}-${
								film.details.episode_id
							}`}>
							<p className="title">
								{film.details.title} 
							</p>
                            <p>episode: {film.details.episode_id}</p>
							<p>
								Release Date: {new Date(
									film.details.release_date
								).getFullYear()}
							</p>
						</li>
					)
				)}
		</ul>
	);
};
import { FC, FormEvent, useEffect, useState } from "react";
import "./App.css";

const App: FC = () => {
	const [input, setInput] = useState("");
	const [queue, setQueue] = useState<Array<number>[]>([[2, 5, 5], [3, 1, 9], [1, 5, 1], [6], [22]]);

	useEffect(() => {
		const interval = setInterval(() => {
			setQueue((prevQueue) => {
				return prevQueue.map((line) =>
					[line[0] - 1, ...line.slice(1)].filter((value) => value > 0)
				);
			});
		}, 500);

		return () => {
			clearInterval(interval);
		};
	}, []);

	const addItemToQueue = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		let maxItems = 1e9;
		let shortestQueue: number[];

		queue.map((item) => {
			const total = item.reduce((sum, value) => sum + value, 0);
			if (total < maxItems) {
				maxItems = total;
				shortestQueue = item;
			}
		});

		setQueue((prevQueue) =>
			prevQueue.map((item) => (item === shortestQueue ? [...item, parseInt(input)] : item))
		);
	};

	return (
		<main>
			<form onSubmit={addItemToQueue}>
				<div className="flex gap-3 mb-5">
					<input
						required
						type="number"
						className="rounded"
						value={input}
						onChange={(e) => setInput(e.currentTarget.value)}
					/>
					<button>checkout</button>
				</div>
			</form>

			<div className="flex flex-row gap-5">
				{queue.map((items, id) => (
					<div key={id}>
						Line {id + 1}
						{items.map((item, id) => (
							<div key={id}>{item}</div>
						))}
					</div>
				))}
			</div>
		</main>
	);
};

export default App;

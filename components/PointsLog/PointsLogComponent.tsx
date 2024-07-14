function PointsLogComponent({
	id,
	title,
	createdAt,
	points,
}: {
	id: string;
	title: string;
	createdAt: string;
	points: string;
}) {
	return (
		<div
			className="flex justify-between items-center border-b border-gray-200 py-2"
			key={id}
		>
			<div>
				<p className="text-gray-800 font-semibold">{title}</p>
				<p className="text-gray-500 text-sm">{createdAt}</p>
			</div>
			<p className="text-gray-800 font-semibold">{points} Points</p>
		</div>
	);
}

export default PointsLogComponent;

// import Image from "next/image";
// import PointsBreakdown from "./points-breakdown";

// function RankTableComponent({
// 	// userName,
// 	// schoolName,
// 	// gender,
// 	// userRank,
// 	// qualification,
// 	// role,
// 	// points,
// 	// assignmentPoints,
// 	// quizPoints,
// 	// lecturePoints,
// 	topRankers,
// }: {
// 	// userName: string;
// 	// schoolName: string;
// 	// gender: string;
// 	// userRank: string;
// 	// qualification: string;
// 	// role: string;
// 	// points: number;
// 	// assignmentPoints: number;
// 	// quizPoints: number;
// 	// lecturePoints: number;
// 	topRankers: Array<{
// 		userName: string;
// 		schoolName: string;
// 		gender: string;
// 		userRank: string;
// 		qualification?: string;
// 		role: string;
// 		points: string;
// 		assignmentPoints: string;
// 		quizPoints: string;
// 		lecturePoints: string;
// 	}>;
// }) {
// 	return (
// 		<>
// 			<div className="flex flex-col w-full">
// 				<table>
// 					<thead>
// 						<tr>
// 							<th className="text-center pb-4 px-2 text-[#bbb]">
// 								{""}
// 							</th>
// 							<th className="text-center pb-4 px-2 text-[#bbb]">
// 								{""}
// 							</th>
// 							<th className="text-center pb-4 px-2 text-[#bbb]">
// 								School
// 							</th>
// 							<th className="text-center pb-4 px-2 text-[#bbb]">
// 								Points
// 							</th>
// 						</tr>
// 					</thead>
// 					<tbody>
// 						{topRankers.map((ranker, index) => {
// 							return (
// 								<tr className="bg-white shadow-lg shadow-gray-500/.5 mt-[20px]">
// 									<td>
// 										<div className="bg-white p-[20px]">
// 											{ranker.userRank}
// 										</div>
// 									</td>
// 									<td>
// 										<div className="bg-white p-[20px] flex items-center">
// 											{ranker.gender === "female" ? (
// 												<Image
// 													alt=""
// 													className="object-cover items-center w-[40px] h-auto mr-[10px]"
// 													src={"/assets/female.png"}
// 													width={600}
// 													height={600}
// 												/>
// 											) : (
// 												<Image
// 													alt=""
// 													className="object-cover items-center w-[40px] h-auto mr-[10px]"
// 													src={"/assets/male.png"}
// 													width={600}
// 													height={600}
// 												/>
// 											)}
// 											{ranker.userName}
// 										</div>
// 									</td>
// 									<td>
// 										<div className="bg-white p-[20px] flex justify-center">
// 											{ranker.schoolName}
// 										</div>
// 									</td>
// 									<td>
// 										<div className="bg-white p-[20px] flex justify-center">
// 											<span className="py-1 px-2 rounded-full text-[#333] bg-[#8640cd27]">
// 												{/* ⭐ 400+ Points */}
// 												<PointsBreakdown
// 													userName={ranker.userName}
// 													schoolName={
// 														ranker.schoolName
// 													}
// 													userRank={ranker.userRank}
// 													qualification={
// 														ranker.qualification
// 													}
// 													role={ranker.role}
// 													points={ranker.points}
// 													assignmentPoints={
// 														ranker.assignmentPoints
// 													}
// 													quizPoints={
// 														ranker.quizPoints
// 													}
// 													lecturePoints={
// 														ranker.lecturePoints
// 													}
// 												/>
// 											</span>
// 										</div>
// 									</td>
// 								</tr>
// 							);
// 						})}
// 					</tbody>
// 				</table>
// 			</div>
// 		</>
// 	);
// }

// export default RankTableComponent;

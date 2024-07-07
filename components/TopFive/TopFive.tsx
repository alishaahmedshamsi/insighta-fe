import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { fetchClasses, fetchTopFivePoints } from "@/services/apis/school.api";
import PointsBreakdown from "../points-breakdown";

export function getRank(number: number) {
	switch (number) {
		case 1:
			return "1st";
		case 2:
			return "2nd";
		case 3:
			return "3rd";
		case 4:
			return "4th";
		case 5:
			return "5th";
	}
}

function TopFive() {
	const { data, isLoading } = useQuery({
		queryKey: ["fetch-top-five"],
		queryFn: () => fetchTopFivePoints(),
	});

	console.log("top five data: ", data?.data.topStudents.length);

	const { data: classesData } = useQuery({
		queryKey: ["fetch-classes-data"],
		queryFn: () => fetchClasses(),
	});

	const findClassFromId = (classesArray: string[]) => {
		// let newClasses = classesData?.data?.filter(
		// 	(cls: { _id: string }) => cls._id == currentId
		// );

		let newClassesArray = classesData?.data?.filter(
			(cls: { _id: string }) => classesArray.includes(cls._id)
		);

		console.log("newClassesArray: ", newClassesArray);
		return newClassesArray
			?.map((cls: { className: string }) => cls.className)
			.join(", ");
		return "1A";
	};

	// console.log("classesData: ", classesData?.data);
	// console.log("top five data: ", data?.data);

	return isLoading ? (
		<div>Loading...</div>
	) : data?.data.topStudents.length === 0 ||
	  data?.data.topStudents.length === 0 ? (
		<div>No results found. No users has been created yet to show here.</div>
	) : (
		<>
			<h3 className="uppercase text-[1.2em] font-semibold text-[#111]">
				Top 5 Students
			</h3>

			<div className="flex flex-col w-full">
				<table>
					<thead>
						<tr>
							<th className="text-center pb-4 px-2 text-[#bbb]">
								{""}
							</th>
							<th className="text-center pb-4 px-2 text-[#bbb]">
								{""}
							</th>
							<th className="text-center pb-4 px-2 text-[#bbb]">
								Class
							</th>
							<th className="text-center pb-4 px-2 text-[#bbb]">
								Points
							</th>
						</tr>
					</thead>
					<tbody>
						{data?.data?.topStudents.map(
							(user: any, index: number) => (
								<tr className="bg-white shadow-lg shadow-gray-500/.5 mt-[20px]">
									<td>
										<div className="bg-white p-[20px]">
											{getRank(index + 1)}
										</div>
									</td>
									<td>
										<div className="bg-white p-[20px] flex items-center">
											<Image
												alt=""
												className="object-cover items-center w-[40px] h-auto mr-[10px]"
												src={"/assets/male.png"}
												width={600}
												height={600}
											/>
											{user.fullname}
										</div>
									</td>
									<td>
										<div className="bg-white p-[20px] flex justify-center">
											{findClassFromId(user.classes)}
										</div>
									</td>
									<td>
										<div className="bg-white p-[20px] flex justify-center">
											<span className="py-1 px-2 rounded-full text-[#333] bg-[#8640cd27]">
												<PointsBreakdown
													userName={user.fullname}
													userRank={getRank(
														index + 1
													)}
													userClass={findClassFromId(
														user.classes
													)}
													role={"student"}
													points={user.points.total}
													assignmentPoints={
														user.points.assignment
													}
													quizPoints={
														user.points.quiz
													}
													lecturePoints={
														user.points.lecture
													}
													reviewPoints={
														user.points.review
													}
												/>
											</span>
										</div>
									</td>
								</tr>
							)
						)}
					</tbody>
				</table>
			</div>
			<hr className="my-[1em]" />

			<h3 className="uppercase text-[1.2em] font-semibold text-[#111]">
				Top 5 Faculty
			</h3>

			<div className="flex flex-col w-full">
				<table>
					<thead>
						<tr>
							<th className="text-center pb-4 px-2 text-[#bbb]">
								{""}
							</th>
							<th className="text-center pb-4 px-2 text-[#bbb]">
								{""}
							</th>
							<th className="text-center pb-4 px-2 text-[#bbb]">
								Class
							</th>
							<th className="text-center pb-4 px-2 text-[#bbb]">
								Points
							</th>
						</tr>
					</thead>
					<tbody>
						{data?.data?.topTeachers.map(
							(user: any, index: number) => (
								<tr className="bg-white shadow-lg shadow-gray-500/.5 mt-[20px]">
									<td>
										<div className="bg-white p-[20px]">
											{getRank(index + 1)}
										</div>
									</td>
									<td>
										<div className="bg-white p-[20px] flex items-center">
											<Image
												alt=""
												className="object-cover items-center w-[40px] h-auto mr-[10px]"
												src={"/assets/male.png"}
												width={600}
												height={600}
											/>
											{user.fullname}
										</div>
									</td>
									<td>
										<div className="bg-white p-[20px] flex justify-center">
											{findClassFromId(user.classes)}
										</div>
									</td>
									<td>
										<div className="bg-white p-[20px] flex justify-center">
											<span className="py-1 px-2 rounded-full text-[#333] bg-[#8640cd27]">
												<PointsBreakdown
													userName={user.fullname}
													userRank={getRank(
														index + 1
													)}
													userClass={findClassFromId(
														user.classes
													)}
													role={"teacher"}
													points={user.points.total}
													assignmentPoints={
														user.points.assignment
													}
													quizPoints={
														user.points.quiz
													}
													lecturePoints={
														user.points.lecture
													}
													reviewPoints={
														user.points.review
													}
												/>
											</span>
										</div>
									</td>
								</tr>
							)
						)}
					</tbody>
				</table>
			</div>
		</>
	);
}

export default TopFive;

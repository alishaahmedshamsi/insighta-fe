import WatchLectureDialog from "../watchLectureDialog";
import { useQuery } from "@tanstack/react-query";
import { fetchStudentLectures } from "@/services/apis/user.api";

function StudentLectures({ subjectId }: { subjectId: string }) {
	console.log("subjectId: ", subjectId);
	
	const {
		data: lecturesList,
		isLoading,
		error,
	} = useQuery({
		queryKey: ["fetch-student-lectures-list"],
		queryFn: () => fetchStudentLectures(subjectId),
	});

	console.log("lecturesList: ", lecturesList);
	

	return (
		<>
			{lecturesList?.map((lecture: any, index: any) => (
				<div
					key={index}
					className="assignment flex flex-col rounded-[2em] border border-[#DBDBDB] bg-white p-[2em]"
				>
					<div className="assginment-details grid grid-cols-4 gap-5">
						<div>
							<h5 className="text-[#777] font-medium uppercase text-[.9em] tracking-wider">
								Title
							</h5>
							<h4 className="text-[#111] capitalize text-[1.2em]">
								{lecture.title}
							</h4>
						</div>
						<div>
							<h5 className="text-[#777] font-medium uppercase text-[.9em] tracking-wider">
								Date uploaded
							</h5>
							<h4 className="text-[#111] capitalize text-[1.2em]">
								{lecture.createdAt.slice(0, 10)}
							</h4>
						</div>

						{/* <div>
										<h5
											className={
												"text-[#777] font-medium uppercase text-[.9em] tracking-wider"
											}
										>
											Status
										</h5>
										<h4
											className={`text-[#111] font-medium capitalize text-[1.2em] ${
												lecture.status == "Completed"
													? `text-[#5fc935]`
													: "text-[#cf2e23]"
											}`}
										>
											{lecture.status}
										</h4>
									</div> */}
						<div>
							<h5 className="text-[#777] font-medium uppercase text-[.9em] tracking-wider">
								Lecture File
							</h5>
							<h4 className="text-[#111] underline capitalize text-[1.2em]">
								{/* <Link href={lecture.lectureFile}>
												Download File
											</Link> */}
								{lecture.isVideo ? (
									<WatchLectureDialog
										lectureFile={lecture.lecture}
									/>
								) : (
									<a href={lecture.lecture} >Download File</a>
								)}
							</h4>
						</div>
						<div className="col-span-4">
							<h5 className="text-[#777] font-medium uppercase text-[.9em] tracking-wider">
								Description
							</h5>
							<h4 className="text-[#111] text-[1.2em]">
								{lecture.description}
							</h4>
						</div>
					</div>
				</div>
			))}
		</>
	);
}

export default StudentLectures;

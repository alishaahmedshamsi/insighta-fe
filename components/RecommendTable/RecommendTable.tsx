import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";

import { Button } from "../ui/button";
import FeedbackDialog from "../FeedbackDialog/FeedbackDialog";
import { useQuery } from "@tanstack/react-query";
import api from "@/services/middleware/middleware";
import { useStudentSubject } from "@/hooks/user.hook";

export function RecommendTable({
	caption,
	data,
}: {
	caption: string;
	data: Array<{
		_id: string;
		fullname: string;
		subject: string[];
		email:string
		submitted: boolean;
		
	}>;
}) {

	console.log("RecommendTable: ",data);
	
	
	return (
		<Table>
			<TableCaption>{caption}</TableCaption>
			<TableHeader>
				<TableRow>
					<TableHead>Name</TableHead>
					<TableHead>Email</TableHead>
					{/* <TableHead>Status</TableHead> */}
					<TableHead className="flex justify-end">
						Recommend
					</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{data.map((user, index: number) => (
					<TableRow key={index}>
						<TableCell>{user.fullname}</TableCell>
						<TableCell>{user.email}</TableCell>
						{/* <TableCell
							className={`${
								user.submitted
									? `text-green-600`
									: `text-red-600`
							} font-semibold`}
						>
							{user.submitted ? "Submitted" : "Not Submitted"}
						</TableCell> */}
						{!user.submitted ? (
							<TableCell className="flex justify-end">
								<FeedbackDialog
								teacherId={user._id}
									userName={user.fullname}
									subject={user.subject}
								/>
							</TableCell>
						) : (
							<TableCell className="flex justify-end">
								<Button disabled className="align-end ">
									Given
								</Button>
							</TableCell>
						)}
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
}

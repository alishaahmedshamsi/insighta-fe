import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { IUser } from "@/types/type";
import { Button } from "../ui/button";
import FeedbackDialog from "../FeedbackDialog/FeedbackDialog";

export function RecommendTable({
	caption,
	data,
}: {
	caption: string;
	data: Array<{
		fullname: string;
		subject: string;
		submitted: boolean;
	}>;
}) {
	return (
		<Table>
			<TableCaption>{caption}</TableCaption>
			<TableHeader>
				<TableRow>
					<TableHead>Name</TableHead>
					<TableHead>Subjects</TableHead>
					<TableHead>Status</TableHead>
					<TableHead className="flex justify-end">
						Recommend
					</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{data.map((user, index: number) => (
					<TableRow key={index}>
						<TableCell>{user.fullname}</TableCell>
						<TableCell>{user.subject}</TableCell>
						<TableCell
							className={`${
								user.submitted
									? `text-green-600`
									: `text-red-600`
							} font-semibold`}
						>
							{user.submitted ? "Submitted" : "Not Submitted"}
						</TableCell>
						{!user.submitted ? (
							<TableCell className="flex justify-end">
								<FeedbackDialog
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

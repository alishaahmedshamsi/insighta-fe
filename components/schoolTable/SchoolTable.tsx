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

export function SchoolTable({
	caption,
	data,
	role,
}: {
	caption: string;
	data: IUser[];
	role: string;
}) {
	return (
		<Table>
			<TableCaption>{caption}</TableCaption>
			<TableHeader>
				<TableRow>
					<TableHead>Name</TableHead>
					<TableHead>Email</TableHead>
					<TableHead>Status</TableHead>
					<TableHead>Points</TableHead>
					<TableHead>Class</TableHead>
					{role === "student" && <TableHead>Section</TableHead>}
				</TableRow>
			</TableHeader>
			<TableBody>
				{data.map((user: IUser, index: number) => (
					<TableRow key={index}>
						<TableCell>{user.fullname}</TableCell>
						<TableCell>{user.email}</TableCell>
						<TableCell>{"paid"}</TableCell>
						<TableCell className="px-8">{0}</TableCell>
						<TableCell className="px-8">
							{user.classes.map((classObj, classIndex) => (
								<span key={classIndex}>
									{classObj.className}
									{classIndex < user.classes.length - 1 &&
										", "}
								</span>
							))}
						</TableCell>
						{role === "student" && (
							<TableCell className="px-8">
								{user.section.join(", ")}
							</TableCell>
						)}
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
}

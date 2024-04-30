export const STATUS = Object.freeze({
	SUCCESSFUL_RESPONSE: 200,
	SUCCESSFUL_CREATED: 201,
	BAD_REQUEST: 400,
	UNAUTHORIZED: 401,
	NOT_FOUND: 404,
	UNPROCESSABLE_ENTITY: 422,
	INTERNAL_SERVER_ERROR: 500,
});

export const TEACHER_QUICK_START_LIST = [
	{
		heading: "Add Quiz",
		count: "2 Quiz",
		link: "/teacher-dashboard/add-quiz",
	},
	{
		heading: "Add an Assignment",
		count: "2 Assignments",
		link: "/teacher-dashboard/add-assignment",
	},
	{
		heading: "Add Lectures",
		count: "2 Lectures",
		link: "/teacher-dashboard/add-lectures",
	},
];

export const STUDENT_QUICK_START_LIST = [
	{
		heading: "Quiz",
		count: "2 Quiz",
		link: "/student-dashboard/quiz",
	},
	{
		heading: "Assignments",
		count: "2 Assignments",
		link: "/student-dashboard/assignments",
	},
	{
		heading: "Lectures",
		count: "2 Lectures",
		link: "/student-dashboard/lectures",
	},
	{
		heading: "Competition",
		count: "2 Competition",
		link: "/student-dashboard/competitions",
	},
];

export const SCHOOL_ADMIN_QUICK_START_LIST = [
	{
		heading: "Create Student",
		count: "",
		link: "/school-admin/create-student",
	},
	{
		heading: "Create Teacher",
		count: "",
		link: "/school-admin/create-teacher",
	},
];

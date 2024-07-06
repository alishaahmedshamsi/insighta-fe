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
		link: "/teacher-dashboard/add-quiz",
	},
	{
		heading: "Add an Assignment",
		link: "/teacher-dashboard/add-assignment",
	},
	{
		heading: "Add Lectures",
		link: "/teacher-dashboard/add-lectures",
	},
];

export const STUDENT_QUICK_START_LIST = [
	{
		heading: "Quiz",
		link: "/student-dashboard/quiz",
	},
	{
		heading: "Assignments",
		link: "/student-dashboard/assignments",
	},
	{
		heading: "Lectures",
		link: "/student-dashboard/lectures",
	},
];

export const SCHOOL_ADMIN_QUICK_START_LIST = [
	{
		heading: "Create Class",
		link: "/school-admin/create-class",
	},
	{
		heading: "Create Subject",
		link: "/school-admin/create-subject",
	},
	{
		heading: "Create Teacher",
		link: "/school-admin/create-teacher",
	},
	{
		heading: "Create Student",
		link: "/school-admin/create-student",
	},
];
export const SUPER_ADMIN_QUICK_START_LIST = [
	{
		heading: "Create School",
		link: "/sup-admin/create-school",
	},
];

export const ROLES = Object.freeze({
	ADMIN: "admin",
	USER: "student",
	TEACHER: "teacher",
	SCHOOL: "school",
});

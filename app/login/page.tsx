"use client";
import AuthLayout from "@/components/layouts/auth.layout";
import { ILoginFields } from "@/types/type";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/validation";
import { useMutation } from "@tanstack/react-query";
import { onLogin } from "@/services/apis";
import { toast } from "sonner";
import Image from "next/image";
import { ROLES } from "@/utils";
import useAuthStore from "@/store/auth/auth.store";
import Cookies from "js-cookie";

export default function Login() {
	const router = useRouter();
	
	const { mutateAsync, error, reset } = useMutation({
		mutationFn: onLogin,

		onError: (error) => {
			console.log(error.message);
			setTimeout(() => {
				reset();
			}, 3000);
		},
	});

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting }, // isSubmitting for loading state
	} = useForm<ILoginFields>({ resolver: zodResolver(loginSchema) });

	const onSubmit: SubmitHandler<ILoginFields> = async (data, e) => {
		
		const { success, response } = await mutateAsync(data);

		if (!success) return toast.error(response); // false 
		if (success) toast.success("Login successful");

		localStorage.setItem("accessToken", response.data.data.accessToken);
		Cookies.set("accessToken", response.data.data.accessToken, { expires: 7 });
		
        switch (response.data.data.user.role) {
            case ROLES.ADMIN:
                router.push("/sup-admin");
                break;
            case ROLES.SCHOOL:
                router.push("/school-admin");
                break;
            case ROLES.USER:
                router.push("/student-dashboard");
                break;
            case ROLES.TEACHER:
                router.push("/teacher-dashboard");
                break;
            default:
                toast.error("Invalid role");
                break;
        }
	};

	return (
		<AuthLayout title="Login" subText="Glad you're back!">
			<form
				onSubmit={handleSubmit(onSubmit)}
				className="flex items-start flex-col w-full"
			>
				<div className="mb-3 w-full">
					<input
						{...register("email")}
						id="email"
						type="email"
						placeholder="@mail.com"
						className="input-form-fields w-full"
					/>
					{errors.email && (
						<p className="text-brand-sea-green mt-1 pt-2">
							{errors.email.message}
						</p>
					)}
				</div>

				<div className="mb-3 w-full">
					<input
						{...register("password")}
						id="password"
						type="password"
						placeholder="********"
						className="input-form-fields w-full "
					/>
					{errors.password && (
						<p className="text-brand-sea-green mt-1 pt-2">
							{errors.password.message}
						</p>
					)}
				</div>

				<div className="flex justify-between mb-4">
					<div className="flex items-center space-x-2">
						<input
							type="checkbox"
							className="w-4 h-4 rounded-xl"
							id="remember"
						/>
						<label
							htmlFor="remember"
							className="text-[16px] text-[#ccc] "
						>
							Remember me
						</label>
					</div>
				</div>

				<button
					className="w-full rounded-full bg-brand-sea-green py-3 text-white font-semibold transition duration-300 ease-in-out hover:bg-brand-pink focus:outline-none focus:ring focus:border-PrimaryColor"
					type="submit"
				>
					Login
				</button>

				<div className="w-full mt-[20px]">
					<Link
						href="/forget-password"
						className="text-brand-sea-green block w-full text-center hover:underline"
					>
						Forgot Password?
					</Link>
				</div>
			</form>

			{/* <hr className="my-[20px] opacity-[.5]" /> */}

			{/* <div className="w-full flex justify-center gap-5">
				<Link href={"/google-login"}>
					<Image
						alt=""
						className="object-cover w-[40px] h-auto"
						src={"/assets/google-icon.webp"}
						width={600}
						height={600}
					/>
				</Link>

				<Link href={"/facebook-login"}>
					<Image
						alt=""
						className="object-cover w-[40px] h-auto"
						src={"/assets/fb-icon.webp"}
						width={600}
						height={600}
					/>
				</Link>
			</div> */}
		</AuthLayout>
	);
}

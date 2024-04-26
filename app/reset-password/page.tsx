"use client";
import AuthLayout from "@/components/layouts/auth.layout";
import { IResetPassword } from "@/types/type";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { resetPasswordSchema } from "@/validation";
import { useMutation } from "@tanstack/react-query";
import { onRegister } from "@/services/apis";
import { toast } from "sonner";
import Image from "next/image";

export default function ResetPassword() {
	const router = useRouter();

	const { mutateAsync, error, reset } = useMutation({
		mutationFn: onRegister,

		// onSuccess: Handle success if needed,
		// onError: Handle error if needed,

		onError: (error) => {
			console.log(error.message);
			setTimeout(() => {
				reset();
			}, 3000);
		},

		onSuccess: (data: any) => {
			// localStorage.setItem("token", data.data.accessToken);
			// router.push("/dashboard");
		},
	});

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting }, // isSubmitting for loading state
	} = useForm<IResetPassword>({ resolver: zodResolver(resetPasswordSchema) });

	const onSubmit: SubmitHandler<IResetPassword> = async (data) => {
		console.log(data);
		const { success, response } = await mutateAsync(data);

		if (!success) return toast.error(response);
		if (response.user.role !== "admin")
			return toast.error("Unauthorized Access!!!");

		toast.success("Signup success");
	};

	return (
		<AuthLayout
			title="Reset Password"
			subText="Please enter your new password."
		>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className="flex items-start flex-col w-full"
			>
				<div className="mb-3 w-full">
					<input
						{...register("currentPassword")}
						id="currentPassword"
						type="password"
						placeholder="Current password"
						className="input-form-fields w-full "
					/>
					{errors.currentPassword && (
						<p className="text-brand-sea-green mt-1 pt-2">
							{errors.currentPassword.message}
						</p>
					)}
				</div>
				<div className="mb-3 w-full">
					<input
						{...register("newPassword")}
						id="newPassword"
						type="password"
						placeholder="New password"
						className="input-form-fields w-full "
					/>
					{errors.newPassword && (
						<p className="text-brand-sea-green mt-1 pt-2">
							{errors.newPassword.message}
						</p>
					)}
				</div>
				<div className="mb-3 w-full">
					<input
						{...register("confirmPassword")}
						id="confirmPassword"
						type="password"
						placeholder="Confirm password"
						className="input-form-fields w-full "
					/>
					{errors.confirmPassword && (
						<p className="text-brand-sea-green mt-1 pt-2">
							{errors.confirmPassword.message}
						</p>
					)}
				</div>

				<button
					className="w-full rounded-full bg-brand-sea-green py-3 text-white font-semibold transition duration-300 ease-in-out hover:bg-brand-pink focus:outline-none focus:ring focus:border-PrimaryColor"
					type="submit"
				>
					Reset
				</button>
			</form>

			<hr className="my-[20px] opacity-[.5]" />

			<div className="w-full text-[#ccc] text-center mb-[20px] inline-block">
				Remember Password?{" "}
				<Link href="/" className="inline w-full text-center underline">
					<b>Login</b>
				</Link>
				{/* {" | "}
				<Link
					href="/signup"
					className="inline w-full text-center underline"
				>
					<b>Signup</b>
				</Link> */}
			</div>

			<div className="w-full flex justify-center gap-5">
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
			</div>
		</AuthLayout>
	);
}

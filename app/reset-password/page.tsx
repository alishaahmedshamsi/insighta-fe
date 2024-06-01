"use client";
import AuthLayout from "@/components/layouts/auth.layout";
import { IResetPassword } from "@/types/type";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { resetPasswordSchema } from "@/validation";
import { useMutation } from "@tanstack/react-query";
import { onRegister, resetPassword } from "@/services/apis";
import { toast } from "sonner";

export default function ResetPassword() {
	const router = useRouter();
	const { mutateAsync, error, reset } = useMutation({
		mutationFn: resetPassword,
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
		formState: { errors, isSubmitting },
	} = useForm<IResetPassword>({ resolver: zodResolver(resetPasswordSchema) });

	const onSubmit: SubmitHandler<IResetPassword> = async (data) => {
		const { success, response } = await mutateAsync(data);

		if (!success) return toast.error(response);
		toast.success("Password Reset Successfully.");
		router.push('/login')
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
		</AuthLayout>
	);
}

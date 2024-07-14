"use client";
import AuthLayout from "@/components/layouts/auth.layout";
import { IForgetFields } from "@/types/type";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { forgotPasswordSchema } from "@/validation";
import { useMutation } from "@tanstack/react-query";
import { forgetPasswordApi, onRegister } from "@/services/apis";
import { toast } from "sonner";

export default function forgetPassword() {
	const router = useRouter();

	const { mutateAsync, error, reset } = useMutation({
		mutationFn: forgetPasswordApi,
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
	} = useForm<IForgetFields>({ resolver: zodResolver(forgotPasswordSchema) });

	const onSubmit: SubmitHandler<IForgetFields> = async (data) => {
		const { success, response } = await mutateAsync(data.email);
		if (!success) return toast.error(response);
		toast.success(
			"OTP Code sent to your Email"
		);
		router.push(`/otp-code/${data.email}`);
		reset();
	};

	return (
		<AuthLayout
			title="Forget Password"
			subText="Don't worry if you don't remember your password."
		>
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

				<button
					className="w-full rounded-full bg-brand-sea-green py-3 text-white font-semibold transition duration-300 ease-in-out hover:bg-brand-pink focus:outline-none focus:ring focus:border-PrimaryColor"
					type="submit"
				>
					Send Email
				</button>
			</form>

			<hr className="my-[20px] opacity-[.5]" />

			<div className="w-full mt-[20px] text-[#ccc] text-center mb-[20px] inline-block">
				Remember password? &nbsp;
				<Link href="/" className="inline w-full text-center underline">
					<b>Login</b>
				</Link>
			</div>
		</AuthLayout>
	);
}

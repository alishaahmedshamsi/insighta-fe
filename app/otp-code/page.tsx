"use client";
import AuthLayout from "@/components/layouts/auth.layout";
import { IOTPField } from "@/types/type";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { otpSchema } from "@/validation";
import { useMutation } from "@tanstack/react-query";
import { onRegister } from "@/services/apis";
import { toast } from "sonner";
import Image from "next/image";

export default function optCode() {
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
	} = useForm<IOTPField>({ resolver: zodResolver(otpSchema) });

	const onSubmit: SubmitHandler<IOTPField> = async (data) => {
		console.log(data);
		const { success, response } = await mutateAsync(data);

		if (!success) return toast.error(response);
		if (response.user.role !== "admin")
			return toast.error("Unauthorized Access!!!");

		toast.success("Signup success");
	};

	return (
		<AuthLayout title="Verify OTP" subText="Please enter OTP code.">
			<form
				onSubmit={handleSubmit(onSubmit)}
				className="flex items-start flex-col w-full"
			>
				<div className="mb-3 w-full">
					<input
						{...register("otpCode")}
						id="otpCode"
						type="text"
						placeholder="xxxxxx"
						className="input-form-fields w-full"
					/>
					{errors.otpCode && (
						<p className="text-brand-sea-green mt-1 pt-2">
							{errors.otpCode.message}
						</p>
					)}
				</div>

				<button
					className="w-full rounded-full bg-brand-sea-green py-3 text-white font-semibold transition duration-300 ease-in-out hover:bg-brand-pink focus:outline-none focus:ring focus:border-PrimaryColor"
					type="submit"
				>
					Verify
				</button>
			</form>

			<hr className="my-[20px] opacity-[.5]" />

			<div className="w-full mt-[20px] text-[#ccc] text-center mb-[20px] inline-block">
				Didn't recieved the code? &nbsp;
				<Link href="/" className="inline w-full text-center underline">
					<b>Resend it</b>
				</Link>
			</div>
		</AuthLayout>
	);
}

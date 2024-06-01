"use client";
import AuthLayout from "@/components/layouts/auth.layout";
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { onRegister, verfyOtp } from "@/services/apis";
import { z } from "zod"
import {
	InputOTP,
	InputOTPGroup,
	InputOTPSlot,
} from "@/components/ui/input-otp"
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form"
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {useRouter} from "next/navigation";
export default function optCode({ params }: { params: { email: string } }) {

	const router = useRouter();
	
	const { email } = params;
	const decodedEmail = decodeURIComponent(email);
	
	const { mutateAsync, error, reset } = useMutation({
		mutationFn: verfyOtp,
	
		onError: (error) => {
			toast.error(error.message); 
		},
	});

	const FormSchema = z.object({
		otp: z.string().min(6, {
			message: "Your one-time password must be 6 characters.",
		}),
		email: z.string().email(),
	});

	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			otp: "",
			email: decodedEmail,
		},
	});

	async function onSubmit(data: z.infer<typeof FormSchema>) {
		const { success, response } = await mutateAsync(data);
		if (!success) return toast.error(response);
		toast.success("OTP verified successfully.");
		router.push(`/reset-password`);
	}



	return (
		<AuthLayout title="Verify OTP" subText="Please enter OTP code.">
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
					<FormField
						control={form.control}
						name="otp"
						render={({ field }) => (
							<FormItem>
								<FormLabel className="text-white">One-Time Password</FormLabel>
								<FormControl>
									<InputOTP maxLength={6} {...field}>
										<InputOTPGroup className="text-white">
											<InputOTPSlot index={0} />
											<InputOTPSlot index={1} />
											<InputOTPSlot index={2} />
											<InputOTPSlot index={3} />
											<InputOTPSlot index={4} />
											<InputOTPSlot index={5} />
										</InputOTPGroup>
									</InputOTP>
								</FormControl>
								<FormDescription>
									Please enter the one-time password sent to your phone.
								</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>

					<Button type="submit">Submit</Button>
				</form>
			</Form>

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

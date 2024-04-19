import Image from "next/image";
import Link from "next/link";

interface AuthLayoutProps {
	title: string;
	subText: string;
	additionalText?: string;
	children: React.ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({
	title,
	subText,
	children,
	additionalText,
}) => {
	return (
		<section className="bg-brand-dark-blue h-[100vh] relative overflow-hidden w-full mx-auto flex justify-center items-center">
			<span id="bg-circle-gradient-1"></span>
			<span id="bg-circle-gradient-2"></span>
			<div className="flex justify-center items-center w-[min(100%_-_15px,1250px)]">
				<div className="flex justify-center items-center w-[60%]">
					<Image
						alt=""
						className="object-cover w-[200px] h-auto"
						src={"/assets/insighta-logo.png"}
						width={600}
						height={600}
					/>
				</div>
				<div className="flex justify-start items-start flex-col form-container-box w-[40%]">
					<h1 className="text-[35px] text-white font-bold w-full">
						{title}
					</h1>
					<p className="text-[18px] text-gray-400 mb-[30px] w-full">
						{subText}
					</p>
					<div className="w-full">{children}</div>
				</div>
			</div>
		</section>

		//   <div className="flex justify-start h-screen overflow-hidden">
		//     <section className="w-1/2 h-full">
		//       <Image alt="" className="object-cover w-full h-full" src={'/assets/bg-picture.jpg'} width={600} height={600}/>
		//     </section>

		//     <section className="w-1/2 bg-backGroundColor">
		//       {/* <div className="flex justify-end p-10">
		//         <Image width={100} height={100} src={'/assets/logo.svg'} alt="Logo" />
		//       </div> */}
		//       <div className="w-[50%] mx-auto my-10 bg-white h-auto rounded-md ">
		//         <div className=" rounded-xl">
		//           <div className="p-6 pt-10 text-black">
		//             <h1 className="text-3xl text-black font-bold ">{title}</h1>
		//             <p className="text-sm text-gray-400 pt-3">{subText}</p>
		//             <hr className="mt-6" />
		//           </div>
		//           <div className="p-6 ">
		//             {children}
		//             <p className="flex justify-center mt-2 "> <Link href={'/'} className="text-PrimaryColor no-underline"> {additionalText}</Link></p>
		//           </div>
		//         </div>
		//       </div>
		//     </section>
		//   </div>
	);
};

export default AuthLayout;

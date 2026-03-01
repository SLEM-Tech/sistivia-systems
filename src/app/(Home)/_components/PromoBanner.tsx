"use client";
import Link from "next/link";
import Picture from "@src/components/picture/Picture";

const PromoBanner = () => {
	return (
		<section className='w-full overflow-hidden' style={{ background: "#0d1117" }}>
			<div className='max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-2 min-h-[300px]'>
				{/* Left – text content */}
				<div className='flex flex-col justify-center px-8 sm:px-14 py-12'>
					<span
						className='text-xs font-bold uppercase tracking-widest mb-3'
						style={{ color: "rgba(255,255,255,0.35)" }}
					>
						THE BEST
					</span>
					<h2 className='text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight mb-8'>
						Components &amp;<br />
						Accessories
					</h2>
					<Link
						href='/category'
						className='inline-block text-white text-sm font-bold px-8 py-3 rounded-lg transition-opacity hover:opacity-85 w-fit'
						style={{ background: "#1a6dc5" }}
					>
						Explore All
					</Link>
				</div>

				{/* Right – image */}
				<div
					className='relative overflow-hidden flex items-center justify-center min-h-[220px] md:min-h-auto'
					style={{ background: "#111827" }}
				>
					<Picture
						src='/images/hero-bg.png'
						alt='Components & Accessories'
						className='w-full h-full object-cover opacity-70'
					/>
					<div
						className='absolute inset-0'
						style={{
							background:
								"linear-gradient(to right, rgba(13,17,23,0.85) 0%, rgba(13,17,23,0.3) 60%, transparent 100%)",
						}}
					/>
					{/* Badge */}
					<div
						className='absolute bottom-4 right-4 text-white text-[10px] font-bold px-3 py-1.5 rounded tracking-widest uppercase'
						style={{ background: "rgba(0,0,0,0.5)", border: "1px solid rgba(255,255,255,0.15)" }}
					>
						GEFORCE RTX
					</div>
				</div>
			</div>
		</section>
	);
};

export default PromoBanner;

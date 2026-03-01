import Picture from "@src/components/picture/Picture";

const PRIMARY = "#38CB89";

const HelpConnectSection = () => {
	return (
		<section className='w-full overflow-hidden relative' style={{ background: "linear-gradient(90deg, #1535c4 0%, #1a3db8 35%, #5b21b6 70%, #7c3aed 100%)" }}>

			{/* Dot grid pattern – left half */}
			<div
				className='absolute inset-y-0 left-0 w-full lg:w-1/2 pointer-events-none'
				style={{
					backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.22) 1.2px, transparent 1.2px)",
					backgroundSize: "22px 22px",
					maskImage: "linear-gradient(90deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.4) 70%, transparent 100%)",
					WebkitMaskImage: "linear-gradient(90deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.4) 70%, transparent 100%)",
				}}
			/>

			{/* Chevron accent shapes in dots (CSS-only) */}
			<div
				className='absolute left-[28%] top-1/2 -translate-y-1/2 pointer-events-none hidden lg:block'
				style={{
					width: 80,
					height: 140,
					backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.5) 1.5px, transparent 1.5px)",
					backgroundSize: "22px 22px",
					clipPath: "polygon(30% 0%, 100% 50%, 30% 100%, 0% 100%, 70% 50%, 0% 0%)",
					opacity: 0.7,
				}}
			/>
			<div
				className='absolute left-[33%] top-1/2 -translate-y-1/2 pointer-events-none hidden lg:block'
				style={{
					width: 80,
					height: 140,
					backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.5) 1.5px, transparent 1.5px)",
					backgroundSize: "22px 22px",
					clipPath: "polygon(30% 0%, 100% 50%, 30% 100%, 0% 100%, 70% 50%, 0% 0%)",
					opacity: 0.5,
				}}
			/>

			<div className='relative z-10 max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-2 min-h-[280px]'>

				{/* Left – text content */}
				<div className='flex flex-col justify-center px-8 sm:px-14 py-14'>
					<p className='text-sm mb-2' style={{ color: "rgba(255,255,255,0.75)" }}>
						Best Notebooks for
					</p>
					<h2 className='text-3xl sm:text-4xl font-extrabold text-white leading-tight mb-5'>
						Gamers and<br />Creative Minds
					</h2>
					<p
						className='text-xs font-black uppercase tracking-[0.2em]'
						style={{ color: PRIMARY }}
					>
						SISTIVIA SYSTEMS LIMITED
					</p>
				</div>

				{/* Right – image */}
				<div className='relative flex items-center justify-end overflow-hidden min-h-[220px] lg:min-h-auto'>
					<Picture
						src='/images/background-img.png'
						alt='Gaming laptops for creatives'
						className='w-full h-full object-cover object-right'
					/>
					{/* Blend left edge of image into the gradient */}
					<div
						className='absolute inset-y-0 left-0 w-1/3'
						style={{
							background: "linear-gradient(to right, #5b21b6, transparent)",
						}}
					/>
				</div>
			</div>
		</section>
	);
};

export default HelpConnectSection;

import Picture from "@src/components/picture/Picture";

const PRIMARY = "#38CB89";

const HelpConnectSection = () => {
	return (
		<section
			className='w-full overflow-hidden'
			style={{
				background: "linear-gradient(135deg, #1a0533 0%, #0d1117 55%, #0a1a2e 100%)",
			}}
		>
			<div className='max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-2 min-h-[280px]'>
				{/* Left – text content */}
				<div className='flex flex-col justify-center px-8 sm:px-14 py-14'>
					<p className='text-sm mb-2' style={{ color: "rgba(255,255,255,0.5)" }}>
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

				{/* Right – product image */}
				<div className='relative flex items-center justify-end overflow-hidden min-h-[220px] lg:min-h-auto'>
					<Picture
						src='/images/hero-img-2.png'
						alt='Gaming laptops for creatives'
						className='w-full h-full object-cover object-center lg:object-right opacity-80'
					/>
					<div
						className='absolute inset-0'
						style={{
							background:
								"linear-gradient(to right, rgba(26,5,51,0.7) 0%, rgba(26,5,51,0.2) 50%, transparent 100%)",
						}}
					/>
				</div>
			</div>
		</section>
	);
};

export default HelpConnectSection;

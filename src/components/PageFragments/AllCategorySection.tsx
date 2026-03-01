"use client";
import Link from "next/link";
import Picture from "../picture/Picture";
import { useRef, useState, useEffect } from "react";

const PRIMARY = "#38CB89";

// ── Hero Slides ──────────────────────────────────────────────
const heroSlides = [
	{
		image: "/images/hero-img-1.png",
		badge: "Gamers Choice",
		heading: "Notebooks of the\nGeforce RTX 40 Series",
		sub: "All-in-one the world's fastest laptops for gamers and creators",
		cta: "Explore More",
	},
	{
		image: "/images/hero-img-2.png",
		badge: "Best Sellers",
		heading: "Top-Rated\nGaming Laptops",
		sub: "Unmatched performance at the best prices nationwide",
		cta: "Browse Products",
	},
	{
		image: "/images/hero-bg.png",
		badge: "Limited Offer",
		heading: "Build Your\nDream Setup",
		sub: "Everything you need for the ultimate gaming experience",
		cta: "Explore Now",
	},
];

const HeroSlider = () => {
	const [current, setCurrent] = useState(0);
	const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

	const startTimer = () => {
		timerRef.current = setInterval(() => {
			setCurrent((prev) => (prev + 1) % heroSlides.length);
		}, 4500);
	};

	useEffect(() => {
		startTimer();
		return () => {
			if (timerRef.current) clearInterval(timerRef.current);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const goTo = (i: number) => {
		if (timerRef.current) clearInterval(timerRef.current);
		setCurrent(i);
		startTimer();
	};

	const slide = heroSlides[current];

	return (
		<section
			className='relative overflow-hidden'
			style={{
				background: "linear-gradient(135deg, #0d1117 0%, #0d1117 60%, #0a1520 100%)",
				minHeight: "460px",
			}}
		>
			{/* Subtle glow */}
			<div
				className='absolute inset-0 pointer-events-none'
				style={{
					background:
						"radial-gradient(ellipse at top right, rgba(56,203,137,0.07) 0%, transparent 60%)",
				}}
			/>

			{/* Split layout */}
			<div className='relative z-10 max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-20 min-h-[460px] flex items-center'>
				{/* Left – text content */}
				<div className='flex-1 py-16 max-w-xl'>
					<span
						className='inline-block text-xs font-bold px-4 py-1.5 rounded-full mb-5 w-fit'
						style={{ background: "rgba(56,203,137,0.18)", color: PRIMARY }}
					>
						{slide.badge}
					</span>
					<h1 className='text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight text-white mb-4 whitespace-pre-line'>
						{slide.heading}
					</h1>
					<p className='text-sm sm:text-base mb-8 max-w-sm' style={{ color: "rgba(255,255,255,0.5)" }}>
						{slide.sub}
					</p>
					<Link
						href='/category'
						className='inline-block rounded-sm text-white text-sm font-bold px-9 py-3.5 transition-opacity hover:opacity-90 w-fit'
						style={{ background: "#1a6dc5" }}
					>
						{slide.cta}
					</Link>
				</div>

				{/* Right – product image */}
				<div className='hidden lg:flex flex-1 items-center justify-center py-8'>
					<Picture
						src={slide.image}
						alt='hero product'
						className='w-full max-w-[500px] h-[380px] object-contain drop-shadow-2xl'
					/>
				</div>
			</div>

			{/* Dot navigation */}
			<div className='absolute bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-2 z-10'>
				{heroSlides.map((_, i) => (
					<button
						key={i}
						onClick={() => goTo(i)}
						className='rounded-full transition-all duration-300'
						style={{
							width: i === current ? 24 : 8,
							height: 8,
							background: i === current ? PRIMARY : "rgba(255,255,255,0.3)",
						}}
					/>
				))}
			</div>
		</section>
	);
};

// ── Shop by Categories ─────────────────────────────────────
const ShopByCategories = () => {
	const dispatch = useDispatch();
	const { data: categoriesData } = useCategories("");
	const categories: CategoryType[] = ((categoriesData as CategoryType[]) || [])
		.filter((c: CategoryType) => c.count > 0)
		.slice(0, 6);

	const handleCategoryClick = (cat: CategoryType) => {
		const slug = `${convertToSlug(cat.name)}-${cat.id}`;
		dispatch(updateCategorySlugId({ categorySlugId: slug }));
	};

	// Fallback category images from WooCommerce category image field
	const getCatImage = (cat: CategoryType) =>
		(cat as any).image?.src || "/images/hero-img-1.png";

	return (
		<section className='bg-white py-10'>
			<div className='max-w-[1440px] mx-auto px-4 sm:px-8'>
				{/* Title */}
				<h2
					className='text-lg sm:text-xl font-bold text-gray-900 mb-6 flex items-center gap-3'
				>
					<span className='w-1 h-6 rounded-full inline-block flex-shrink-0' style={{ background: PRIMARY }} />
					Shop by Categories
				</h2>

				{/* Category circles */}
				<div className='grid grid-cols-3 sm:grid-cols-6 gap-4'>
					{categories.length > 0
						? categories.map((cat) => (
								<Link
									key={cat.id}
									href={`/category/${convertToSlug(cat.name)}-${cat.id}`}
									onClick={() => handleCategoryClick(cat)}
									className='flex flex-col items-center gap-2 group'
								>
									<div
										className='w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden border-2 border-gray-100 group-hover:border-[#38CB89] transition-colors'
										style={{ background: "#F3F4F6" }}
									>
										<Picture
											src={getCatImage(cat)}
											alt={cat.name}
											className='w-full h-full object-cover group-hover:scale-110 transition-transform duration-300'
										/>
									</div>
									<span
										className='text-xs font-medium text-gray-700 text-center truncate w-full'
										dangerouslySetInnerHTML={{ __html: cat.name }}
									/>
								</Link>
							))
						: // Skeleton placeholders
							Array.from({ length: 6 }).map((_, i) => (
								<div key={i} className='flex flex-col items-center gap-2'>
									<div className='w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gray-100 animate-pulse' />
									<div className='h-3 w-14 bg-gray-100 rounded animate-pulse' />
								</div>
							))}
				</div>
			</div>
		</section>
	);
};

// ── Features Strip ─────────────────────────────────────────
const FeaturesStrip = () => (
	<section className='bg-white' style={{ borderTop: "1px solid #F3F4F6", borderBottom: "1px solid #F3F4F6" }}>
		<div className='max-w-[1440px] mx-auto px-4 sm:px-8 py-4 grid grid-cols-2 md:grid-cols-4 gap-0'>
			{[
				{ emoji: "📦", title: "Product Packing", sub: "Every item packed with care" },
				{ emoji: "🎧", title: "24x7 Support", sub: "Dedicated around the clock" },
				{ emoji: "🚚", title: "Delivery in 5 Days", sub: "Fast nationwide shipping" },
				{ emoji: "🔒", title: "Payment Secure", sub: "Your data is always safe" },
			].map(({ emoji, title, sub }, i) => (
				<div
					key={title}
					className='flex flex-col sm:flex-row items-center sm:items-start gap-3 px-4 py-4 text-center sm:text-left'
					style={{ borderLeft: i > 0 ? "1px solid #F3F4F6" : "none" }}
				>
					<span
						className='flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center text-base'
						style={{ background: "#E6F9F0" }}
					>
						{emoji}
					</span>
					<div>
						<p className='font-semibold text-sm text-gray-900'>{title}</p>
						<p className='text-xs mt-0.5 text-gray-500'>{sub}</p>
					</div>
				</div>
			))}
		</div>
	</section>
);

const AllCategorySection = () => {
	return (
		<div>
			<HeroSlider />
		</div>
	);
};

export default AllCategorySection;

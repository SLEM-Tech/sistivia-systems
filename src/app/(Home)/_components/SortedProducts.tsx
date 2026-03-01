"use client";
import React, { useEffect, useState } from "react";
import { convertToSlug } from "@constants";
import { useCategories, WooCommerce, cacheGet, cacheSet } from "@src/components/lib/woocommerce";
import Link from "next/link";
import { FiChevronRight, FiHeart } from "react-icons/fi";
import Picture from "@src/components/picture/Picture";
import { FormatMoney2 } from "@src/components/Reusables/FormatMoney";
import { useDispatch } from "react-redux";
import { updateCategorySlugId } from "@src/components/config/features/subCategoryId";

const PRIMARY = "#38CB89";

/* ── Product Card ───────────────────────── */
const HomeProductCard = ({ product }: { product: ProductType }) => {
	const price = parseInt(product.price);
	const oldPrice = parseInt(product.regular_price);
	const slugDesc = convertToSlug(product.name);
	const discountPct =
		oldPrice > price ? Math.round(((oldPrice - price) / oldPrice) * 100) : 0;

	return (
		<Link
			href={`/home-item/product/${slugDesc}-${product.id}`}
			className='relative flex flex-col bg-white border border-gray-100 hover:shadow-md transition-shadow duration-200 group'
		>
			{/* Discount badge */}
			{discountPct > 0 && (
				<span className='absolute top-2 left-2 z-10 text-[10px] font-bold bg-red-500 text-white px-1.5 py-0.5 rounded-sm'>
					-{discountPct}%
				</span>
			)}

			{/* Wishlist */}
			<button
				onClick={(e) => e.preventDefault()}
				className='absolute top-2 right-2 z-10 p-1 text-gray-300 hover:text-red-400 transition-colors'
			>
				<FiHeart className='text-sm' />
			</button>

			{/* Image */}
			<div
				className='flex items-center justify-center overflow-hidden'
				style={{ height: 180, background: "#F9FAFB" }}
			>
				<Picture
					src={product.images?.[0]?.src}
					alt={product.name}
					className='w-full h-full object-contain p-3 group-hover:scale-105 transition-transform duration-300'
				/>
			</div>

			{/* Color swatches */}
			<div className='flex items-center gap-1 px-3 pt-2'>
				<span className='w-3 h-3 rounded-full border border-gray-200' style={{ background: "#999" }} />
				<span className='w-3 h-3 rounded-full border border-gray-200' style={{ background: "#bbb" }} />
				<span className='w-3 h-3 rounded-full border border-gray-200' style={{ background: "#ddd" }} />
			</div>

			{/* Info */}
			<div className='px-3 pb-3 pt-1 flex flex-col gap-0.5'>
				<p
					className='text-xs font-medium text-gray-800 line-clamp-2 leading-snug group-hover:text-[#38CB89] transition-colors'
					dangerouslySetInnerHTML={{ __html: product.name }}
				/>
				<div className='flex items-center gap-2 mt-1'>
					<span className='text-sm font-bold' style={{ color: PRIMARY }}>
						{price ? <FormatMoney2 value={price} /> : "N/A"}
					</span>
					{oldPrice > price && (
						<span className='text-xs line-through text-gray-400'>
							<FormatMoney2 value={oldPrice} />
						</span>
					)}
				</div>
			</div>
		</Link>
	);
};

/* ── Skeleton Card ──────────────────────── */
const ProductSkeleton = () => (
	<div className='bg-white border border-gray-100'>
		<div className='h-[180px] bg-gray-100 animate-pulse' />
		<div className='px-3 py-3 space-y-2'>
			<div className='flex gap-1 pt-1'>
				<div className='w-3 h-3 rounded-full bg-gray-100 animate-pulse' />
				<div className='w-3 h-3 rounded-full bg-gray-100 animate-pulse' />
				<div className='w-3 h-3 rounded-full bg-gray-100 animate-pulse' />
			</div>
			<div className='h-3 bg-gray-100 rounded animate-pulse w-3/4' />
			<div className='h-3 bg-gray-100 rounded animate-pulse w-2/3' />
			<div className='h-4 bg-gray-100 rounded animate-pulse w-1/2' />
		</div>
	</div>
);

/* ── Grid Section ───────────────────────── */
const GridSection = ({
	title,
	products,
	isLoading,
	categoryHref,
}: {
	title: string;
	products: ProductType[];
	isLoading: boolean;
	categoryHref?: string;
}) => (
	<section className='bg-white py-8' style={{ borderBottom: "1px solid #F3F4F6" }}>
		<div className='max-w-[1440px] mx-auto px-4 sm:px-8'>
			{/* Header */}
			<div className='flex items-center justify-between mb-6'>
				<h2 className='text-lg sm:text-xl font-bold text-gray-900'>{title}</h2>
				<Link
					href={categoryHref || "/category"}
					className='flex items-center gap-0.5 text-sm text-gray-600 hover:text-gray-900 transition-colors font-medium'
				>
					Explore All
					<FiChevronRight className='text-base' />
				</Link>
			</div>

			{/* Grid – 4 cols × 2 rows */}
			<div className='grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4'>
				{isLoading
					? Array.from({ length: 8 }).map((_, i) => <ProductSkeleton key={i} />)
					: products.slice(0, 8).map((p) => <HomeProductCard key={p.id} product={p} />)}
			</div>
		</div>
	</section>
);

/* ── Main exported component ────────────── */
const SortedProducts = ({ middleBanner }: { middleBanner?: React.ReactNode }) => {
	const [isLoading, setIsLoading] = useState(true);
	const [categoryProductsMap, setCategoryProductsMap] = useState<{
		[key: string]: ProductType[];
	}>({});

	const {
		data: categories,
		isLoading: categoryWpIsLoading,
		isError: categoryIsError,
	} = useCategories("");

	const filteredCategories: CategoryType[] = (categories || [])
		.filter((cat: CategoryType) => cat.count > 0)
		.slice(0, 6);

	useEffect(() => {
		if (!filteredCategories.length) return;

		const fetchCategoryProducts = async () => {
			setIsLoading(true);
			try {
				const promises = filteredCategories.map(async (cat: CategoryType) => {
					const cacheKey = `sorted_products_${cat.id}`;
					const cached = cacheGet<ProductType[]>(cacheKey);
					if (cached) return { id: cat.id.toString(), products: cached };
					const response = await WooCommerce.get(
						`products?category=${cat.id}&per_page=10`,
					);
					cacheSet(cacheKey, response.data);
					return { id: cat.id.toString(), products: response.data };
				});
				const results = await Promise.all(promises);
				const map = results.reduce(
					(acc: any, r) => ({ ...acc, [r.id]: r.products }),
					{},
				);
				setCategoryProductsMap(map);
			} catch (error) {
				console.error("Error fetching category products:", error);
			} finally {
				setIsLoading(false);
			}
		};

		fetchCategoryProducts();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [categories]);

	if (categoryIsError) return null;

	const loading = isLoading || categoryWpIsLoading;

	// Popular products – first 8 across all categories
	const popularProducts = filteredCategories
		.flatMap((c) => categoryProductsMap[c.id.toString()] || [])
		.slice(0, 8);

	return (
		<>
			{/* Section 1 – Popular Products */}
			<GridSection
				title='Popular Products'
				products={popularProducts}
				isLoading={loading}
			/>

			{/* Per-category sections */}
			{filteredCategories.map((cat, index) => {
				const catProducts = categoryProductsMap[cat.id.toString()] || [];
				const catHref = `/category/${convertToSlug(cat.name)}-${cat.id}`;
				return (
					<React.Fragment key={cat.id}>
						{/* Insert promo banner after 2nd category section */}
						{index === 2 && middleBanner}
						<GridSection
							title={cat.name}
							products={catProducts}
							isLoading={loading}
							categoryHref={catHref}
						/>
					</React.Fragment>
				);
			})}
		</>
	);
};

export default SortedProducts;

"use client";
import React, { useMemo, useState } from "react";
import Link from "next/link";
import { signOut } from "@utils/lib";
import { CompanyName, filterCustomersByEmail } from "@constants";
import { useCustomer } from "../lib/woocommerce";
import useToken from "../hooks/useToken";
import {
	FiPhone,
	FiMail,
} from "react-icons/fi";
import {
	BiLogoFacebook,
	BiLogoInstagram,
	BiLogoTwitter,
	BiLogoYoutube,
	BiLogoLinkedin,
} from "react-icons/bi";

const PRIMARY = "#38CB89";

const shopServiceLinks = [
	{ label: "Warranty Conditions", href: "/terms-of-use?warranty" },
	{ label: "Return & Refund Policy", href: "/terms-of-use?privacy-policy" },
	{ label: "VAT & Tax Information", href: "/terms-of-use?terms-of-use" },
	{ label: "Student Discount Program", href: "/contact-us" },
	{ label: "Repair Services", href: "/contact-us" },
	{ label: "Returns", href: "/terms-of-use?privacy-policy" },
];

const helpLinks = [
	{ label: "Help & Support", href: "/contact-us" },
	{ label: "Repair Procedure (RMA)", href: "/contact-us" },
	{ label: "Shipping Policy", href: "/terms-of-use?terms-of-use" },
	{ label: "Payment Methods", href: "/terms-of-use?terms-of-use" },
	{ label: "Shipping", href: "/terms-of-use?terms-of-use" },
	{ label: "Sitemap", href: "/" },
];

const paymentMethods = ["Visa", "Mastercard", "Paystack", "Google Pay", "Apple Pay", "Verve"];

const socialIcons = [
	{ Icon: BiLogoFacebook, label: "Facebook" },
	{ Icon: BiLogoInstagram, label: "Instagram" },
	{ Icon: BiLogoTwitter, label: "Twitter" },
	{ Icon: BiLogoYoutube, label: "YouTube" },
	{ Icon: BiLogoLinkedin, label: "LinkedIn" },
];

const Footer = () => {
	const { email } = useToken();
	const currentYear = new Date().getFullYear();
	const [newsletterEmail, setNewsletterEmail] = useState("");

	const { data: customer } = useCustomer("");
	const wc_customer_info: Woo_Customer_Type | undefined = useMemo(
		() => filterCustomersByEmail(customer as Woo_Customer_Type[], email),
		[customer, email],
	);

	const firstName = wc_customer_info?.first_name;

	return (
		<footer style={{ background: "#0d1117" }} className='text-white w-full'>
			{/* ── Main columns ── */}
			<div className='max-w-[1440px] mx-auto px-4 sm:px-8 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10'>

				{/* Column 1 – Brand + Contact */}
				<div className='space-y-4'>
					{/* Logo */}
					<Link href='/' className='flex items-center gap-2 mb-2'>
						<span className='text-base font-black tracking-tight leading-tight'>
							<span style={{ color: PRIMARY }}>S</span>
							<span className='text-white'>ISTIVIA</span>
							<span
								className='block text-[9px] font-semibold tracking-widest uppercase mt-0.5'
								style={{ color: "rgba(255,255,255,0.4)" }}
							>
								Systems Limited
							</span>
						</span>
					</Link>

					{/* Phone */}
					<div className='flex items-start gap-2.5 text-sm text-gray-400'>
						<FiPhone className='mt-0.5 flex-shrink-0 text-base' />
						<span>+234 (0) 801 234 5678</span>
					</div>

					{/* Email */}
					<div className='flex items-start gap-2.5 text-sm text-gray-400'>
						<FiMail className='mt-0.5 flex-shrink-0 text-base' />
						<span>info@sistivia.com</span>
					</div>

					{/* Hours */}
					<p className='text-xs text-gray-500 pl-0.5'>We are open (7/7)</p>

					{/* Social icons */}
					<div>
						<p className='text-[10px] font-semibold text-gray-400 mb-2 uppercase tracking-widest'>
							Follow Us
						</p>
						<div className='flex items-center gap-2'>
							{socialIcons.map(({ Icon, label }) => (
								<a
									key={label}
									href='/'
									aria-label={label}
									className='w-7 h-7 rounded flex items-center justify-center transition-colors'
									style={{ background: "rgba(255,255,255,0.08)" }}
									onMouseEnter={(e) =>
										((e.currentTarget as HTMLElement).style.background =
											"rgba(255,255,255,0.16)")
									}
									onMouseLeave={(e) =>
										((e.currentTarget as HTMLElement).style.background =
											"rgba(255,255,255,0.08)")
									}
								>
									<Icon className='text-sm text-white' />
								</a>
							))}
						</div>
					</div>

					{/* Newsletter */}
					<div>
						<p className='text-[10px] font-semibold text-gray-400 mb-2 uppercase tracking-widest'>
							Subscribe Newsletter
						</p>
						<div
							className='flex overflow-hidden rounded-sm'
							style={{ border: "1px solid rgba(255,255,255,0.12)" }}
						>
							<input
								type='email'
								placeholder='Enter email address'
								className='flex-1 bg-transparent text-xs text-white placeholder-gray-600 px-3 py-2 outline-none min-w-0'
								value={newsletterEmail}
								onChange={(e) => setNewsletterEmail(e.target.value)}
							/>
							<button
								className='px-3 py-2 text-white text-sm font-bold flex-shrink-0 transition-opacity hover:opacity-85'
								style={{ background: PRIMARY }}
							>
								→
							</button>
						</div>
					</div>
				</div>

				{/* Column 2 – Shop Services */}
				<div className='space-y-3'>
					<h3 className='text-sm font-bold text-white uppercase tracking-wide mb-4'>
						Shop Services
					</h3>
					{shopServiceLinks.map((link) => (
						<Link
							key={link.label}
							href={link.href}
							className='block text-sm text-gray-400 hover:text-white transition-colors leading-relaxed'
						>
							{link.label}
						</Link>
					))}
				</div>

				{/* Column 3 – Help & Support */}
				<div className='space-y-3'>
					<h3 className='text-sm font-bold text-white uppercase tracking-wide mb-4'>
						Help &amp; Support
					</h3>
					{helpLinks.map((link) => (
						<Link
							key={link.label}
							href={link.href}
							className='block text-sm text-gray-400 hover:text-white transition-colors leading-relaxed'
						>
							{link.label}
						</Link>
					))}
					{firstName && (
						<button
							onClick={signOut}
							className='block text-sm text-red-400 hover:text-red-300 transition-colors text-left'
						>
							Log Out
						</button>
					)}
				</div>

				{/* Column 4 – We Accept */}
				<div className='space-y-3'>
					<h3 className='text-sm font-bold text-white uppercase tracking-wide mb-4'>
						We Accept
					</h3>
					<div className='grid grid-cols-3 gap-2'>
						{paymentMethods.map((method) => (
							<span
								key={method}
								className='flex items-center justify-center text-[9px] font-bold px-1.5 py-2 rounded text-center leading-tight'
								style={{
									background: "#ffffff",
									color: "#0d1117",
								}}
							>
								{method}
							</span>
						))}
					</div>
				</div>
			</div>

			{/* ── Bottom bar ── */}
			<div style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>
				<div className='max-w-[1440px] mx-auto px-4 sm:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-2'>
					<p className='text-xs text-gray-500'>
						&copy; {currentYear} {CompanyName}. All Rights Reserved
					</p>
					<p className='text-[10px] text-gray-600 text-center'>
						* All prices incl. VAT plus Shipping and cash on delivery fees if not described otherwise
					</p>
				</div>
			</div>
		</footer>
	);
};

export default Footer;

import { useState } from "react";
import { cloneDeep } from "lodash";

interface props {
	menuData: any;
}

interface order {
	itemName: string;
	quantity: number;
	price: number;
	totalItemPrice: number;
}

export default function Home(props: props) {
	const [order, setOrder] = useState<order[]>([]);

	function handleMinus(productName: string): void {
		let clonedOrder = cloneDeep(order);
		let index = clonedOrder.findIndex(
			(element) => element.itemName === productName
		);
		if (clonedOrder[index].quantity > 1) {
			clonedOrder[index].quantity = clonedOrder[index].quantity - 1;
			clonedOrder[index].totalItemPrice =
				clonedOrder[index].totalItemPrice - clonedOrder[index].price;
			setOrder(clonedOrder);
		} else if (clonedOrder[index].quantity === 1) {
			clonedOrder.splice(index, 1);
			setOrder(clonedOrder);
		}
	}

	function handlePlus(productName: string): void {
		let clonedOrder = cloneDeep(order);
		let index = clonedOrder.findIndex(
			(element) => element.itemName === productName
		);
		clonedOrder[index].quantity = clonedOrder[index].quantity + 1;
		clonedOrder[index].totalItemPrice =
			clonedOrder[index].totalItemPrice + clonedOrder[index].price;
		setOrder(clonedOrder);
	}

	return (
		<>
			<div
				style={{
					height: "400px",
					width: "100%",
					backgroundImage:
						"url(https://goodtaste.fleksa.de/_next/image?url=https%3A%2F%2Fd1nfw7b4288zmf.cloudfront.net%2Fshop%2Fimg%2Fplace%2Fprodtestres%2F6222e5763a3c169a.webp&w=1920&q=75)",
					backgroundRepeat: "no-repeat",
					backgroundPosition: "center",
					backgroundSize: "cover",
				}}
			>
				<div
					className={"flex justify-around items-center"}
					style={{
						height: "100%",
						width: "100%",
						backgroundColor: "rgba(0, 0, 0, 0.6)",
					}}
				>
					<div>
						<div className={"text-white font-semibold text-5xl"}>
							Good Taste
						</div>
						<div className={"text-white text-xl"}>
							Food and drink1
						</div>
						<div className={"mt-5"}>
							&#128337;{" "}
							<span className={"text-white font-bold"}>
								Today 11:30 - 14:30 | 17:30 - 22:30
							</span>
						</div>
						<div className={"mt-3"}>
							<button
								className={
									"p-2 rounded-md text-gray-600 bg-white font-semibold text-center text-lg flex align-center w-max cursor-pointer"
								}
							>
								PICKUP
							</button>
						</div>
					</div>
					<div>
						<div
							className={
								"text-white text-xl underline underline-offset-4 decoration-yellow-300 decoration-4"
							}
						>
							OFFER
						</div>
						<div className={"px-2 py-3"}>
							{[0, 1, 2].map((e) => {
								return (
									<div
										key={e}
										style={{ width: 400 }}
										className={"mt-2"}
									>
										<img
											className={"inline"}
											src="/icons/tag.svg"
											alt="tag-icon"
											style={{ height: "20px" }}
										/>{" "}
										<span
											className={
												"mx-2 px-2 font-semibold bg-white"
											}
										>
											ABHOLUNG
										</span>{" "}
										<span className={"text-white"}>
											Discount of 10% on orders above 10 €
											ABHOLUNG RABATT
										</span>
									</div>
								);
							})}
						</div>
					</div>
				</div>
			</div>
			<div className={"mt-14 flex justify-center"}>
				<div className={"pr-2 relative"}>
					<div
						className={"sticky top-2 overflow-auto"}
						style={{ height: "100vh" }}
					>
						{props.menuData?.categories?.map((category) => {
							return (
								<div className={"p-2"} key={category.id}>
									<a
										href={`#${category?.name_json?.english}`}
									>
										<div
											className={
												"px-4 py-2 rounded-full text-white bg-gray-700 font-semibold text-sm flex align-center w-max cursor-pointer"
											}
										>
											{category?.name_json?.english}
										</div>
									</a>
								</div>
							);
						})}
					</div>
				</div>
				<div style={{ width: "35%" }}>
					{props.menuData?.categories?.map((category) => {
						return (
							<div key={category?.id}>
								<div
									id={category?.name_json?.english}
									className={"bg-yellow-100 text-center pt-3"}
									style={{ height: 50 }}
								>
									{category?.name_json?.english}
								</div>
								<div>
									{category?.products?.map((product) => {
										return (
											<div
												key={product?.id}
												className={
													"border-t-2 p-2 mb-2 cursor-pointer"
												}
											>
												{product?.is_popular && (
													<div
														className={
															"px-4 py-1 rounded-md text-white bg-gray-700 font-semibold text-sm flex align-center w-max cursor-pointer"
														}
													>
														&#9734; Popular
													</div>
												)}
												<div
													className={
														"flex justify-between align-middle"
													}
												>
													<div>
														<div
															className={
																"font-semibold text-lg"
															}
														>
															{
																product
																	?.name_json
																	?.english
															}
														</div>
														<div
															className={
																"font-semibold text-lg"
															}
														>
															{product?.price}{" "}
															&euro;
														</div>
													</div>
													<div>
														{order.find(
															(element) =>
																element.itemName ===
																product
																	?.name_json
																	?.english
														) ? (
															<div
																className={
																	"flex justify-center"
																}
															>
																<a
																	onClick={() => {
																		handleMinus(
																			product
																				?.name_json
																				?.english
																		);
																	}}
																	className={
																		"p-1 rounded-l-md text-black bg-yellow-300 font-semibold text-sm flex align-center w-max cursor-pointer"
																	}
																>
																	&minus;
																</a>
																<div
																	className={
																		"p-1 text-black bg-yellow-300 font-semibold text-sm flex align-center w-max cursor-pointer"
																	}
																>
																	{
																		order.find(
																			(
																				element
																			) =>
																				element.itemName ===
																				product
																					?.name_json
																					?.english
																		)
																			.quantity
																	}
																</div>
																<a
																	onClick={() => {
																		handlePlus(
																			product
																				?.name_json
																				?.english
																		);
																	}}
																	className={
																		"p-1 rounded-r-md  text-black bg-yellow-300 font-semibold text-sm flex align-center w-max cursor-pointer"
																	}
																>
																	&#43;
																</a>
															</div>
														) : (
															<div>
																<button
																	onClick={() => {
																		setOrder(
																			(
																				oldState
																			) => {
																				return [
																					...oldState,
																					{
																						itemName:
																							product
																								?.name_json
																								?.english,
																						quantity: 1,
																						price: product?.price,
																						totalItemPrice:
																							product?.price,
																					},
																				];
																			}
																		);
																	}}
																	className={
																		"px-4 py-1 rounded-md text-black bg-yellow-300 font-semibold text-sm flex align-center w-max cursor-pointer"
																	}
																>
																	ADD
																</button>
															</div>
														)}
													</div>
												</div>
											</div>
										);
									})}
								</div>
							</div>
						);
					})}
				</div>
				<div className={"pl-4 relative"}>
					<div className={"sticky top-2"}>
						<div
							className={`flex ${
								order?.length > 0
									? "justify-between"
									: "justify-center"
							} border-b-2 p-2`}
							style={{ width: 400 }}
						>
							<div
								className={
									"font-semibold text-center text-2xl "
								}
							>
								Your Cart
							</div>
							{order?.length > 0 && (
								<button
									onClick={() => {
										setOrder([]);
									}}
									className={
										"p-1 px-2 rounded-md text-white bg-red-500 font-semibold text-center cursor-pointer"
									}
								>
									Clear Cart
								</button>
							)}
						</div>
						{order.length > 0 ? (
							<div>
								{order?.map((element) => {
									return (
										<div
											key={element?.itemName}
											className={
												"flex justify-between p-2"
											}
										>
											<div className={"font-semibold"}>
												{element?.itemName}
											</div>
											<div
												className={
													"flex justify-between"
												}
												style={{ width: 200 }}
											>
												<div
													className={
														"flex justify-between"
													}
													style={{ width: "100px" }}
												>
													<a
														onClick={() => {
															handleMinus(
																element?.itemName
															);
														}}
														className={
															"p-1 px-2 text-white bg-gray-600 font-semibold text-sm flex align-center w-max cursor-pointer"
														}
													>
														&minus;
													</a>
													<div
														className={
															"p-1 text-black font-semibold text-sm flex align-center w-max cursor-pointer"
														}
													>
														{element?.quantity}
													</div>
													<a
														onClick={() => {
															handlePlus(
																element?.itemName
															);
														}}
														className={
															"p-1 px-2 text-white bg-gray-600 font-semibold text-sm flex align-center w-max cursor-pointer"
														}
													>
														&#43;
													</a>
												</div>
												<div>
													{element?.totalItemPrice?.toFixed(
														1
													)}{" "}
													&euro;
												</div>
											</div>
										</div>
									);
								})}
							</div>
						) : (
							<div className={"flex justify-center"}>
								<div>
									<img
										src="https://goodtaste.fleksa.de/assets/svg/cart-empty.svg"
										alt="empty cart"
										style={{ height: 300 }}
									/>
									<div
										className={"text-center text-gray-400"}
									>
										Please select at least one product to
										place an order
									</div>
								</div>
							</div>
						)}
						{order.length > 0 && (
							<div>
								<div
									className={
										"flex justify-between p-2 border-b-2"
									}
								>
									<div
										className={
											"font-bold text-center text-1xl"
										}
									>
										Total
									</div>
									<div
										className={
											"font-bold text-center text-1xl"
										}
									>
										{order
											?.map(
												(order) => order.totalItemPrice
											)
											?.reduce(
												(previousValue, currentValue) =>
													previousValue +
													currentValue,
												0
											)
											?.toFixed(2)}{" "}
										&euro;
									</div>
								</div>
								<div className={"pt-2"}>
									<button
										style={{ width: "100%" }}
										className={
											"p-2 rounded-md text-white bg-black font-semibold text-center text-lg cursor-pointer"
										}
									>
										Checkout
									</button>
								</div>
							</div>
						)}
					</div>
				</div>
			</div>
		</>
	);
}

export async function getServerSideProps() {
	const response = await fetch("http://localhost:3000/api/getMenu");
	const menuData = await response.json();
	return {
		props: {
			menuData,
		},
	};
}

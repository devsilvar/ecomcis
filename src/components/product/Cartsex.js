export const CartItem = ({ item }) => {
	const { currency, conversionRate } = useCurrency();
	const [deleteFromCart, { isLoading: isDeleting }] = useDeleteFromCartMutation();
	const [updateQuantity] = useUpdateQuantityMutation(); 
	const { data: cart, isLoading, refetch } = useGetCartItemsQuery();
	const dispatch = useDispatch();
	const [isUpdating, setIsUpdating] = React.useState(false);

  console.log(item)
	const handleDeleteFromCart = async (productId) => {
	  try {
		await deleteFromCart(productId).unwrap();
		toast.success("Product removed from cart!");
	  } catch (error) {
		toast.error(error.data.message);
		console.error(error);
	  }
	};
	const handleQuantityChange = async (itemId, newQuantity) => {
		if (!item || typeof newQuantity !== 'number') return;
		if (!item) {
			console.warn('Cart item not found!');
			return null;
		}

		console.log(item)
		// Update Redux immediately (optional)
		dispatch(
			newQuantity > item.quantity
				? increaseQuantity({ id: itemId })
				: decreaseQuantity({ id: itemId })
		);
	  setIsUpdating(true);
		try {
			await updateQuantity({
				item_id: itemId,
				quantity: newQuantity,
			}).unwrap();
			refetch();
			toast.success('Quantity updated!');
		} catch (err) {
			toast.error('Failed to sync with server.');
			// Optional: rollback redux
		}finally{
			setIsUpdating(false);
		}
	};
	
	return (
	  <div
		className={`grid md:grid-cols-4 grid-cols-2 md:p-5 rounded md:shadow-[0px_1px_13px_0px_rgba(0,0,0,0.05)] ${
		  isDeleting ? "opacity-50" : ""
		}`}
	  >
		<div className="md:col-span-2 flex md:items-center gap-4">
		  <img
			alt={item.product.name}
			className="w-28 rounded h-28 object-cover object-top"
			src={item.product.first_image.image}
		  />
  
		  <div className="flex flex-col gap-2 md:gap-4">
			<p>{item.product.name}</p>
  
			<div className="flex flex-col md:flex-row md:items-center gap-4">
			  {item.color && (
				<div className="flex flex-col gap-1">
				  <p className="text-xs font-medium text-[#515655]">Color</p>
				  <div className="flex items-center gap-2">
					<span
					  style={{ backgroundColor: item.color }}
					  className="size-6 rounded-full outline outline-offset-2 outline-rebel-ruby-100"
					/>
				  </div>
				</div>
			  )}
  
			  {item.size && (
				<>
				  <p className="hidden md:block">|</p>
				  <div className="flex flex-col gap-1">
					<p className="text-xs font-medium text-[#515655]">Size</p>
					<div className="flex items-center gap-2">
					  <button
						type="button"
						className="h-8 w-9 grid place-items-center border rounded bg-rebel-ruby-100 text-white border-rebel-ruby-100"
					  >
						<p>{item.size}</p>
					  </button>
					</div>
				  </div>
				</>
			  )}
			</div>
		  </div>
		</div>
  
		<p className="font-medium text-right md:text-center lg:text-left text-lg">
		  {formatMoney(item.product.price * item.quantity, currency, conversionRate)}
		</p>
  
		<div className="flex flex-row pt-4 md:pt-0 items-center justify-between md:flex-col gap-10 ml-auto">
		  <div className="flex items-center gap-1">
			<button
			  onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
			  className="h-9 text-sm w-11 hover:bg-neutral-100 transition-colors border border-crystal-clear-300 rounded grid place-items-center"
			  type="button"
			>
				{isUpdating	? <div className='flex col-span-2 items-center gap-2'>
								<RiLoader4Line className='animate-spin text-lg text-rebel-ruby-100' />
								
							</div>
							:
							<PiMinus />
						}
			</button>
			<div className="h-9 w-11 border border-crystal-clear-300 rounded grid place-items-center">
			  <p>{item.quantity}</p>
			</div>
			<button
			   onClick={() => handleQuantityChange(item.id, item?.quantity + 1)} 
			  type="button"
			  className="h-9 text-sm w-11 hover:bg-neutral-100 transition-colors border border-crystal-clear-300 rounded grid place-items-center"
			>
				{isUpdating	? <div className='flex col-span-2 items-center gap-2'>
								<RiLoader4Line className='animate-spin text-lg text-rebel-ruby-100' />
								
							</div>
							:
							
			  <PiPlus />
							}
			</button>
		  </div>
  
		  <button
			disabled={isDeleting}
			onClick={() => {
			  handleDeleteFromCart(item.id);
			  dispatch(removeFromCart({ id: item.product.id }));
			}}
			type="button"
			className="text-xs text-right text-[#515655] underline disabled:cursor-not-allowed"
		  >
			{isDeleting ? "Removing..." : "Remove"}
		  </button>
		</div>
	  </div>
	);
  };
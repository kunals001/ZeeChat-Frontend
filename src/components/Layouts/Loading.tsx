
const Loading = () => {
	return (
		<div className='h-screen  flex items-center justify-center relative overflow-hidden'>
			{/* Simple Loading  */}
			<div
				className='w-16 h-16 border-4 border-t-4 border-t-prime border-second rounded-full animate-spin duration-300 transition-all'
			/>
		</div>
	);
};

export default Loading;
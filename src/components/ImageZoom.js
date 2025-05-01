import React, { useEffect, useRef, useState } from 'react'

export const ImageZoom = ({ children, zoomMargin = 40, zoomZIndex = 50 }) => {
	const [isZoomed, setIsZoomed] = useState(false)
	const [position, setPosition] = useState({ x: 0, y: 0 })
	const [isDragging, setIsDragging] = useState(false)
	const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
	const overlayRef = useRef(null)
	const imageRef = useRef(null)
	const containerRef = useRef(null)

	const handleClick = e => {
		e.stopPropagation()
		setIsZoomed(true)
		document.body.style.overflow = 'hidden'
	}

	const closeZoom = () => {
		setIsZoomed(false)
		setPosition({ x: 0, y: 0 })
		document.body.style.overflow = ''
	}

	const handleMouseDown = e => {
		if (!isZoomed) return
		setIsDragging(true)
		setDragStart({ x: e.clientX, y: e.clientY })
		e.preventDefault()
	}

	const handleMouseMove = e => {
		if (!isZoomed || !isDragging) return

		const deltaX = e.clientX - dragStart.x
		const deltaY = e.clientY - dragStart.y

		setPosition(prev => ({
			x: prev.x + deltaX,
			y: prev.y + deltaY,
		}))

		setDragStart({ x: e.clientX, y: e.clientY })
	}

	const handleMouseUp = () => {
		setIsDragging(false)
	}

	const resetPosition = () => {
		setPosition({ x: 0, y: 0 })
	}

	useEffect(() => {
		if (isZoomed) {
			document.addEventListener('mousemove', handleMouseMove)
			document.addEventListener('mouseup', handleMouseUp)
		} else {
			document.removeEventListener('mousemove', handleMouseMove)
			document.removeEventListener('mouseup', handleMouseUp)
		}

		return () => {
			document.removeEventListener('mousemove', handleMouseMove)
			document.removeEventListener('mouseup', handleMouseUp)
		}
	}, [isZoomed, isDragging])

	useEffect(() => {
		const handleKeyDown = e => {
			if (e.key === 'Escape' && isZoomed) {
				closeZoom()
			}
		}

		document.addEventListener('keydown', handleKeyDown)
		return () => document.removeEventListener('keydown', handleKeyDown)
	}, [isZoomed])

	// Clone the child element to add our props
	const imageWithProps = React.cloneElement(React.Children.only(children), {
		onClick: handleClick,
		ref: imageRef,
		className: `${children.props.className || ''} cursor-zoom-in`,
	})

	return (
		<>
			{imageWithProps}

			{isZoomed && (
				<div
					ref={overlayRef}
					className={`absolute inset-0 bg-black bg-opacity-90 z-[${zoomZIndex}] flex items-center justify-center p-4`}
					onClick={closeZoom}>
					<div
						ref={containerRef}
						className='relative max-w-full max-h-full overflow-hidden'
						style={{
							cursor: isDragging ? 'grabbing' : 'grab',
						}}
						onClick={e => e.stopPropagation()}>
						<div
							className='transition-transform duration-300 ease-out'
							style={{
								transform: `translate(${position.x}px, ${position.y}px)`,
							}}
							onMouseDown={handleMouseDown}>
							{React.cloneElement(React.Children.only(children), {
								className: `${
									children.props.className || ''
								} max-w-[90vw] max-h-[90vh]`,
								onClick: e => e.stopPropagation(),
							})}
						</div>

						<div className='absolute top-0 right-0 p-2 flex gap-2'>
							<button
								className='bg-gray-800 hover:bg-gray-700 text-white rounded-full w-10 h-10 flex items-center justify-center'
								onClick={e => {
									e.stopPropagation()
									resetPosition()
								}}
								title='Reset position'>
								↻
							</button>
							<button
								className='bg-gray-800 hover:bg-gray-700 text-white rounded-full w-10 h-10 flex items-center justify-center'
								onClick={e => {
									e.stopPropagation()
									closeZoom()
								}}
								title='Close'>
								✕
							</button>
						</div>
					</div>
				</div>
			)}
		</>
	)
}

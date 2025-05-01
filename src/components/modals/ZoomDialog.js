import * as DialogPrimitive from '@radix-ui/react-dialog'
import * as React from 'react'
import { PiX } from 'react-icons/pi'
import QuickPinchZoom, { make3dTransformValue } from 'react-quick-pinch-zoom'

export const ZoomDialog = ({ open, setOpen, src, alt }) => {
	const imgRef = React.useRef()
	const onUpdate = React.useCallback(({ x, y, scale }) => {
		const { current: img } = imgRef

		if (img) {
			const value = make3dTransformValue({ x, y, scale })

			img.style.setProperty('transform', value)
		}
	}, [])
	return (
		<DialogPrimitive.Root open={open} onOpenChange={setOpen}>
			<DialogPrimitive.Portal>
				{/* <DialogPrimitive.Overlay /> */}
				<DialogPrimitive.Content className='fixed left-[50%] m-auto top-[50%] z-50 w-screen translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background px-4 py-6 md:px-6 shadow-lg bg-white duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]'>
					<QuickPinchZoom centerContained={false} onUpdate={onUpdate}>
						<div className='grid place-items-center'>
							<img
								alt={alt}
								ref={imgRef}
								className='w-dvh h-dvh cursor-zoom-out object-cover object-top'
								src={src}
								fetchPriority='high'
							/>
						</div>
					</QuickPinchZoom>

					<DialogPrimitive.Close className='absolute right-4 top-10 bg-neutral-300 p-1 rounded-full z-50 opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground'>
						<PiX className='size-5' />
						<span className='sr-only'>Close</span>
					</DialogPrimitive.Close>
				</DialogPrimitive.Content>
			</DialogPrimitive.Portal>
		</DialogPrimitive.Root>
	)
}

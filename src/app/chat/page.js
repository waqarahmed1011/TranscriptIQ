'use client'

import { Box, Button, Stack, TextField } from '@mui/material'
import { useState, useRef, useEffect } from 'react'

export default function Home() {
	const [messages, setMessages] = useState([
		{
			role: 'assistant',
			content: "Hi! I'm the Headstarter support assistant. How can I help you today?",
		},
	])
	const [message, setMessage] = useState('')
	const [isLoading, setIsLoading] = useState(false)
	const messagesEndRef = useRef(null)

	const scrollToBottom = () => {
		messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
	}

	useEffect(() => {
		scrollToBottom()
	}, [messages])

	const sendMessage = async () => {
		if (!message.trim() || isLoading) return
		setIsLoading(true)
		setMessage('')
		setMessages((messages) => [
			...messages,
			{ role: 'user', content: message },
			{ role: 'assistant', content: '' },
		])

		try {
			const response = await fetch('/api/chat', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify([...messages, { role: 'user', content: message }]),
			})

			if (!response.ok) {
				throw new Error('Network response was not ok')
			}

			const reader = response.body.getReader()
			const decoder = new TextDecoder()

			while (true) {
				const { done, value } = await reader.read()
				if (done) break
				const text = decoder.decode(value, { stream: true })

				setMessages((messages) => {
					let lastMessage = messages[messages.length - 1]
					let otherMessages = messages.slice(0, messages.length - 1)
					return [
						...otherMessages,
						{ ...lastMessage, content: lastMessage.content + JSON.parse(text).content },
					]
				})
			}
		} catch (error) {
			console.error('Error:', error)
			setMessages((messages) => [
				...messages,
				{
					role: 'assistant',
					content: "I'm sorry, but I encountered an error. Please try again later.",
				},
			])
		} finally {
			setIsLoading(false)
		}
	}

	const handleKeyPress = (event) => {
		if (event.key === 'Enter' && !event.shiftKey) {
			event.preventDefault()
			sendMessage()
		}
	}

	return (
		<Stack width={'100vw'} height={'100vh'} justifyContent={'center'} alignItems={'center'} bgcolor="#1E1E1E">
			<Box
				width="100vw"
				height="100vh"
				display="flex"
				flexDirection="column"
				justifyContent="center"
				alignItems="center"
				bgcolor="#1E1E1E" // Dark background color
			>
				<Stack
					direction={'column'}
					width="500px"
					height="700px"
					border="1px solid #3C3C3C" // Darker border color
					p={2}
					spacing={3}
					bgcolor="#2D2D2D" // Slightly lighter dark background for the chat box
					color="white" // White text color
				>
					<Stack direction={'column'} spacing={2} flexGrow={1} overflow="auto" maxHeight="100%">
						{messages.map((message, index) => (
							<Box
								key={index}
								display="flex"
								justifyContent={message.role === 'assistant' ? 'flex-start' : 'flex-end'}
							>
								<Box
									bgcolor={message.role === 'assistant' ? '#3C3C3C' : '#007ACC'} // Different colors for assistant and user messages
									color="white"
									borderRadius={16}
									p={3}
								>
									{message.content}
								</Box>
							</Box>
						))}
						<div ref={messagesEndRef} /> {/* Reference to scroll to */}
					</Stack>
					<Stack direction={'row'} spacing={2}>
						<TextField
							label="Message"
							fullWidth
							value={message}
							onChange={(e) => setMessage(e.target.value)}
							onKeyPress={handleKeyPress}
							disabled={isLoading}
							InputLabelProps={{ style: { color: 'white' } }} // White label color
							InputProps={{
								style: { color: 'white' }, // White text color
								disableUnderline: true,
								style: { backgroundColor: '#3C3C3C', borderRadius: 4, padding: '10px' }, // Dark background for input
								inputProps: { style: { color: 'white' } } // White text color for input
							}}
						/>
						<Button variant="contained" onClick={sendMessage} disabled={isLoading} style={{ backgroundColor: '#007ACC', color: 'white' }}>
							{isLoading ? 'Sending...' : 'Send'}
						</Button>
					</Stack>
				</Stack>
			</Box>
		</Stack>
	)
}
import React, { useState } from "react";

type Message = {
	role: "user" | "assistant";
	content: string;
	time: string;
};

const initialMessages: Message[] = [
	{
		role: "assistant",
		content:
			"Hi! I’m your AI harness assistant. Start a conversation or select a chat from the history to review a test run.",
		time: "10:42 AM",
	},
];

type Conversation = {
	id: string;
	title: string;
	detail: string;
	messages: Message[];
};

const initialConversations: Conversation[] = [
	{ id: "getting-started", title: "Getting started with the harness", detail: "Today · 10:42 AM", messages: initialMessages },
	{ id: "evaluation-results", title: "Summarize evaluation results", detail: "Yesterday · 4:18 PM", messages: initialMessages },
	{ id: "regression-checks", title: "Prompt regression checks", detail: "Yesterday · 1:06 PM", messages: initialMessages },
	{ id: "untitled", title: "Untitled conversation", detail: "Mon · 11:32 AM", messages: initialMessages },
];

export default function App() {
	const [chatList, setChatList] = useState<Conversation[]>(initialConversations);
	const [activeChatId, setActiveChatId] = useState(initialConversations[0].id);
	const [draft, setDraft] = useState("");
	const activeChat = chatList.find((chat) => chat.id === activeChatId) ?? chatList[0];

	function startNewChat() {
		const id = `chat-${Date.now()}`;
		setChatList((current) => [
			{ id, title: "New chat", detail: "Just now", messages: initialMessages },
			...current,
		]);
		setActiveChatId(id);
		setDraft("");
	}

	function sendMessage(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();
		const text = draft.trim();
		if (!text) return;

		const time = new Intl.DateTimeFormat([], { hour: "numeric", minute: "2-digit" }).format(new Date());
		setChatList((current) => current.map((chat) => {
			if (chat.id !== activeChatId) return chat;
			const isNewChat = chat.title === "New chat";
			return {
				...chat,
				title: isNewChat ? text.slice(0, 36) : chat.title,
				detail: `Today · ${time}`,
				messages: [
					...chat.messages,
					{ role: "user", content: text, time },
					{
						role: "assistant",
						content: "This is a placeholder response. Connect your AI harness to enable live replies.",
						time,
					},
				],
			};
		}));
		setDraft("");
	}

	return (
		<main className="app-shell">
			<style>{`
				* { box-sizing: border-box; }
				body { margin: 0; background: #f7f8fa; color: #20232b; font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; }
				button, textarea { font: inherit; }
				.app-shell { display: flex; min-height: 100vh; background: #fff; }
				.sidebar { width: 272px; flex: 0 0 272px; display: flex; flex-direction: column; padding: 22px 14px 16px; background: #f8f9fb; border-right: 1px solid #e9ebef; }
				.brand { display: flex; align-items: center; gap: 11px; padding: 0 10px 24px; font-size: 15px; font-weight: 700; letter-spacing: -.3px; }
				.brand-mark { width: 30px; height: 30px; display: grid; place-items: center; border-radius: 9px; color: white; background: #6558e8; font-size: 17px; }
				.new-chat { width: 100%; display: flex; align-items: center; justify-content: center; gap: 8px; padding: 10px 12px; border: 1px solid #e4e6eb; border-radius: 9px; background: white; color: #353843; font-size: 13px; font-weight: 600; cursor: pointer; box-shadow: 0 1px 2px #20232b08; }
				.new-chat:hover, .conversation:hover { background: #f0efff; }
				.section-label { margin: 27px 10px 9px; color: #9297a3; font-size: 10px; font-weight: 700; letter-spacing: .1em; text-transform: uppercase; }
				.conversation { width: 100%; display: block; padding: 10px; border: 0; border-radius: 8px; text-align: left; background: transparent; color: #414550; cursor: pointer; }
				.conversation.active { background: #eeedff; color: #5146cf; }
				.conversation-title { display: block; overflow: hidden; font-size: 12px; font-weight: 550; text-overflow: ellipsis; white-space: nowrap; }
				.conversation-detail { display: block; margin-top: 5px; color: #969aa5; font-size: 10px; }
				.sidebar-bottom { margin-top: auto; padding: 12px 9px 0; border-top: 1px solid #e9ebef; color: #777c88; font-size: 11px; }
				.profile { display: flex; align-items: center; gap: 10px; padding-top: 13px; }
				.avatar { width: 29px; height: 29px; display: grid; place-items: center; border-radius: 50%; background: #e8e7ff; color: #5c50d5; font-size: 11px; font-weight: 700; }
				.workspace { min-width: 0; min-height: 0; flex: 1; display: flex; flex-direction: column; }
				.topbar { height: 62px; display: flex; align-items: center; justify-content: space-between; padding: 0 30px; border-bottom: 1px solid #eceef2; }
				.breadcrumb { color: #8b909b; font-size: 12px; }
				.breadcrumb strong { color: #333742; font-weight: 600; }
				.status { display: flex; align-items: center; gap: 7px; color: #727783; font-size: 11px; }
				.status-dot { width: 7px; height: 7px; border-radius: 50%; background: #d3a64b; }
				.chat-area { width: min(790px, calc(100% - 48px)); min-height: 0; flex: 1; display: flex; flex-direction: column; margin: 0 auto; }
				.chat-heading { padding: 35px 0 22px; border-bottom: 1px solid #f0f1f3; }
				.chat-heading h1 { margin: 0; color: #272a33; font-size: 18px; font-weight: 650; letter-spacing: -.35px; }
				.chat-heading p { margin: 7px 0 0; color: #9296a0; font-size: 12px; }
				.messages { min-height: 0; flex: 1; overflow-y: auto; padding: 28px 0 18px; }
				.message { display: flex; gap: 12px; margin-bottom: 25px; }
				.message .avatar { flex: 0 0 29px; }
				.message.assistant .avatar { border-radius: 9px; background: #6558e8; color: #fff; }
				.message-body { min-width: 0; padding-top: 2px; }
				.message-meta { display: flex; align-items: center; gap: 9px; margin-bottom: 7px; }
				.message-name { color: #363943; font-size: 12px; font-weight: 650; }
				.message-time { color: #a0a4ad; font-size: 10px; }
				.message-text { margin: 0; color: #555a66; font-size: 13px; line-height: 1.7; white-space: pre-wrap; }
				.composer-wrap { padding: 14px 0 22px; }
				.composer { padding: 12px; border: 1px solid #e2e4e9; border-radius: 12px; background: white; box-shadow: 0 3px 14px #252b3808; }
				.composer textarea { display: block; width: 100%; min-height: 51px; resize: vertical; border: 0; outline: 0; color: #343843; font-size: 13px; line-height: 1.5; }
				.composer textarea::placeholder { color: #a2a6b0; }
				.composer-footer { display: flex; align-items: center; justify-content: space-between; margin-top: 7px; }
				.composer-hint { color: #a0a4ad; font-size: 10px; }
				.send-button { display: flex; align-items: center; gap: 7px; padding: 8px 12px; border: 0; border-radius: 7px; background: #6558e8; color: white; font-size: 11px; font-weight: 600; cursor: pointer; }
				.send-button:hover { background: #5549d0; }
				@media (max-width: 680px) { .sidebar { width: 62px; flex-basis: 62px; padding: 16px 8px; } .brand { justify-content: center; padding: 0 0 18px; } .brand-name, .new-chat span, .section-label, .conversation-title, .conversation-detail, .sidebar-bottom { display: none; } .new-chat { padding: 10px 0; font-size: 19px; } .conversation { padding: 12px 8px; } .conversation::before { content: "•"; display: block; text-align: center; } .topbar { padding: 0 16px; } .chat-area { width: calc(100% - 32px); } .composer-wrap { padding-bottom: 12px; } }
			`}</style>

			<aside className="sidebar">
				<div className="brand"><div className="brand-mark">✳</div><span className="brand-name">AI Harness</span></div>
				<button className="new-chat" onClick={startNewChat}><span>＋</span><span>New chat</span></button>
				<div className="section-label">Recent chats</div>
				<nav aria-label="Recent conversations">
					{chatList.map((conversation) => (
						<button
							className={`conversation${conversation.id === activeChatId ? " active" : ""}`}
							key={conversation.id}
							aria-current={conversation.id === activeChatId ? "page" : undefined}
							onClick={() => setActiveChatId(conversation.id)}
						>
							<span className="conversation-title">{conversation.title}</span>
							<span className="conversation-detail">{conversation.detail}</span>
						</button>
					))}
				</nav>
				<div className="sidebar-bottom">
					<div className="profile"><div className="avatar">JD</div><span>Jayden</span></div>
				</div>
			</aside>

			<section className="workspace">
				<header className="topbar">
					<div className="breadcrumb">Workspace&nbsp; / &nbsp;<strong>Chat</strong></div>
					<div className="status"><span className="status-dot" />Harness not connected</div>
				</header>
				<div className="chat-area">
					<div className="chat-heading">
						<h1>{activeChat.title}</h1>
						<p>A place to test prompts, review responses, and explore your AI harness.</p>
					</div>
					<div className="messages" aria-live="polite">
						{activeChat.messages.map((message, index) => (
							<article className={`message ${message.role}`} key={`${index}-${message.time}`}>
								<div className="avatar">{message.role === "assistant" ? "✳" : "JD"}</div>
								<div className="message-body">
									<div className="message-meta">
										<span className="message-name">{message.role === "assistant" ? "Harness assistant" : "You"}</span>
										<span className="message-time">{message.time}</span>
									</div>
									<p className="message-text">{message.content}</p>
								</div>
							</article>
						))}
					</div>
					<div className="composer-wrap">
						<form className="composer" onSubmit={sendMessage}>
							<textarea
								aria-label="Message"
								placeholder="Message the harness..."
								value={draft}
								onChange={(event) => setDraft(event.target.value)}
								onKeyDown={(event) => {
									if (event.key === "Enter" && !event.shiftKey) {
										event.preventDefault();
										event.currentTarget.form?.requestSubmit();
									}
								}}
							/>
							<div className="composer-footer">
								<span className="composer-hint">Enter to send · Shift + Enter for a new line</span>
								<button className="send-button" type="submit">Send <span aria-hidden="true">↑</span></button>
							</div>
						</form>
					</div>
				</div>
			</section>
		</main>
	);
}

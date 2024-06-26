<template>
	<view class="page-index">
		<view class="chat-list" ref="chatListRef">
			<view :style="{ justifyContent: item.from === 'me' ? 'flex-end' : 'flex-start' }" class="chat-item"
				v-for="(item,index) in chatList" :key="index">
				<span style="white-space:pre-wrap" :class="[item.from === 'me' ? 'light-bg' : 'dark-bg']"
					class="chat-text" v-html="item.text"></span>
			</view>

			<uni-load-more v-if="isLoading" status="loading" :contentText="{ contentrefresh: '等待响应中' }"></uni-load-more>
		</view>

		<view class="chat-input">
			<textarea v-model="message" conform-type="send" auto-height placeholder="请输入内容" />
			<image @click="sendMessage" src="../../static/send.png" alt=""></image>
		</view>
	</view>
</template>

<script lang="ts" setup>
	import { ref, nextTick } from "vue"
	const message = ref("");

	const chatList = ref([
		{ from: "root", text: " 作为一个人工智能助手，我会尽力提供帮助和信息。请告诉我你需要什么帮助，或者你想聊些什么？我在这里随时准备回答你的问题。", status: "finish" },
	])

	const chatListRef = ref();

	const isLoading = ref(false);
	const pushChat = (from, text, status = 'finish') => {
		chatList.value.push({ from: from, text: text, status: status });
		nextTick(() => {
			scrollToLower();
		})
	}

	const scrollToLower = () => {
		console.log(chatListRef.value)
		chatListRef.value.$el.scrollTop = chatListRef.value.$el.scrollHeight;
	}

	const sendMessage = () => {
		if (message.value) {
			pushChat('me', message.value);
			isLoading.value = true;

			let _message = message.value;
			message.value = "";

			uni.request({
				url: "http://192.168.16.162:8888/send-message",
				methods: "get",
				data: {
					text: _message
				},
				success: ({ data } : any) => {
					let { data: result, code } = data;

					if (code === 200) {
						pushChat("root", result.content);
					}

					isLoading.value = false;


				}
			})
		}
	}
</script>

<style lang="scss" scoped>
	.page-index {
		background: #F5F5F5;
		height: calc(100vh - 44px);
		display: flex;
		flex-flow: column;
		overflow: hidden;

		.chat-list {
			flex: 1;
			overflow-y: scroll;

			.chat-item {
				display: flex;
				justify-content: flex-end;
				margin: 12px;
				padding: 12rpx;
				font-size: 28rpx;
				border-radius: 12rpx;
			}

			.chat-text {
				border-radius: 12rpx;
				max-width: 500rpx;
				display: inline-block;
				padding: 8px 12px;
			}

			.light-bg {
				background: white !important;
				color: black;
			}

			.dark-bg {
				background: #7C3AED !important;
				color: white;
			}
		}

		.chat-input {
			background: white;
			display: flex;
			align-items: center;
			padding: 12rpx;
			flex-shrink: 0;

			image {
				margin: 7px;
				width: 60rpx;
				height: 60rpx;
				transform: rotate(-90deg);
			}

			textarea {
				border-radius: 12rpx;
				box-sizing: border-box;
				padding: 12px;
				width: 100%;
				font-size: 28rpx;
				background: #E9EEF6;
			}
		}
	}
</style>
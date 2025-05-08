import type {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
} from 'n8n-workflow';
import { NodeConnectionType, NodeOperationError } from 'n8n-workflow';
import {
	KAKAO_GET_FRIENDS_URL,
	KAKAO_SEND_MESSAGE_TO_FRIEND_URL,
	KAKAO_SEND_MESSAGE_TO_MYSELF_URL,
} from './KakaoTalkConstants';

export class KakaoTalk implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'KakaoTalk',
		name: 'kakaoTalk',
		group: ['transform'],
		version: 1,
		description: 'Interact with a kakao talk',
		icon: 'file:KakaoTalk.svg',
		defaults: {
			name: 'KakaoTalk',
		},
		// eslint-disable-next-line n8n-nodes-base/node-class-description-inputs-wrong-regular-node
		inputs: [NodeConnectionType.Main],
		// eslint-disable-next-line n8n-nodes-base/node-class-description-outputs-wrong
		outputs: [NodeConnectionType.Main],
		credentials: [
			{
				name: 'kakaoTalkOAuth2Api',
				required: true,
			},
		],
		properties: [
			{
				displayName: 'Action',
				name: 'operation',
				type: 'options',
				options: [
					{ name: 'Get Friends', value: 'getFriends' },
					{ name: 'Send Text Message', value: 'sendText' },
					{ name: 'Send Feed Message', value: 'sendFeed' },
				],
				default: 'sendText',
				noDataExpression: true,
			},
			{
				displayName: 'Recipient',
				name: 'recipientType',
				type: 'options',
				options: [
					{ name: 'Myself', value: 'myself' },
					{ name: 'Friend', value: 'friend' },
				],
				default: 'myself',
				displayOptions: {
					show: {
						operation: ['sendText', 'sendFeed', 'sendList'],
					},
				},
			},
			{
				displayName: 'Receiver UUID',
				name: 'receiverUuid',
				type: 'string',
				default: '',
				displayOptions: {
					show: {
						recipientType: ['friend'],
					},
				},
			},
			{
				displayName: 'Feed Type',
				name: 'feedType',
				type: 'options',
				options: [
					{ name: 'Feed A', value: 'feedA' },
					{ name: 'Feed B', value: 'feedB' },
				],
				default: 'feedA',
				displayOptions: {
					show: {
						operation: ['sendFeed'],
					},
				},
			},

			/**********
			 * * FEED *
			 **********/
			{
				displayName: 'Title',
				name: 'feedTitle',
				type: 'string',
				default: '',
				displayOptions: {
					show: {
						operation: ['sendFeed'],
					},
				},
			},
			{
				displayName: 'Description',
				name: 'feedDesc',
				type: 'string',
				default: '',
				displayOptions: {
					show: {
						operation: ['sendFeed'],
					},
				},
			},
			{
				displayName: 'Image URL',
				name: 'feedImageUrl',
				type: 'string',
				default: '',
				displayOptions: {
					show: {
						operation: ['sendFeed'],
					},
				},
			},
			{
				displayName: 'Like Count',
				name: 'likeCount',
				type: 'number',
				default: 0,
				displayOptions: {
					show: {
						operation: ['sendFeed'],
					},
				},
			},
			{
				displayName: 'Comment Count',
				name: 'commentCount',
				type: 'number',
				default: 0,
				displayOptions: {
					show: {
						operation: ['sendFeed'],
					},
				},
			},
			{
				displayName: 'Share Count',
				name: 'sharedCount',
				type: 'number',
				default: 0,
				displayOptions: {
					show: {
						operation: ['sendFeed'],
					},
				},
			},
			{
				displayName: 'Profile Text',
				name: 'profileText',
				type: 'string',
				default: '',
				displayOptions: {
					show: {
						operation: ['sendFeed'],
						feedType: ['feedB'],
					},
				},
			},
			{
				displayName: 'Profile Image URL',
				name: 'profileImageUrl',
				type: 'string',
				default: '',
				displayOptions: {
					show: {
						operation: ['sendFeed'],
						feedType: ['feedB'],
					},
				},
			},
			{
				displayName: 'Item Title',
				name: 'itemTitle',
				type: 'string',
				default: '',
				displayOptions: {
					show: {
						operation: ['sendFeed'],
						feedType: ['feedB'],
					},
				},
			},
			{
				displayName: 'Item Category',
				name: 'itemCategory',
				type: 'string',
				default: '',
				displayOptions: {
					show: {
						operation: ['sendFeed'],
						feedType: ['feedB'],
					},
				},
			},
			{
				displayName: 'Item Image URL',
				name: 'itemImageUrl',
				type: 'string',
				default: '',
				displayOptions: {
					show: {
						operation: ['sendFeed'],
						feedType: ['feedB'],
					},
				},
			},
			{
				displayName: 'Items',
				name: 'items',
				type: 'string',
				default:
					'[{"item": "item1 name", "item_op": "item1 description"}, {"item": "item2 name", "item_op": "item2 description"}]',
				description: 'Enter array of items in JSON format: [{"item":"name","item_op":"price"}]',
				displayOptions: {
					show: {
						operation: ['sendFeed'],
						feedType: ['feedB'],
					},
				},
			},
			{
				displayName: 'Total Label',
				name: 'sum',
				type: 'string',
				default: 'Total',
				displayOptions: {
					show: {
						operation: ['sendFeed'],
						feedType: ['feedB'],
					},
				},
			},
			{
				displayName: 'Total Value',
				name: 'sumOp',
				type: 'string',
				default: '$80',
				displayOptions: {
					show: {
						operation: ['sendFeed'],
						feedType: ['feedB'],
					},
				},
			},

			/**********
			 * * LIST *
			 **********/

			/**************
			 * * LOCATION *
			 **************/

			/**************
			 * * COMMERCE *
			 **************/

			/**********
			 * * TEXT *
			 **********/
			{
				displayName: 'Message Text',
				name: 'messageText',
				type: 'string',
				default: '',
				displayOptions: {
					show: {
						operation: ['sendText'],
					},
				},
			},

			/************
			 * * SCRAPE *
			 ************/

			/**************
			 * * CALENDAR *
			 **************/

			/***********************
			 * * COMMON COMPONENTS *
			 ***********************/
			{
				displayName: 'Button Title',
				name: 'buttonTitle',
				type: 'string',
				default: '',
				displayOptions: {
					show: {
						operation: ['sendFeed', 'sendList', 'sendText'],
					},
				},
			},
			{
				displayName: 'Link Web URL',
				name: 'linkWebUrl',
				type: 'string',
				default: '',
				description: 'One of the URLs is required',
				displayOptions: {
					show: {
						operation: ['sendFeed', 'sendList', 'sendText'],
					},
				},
			},
			{
				displayName: 'Link Mobile URL',
				name: 'linkMobileUrl',
				type: 'string',
				default: '',
				description: 'One of the URLs is required',
				displayOptions: {
					show: {
						operation: ['sendFeed', 'sendList', 'sendText'],
					},
				},
			},
			{
				displayName: 'Android Execution Params',
				name: 'linkAndroidParams',
				type: 'string',
				default: '',
				description: 'One of the URLs is required',
				displayOptions: {
					show: {
						operation: ['sendFeed', 'sendList', 'sendText'],
					},
				},
			},
			{
				displayName: 'iOS Execution Params',
				name: 'linkIosParams',
				type: 'string',
				default: '',
				description: 'One of the URLs is required',
				displayOptions: {
					show: {
						operation: ['sendFeed', 'sendList', 'sendText'],
					},
				},
			},
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];

		const buildLinkObject = (i: number) => {
			return {
				web_url: this.getNodeParameter('linkWebUrl', i),
				mobile_web_url: this.getNodeParameter('linkMobileUrl', i),
				android_execution_params: this.getNodeParameter('linkAndroidParams', i),
				ios_execution_params: this.getNodeParameter('linkIosParams', i),
			};
		};

		for (let i = 0; i < items.length; i++) {
			try {
				const operation = this.getNodeParameter('operation', i) as string;

				if (operation === 'getFriends') {
					const response = await this.helpers.requestWithAuthentication.call(
						this,
						'kakaoTalkOAuth2Api',
						{
							method: 'GET',
							url: KAKAO_GET_FRIENDS_URL,
						},
					);

					const parsed = typeof response === 'string' ? JSON.parse(response) : response;

					if (Array.isArray(parsed.elements)) {
						for (const friend of parsed.elements) {
							returnData.push({ json: friend });
						}
					} else {
						returnData.push({ json: parsed });
					}

					continue;
				}

				const link = buildLinkObject(i);
				let template: any;

				if (operation === 'sendText') {
					const messageText = this.getNodeParameter('messageText', i) as string;
					template = {
						object_type: 'text',
						text: messageText,
						link,
						button_title: this.getNodeParameter('buttonTitle', i),
					};
				} else if (operation === 'sendFeed') {
					const feedType = this.getNodeParameter('feedType', i);
					const social: Record<string, number> = {};
					const likeCount = this.getNodeParameter('likeCount', i) as number;
					const commentCount = this.getNodeParameter('commentCount', i) as number;
					const sharedCount = this.getNodeParameter('sharedCount', i) as number;

					if (likeCount) social.like_count = likeCount;
					if (commentCount) social.comment_count = commentCount;
					if (sharedCount) social.shared_count = sharedCount;

					if (feedType === 'feedA') {
						template = {
							object_type: 'feed',
							content: {
								title: this.getNodeParameter('feedTitle', i),
								description: this.getNodeParameter('feedDesc', i),
								image_url: this.getNodeParameter('feedImageUrl', i),
								link,
							},
							social: Object.keys(social).length > 0 ? social : undefined,
							buttons: [
								{
									title: this.getNodeParameter('buttonTitle', i),
									link,
								},
							],
						};
					} else if (feedType === 'feedB') {
						const feedItemsJson = this.getNodeParameter('items', i);
						const feedItems = JSON.parse(feedItemsJson as string);

						template = {
							object_type: 'feed',
							content: {
								title: this.getNodeParameter('feedTitle', i),
								description: this.getNodeParameter('feedDesc', i),
								image_url: this.getNodeParameter('feedImageUrl', i),
								link,
							},
							item_content: {
								profile_text: this.getNodeParameter('profileText', i),
								profile_image_url: this.getNodeParameter('profileImageUrl', i),
								title_image_text: this.getNodeParameter('itemTitle', i),
								title_image_url: this.getNodeParameter('itemImageUrl', i),
								title_image_category: this.getNodeParameter('itemCategory', i),
								items: feedItems,
								sum: this.getNodeParameter('sum', i),
								sum_op: this.getNodeParameter('sumOp', i),
							},
							buttons: [
								{
									title: this.getNodeParameter('buttonTitle', i),
									link,
								},
							],
						};
					}
				}

				const form: Record<string, string> = {
					template_object: JSON.stringify(template),
				};

				const recipientType = this.getNodeParameter('recipientType', i) as string;
				let url = '';
				if (recipientType === 'myself') {
					url = KAKAO_SEND_MESSAGE_TO_MYSELF_URL;
				} else if (recipientType === 'friend') {
					const receiverUuid = this.getNodeParameter('receiverUuid', i) as string;
					form.receiver_uuids = JSON.stringify([receiverUuid]);
					url = KAKAO_SEND_MESSAGE_TO_FRIEND_URL;
				}

				const response = await this.helpers.requestWithAuthentication.call(
					this,
					'kakaoTalkOAuth2Api',
					{
						method: 'POST',
						url,
						headers: {
							'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
						},
						form,
					},
				);

				const parsed = typeof response === 'string' ? JSON.parse(response) : response;
				returnData.push({ json: parsed });
			} catch (error) {
				if (this.continueOnFail()) {
					returnData.push({
						json: items[i].json,
						error: error.message,
						pairedItem: i,
					});
				} else {
					throw new NodeOperationError(this.getNode(), error, { itemIndex: i });
				}
			}
		}

		return [returnData];
	}
}

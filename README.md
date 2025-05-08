# n8n-nodes-kakaotalk

This is an n8n community node. It lets you send KakaoTalk messages and retrieve friend lists in your n8n workflows.

KakaoTalk is a popular messaging app in South Korea. This node supports sending message templates (text and feed) to yourself or to friends via Kakao's messaging APIs.

[n8n](https://n8n.io/) is a [fair-code licensed](https://docs.n8n.io/reference/license/) workflow automation platform.

[Installation](#installation)  
[Operations](#operations)  
[Credentials](#credentials) <!-- delete if no auth needed -->  
[Compatibility](#compatibility)  
[Usage](#usage) <!-- delete if not using this section -->  
[Resources](#resources)  
[Version history](#version-history) <!-- delete if not using this section -->

## Installation

Follow the [installation guide](https://docs.n8n.io/integrations/community-nodes/installation/) in the n8n community nodes documentation.

## Operations

- Get KakaoTalk friends
- Send text message to self
- Send text message to a friend
- Send feed message (template A or B) to self
- Send feed message (template A or B) to a friend

## Credentials

This node uses OAuth2 authentication with Kakao.

- Create a Kakao Developer account at https://developers.kakao.com.
- Create an app and enable Kakao Talk Messaging.
- Add the proper redirect URI as required by n8n.
- Copy the REST API key and use it in your n8n OAuth2 credential setup.

## Compatibility

- Requires n8n v1.89.0 or higher
- Tested with Kakao's v2 messaging APIs

## Usage

### Sending a Message to Yourself

Use the **"Send Text Message"** or **"Send Feed Message"** operation with recipient set to `myself`. These use Kakao’s Memo API.

### Sending a Message to a Friend

Select `friend` as the recipient type and use the **"Get Friends"** operation first to obtain a friend’s `uuid`, which is required when sending a message.

Feed templates support both **Template A** (basic feed) and **Template B** (extended feed with itemized content).

## Resources

- [n8n community nodes documentation](https://docs.n8n.io/integrations/community-nodes/)
- [kakao developers documentation](https://developers.kakao.com/docs/latest/en/index)

## Version history

### 0.1.0

- Initial release
- Supports text and feed messages to self and friends
- Friend list retrieval

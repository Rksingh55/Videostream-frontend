import { config } from './config';

export function getSignalingUrl(peerId, roomId)
{
	// const hostname = config.serverHostname || window.location.hostname;
	// const port =
	// 	process.env.NODE_ENV !== 'production' ?
	// 		config.developmentPort
	// 		:
	// 		config.productionPort;
	
	// const url = `wss://${hostname}:${port}/?peerId=${peerId}&roomId=${roomId}`;
	// const hostname = 'letsmeet.no';
	const hostname = 'live.easyhaionline.com';
	// const hostname = '192.168.29.125'
	const port = 3443;
	// const url = `wss://${hostname}:${port}/?peerId=${peerId}&roomId=${roomId}`;
	const url = `wss://${hostname}/?peerId=${peerId}&roomId=${roomId}`;

	return url;
}

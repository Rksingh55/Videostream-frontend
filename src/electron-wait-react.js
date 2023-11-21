import net from 'net';
import dotenv from 'dotenv';
import { exec } from 'child_process';
dotenv.config();
// import net from 'net';
const port = process.env.PORT ? (process.env.PORT - 100) : 3000;
console.log("L-6, port------>", port)

process.env.ELECTRON_START_URL = `http://localhost:${port}`;

const client = new net.Socket();

let startedElectron = false;

const tryConnection = () =>
	client.connect({ port: port }, () =>
	{
		client.end();

		if (!startedElectron)
		{
			// eslint-disable-next-line no-console
			console.log('starting electron');

			startedElectron = true;

			// exec;

			const electron = exec('npm run electron');

			electron.stdout.on('data', (data) =>
			{
				// eslint-disable-next-line no-console
				console.log(`stdout: ${data.toString()}`);
			});
		}
	});

tryConnection();

client.on('error', () =>
{
	setTimeout(tryConnection, 1000);
});

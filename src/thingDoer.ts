import { LogHandler } from "./logHandler"
import type { SubscriberHandler } from "./subscriberHandler"


export class ThingDoer implements LoggingObservable
{
	public readonly onLog: SubscriberHandler<Log>

	private log: LogHandler

	private loaded: boolean

	constructor()
	{
		this.loaded = false

		this.log = new LogHandler()

		this.onLog = this.log.onLog
	}

	public async init()
	{
		// setup
		this.loaded = true
	}

	public async doThing()
	{
		if ( !this.loaded )
		{
			throw Error( `Thing Doer module has not been loaded.` )
		}

		return await this.ponder()
	}

	private async ponder(): Promise<string>
	{
		return new Promise( resolve => 
		{
			const ponderTime = 10

			const message = `Hello world`

			setTimeout( () => resolve( `
				<!DOCTYPE html>
				<html>
				<head><title>${message}</title></head>
				<body>${message}</body>
				</html>`
			), ponderTime )
		} )
	}
}
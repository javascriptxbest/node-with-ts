import { LogSystem } from "./logSystem"
import { ThingDoer } from "./thingDoer"

/**
 * Core connects components together, without
 * exposing methods and properties via to the API
 */
export class Core
{
	private logSystem: LogSystem

	private thingDoer: ThingDoer

	constructor( logLocation?: string )
	{
		this.logSystem = new LogSystem( logLocation )

		this.thingDoer = new ThingDoer()

		this.thingDoer.onLog.subscribe( this.logSystem )
	}

	public async init()
	{
		await this.thingDoer.init()
	}

	public async doThing()
	{
		return await this.thingDoer.doThing()
	}
}